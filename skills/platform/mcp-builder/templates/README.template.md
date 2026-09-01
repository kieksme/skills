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

Supports both transports: **stdio** (local, no hosting required) and **Streamable HTTP**
(remote, requires {{AUTH_METHOD}} — see [Configuration](#configuration)).

## Tools

| Tool | Description | Read-only |
|------|-------------|-----------|
| `{{tool_name}}` | {{what it does}} | ✅ / ❌ |

## Installation

```bash
pnpm install
pnpm build
```

## Add to your editor / agent

Both buttons and snippets below install the **stdio** variant — it works immediately via `npx`,
with no hosting required. If you've deployed {{SERVER_NAME}} as a remote server, use the
Streamable HTTP variant shown under each client instead, with `{{HTTP_URL}}` set to your
deployment and `{{AUTH_METHOD}}` credentials configured as decided in
[Configuration](#configuration).

**One-click install:**

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name={{SERVER_NAME}}&config={{CURSOR_CONFIG_BASE64}})
[![Add to VS Code](https://img.shields.io/badge/VS_Code-Add_MCP_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](vscode:mcp/install?name={{SERVER_NAME}}&config={{VSCODE_CONFIG_URLENCODED}})

Both links carry the config as a query parameter, so they can't be pre-filled in a template.
Fill in `{{NPM_PACKAGE}}` below, then generate the two placeholder values above:

```bash
# Cursor — base64-encode the stdio config
echo -n '{"command":"npx","args":["-y","{{NPM_PACKAGE}}"]}' | base64

# VS Code — URL-encode the stdio config
python3 -c "import urllib.parse,json; print(urllib.parse.quote(json.dumps({'type':'stdio','command':'npx','args':['-y','{{NPM_PACKAGE}}']})))"
```

For the Streamable HTTP variant, encode `{"type":"http","url":"{{HTTP_URL}}"}` instead (same
shape for both Cursor and VS Code), plus whatever `headers` your `{{AUTH_METHOD}}` needs
(e.g. `"headers":{"Authorization":"Bearer <token>"}`).

**Claude Desktop** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "{{SERVER_NAME}}": {
      "command": "npx",
      "args": ["-y", "{{NPM_PACKAGE}}"]
    }
  }
}
```

**Claude Code** (CLI):

```bash
# stdio
claude mcp add {{SERVER_NAME}} -- npx -y {{NPM_PACKAGE}}

# Streamable HTTP, static token auth
claude mcp add --transport http {{SERVER_NAME}} {{HTTP_URL}} --header "Authorization: Bearer <token>"

# Streamable HTTP, OAuth — add the server, then run /mcp inside Claude Code to complete sign-in
claude mcp add --transport http {{SERVER_NAME}} {{HTTP_URL}}
```

**OpenCode** (`opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "{{SERVER_NAME}}": {
      "type": "local",
      "command": ["npx", "-y", "{{NPM_PACKAGE}}"],
      "enabled": true
    }
  }
}
```

Streamable HTTP variant:

```json
{
  "mcp": {
    "{{SERVER_NAME}}": {
      "type": "remote",
      "url": "{{HTTP_URL}}",
      "enabled": true
    }
  }
}
```

## Configuration

| Variable | Required | Description |
|----------|----------|--------------|
| `{{ENV_VAR}}` | yes | {{what it's for; never commit a real value}} |

**Authentication (Streamable HTTP transport):** {{AUTH_METHOD}} — one of OAuth 2.1, static
bearer token / API key header, mTLS, or none (loopback-only dev). Decided in the `mcp-builder`
skill's Phase 1.4; enforced at the transport layer, not per tool.

Load credentials from environment variables or a secrets manager only — never hardcode
tokens in source or example config (see the `mcp-builder` skill's "Secure defaults" section).

## Usage

```bash
# stdio
npx @modelcontextprotocol/inspector node dist/index.js

# Streamable HTTP
npx @modelcontextprotocol/inspector --transport http --server-url {{HTTP_URL}}
```

{{Add a short realistic example of an agent calling one of the tools here.}}

## Testing

- **Lint**: `pnpm lint` (fix with `pnpm lint:fix`)
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
