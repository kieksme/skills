Vendored from the Anthropic `skills` repository, then adapted for kieksme.

- Source: https://github.com/anthropics/skills/tree/main/skills/mcp-builder
- Commit (path `skills/mcp-builder/`): b9e19e6f44773509fbdd7001d77ff41a49a486c1
- Retrieved: 2026-09-01

License: Apache License 2.0 (see `LICENSE-Apache-2.0-Anthropic.md`).

## kieksme adaptations on top of upstream

- Added `pnpm`/Corepack as the recommended TypeScript package manager (Phase 1.3, 3.2), matching kieksme's own tooling standard.
- Added a "Secure defaults" checklist to Phase 2.2 (credential handling, least-privilege API scopes, log redaction).
- Added a cross-reference to the kieksme `iac-infrastructure-as-code` skill for MCP servers that touch cloud/Terraform state (Phase 1.4, Reference Files).

## History

This skill previously vendored `microsoft/skills` (`.github/skills/mcp-builder`, MIT license), which itself
extended the Anthropic original with Microsoft/Azure-specific ecosystem guidance (C#/.NET SDK path, Azure MCP
server catalog). That variant was replaced in full by the upstream Anthropic version above; the
Microsoft-specific reference material (`reference/microsoft_mcp_patterns.md`, C#/.NET sections) was dropped
rather than carried forward. See git history for the prior MIT-licensed revision if that content is needed again.
