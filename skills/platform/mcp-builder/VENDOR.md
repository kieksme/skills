Vendored from the Anthropic `skills` repository, then adapted for kieksme.

- Source: https://github.com/anthropics/skills/tree/main/skills/mcp-builder
- Commit (path `skills/mcp-builder/`): b9e19e6f44773509fbdd7001d77ff41a49a486c1
- Retrieved: 2026-09-01

License: Apache License 2.0 (see `LICENSE-Apache-2.0-Anthropic.md`).

## kieksme adaptations on top of upstream

- Added `pnpm`/Corepack as the recommended TypeScript package manager (Phase 1.3, 3.2), matching kieksme's own tooling standard.
- Added a "Secure defaults" checklist to Phase 2.2 (credential handling, least-privilege API scopes, log redaction).
- Added a cross-reference to the kieksme `iac-infrastructure-as-code` skill for MCP servers that touch cloud/Terraform state (Phase 1.4, Reference Files).
- Added Phase 3.3 "Unit Tests (mandatory)": every tool needs happy-path + error-path unit tests
  (Vitest for TypeScript, matching kieksme's own toolchain; pytest for Python), independent of
  the Phase 4 evaluation.
- Added `templates/README.template.md` (with `templates/assets/kieks-me-banner-{light,dark}.svg`,
  vendored from `docs/public/brand/` in this repo) as the standard README for kieksme-built MCP
  servers: kieks.me banner, CI badge, static "mcp-quality: evaluated" badge, license badge.
- Added Phase 5 "Publish & Distribute": use the README template, add the quality badge only after
  Phase 4's evaluation passes, and prepare (but do not autonomously submit) listings for
  mcpmarket.com and mcp-marketplace.io — both require a human to sign in and submit the listing.

## History

This skill previously vendored `microsoft/skills` (`.github/skills/mcp-builder`, MIT license), which itself
extended the Anthropic original with Microsoft/Azure-specific ecosystem guidance (C#/.NET SDK path, Azure MCP
server catalog). That variant was replaced in full by the upstream Anthropic version above; the
Microsoft-specific reference material (`reference/microsoft_mcp_patterns.md`, C#/.NET sections) was dropped
rather than carried forward. See git history for the prior MIT-licensed revision if that content is needed again.
