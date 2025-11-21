import axios from "axios";

// Mock GitHub webhook payload for a pull request creation event
// Based on GitHub's official webhook documentation: https://docs.github.com/en/webhooks/webhook-events-and-payloads#pull_request
const mockOpenedWebhookPayload = {
  action: "opened",
  number: 768,
  pull_request: {
    url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768",
    id: 123456789,
    node_id: "PR_kwDOABCD1234567890",
    html_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768",
    diff_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768.diff",
    patch_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768.patch",
    issue_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768",
    number: 768,
    state: "open",
    locked: false,
    title:
      "feat(frontend): revamp header component with modern design and improved UX",
    user: {
      login: "ericsen-tsai",
      id: 87654321,
      node_id: "MDQ6VXNlcjg3NjU0MzIx",
      avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/ericsen-tsai",
      html_url: "https://github.com/ericsen-tsai",
      followers_url: "https://api.github.com/users/ericsen-tsai/followers",
      following_url:
        "https://api.github.com/users/ericsen-tsai/following{/other_user}",
      gists_url: "https://api.github.com/users/ericsen-tsai/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/ericsen-tsai/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/ericsen-tsai/subscriptions",
      organizations_url: "https://api.github.com/users/ericsen-tsai/orgs",
      repos_url: "https://api.github.com/users/ericsen-tsai/repos",
      events_url: "https://api.github.com/users/ericsen-tsai/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/ericsen-tsai/received_events",
      type: "User",
      site_admin: false,
    },
    body: "## Summary\n\nThis PR completely revamps the header component with a modern, responsive design that improves user experience across desktop and mobile devices. The changes include a new modular header architecture, enhanced navigation with dropdown menus, improved search functionality, and better visual design.\n\n## Changes\n\n* **Header Architecture**: Replaced monolithic `StickyHeader` with modular components (`DesktopHeader`, `DesktopHeaderCompact`, `MobileHeader`)\n* **Search Improvements**: Created new `Input` component\n* **Visual Design**: Updated header styling\n* **Configuration Updates**:  \n   * Migrated `next.config.js` to `next.config.mjs` with ES modules  \n   * Added search environment variables in `.env.local`  \n   * Updated constants with new menu structure and social media items\n* **Code Organization**:  \n   * Removed old CSS modules and replaced with Tailwind classes  \n   * Created shared components for reusable header elements\n\n## Additional Notes\n\n* The header now supports a compact mode that appears when scrolling down\n* Login functionality has been re-enabled (`IS_LOGIN_ENABLED = true`)\n* Footer component has been updated to use new constants structure\n* All existing functionality has been preserved while improving the overall design and user experience [Notion Card](https://www.notion.so/twreporter/UI-2b08dbdca93280feade4efcac5089826?source=copy_link) [Notion Page2](https://www.notion.so/twreporter/Github-Webhook-Notion-Automation-2788dbdca9328083bbd1d25fce7ae79e?v=1588dbdca932802ebea2000ced9ffb67&source=copy_link)",
    created_at: "2025-09-23T10:00:00Z",
    updated_at: "2025-09-23T10:00:00Z",
    closed_at: null,
    merged_at: null,
    merge_commit_sha: "e5bd3914e2e596debea16f433f57875b5b90bcd6",
    assignee: null,
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    labels: [],
    milestone: null,
    draft: false,
    commits_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/commits",
    review_comments_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/comments",
    review_comment_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/comments{/number}",
    comments_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768/comments",
    statuses_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/statuses/abc123def456",
    head: {
      label: "ericsen-tsai:feature/header-revamp",
      ref: "feature/header-revamp",
      sha: "abc123def456",
      user: {
        login: "ericsen-tsai",
        id: 87654321,
        node_id: "MDQ6VXNlcjg3NjU0MzIx",
        avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/ericsen-tsai",
        html_url: "https://github.com/ericsen-tsai",
        followers_url: "https://api.github.com/users/developer123/followers",
        following_url:
          "https://api.github.com/users/developer123/following{/other_user}",
        gists_url: "https://api.github.com/users/developer123/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/developer123/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/developer123/subscriptions",
        organizations_url: "https://api.github.com/users/developer123/orgs",
        repos_url: "https://api.github.com/users/developer123/repos",
        events_url:
          "https://api.github.com/users/developer123/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/developer123/received_events",
        type: "User",
        site_admin: false,
      },
      repo: {
        id: 987654321,
        node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
        name: "kids-reporter-monorepo",
        full_name: "kids-reporter/kids-reporter-monorepo",
        private: false,
        owner: {
          login: "kids-reporter",
          id: 12345678,
          node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
          avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/kids-reporter",
          html_url: "https://github.com/kids-reporter",
          followers_url: "https://api.github.com/users/example/followers",
          following_url:
            "https://api.github.com/users/example/following{/other_user}",
          gists_url: "https://api.github.com/users/example/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/example/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/example/subscriptions",
          organizations_url: "https://api.github.com/users/example/orgs",
          repos_url: "https://api.github.com/users/example/repos",
          events_url: "https://api.github.com/users/example/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/example/received_events",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
        description:
          "Kids Reporter monorepo containing frontend and backend applications",
        fork: false,
        url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2025-09-23T09:00:00Z",
        pushed_at: "2025-09-23T10:00:00Z",
        git_url: "git://github.com/kids-reporter/kids-reporter-monorepo.git",
        ssh_url: "git@github.com:kids-reporter/kids-reporter-monorepo.git",
        clone_url:
          "https://github.com/kids-reporter/kids-reporter-monorepo.git",
        homepage: null,
        size: 108,
        stargazers_count: 80,
        watchers_count: 9,
        language: "TypeScript",
        has_issues: true,
        has_projects: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 9,
        archived: false,
        disabled: false,
        open_issues_count: 1,
        license: {
          key: "mit",
          name: "MIT License",
          spdx_id: "MIT",
          url: "https://api.github.com/licenses/mit",
          node_id: "MDc6TGljZW5zZW1pdA==",
        },
        allow_forking: true,
        is_template: false,
        topics: [],
        visibility: "public",
        forks: 9,
        open_issues: 1,
        watchers: 80,
        default_branch: "ndx",
      },
    },
    base: {
      label: "kids-reporter:ndx",
      ref: "ndx",
      sha: "def456abc789",
      user: {
        login: "example",
        id: 12345678,
        node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
        avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/kids-reporter",
        html_url: "https://github.com/kids-reporter",
        followers_url: "https://api.github.com/users/kids-reporter/followers",
        following_url:
          "https://api.github.com/users/kids-reporter/following{/other_user}",
        gists_url: "https://api.github.com/users/kids-reporter/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/kids-reporter/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/kids-reporter/subscriptions",
        organizations_url: "https://api.github.com/users/kids-reporter/orgs",
        repos_url: "https://api.github.com/users/kids-reporter/repos",
        events_url:
          "https://api.github.com/users/kids-reporter/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/kids-reporter/received_events",
        type: "Organization",
        site_admin: false,
      },
      repo: {
        id: 987654321,
        node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
        name: "kids-reporter-monorepo",
        full_name: "kids-reporter/kids-reporter-monorepo",
        private: false,
        owner: {
          login: "kids-reporter",
          id: 12345678,
          node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
          avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/kids-reporter",
          html_url: "https://github.com/kids-reporter",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
        description:
          "Kids Reporter monorepo containing frontend and backend applications",
        fork: false,
        url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2025-09-23T09:00:00Z",
        pushed_at: "2025-09-23T10:00:00Z",
        git_url: "git://github.com/kids-reporter/kids-reporter-monorepo.git",
        ssh_url: "git@github.com:kids-reporter/kids-reporter-monorepo.git",
        clone_url:
          "https://github.com/kids-reporter/kids-reporter-monorepo.git",
        homepage: null,
        size: 108,
        stargazers_count: 80,
        watchers_count: 9,
        language: "TypeScript",
        has_issues: true,
        has_projects: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 9,
        archived: false,
        disabled: false,
        open_issues_count: 1,
        allow_forking: true,
        is_template: false,
        topics: [],
        visibility: "public",
        forks: 9,
        open_issues: 1,
        watchers: 80,
        default_branch: "ndx",
      },
    },
    _links: {
      self: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768",
      },
      html: {
        href: "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768",
      },
      issue: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768",
      },
      comments: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768/comments",
      },
      review_comments: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/comments",
      },
      review_comment: {
        href: "https://api.github.com/repos/example/repo/pulls/comments{/number}",
      },
      commits: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/commits",
      },
      statuses: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/statuses/abc123def456",
      },
    },
    author_association: "CONTRIBUTOR",
    auto_merge: null,
    active_lock_reason: null,
  },
  repository: {
    id: 987654321,
    node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
    name: "repo",
    full_name: "example/repo",
    private: false,
    owner: {
      login: "example",
      id: 12345678,
      node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
      avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/example",
      html_url: "https://github.com/kids-reporter",
      followers_url: "https://api.github.com/users/example/followers",
      following_url:
        "https://api.github.com/users/example/following{/other_user}",
      gists_url: "https://api.github.com/users/example/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/example/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/example/subscriptions",
      organizations_url: "https://api.github.com/users/example/orgs",
      repos_url: "https://api.github.com/users/example/repos",
      events_url: "https://api.github.com/users/example/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/example/received_events",
      type: "Organization",
      site_admin: false,
    },
    html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
    description: "Example repository for testing webhooks",
    fork: false,
    url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
    archive_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/{archive_format}{/ref}",
    assignees_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/assignees{/user}",
    blobs_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/git/blobs{/sha}",
    branches_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/branches{/branch}",
    collaborators_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/collaborators{/collaborator}",
    comments_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/comments{/number}",
    commits_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/commits{/sha}",
    compare_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/compare/{base}...{head}",
    contents_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/contents/{+path}",
    contributors_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/contributors",
    deployments_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/deployments",
    downloads_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/downloads",
    events_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/events",
    forks_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/forks",
    git_commits_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/git/commits{/sha}",
    git_refs_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/git/refs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/git/tags{/sha}",
    git_url: "git://github.com/kids-reporter/kids-reporter-monorepo.git",
    issue_comment_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/comments{/number}",
    issue_events_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/events{/number}",
    issues_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues{/number}",
    keys_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/keys{/key_id}",
    labels_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/labels{/name}",
    languages_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/languages",
    merges_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/merges",
    milestones_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/notifications{?since,all,participating}",
    pulls_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls{/number}",
    releases_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/releases{/id}",
    ssh_url: "git@github.com:kids-reporter/kids-reporter-monorepo.git",
    stargazers_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/stargazers",
    statuses_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/statuses/{sha}",
    subscribers_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/subscribers",
    subscription_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/subscription",
    tags_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/tags",
    teams_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/teams",
    trees_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/git/trees{/sha}",
    clone_url: "https://github.com/kids-reporter/kids-reporter-monorepo.git",
    mirror_url: null,
    hooks_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/hooks",
    svn_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
    homepage: null,
    language: "JavaScript",
    forks_count: 9,
    stargazers_count: 80,
    watchers_count: 80,
    size: 108,
    default_branch: "main",
    open_issues_count: 1,
    is_template: false,
    topics: [],
    has_issues: true,
    has_projects: true,
    has_wiki: true,
    has_pages: false,
    has_downloads: true,
    archived: false,
    disabled: false,
    visibility: "public",
    pushed_at: "2025-09-23T10:00:00Z",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2025-09-23T09:00:00Z",
    permissions: {
      admin: false,
      push: false,
      pull: true,
    },
    allow_rebase_merge: true,
    template_repository: null,
    temp_clone_token: "",
    allow_squash_merge: true,
    allow_auto_merge: false,
    delete_branch_on_merge: false,
    allow_merge_commit: true,
    allow_forking: true,
    web_commit_signoff_required: false,
    subscribers_count: 42,
    network_count: 0,
    license: {
      key: "mit",
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://api.github.com/licenses/mit",
      node_id: "MDc6TGljZW5zZW1pdA==",
    },
    forks: 9,
    open_issues: 1,
    watchers: 80,
  },
  sender: {
    login: "developer123",
    id: 87654321,
    node_id: "MDQ6VXNlcjg3NjU0MzIx",
    avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/developer123",
    html_url: "https://github.com/developer123",
    followers_url: "https://api.github.com/users/developer123/followers",
    following_url:
      "https://api.github.com/users/developer123/following{/other_user}",
    gists_url: "https://api.github.com/users/developer123/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/developer123/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/developer123/subscriptions",
    organizations_url: "https://api.github.com/users/developer123/orgs",
    repos_url: "https://api.github.com/users/developer123/repos",
    events_url: "https://api.github.com/users/developer123/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/developer123/received_events",
    type: "User",
    site_admin: false,
  },
};

