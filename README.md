# GitHub Webhook to Notion Integration

This project creates a webhook server that listens for GitHub pull request events and automatically adds mentions to a specific Notion page when the PR description contains a link to that page.

## Features

- **Dynamic Notion Page Detection**: Automatically extracts Notion page ID from PR descriptions
- Listens for GitHub pull request events (`opened`, `edited`, `closed`)
- Smart state management based on PR lifecycle:
  - **Opened**: Adds PR mention to "Related Pull Requests" section
  - **Edited**: Adds PR mention if not already present
  - **Closed/Merged**: Transitions Notion page status to "Complete" + adds PR mention
- **Flexible Notion URL Support**: Works with various Notion URL formats:
  - Standard URLs: `https://www.notion.so/workspace/page-title-pageId`
  - Direct URLs: `https://www.notion.so/pageId`
  - Markdown links: `[Notion Card](https://www.notion.so/...)`
  - URLs with query parameters
- Automatically creates a "Related Pull Requests" section on the Notion page
- Lists pull requests with clickable links and author information
- Prevents duplicate PR mentions
- Supports both Notion Status and Select property types

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Make sure your Notion API key and page ID are correctly set in `index.js`:

   ```javascript
   const NOTION_API_KEY = "your-notion-api-key";
   const NOTION_PAGE_ID = "27667dbd2dd481369bb2f99787991781";
   ```

3. Start the webhook server:

   ```bash
   pnpm start
   ```

The server will run on `http://localhost:3000` by default.

## Endpoints

- `POST /webhook` - GitHub webhook endpoint
- `GET /health` - Health check endpoint
- `GET /status-info/{pageId}` - Get current page status and available status options for a specific page

## Testing

To test the webhook with a mock GitHub pull request event:

1. Start the server in one terminal:

   ```bash
   pnpm start
   ```

2. In another terminal, test different PR events:

   ```bash
   # Test PR creation (adds mention)
   pnpm run test-webhook-opened
   
   # Test PR edit (adds mention if not present)
   pnpm run test-webhook-edited
   
   # Test PR closure (updates status to Complete + adds mention)
   pnpm run test-webhook-closed
   ```

Each test simulates different stages of the PR lifecycle and demonstrates the state management functionality.

## GitHub Webhook Configuration

To use this with a real GitHub repository:

1. Go to your GitHub repository settings
2. Navigate to Webhooks
3. Add a new webhook with:
   - Payload URL: `https://your-domain.com/webhook`
   - Content type: `application/json`
   - Events: Select "Pull requests"

## How it Works

1. When a pull request event occurs, GitHub sends a webhook to `/webhook`
2. The server extracts the Notion page ID from the PR description using regex patterns
3. If no Notion page is found, the webhook is skipped
4. The server fetches the current Notion page status and available options
5. Based on the PR action:
   - **`opened`**: Adds PR mention to the page
   - **`edited`**: Adds PR mention if not already present  
   - **`closed`**: Updates page status to completion and adds PR mention
6. The PR is added as a bulleted list item with title, number, author, and clickable link
7. Duplicate mentions are automatically prevented

## PR Description Format

To link a PR to a Notion page, include the Notion page URL in your PR description:

```markdown
This PR implements the new feature.

Related to: https://www.notion.so/workspace/feature-spec-27667dbd2dd481369bb2f99787991781

Or as a markdown link:
[Feature Spec](https://www.notion.so/workspace/feature-spec-27667dbd2dd481369bb2f99787991781)
```

## Notion Page Requirements

For full functionality, your Notion page should have:

- A **Status** property (Status or Select type) for state transitions
- The page can be a standalone page or part of a database

Supported status property values:

- **Status property type**: Automatically detects and uses appropriate completion status
- **Select property type**: Automatically detects and uses appropriate completion status  
- **Smart completion detection**: Looks for statuses containing "Done", "Complete", "Completed", "Finished", or "Closed"
- **Fallback**: Uses "Done" if no completion status is found

### Available Status Options

You can view all available status options by visiting: `http://localhost:3000/status-info/{pageId}`

Replace `{pageId}` with your actual Notion page ID.

This endpoint returns:

```json
{
  "page_id": "27667dbd-2dd4-8136-9bb2-f99787991781",
  "current_status": "In Progress",
  "available_statuses": {
    "type": "status",
    "options": [
      {"id": "abc123", "name": "Not started", "color": "default"},
      {"id": "def456", "name": "In progress", "color": "blue"},
      {"id": "ghi789", "name": "Done", "color": "green"}
    ]
  },
  "timestamp": "2025-09-23T12:00:00.000Z"
}
```

## Environment Variables

You can override the default port using:

```bash
PORT=8080 pnpm start
```
