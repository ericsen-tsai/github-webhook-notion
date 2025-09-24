// Cloud Run Function entry point

import { Client } from "@notionhq/client";
import { configDotenv } from "dotenv";
import express from "express";

configDotenv();

const NOTION_STATUS_MAPPING = {
  "kids-reporter": ["Todo", "In progress", "Code Review", "Ready For Test"],
  twreporter: ["Todo", "In progress", "Code Review", "Ready For Test"],
};

// Initialize Notion client and Express app
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Function to extract Notion page ID from PR description
function extractNotionPageId(prDescription) {
  if (!prDescription) {
    return null;
  }

  // Regex patterns to match various Notion URL formats
  const notionUrlPatterns = [
    // Standard Notion URLs: https://www.notion.so/workspace/page-title-pageId
    /https:\/\/(?:www\.)?notion\.so\/[^\/\s]+\/[^\/\s]+-([a-f0-9]{32})/i,
    // Direct page URLs: https://www.notion.so/pageId
    /https:\/\/(?:www\.)?notion\.so\/([a-f0-9]{32})/i,
    // URLs with query parameters: https://www.notion.so/workspace/page-title-pageId?param=value
    /https:\/\/(?:www\.)?notion\.so\/[^\/\s]+\/[^\/\s]+-([a-f0-9]{32})\?/i,
    // Markdown link format: [text](https://www.notion.so/...)
    /\[([^\]]+)\]\(https:\/\/(?:www\.)?notion\.so\/[^\/\s]+\/[^\/\s]+-([a-f0-9]{32})[^)]*\)/i,
    // Raw URLs in various formats
    /https:\/\/(?:www\.)?notion\.so\/[^\/\s]*\/[^\/\s]*-?([a-f0-9]{32})/i,
  ];

  for (const pattern of notionUrlPatterns) {
    const match = prDescription.match(pattern);
    if (match) {
      // The page ID is usually in the last capture group
      const pageId = match[match.length - 1];
      if (pageId && pageId.length === 32) {
        // Format the page ID with dashes in the standard UUID format
        const formattedPageId = pageId.replace(
          /(.{8})(.{4})(.{4})(.{4})(.{12})/,
          "$1-$2-$3-$4-$5"
        );
        console.log(`Extracted Notion page ID: ${formattedPageId}`);
        return formattedPageId;
      }
    }
  }

  console.log("No Notion page ID found in PR description");
  return null;
}

// Function to update page status to next status
async function updatePageStatus(pageId, repoName, prState) {
  try {
    const availableStatuses = NOTION_STATUS_MAPPING[repoName];

    let accessIndex = 0;
    if (prState === "closed") {
      accessIndex = availableStatuses.length - 1;
    } else {
      accessIndex = availableStatuses.length - 2;
    }

    const nextStatusName = availableStatuses[accessIndex];

    const pageInfo = await notion.pages.retrieve({
      page_id: pageId,
    });
    // Find the status property
    const statusProperty =
      pageInfo.properties?.["Completed?"] ||
      pageInfo.properties?.["completed?"];

    if (!statusProperty) {
      console.log("No status property found on the page");
      return { updated: false, reason: "No status property found" };
    }

    let updatePayload = {};
    let propertyName = "Status"; // Default, but we'll find the actual name

    // Find the correct property name (could be "Status" or "status")
    if (pageInfo.properties?.["Completed?"]) {
      propertyName = "Completed?";
    } else if (pageInfo.properties?.["completed?"]) {
      propertyName = "completed?";
    }

    if (statusProperty.type === "status") {
      updatePayload = {
        [propertyName]: {
          status: {
            name: nextStatusName,
          },
        },
      };
    } else if (statusProperty.type === "select") {
      updatePayload = {
        [propertyName]: {
          select: {
            name: nextStatusName,
          },
        },
      };
    }

    if (Object.keys(updatePayload).length === 0) {
      console.log("Unsupported status property type:", statusProperty.type);
      return { updated: false, reason: "Unsupported status property type" };
    }

    await notion.pages.update({
      page_id: pageId,
      properties: updatePayload,
    });

    console.log(`Successfully updated page status to ${nextStatusName}`);
    return { updated: true, statusName: nextStatusName };
  } catch (error) {
    console.error("Error updating page status:", error);
    throw error;
  }
}