// Mock GitHub webhook payload for a pull request edited event
const mockEditedWebhookPayload = {
  action: "edited",
  number: 768,
  changes: {
    title: {
      from: "Add feature validation",
    },
    body: {
      from: "This PR implements feature validation.\n\nChanges:\n- Added validation logic",
    },
  },
  pull_request: {
    url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768",
    id: 123456789,
    node_id: "PR_kwDOABCD1234567890",
    html_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768",
    diff_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768.diff",
    patch_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768.patch",
    issue_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768",
    number: 768,
    state: "open",
    locked: false,
    title: "Add feature validation against spec",
    user: {
      login: "developer123",
      id: 87654321,
      node_id: "MDQ6VXNlcjg3NjU0MzIx",
      avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/developer123",
      html_url: "https://github.com/developer123",
      followers_url: "https://api.github.com/users/developer123/followers",
      following_url:
        "https://api.github.com/users/developer123/following{/other_user}",
      gists_url: "https://api.github.com/users/developer123/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/developer123/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/developer123/subscriptions",
      organizations_url: "https://api.github.com/users/developer123/orgs",
      repos_url: "https://api.github.com/users/developer123/repos",
      events_url: "https://api.github.com/users/developer123/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/developer123/received_events",
      type: "User",
      site_admin: false,
    },
    body: "This PR implements feature validation against the specification.\n\n[Notion Card](https://www.notion.so/twreporter/header-menu-26b8dbdca9328020873cccd1fad13943?source=copy_link)\n\nChanges:\n- Added validation logic\n- Updated tests\n- Added documentation\n- Fixed edge cases",
    created_at: "2025-09-23T10:00:00Z",
    updated_at: "2025-09-23T11:30:00Z",
    closed_at: null,
    merged_at: null,
    merge_commit_sha: "e5bd3914e2e596debea16f433f57875b5b90bcd6",
    assignee: null,
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    labels: [],
    milestone: null,
    draft: false,
    commits_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/commits",
    review_comments_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/comments",
    review_comment_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/comments{/number}",
    comments_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768/comments",
    statuses_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/statuses/abc123def456",
    head: {
      label: "ericsen-tsai:feature/header-revamp",
      ref: "feature/header-revamp",
      sha: "abc123def456",
      user: {
        login: "ericsen-tsai",
        id: 87654321,
        node_id: "MDQ6VXNlcjg3NjU0MzIx",
        avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/ericsen-tsai",
        html_url: "https://github.com/ericsen-tsai",
        type: "User",
        site_admin: false,
      },
      repo: {
        id: 987654321,
        node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
        name: "kids-reporter-monorepo",
        full_name: "kids-reporter/kids-reporter-monorepo",
        private: false,
        owner: {
          login: "kids-reporter",
          id: 12345678,
          node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
          avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
          url: "https://api.github.com/users/kids-reporter",
          html_url: "https://github.com/kids-reporter",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
        description:
          "Kids Reporter monorepo containing frontend and backend applications",
        fork: false,
        url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
        default_branch: "ndx",
      },
    },
    base: {
      label: "kids-reporter:ndx",
      ref: "ndx",
      sha: "def456abc789",
      user: {
        login: "example",
        id: 12345678,
        node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
        avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
        url: "https://api.github.com/users/kids-reporter",
        html_url: "https://github.com/kids-reporter",
        type: "Organization",
        site_admin: false,
      },
      repo: {
        id: 987654321,
        node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
        name: "kids-reporter-monorepo",
        full_name: "kids-reporter/kids-reporter-monorepo",
        private: false,
        owner: {
          login: "kids-reporter",
          id: 12345678,
          node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
          avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
          url: "https://api.github.com/users/kids-reporter",
          html_url: "https://github.com/kids-reporter",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
        description:
          "Kids Reporter monorepo containing frontend and backend applications",
        fork: false,
        url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
        default_branch: "ndx",
      },
    },
    _links: {
      self: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768",
      },
      html: {
        href: "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768",
      },
      issue: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768",
      },
      comments: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768/comments",
      },
      review_comments: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/comments",
      },
      review_comment: {
        href: "https://api.github.com/repos/example/repo/pulls/comments{/number}",
      },
      commits: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/commits",
      },
      statuses: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/statuses/abc123def456",
      },
    },
    author_association: "CONTRIBUTOR",
    auto_merge: null,
    active_lock_reason: null,
  },
  repository: {
    id: 987654321,
    node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
    name: "repo",
    full_name: "example/repo",
    private: false,
    owner: {
      login: "example",
      id: 12345678,
      node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
      avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
      url: "https://api.github.com/users/example",
      html_url: "https://github.com/kids-reporter",
      type: "Organization",
      site_admin: false,
    },
    html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
    description: "Example repository for testing webhooks",
    fork: false,
    url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
    default_branch: "main",
    visibility: "public",
  },
  sender: {
    login: "developer123",
    id: 87654321,
    node_id: "MDQ6VXNlcjg3NjU0MzIx",
    avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
    url: "https://api.github.com/users/developer123",
    html_url: "https://github.com/developer123",
    type: "User",
    site_admin: false,
  },
};

