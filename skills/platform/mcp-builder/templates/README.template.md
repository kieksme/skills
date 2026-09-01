<!--
  kieksme MCP server README template.
  Copy this file to your server's repo root as README.md and replace every
  {{PLACEHOLDER}}. Delete this comment block once filled in.
-->

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/kieksme/skills/main/skills/platform/mcp-builder/templates/assets/kieks-me-banner-dark.svg">
    <img alt="kieks.me" src="https://raw.githubusercontent.com/kieksme/skills/main/skills/platform/mcp-builder/templates/assets/kieks-me-banner-light.svg" width="280">
  </picture>
</p>

<h1 align="center">{{SERVER_NAME}}</h1>
<p align="center">{{ONE_LINE_DESCRIPTION}}</p>

<p align="center">
  <a href="https://github.com/{{OWNER}}/{{REPO}}/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/{{OWNER}}/{{REPO}}/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="./reference/evaluation.md">
    <img alt="MCP quality: evaluated" src="https://img.shields.io/badge/mcp--quality-evaluated-00FFDC?style=flat-square&labelColor=1E2A45">
  </a>
  <a href="./LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-{{LICENSE}}-1E2A45?style=flat-square">
  </a>
</p>

Built with kieksme's [`mcp-builder`](https://github.com/kieksme/skills/tree/main/skills/platform/mcp-builder) skill.

## Overview

{{OVERVIEW}} — what external service does this server wrap, and what can an agent do with it that it couldn't do before?

## Tools

| Tool | Description | Read-only |
|------|-------------|-----------|
| `{{tool_name}}` | {{what it does}} | ✅ / ❌ |

## Installation

```bash
pnpm install
pnpm build
```

## Configuration

| Variable | Required | Description |
|----------|----------|--------------|
| `{{ENV_VAR}}` | yes | {{what it's for; never commit a real value}} |

Load credentials from environment variables or a secrets manager only — never hardcode
tokens in source or example config (see the `mcp-builder` skill's "Secure defaults" section).

## Usage

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

{{Add a short realistic example of an agent calling one of the tools here.}}

## Testing

- **Unit tests** (mandatory): `pnpm test` — every tool needs at least one happy-path and one
  error-path test. See the `mcp-builder` skill, Phase 3, for the required coverage.
- **Evaluation**: `python scripts/evaluation.py` against the 10 questions in
  `scripts/example_evaluation.xml` (adapt to this server's data). See
  [`reference/evaluation.md`](https://github.com/kieksme/skills/blob/main/skills/platform/mcp-builder/reference/evaluation.md).

## Where to find this server

- [ ] Submitted to [MCP Market](https://mcpmarket.com/submit)
- [ ] Submitted to [MCP Marketplace](https://mcp-marketplace.io/)

Both submissions require a human maintainer to sign in / fill out the listing form on that
site — this is not something an agent should do unattended. See the `mcp-builder` skill,
Phase 5, before submitting.

## License

{{LICENSE}} — see [`LICENSE`](./LICENSE).