// Function to check if PR is already mentioned and add if not
async function addMentionBlock(pullRequest, pageId) {
  try {
    // Get all blocks from the page
    const page = await notion.blocks.children.list({
      block_id: pageId,
    });

    let mentionBlockId = null;
    let prAlreadyMentioned = false;

    // Look for existing "Related Pull Requests" heading and check for duplicate PRs
    for (const block of page.results) {
      if (
        block.type === "heading_2" &&
        block.heading_2?.rich_text?.[0]?.plain_text === "Related Pull Requests"
      ) {
        mentionBlockId = block.id;
      }

      // Check if this PR is already mentioned in any bulleted list item
      if (block.type === "bulleted_list_item") {
        const blockText = block.bulleted_list_item?.rich_text
          ?.map((text) => text.plain_text)
          .join("");

        // Check if this specific PR number and URL are already mentioned
        if (
          blockText &&
          (blockText.includes(`PR #${pullRequest.number}:`) ||
            blockText.includes(pullRequest.html_url))
        ) {
          prAlreadyMentioned = true;
          console.log(
            `PR #${pullRequest.number} is already mentioned in the page`
          );
          return { alreadyExists: true };
        }
      }
    }

    // If PR is already mentioned, don't add it again
    if (prAlreadyMentioned) {
      return { alreadyExists: true };
    }

    // If no "Related Pull Requests" block exists, create it
    if (!mentionBlockId) {
      const headingResponse = await notion.blocks.children.append({
        block_id: pageId,
        children: [
          {
            type: "heading_2",
            heading_2: {
              rich_text: [
                {
                  type: "text",
                  text: { content: "Related Pull Requests" },
                },
              ],
            },
          },
        ],
      });
      mentionBlockId = headingResponse.results[0].id;
    }

    // Add the pull request information as a bulleted list item
    await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: `PR #${pullRequest.number}: ${pullRequest.title}`,
                  link: { url: pullRequest.html_url },
                },
              },
              {
                type: "text",
                text: { content: ` by ` },
              },
              {
                type: "text",
                text: {
                  content: `${pullRequest.user.login}`,
                  link: { url: pullRequest.user.html_url },
                },
              },
            ],
          },
        },
      ],
    });

    console.log("Successfully added mention to Notion page");
    return { alreadyExists: false, added: true };
  } catch (error) {
    console.error("Error adding mention to Notion:", error);
    throw error;
  }
}

// Express routes
app.post("/webhook", async (req, res) => {
  try {
    const { action, pull_request } = req.body;

    if (!pull_request) {
      return res.status(200).json({
        message: "Event ignored (not a pull request event)",
        action: action || "unknown",
      });
    }

    console.log(
      `Processing PR #${pull_request.number} (${action}): ${pull_request.title}`
    );

    const notionPageId = extractNotionPageId(pull_request.body);

    if (!notionPageId) {
      console.log("No Notion page found in PR description, skipping");
      return res.status(200).json({
        message: "No Notion page found in PR description",
        pr_number: pull_request.number,
        action: action,
        skipped: true,
      });
    }

    console.log(`Found Notion page ID: ${notionPageId}`);

    let result = {};
    let statusResult = {};
    const repoName = pull_request.url.includes("kids-reporter")
      ? "kids-reporter"
      : "twreporter";

    switch (action) {
      case "opened":
        result = await addMentionBlock(pull_request, notionPageId);
        statusResult = await updatePageStatus(
          notionPageId,
          repoName,
          pull_request.state
        );
        break;
      case "edited":
        result = await addMentionBlock(pull_request, notionPageId);
        // Only update status if PR is not closed (merged)
        if (pull_request.state !== "closed") {
          statusResult = await updatePageStatus(
            notionPageId,
            repoName,
            pull_request.state
          );
        } else {
          console.log(
            "PR is closed - skipping status update for edited action"
          );
          statusResult = {
            updated: false,
            reason: "PR is closed, status update skipped",
          };
        }
        break;
      case "closed":
        console.log("PR closed/merged - updating page status to Complete");
        statusResult = await updatePageStatus(
          notionPageId,
          repoName,
          pull_request.state
        );
        result = await addMentionBlock(pull_request, notionPageId);
        break;
      default:
        console.log(`Ignoring PR action: ${action}`);
        return res.status(200).json({
          message: `Event ignored (action: ${action})`,
          pr_number: pull_request.number,
          action: action,
        });
    }

    const response = {
      message: `Successfully processed PR ${action} event`,
      pr_number: pull_request.number,
      action: action,
      notion_page_id: notionPageId,
    };

    if (result.alreadyExists) {
      response.pr_mention = "already_exists";
    } else if (result.added) {
      response.pr_mention = "added";
    }

    if (statusResult.updated) {
      response.status_updated = statusResult.statusName || "complete";
    } else if (statusResult.reason) {
      response.status_update_failed = statusResult.reason;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/health", (_, res) => {
  const responseBody = {
    status: "OK",
    timestamp: new Date().toISOString(),
  };
  res.status(200).json(responseBody);
});

// Start the server
app.listen(port, () => {
  console.log(`GitHub Webhook to Notion server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`Webhook endpoint: http://localhost:${port}/webhook`);
});

// Export for Cloud Run
export default app;
