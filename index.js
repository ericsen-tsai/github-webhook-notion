import express from "express";
import { Client } from "@notionhq/client";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
// NOTION_PAGE_ID will be extracted from the PR description dynamically

// Initialize Notion client
const notion = new Client({ auth: NOTION_API_KEY });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
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

// Function to get all available status options
async function getAvailableStatuses(pageId) {
  try {
    const pageInfo = await notion.pages.retrieve({
      page_id: pageId,
    });

    // Check if page is part of a database
    if (pageInfo.parent?.type === "database_id") {
      // Fetch database schema to get status options
      const databaseInfo = await notion.databases.retrieve({
        database_id: pageInfo.parent.database_id,
      });

      const statusProperty =
        databaseInfo.properties?.Status || databaseInfo.properties?.status;

      if (statusProperty) {
        if (statusProperty.type === "status") {
          return {
            type: "status",
            options: statusProperty.status.options.map((option) => ({
              id: option.id,
              name: option.name,
              color: option.color,
            })),
          };
        } else if (statusProperty.type === "select") {
          return {
            type: "select",
            options: statusProperty.select.options.map((option) => ({
              id: option.id,
              name: option.name,
              color: option.color,
            })),
          };
        }
      }
    } else {
      // For standalone pages, we can't get predefined options
      // Return common status options as fallback
      console.log("Standalone page detected - using common status options");
      return {
        type: "unknown",
        options: [
          { name: "Not started", color: "default" },
          { name: "In progress", color: "blue" },
          { name: "Done", color: "green" },
          { name: "Complete", color: "green" },
        ],
      };
    }

    return { type: "none", options: [] };
  } catch (error) {
    console.error("Error getting available statuses:", error);
    return { type: "error", options: [] };
  }
}

// Function to get the current page status
async function getPageStatus(pageId) {
  try {
    const pageInfo = await notion.pages.retrieve({
      page_id: pageId,
    });

    // Look for a Status property (common in Notion databases)
    const statusProperty =
      pageInfo.properties?.Status || pageInfo.properties?.status;

    if (statusProperty) {
      if (statusProperty.type === "status") {
        return statusProperty.status?.name || null;
      } else if (statusProperty.type === "select") {
        return statusProperty.select?.name || null;
      }
    }

    return null;
  } catch (error) {
    console.error("Error getting page status:", error);
    return null;
  }
}

// Function to update page status to completed
async function updatePageStatusToComplete(pageId) {
  try {
    // Get available status options to find the best completion status
    const availableStatuses = await getAvailableStatuses(pageId);

    let completionStatusName = "Done"; // Default fallback

    // Look for common completion status names
    const completionNames = [
      "Done",
      "Complete",
      "Completed",
      "Finished",
      "Closed",
    ];

    if (availableStatuses.options && availableStatuses.options.length > 0) {
      const foundStatus = availableStatuses.options.find((option) =>
        completionNames.some((name) =>
          option.name.toLowerCase().includes(name.toLowerCase())
        )
      );

      if (foundStatus) {
        completionStatusName = foundStatus.name;
        console.log(`Found completion status: ${completionStatusName}`);
      } else {
        console.log("No standard completion status found, using default: Done");
      }
    }

    const pageInfo = await notion.pages.retrieve({
      page_id: pageId,
    });

    // Find the status property
    const statusProperty =
      pageInfo.properties?.Status || pageInfo.properties?.status;

    if (!statusProperty) {
      console.log("No status property found on the page");
      return { updated: false, reason: "No status property found" };
    }

    let updatePayload = {};
    let propertyName = "Status"; // Default, but we'll find the actual name

    // Find the correct property name (could be "Status" or "status")
    if (pageInfo.properties?.Status) {
      propertyName = "Status";
    } else if (pageInfo.properties?.status) {
      propertyName = "status";
    }

    if (statusProperty.type === "status") {
      updatePayload = {
        [propertyName]: {
          status: {
            name: completionStatusName,
          },
        },
      };
    } else if (statusProperty.type === "select") {
      updatePayload = {
        [propertyName]: {
          select: {
            name: completionStatusName,
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

    console.log(`Successfully updated page status to ${completionStatusName}`);
    return { updated: true, statusName: completionStatusName };
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
                text: { content: ` by ${pullRequest.user.login}` },
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

// GitHub webhook endpoint
app.post("/webhook", async (req, res) => {
  try {
    const { action, pull_request } = req.body;
    // Process different PR actions
    if (pull_request) {
      console.log(
        `Processing PR #${pull_request.number} (${action}): ${pull_request.title}`
      );

      // Extract Notion page ID from PR description
      const notionPageId = extractNotionPageId(pull_request.body);

      if (!notionPageId) {
        console.log("No Notion page found in PR description, skipping");
        res.status(200).json({
          message: "No Notion page found in PR description",
          pr_number: pull_request.number,
          action: action,
          skipped: true,
        });
        return;
      }

      console.log(`Found Notion page ID: ${notionPageId}`);

      // Get current page status and available options
      const currentStatus = await getPageStatus(notionPageId);
      const availableStatuses = await getAvailableStatuses(notionPageId);
      console.log(`Current page status: ${currentStatus || "None"}`);
      console.log(
        `Available statuses: ${availableStatuses.options
          .map((o) => o.name)
          .join(", ")}`
      );

      let result = {};
      let statusResult = {};

      switch (action) {
        case "opened":
          // Only mention PR for opened events
          result = await addMentionBlock(pull_request, notionPageId);
          break;

        case "edited":
          // Mention PR if it's not already in the card
          result = await addMentionBlock(pull_request, notionPageId);
          break;

        case "closed":
          // Transition page to complete status
          console.log("PR closed/merged - updating page status to Complete");
          statusResult = await updatePageStatusToComplete(notionPageId);

          // Also add PR mention if not already present
          result = await addMentionBlock(pull_request, notionPageId);
          break;

        default:
          console.log(`Ignoring PR action: ${action}`);
          res.status(200).json({
            message: `Event ignored (action: ${action})`,
            pr_number: pull_request.number,
            action: action,
          });
          return;
      }

      // Prepare response based on actions taken
      const response = {
        message: `Successfully processed PR ${action} event`,
        pr_number: pull_request.number,
        action: action,
        notion_page_id: notionPageId,
        current_status: currentStatus,
        available_statuses: availableStatuses.options.map((o) => o.name),
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
    } else {
      res.status(200).json({
        message: "Event ignored (not a pull request event)",
        action: action || "unknown",
      });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Status information endpoint
app.get("/status-info/:pageId", async (req, res) => {
  try {
    const { pageId } = req.params;

    if (!pageId) {
      res.status(400).json({ error: "Page ID is required" });
      return;
    }

    const currentStatus = await getPageStatus(pageId);
    const availableStatuses = await getAvailableStatuses(pageId);

    res.status(200).json({
      page_id: pageId,
      current_status: currentStatus,
      available_statuses: availableStatuses,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching status info:", error);
    res.status(500).json({ error: "Failed to fetch status information" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`GitHub webhook server listening on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/webhook`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Status info: http://localhost:${PORT}/status-info/{pageId}`);
  console.log(
    `Note: Notion page ID will be extracted from PR descriptions dynamically`
  );
});

export default app;