// Mock GitHub webhook payload for a pull request closed event
const mockClosedWebhookPayload = {
  action: "closed",
  number: 768,
  pull_request: {
    url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768",
    id: 123456789,
    node_id: "PR_kwDOABCD1234567890",
    html_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768",
    diff_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768.diff",
    patch_url:
      "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768.patch",
    issue_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768",
    number: 768,
    state: "closed",
    locked: false,
    title: "Add feature validation against spec",
    user: {
      login: "developer123",
      id: 87654321,
      node_id: "MDQ6VXNlcjg3NjU0MzIx",
      avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/developer123",
      html_url: "https://github.com/developer123",
      followers_url: "https://api.github.com/users/developer123/followers",
      following_url:
        "https://api.github.com/users/developer123/following{/other_user}",
      gists_url: "https://api.github.com/users/developer123/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/developer123/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/developer123/subscriptions",
      organizations_url: "https://api.github.com/users/developer123/orgs",
      repos_url: "https://api.github.com/users/developer123/repos",
      events_url: "https://api.github.com/users/developer123/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/developer123/received_events",
      type: "User",
      site_admin: false,
    },
    body: "This PR implements feature validation against the specification.\n\n[Notion Card](https://www.notion.so/twreporter/header-menu-26b8dbdca9328020873cccd1fad13943?source=copy_link)\n\nChanges:\n- Added validation logic\n- Updated tests\n- Added documentation",
    created_at: "2025-09-23T10:00:00Z",
    updated_at: "2025-09-23T12:00:00Z",
    closed_at: "2025-09-23T12:00:00Z",
    merged_at: "2025-09-23T12:00:00Z",
    merge_commit_sha: "f6cd4918f2f696bebfa26f433f57875b5b90bcd9",
    assignee: null,
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    labels: [
      {
        id: 208045946,
        node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
        url: "https://api.github.com/repos/example/repo/labels/enhancement",
        name: "enhancement",
        description: "New feature or request",
        color: "a2eeef",
        default: true,
      },
    ],
    milestone: null,
    draft: false,
    commits_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/commits",
    review_comments_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/comments",
    review_comment_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/comments{/number}",
    comments_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768/comments",
    statuses_url:
      "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/statuses/abc123def456",
    head: {
      label: "ericsen-tsai:feature/header-revamp",
      ref: "feature/header-revamp",
      sha: "abc123def456",
      user: {
        login: "ericsen-tsai",
        id: 87654321,
        node_id: "MDQ6VXNlcjg3NjU0MzIx",
        avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/ericsen-tsai",
        html_url: "https://github.com/ericsen-tsai",
        type: "User",
        site_admin: false,
      },
      repo: {
        id: 987654321,
        node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
        name: "kids-reporter-monorepo",
        full_name: "kids-reporter/kids-reporter-monorepo",
        private: false,
        owner: {
          login: "kids-reporter",
          id: 12345678,
          node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
          avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
          url: "https://api.github.com/users/kids-reporter",
          html_url: "https://github.com/kids-reporter",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
        description:
          "Kids Reporter monorepo containing frontend and backend applications",
        fork: false,
        url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
        default_branch: "ndx",
      },
    },
    base: {
      label: "kids-reporter:ndx",
      ref: "ndx",
      sha: "def456abc789",
      user: {
        login: "example",
        id: 12345678,
        node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
        avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
        url: "https://api.github.com/users/kids-reporter",
        html_url: "https://github.com/kids-reporter",
        type: "Organization",
        site_admin: false,
      },
      repo: {
        id: 987654321,
        node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
        name: "kids-reporter-monorepo",
        full_name: "kids-reporter/kids-reporter-monorepo",
        private: false,
        owner: {
          login: "kids-reporter",
          id: 12345678,
          node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
          avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
          url: "https://api.github.com/users/kids-reporter",
          html_url: "https://github.com/kids-reporter",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
        description:
          "Kids Reporter monorepo containing frontend and backend applications",
        fork: false,
        url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
        default_branch: "ndx",
      },
    },
    _links: {
      self: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768",
      },
      html: {
        href: "https://github.com/kids-reporter/kids-reporter-monorepo/pull/768",
      },
      issue: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768",
      },
      comments: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/issues/768/comments",
      },
      review_comments: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/comments",
      },
      review_comment: {
        href: "https://api.github.com/repos/example/repo/pulls/comments{/number}",
      },
      commits: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/pulls/768/commits",
      },
      statuses: {
        href: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo/statuses/abc123def456",
      },
    },
    author_association: "CONTRIBUTOR",
    auto_merge: null,
    active_lock_reason: null,
    merged: true,
    mergeable: null,
    rebaseable: null,
    mergeable_state: "clean",
    merged_by: {
      login: "maintainer456",
      id: 12345679,
      node_id: "MDQ6VXNlcjEyMzQ1Njc5",
      avatar_url: "https://avatars.githubusercontent.com/u/12345679?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/maintainer456",
      html_url: "https://github.com/maintainer456",
      type: "User",
      site_admin: false,
    },
    comments: 3,
    review_comments: 2,
    maintainer_can_modify: false,
    commits: 4,
    additions: 156,
    deletions: 23,
    changed_files: 8,
  },
  repository: {
    id: 987654321,
    node_id: "MDEwOlJlcG9zaXRvcnk5ODc2NTQzMjE=",
    name: "repo",
    full_name: "example/repo",
    private: false,
    owner: {
      login: "example",
      id: 12345678,
      node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
      avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
      url: "https://api.github.com/users/example",
      html_url: "https://github.com/kids-reporter",
      type: "Organization",
      site_admin: false,
    },
    html_url: "https://github.com/kids-reporter/kids-reporter-monorepo",
    description: "Example repository for testing webhooks",
    fork: false,
    url: "https://api.github.com/repos/kids-reporter/kids-reporter-monorepo",
    default_branch: "main",
    visibility: "public",
  },
  sender: {
    login: "maintainer456",
    id: 12345679,
    node_id: "MDQ6VXNlcjEyMzQ1Njc5",
    avatar_url: "https://avatars.githubusercontent.com/u/12345679?v=4",
    url: "https://api.github.com/users/maintainer456",
    html_url: "https://github.com/maintainer456",
    type: "User",
    site_admin: false,
  },
};

