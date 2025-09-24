import axios from "axios";

// Mock GitHub webhook payload for a pull request creation event
// Based on GitHub's official webhook documentation: https://docs.github.com/en/webhooks/webhook-events-and-payloads#pull_request
const mockOpenedWebhookPayload = {
  action: "opened",
  number: 42,
  pull_request: {
    url: "https://api.github.com/repos/example/repo/pulls/42",
    id: 123456789,
    node_id: "PR_kwDOABCD1234567890",
    html_url: "https://github.com/example/repo/pull/42",
    diff_url: "https://github.com/example/repo/pull/42.diff",
    patch_url: "https://github.com/example/repo/pull/42.patch",
    issue_url: "https://api.github.com/repos/example/repo/issues/42",
    number: 42,
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
    body: "This PR implements feature validation against the specification.\n\n[Notion Card](https://www.notion.so/meme-nation/Validate-feature-against-spec-27667dbd2dd481369bb2f99787991781?source=copy_link)\n\nChanges:\n- Added validation logic\n- Updated tests\n- Added documentation",
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
    commits_url: "https://api.github.com/repos/example/repo/pulls/42/commits",
    review_comments_url:
      "https://api.github.com/repos/example/repo/pulls/42/comments",
    review_comment_url:
      "https://api.github.com/repos/example/repo/pulls/comments{/number}",
    comments_url:
      "https://api.github.com/repos/example/repo/issues/42/comments",
    statuses_url:
      "https://api.github.com/repos/example/repo/statuses/abc123def456",
    head: {
      label: "developer123:feature/validation-spec",
      ref: "feature/validation-spec",
      sha: "abc123def456",
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
          html_url: "https://github.com/example",
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
        html_url: "https://github.com/example/repo",
        description: "Example repository for testing webhooks",
        fork: false,
        url: "https://api.github.com/repos/example/repo",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2025-09-23T09:00:00Z",
        pushed_at: "2025-09-23T10:00:00Z",
        git_url: "git://github.com/example/repo.git",
        ssh_url: "git@github.com:example/repo.git",
        clone_url: "https://github.com/example/repo.git",
        homepage: null,
        size: 108,
        stargazers_count: 80,
        watchers_count: 9,
        language: "JavaScript",
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
        default_branch: "main",
      },
    },
    base: {
      label: "example:main",
      ref: "main",
      sha: "def456abc789",
      user: {
        login: "example",
        id: 12345678,
        node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
        avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/example",
        html_url: "https://github.com/example",
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
      repo: {
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
          html_url: "https://github.com/example",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/example/repo",
        description: "Example repository for testing webhooks",
        fork: false,
        url: "https://api.github.com/repos/example/repo",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2025-09-23T09:00:00Z",
        pushed_at: "2025-09-23T10:00:00Z",
        git_url: "git://github.com/example/repo.git",
        ssh_url: "git@github.com:example/repo.git",
        clone_url: "https://github.com/example/repo.git",
        homepage: null,
        size: 108,
        stargazers_count: 80,
        watchers_count: 9,
        language: "JavaScript",
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
        default_branch: "main",
      },
    },
    _links: {
      self: {
        href: "https://api.github.com/repos/example/repo/pulls/42",
      },
      html: {
        href: "https://github.com/example/repo/pull/42",
      },
      issue: {
        href: "https://api.github.com/repos/example/repo/issues/42",
      },
      comments: {
        href: "https://api.github.com/repos/example/repo/issues/42/comments",
      },
      review_comments: {
        href: "https://api.github.com/repos/example/repo/pulls/42/comments",
      },
      review_comment: {
        href: "https://api.github.com/repos/example/repo/pulls/comments{/number}",
      },
      commits: {
        href: "https://api.github.com/repos/example/repo/pulls/42/commits",
      },
      statuses: {
        href: "https://api.github.com/repos/example/repo/statuses/abc123def456",
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
      html_url: "https://github.com/example",
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
    html_url: "https://github.com/example/repo",
    description: "Example repository for testing webhooks",
    fork: false,
    url: "https://api.github.com/repos/example/repo",
    archive_url:
      "https://api.github.com/repos/example/repo/{archive_format}{/ref}",
    assignees_url: "https://api.github.com/repos/example/repo/assignees{/user}",
    blobs_url: "https://api.github.com/repos/example/repo/git/blobs{/sha}",
    branches_url: "https://api.github.com/repos/example/repo/branches{/branch}",
    collaborators_url:
      "https://api.github.com/repos/example/repo/collaborators{/collaborator}",
    comments_url: "https://api.github.com/repos/example/repo/comments{/number}",
    commits_url: "https://api.github.com/repos/example/repo/commits{/sha}",
    compare_url:
      "https://api.github.com/repos/example/repo/compare/{base}...{head}",
    contents_url: "https://api.github.com/repos/example/repo/contents/{+path}",
    contributors_url: "https://api.github.com/repos/example/repo/contributors",
    deployments_url: "https://api.github.com/repos/example/repo/deployments",
    downloads_url: "https://api.github.com/repos/example/repo/downloads",
    events_url: "https://api.github.com/repos/example/repo/events",
    forks_url: "https://api.github.com/repos/example/repo/forks",
    git_commits_url:
      "https://api.github.com/repos/example/repo/git/commits{/sha}",
    git_refs_url: "https://api.github.com/repos/example/repo/git/refs{/sha}",
    git_tags_url: "https://api.github.com/repos/example/repo/git/tags{/sha}",
    git_url: "git://github.com/example/repo.git",
    issue_comment_url:
      "https://api.github.com/repos/example/repo/issues/comments{/number}",
    issue_events_url:
      "https://api.github.com/repos/example/repo/issues/events{/number}",
    issues_url: "https://api.github.com/repos/example/repo/issues{/number}",
    keys_url: "https://api.github.com/repos/example/repo/keys{/key_id}",
    labels_url: "https://api.github.com/repos/example/repo/labels{/name}",
    languages_url: "https://api.github.com/repos/example/repo/languages",
    merges_url: "https://api.github.com/repos/example/repo/merges",
    milestones_url:
      "https://api.github.com/repos/example/repo/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/example/repo/notifications{?since,all,participating}",
    pulls_url: "https://api.github.com/repos/example/repo/pulls{/number}",
    releases_url: "https://api.github.com/repos/example/repo/releases{/id}",
    ssh_url: "git@github.com:example/repo.git",
    stargazers_url: "https://api.github.com/repos/example/repo/stargazers",
    statuses_url: "https://api.github.com/repos/example/repo/statuses/{sha}",
    subscribers_url: "https://api.github.com/repos/example/repo/subscribers",
    subscription_url: "https://api.github.com/repos/example/repo/subscription",
    tags_url: "https://api.github.com/repos/example/repo/tags",
    teams_url: "https://api.github.com/repos/example/repo/teams",
    trees_url: "https://api.github.com/repos/example/repo/git/trees{/sha}",
    clone_url: "https://github.com/example/repo.git",
    mirror_url: null,
    hooks_url: "https://api.github.com/repos/example/repo/hooks",
    svn_url: "https://github.com/example/repo",
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
  number: 42,
  changes: {
    title: {
      from: "Add feature validation",
    },
    body: {
      from: "This PR implements feature validation.\n\nChanges:\n- Added validation logic",
    },
  },
  pull_request: {
    url: "https://api.github.com/repos/example/repo/pulls/42",
    id: 123456789,
    node_id: "PR_kwDOABCD1234567890",
    html_url: "https://github.com/example/repo/pull/42",
    diff_url: "https://github.com/example/repo/pull/42.diff",
    patch_url: "https://github.com/example/repo/pull/42.patch",
    issue_url: "https://api.github.com/repos/example/repo/issues/42",
    number: 42,
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
    body: "This PR implements feature validation against the specification.\n\n[Notion Card](https://www.notion.so/meme-nation/Validate-feature-against-spec-27667dbd2dd481369bb2f99787991781?source=copy_link)\n\nChanges:\n- Added validation logic\n- Updated tests\n- Added documentation\n- Fixed edge cases",
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
    commits_url: "https://api.github.com/repos/example/repo/pulls/42/commits",
    review_comments_url:
      "https://api.github.com/repos/example/repo/pulls/42/comments",
    review_comment_url:
      "https://api.github.com/repos/example/repo/pulls/comments{/number}",
    comments_url:
      "https://api.github.com/repos/example/repo/issues/42/comments",
    statuses_url:
      "https://api.github.com/repos/example/repo/statuses/abc123def456",
    head: {
      label: "developer123:feature/validation-spec",
      ref: "feature/validation-spec",
      sha: "abc123def456",
      user: {
        login: "developer123",
        id: 87654321,
        node_id: "MDQ6VXNlcjg3NjU0MzIx",
        avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/developer123",
        html_url: "https://github.com/developer123",
        type: "User",
        site_admin: false,
      },
      repo: {
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
          html_url: "https://github.com/example",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/example/repo",
        description: "Example repository for testing webhooks",
        fork: false,
        url: "https://api.github.com/repos/example/repo",
        default_branch: "main",
      },
    },
    base: {
      label: "example:main",
      ref: "main",
      sha: "def456abc789",
      user: {
        login: "example",
        id: 12345678,
        node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
        avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
        url: "https://api.github.com/users/example",
        html_url: "https://github.com/example",
        type: "Organization",
        site_admin: false,
      },
      repo: {
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
          html_url: "https://github.com/example",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/example/repo",
        description: "Example repository for testing webhooks",
        fork: false,
        url: "https://api.github.com/repos/example/repo",
        default_branch: "main",
      },
    },
    _links: {
      self: {
        href: "https://api.github.com/repos/example/repo/pulls/42",
      },
      html: {
        href: "https://github.com/example/repo/pull/42",
      },
      issue: {
        href: "https://api.github.com/repos/example/repo/issues/42",
      },
      comments: {
        href: "https://api.github.com/repos/example/repo/issues/42/comments",
      },
      review_comments: {
        href: "https://api.github.com/repos/example/repo/pulls/42/comments",
      },
      review_comment: {
        href: "https://api.github.com/repos/example/repo/pulls/comments{/number}",
      },
      commits: {
        href: "https://api.github.com/repos/example/repo/pulls/42/commits",
      },
      statuses: {
        href: "https://api.github.com/repos/example/repo/statuses/abc123def456",
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
      html_url: "https://github.com/example",
      type: "Organization",
      site_admin: false,
    },
    html_url: "https://github.com/example/repo",
    description: "Example repository for testing webhooks",
    fork: false,
    url: "https://api.github.com/repos/example/repo",
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
  number: 42,
  pull_request: {
    url: "https://api.github.com/repos/example/repo/pulls/42",
    id: 123456789,
    node_id: "PR_kwDOABCD1234567890",
    html_url: "https://github.com/example/repo/pull/42",
    diff_url: "https://github.com/example/repo/pull/42.diff",
    patch_url: "https://github.com/example/repo/pull/42.patch",
    issue_url: "https://api.github.com/repos/example/repo/issues/42",
    number: 42,
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
    body: "This PR implements feature validation against the specification.\n\n[Notion Card](https://www.notion.so/meme-nation/Validate-feature-against-spec-27667dbd2dd481369bb2f99787991781?source=copy_link)\n\nChanges:\n- Added validation logic\n- Updated tests\n- Added documentation",
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
    commits_url: "https://api.github.com/repos/example/repo/pulls/42/commits",
    review_comments_url:
      "https://api.github.com/repos/example/repo/pulls/42/comments",
    review_comment_url:
      "https://api.github.com/repos/example/repo/pulls/comments{/number}",
    comments_url:
      "https://api.github.com/repos/example/repo/issues/42/comments",
    statuses_url:
      "https://api.github.com/repos/example/repo/statuses/abc123def456",
    head: {
      label: "developer123:feature/validation-spec",
      ref: "feature/validation-spec",
      sha: "abc123def456",
      user: {
        login: "developer123",
        id: 87654321,
        node_id: "MDQ6VXNlcjg3NjU0MzIx",
        avatar_url: "https://avatars.githubusercontent.com/u/87654321?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/developer123",
        html_url: "https://github.com/developer123",
        type: "User",
        site_admin: false,
      },
      repo: {
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
          html_url: "https://github.com/example",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/example/repo",
        description: "Example repository for testing webhooks",
        fork: false,
        url: "https://api.github.com/repos/example/repo",
        default_branch: "main",
      },
    },
    base: {
      label: "example:main",
      ref: "main",
      sha: "def456abc789",
      user: {
        login: "example",
        id: 12345678,
        node_id: "MDEwOk9yZ2FuaXphdGlvbjEyMzQ1Njc4",
        avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
        url: "https://api.github.com/users/example",
        html_url: "https://github.com/example",
        type: "Organization",
        site_admin: false,
      },
      repo: {
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
          html_url: "https://github.com/example",
          type: "Organization",
          site_admin: false,
        },
        html_url: "https://github.com/example/repo",
        description: "Example repository for testing webhooks",
        fork: false,
        url: "https://api.github.com/repos/example/repo",
        default_branch: "main",
      },
    },
    _links: {
      self: {
        href: "https://api.github.com/repos/example/repo/pulls/42",
      },
      html: {
        href: "https://github.com/example/repo/pull/42",
      },
      issue: {
        href: "https://api.github.com/repos/example/repo/issues/42",
      },
      comments: {
        href: "https://api.github.com/repos/example/repo/issues/42/comments",
      },
      review_comments: {
        href: "https://api.github.com/repos/example/repo/pulls/42/comments",
      },
      review_comment: {
        href: "https://api.github.com/repos/example/repo/pulls/comments{/number}",
      },
      commits: {
        href: "https://api.github.com/repos/example/repo/pulls/42/commits",
      },
      statuses: {
        href: "https://api.github.com/repos/example/repo/statuses/abc123def456",
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
      html_url: "https://github.com/example",
      type: "Organization",
      site_admin: false,
    },
    html_url: "https://github.com/example/repo",
    description: "Example repository for testing webhooks",
    fork: false,
    url: "https://api.github.com/repos/example/repo",
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
    const webhookUrl = "http://localhost:3000/webhook";

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
