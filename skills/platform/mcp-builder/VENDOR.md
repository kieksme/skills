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
  via Vitest, matching kieksme's own toolchain, independent of the Phase 4 evaluation.
- Added `templates/README.template.md` (with `templates/assets/kieks-me-banner-{light,dark}.svg`,
  vendored from `docs/public/brand/` in this repo) as the standard README for kieksme-built MCP
  servers: kieks.me banner, CI badge, static "mcp-quality: evaluated" badge, license badge.
- Added Phase 5 "Publish & Distribute": use the README template, add the quality badge only after
  Phase 4's evaluation passes, and prepare (but do not autonomously submit) listings for
  mcpmarket.com and mcp-marketplace.io — both require a human to sign in and submit the listing.
- Made **dual-transport support mandatory** (Phase 1.3, 2.4): every server must run over both
  stdio and Streamable HTTP from one codebase, transport chosen at startup via a flag/env var —
  previously the guide framed this as an either/or choice based on deployment target.
- Added an **authentication decision step** for the Streamable HTTP transport (Phase 1.4): pick
  OAuth 2.1, static bearer token, mTLS, or none-for-localhost before implementing, and enforce it
  at the transport layer.
- Added a **mandatory ESLint setup** for TypeScript servers (Phase 2.1, 3.2): flat-config template
  at `templates/eslint.config.template.mjs` (typescript-eslint + a `no-console` rule that guards
  against corrupting the stdio JSON-RPC stream), plus required `pnpm lint` / `pnpm lint:fix` /
  `pnpm test` scripts wired into CI.
- Extended `templates/README.template.md` with one-click **Add to Cursor** / **Add to VS Code**
  install buttons and config snippets for **Claude Desktop**, **Claude Code**, and **OpenCode**,
  each shown for both the stdio and Streamable HTTP variant.
- **Restricted the language scope to TypeScript only.** Upstream Anthropic's skill covers both
  TypeScript and Python; kieksme MCP servers are built in TypeScript exclusively, so the Python
  implementation path was removed — `reference/python_mcp_server.md` deleted, and every
  "choose your language" branch in `SKILL.md` collapsed to TypeScript-only (Zod, Vitest, ESLint).
  The Python-based evaluation harness in `scripts/` is untouched: it's a client that drives the
  server for evaluation, independent of what language the server itself is written in.
- Added the kieksme publishing convention: `mcp-<service>` repositories produce
  `@kieksme/<service>-mcp` packages and `ghcr.io/kieksme/<service>-mcp` images; original
  kieksme server code uses GPL-3.0-or-later. The vendored skill's Apache-2.0 license remains unchanged.

## History

This skill previously vendored `microsoft/skills` (`.github/skills/mcp-builder`, MIT license), which itself
extended the Anthropic original with Microsoft/Azure-specific ecosystem guidance (C#/.NET SDK path, Azure MCP
server catalog). That variant was replaced in full by the upstream Anthropic version above; the
Microsoft-specific reference material (`reference/microsoft_mcp_patterns.md`, C#/.NET sections) was dropped
rather than carried forward. See git history for the prior MIT-licensed revision if that content is needed again.