// Function to send the mock webhook
async function sendMockWebhook(payloadType = "opened") {
  try {
    const webhookUrl = `http://localhost:${process.env.PORT || 8080}/webhook`;

    let payload;
    let deliveryId;

    switch (payloadType) {
      case "opened":
        payload = mockOpenedWebhookPayload;
        deliveryId = "mock-delivery-opened-12345";
        break;
      case "edited":
        payload = mockEditedWebhookPayload;
        deliveryId = "mock-delivery-edited-12346";
        break;
      case "closed":
        payload = mockClosedWebhookPayload;
        deliveryId = "mock-delivery-closed-12347";
        break;
      default:
        throw new Error(
          `Unknown payload type: ${payloadType}. Use 'opened', 'edited', or 'closed'.`
        );
    }

    console.log(`\n🚀 Sending mock GitHub webhook (${payloadType})...`);
    console.log("Payload action:", payload.action);
    console.log("PR number:", payload.pull_request.number);
    console.log("PR title:", payload.pull_request.title);
    console.log("PR state:", payload.pull_request.state);

    if (payloadType === "edited") {
      console.log("Changes:", JSON.stringify(payload.changes, null, 2));
    }

    if (payloadType === "closed") {
      console.log("Merged:", payload.pull_request.merged);
      console.log("Merged by:", payload.pull_request.merged_by?.login || "N/A");
    }

    const response = await axios.post(webhookUrl, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Event": "pull_request",
        "X-GitHub-Delivery": deliveryId,
      },
    });

    console.log("\n✅ Webhook sent successfully!");
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  } catch (error) {
    console.error("❌ Error sending webhook:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
}

// Helper functions for specific webhook types
async function sendOpenedWebhook() {
  return sendMockWebhook("opened");
}

async function sendEditedWebhook() {
  return sendMockWebhook("edited");
}

async function sendClosedWebhook() {
  return sendMockWebhook("closed");
}

// Run the mock webhook if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Check command line arguments
  const args = process.argv.slice(2);
  const payloadType = args[0] || "opened";

  console.log("Available payload types: opened, edited, closed");
  console.log(`Using payload type: ${payloadType}`);

  sendMockWebhook(payloadType);
}

export default {
  sendMockWebhook,
  sendOpenedWebhook,
  sendEditedWebhook,
  sendClosedWebhook,
  mockWebhookPayload: mockOpenedWebhookPayload,
  mockEditedWebhookPayload,
  mockClosedWebhookPayload,
};
