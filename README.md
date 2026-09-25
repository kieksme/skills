# Agent Skills

Agent skill catalog maintained by kieks.me GbR.

This repository is published as [`kieksme/skills`](https://github.com/kieksme/skills). Skills and MCPs use different installation paths.

For project structure, local development, adding skills, builds, and deployment, see [Contribute.md](Contribute.md).

## Installation in Claude and ChatGPT/Codex

### Claude Code

Claude Code can load the kieks.me skills as marketplace plugins. Add the marketplace once, then install the skill bundle you need:

```bash
claude plugin marketplace add kieksme/skills
claude plugin install kieksme-platform-skills@kieksme-skills
```

Available skill bundles include:

```text
kieksme-frontend-skills
kieksme-platform-skills
kieksme-data-skills
kieksme-meta-skills
kieksme-terraform-code-generation
kieksme-terraform-module-generation
kieksme-terraform-provider-development
```

### Available MCP servers

The marketplace currently provides these MCP servers:

| MCP server | Plugin name | Description |
| --- | --- | --- |
| Contabo MCP | `kieksme-contabo-mcp` | Manage Contabo VPS/VDS instances, images, snapshots, networking, DNS, object storage, secrets, domains, and tags. |
| Listmonk MCP | `kieksme-listmonk-mcp` | Manage Listmonk newsletters, subscribers, campaigns, templates, and settings. |
| Hashnode MCP | `kieksme-hashnode-mcp` | Create drafts, publish posts, and manage Hashnode blogs through the Hashnode GraphQL API. |
| Swetrix Statistics MCP | `kieksme-swetrix-statistics-mcp` | Run read-only Swetrix analytics queries for traffic, performance, errors, funnels, and goals. |
| Swetrix Events MCP | `kieksme-swetrix-events-mcp` | Track Swetrix pageviews, custom events, heartbeats, errors, and revenue. |
| Swetrix Admin MCP | `kieksme-swetrix-admin-mcp` | Manage Swetrix projects, funnels, annotations, views, and organisations. |

Install an MCP server in Claude Code with:

```bash
claude plugin install <plugin-name>@kieksme-skills
```

MCPs are installed through the same marketplace. For example:

```bash
claude plugin install kieksme-contabo-mcp@kieksme-skills
```

Claude will then request the required credentials. Never commit secrets to this repository.

You can also run the marketplace commands directly inside Claude Code:

```text
/plugin marketplace add kieksme/skills
/plugin install kieksme-platform-skills@kieksme-skills
```

### ChatGPT and Codex

In ChatGPT or Codex, invoke the built-in skill installer and provide the GitHub path of the skill you want:

```text
$skill-installer
Install the mcp-builder skill from
https://github.com/kieksme/skills/tree/main/skills/platform/mcp-builder
```

In ChatGPT, select an installed skill with `@<skill-name>`. In Codex, use `/skills` or `$<skill-name>`. Restart the session if the skill does not appear after installation.

From a terminal, you can alternatively use the `skills` CLI. For the current catalog version:

```bash
npx skills add kieksme/skills@1.2.0 --skill mcp-builder
```

If pnpm is your package manager, use the equivalent `pnpx` command:

```bash
pnpx skills add kieksme/skills@1.2.0 --skill mcp-builder
```

Other examples:

```bash
npx skills add kieksme/skills@1.2.0 --skill skill-creator
npx skills add kieksme/skills@1.2.0 --skill terraform-style-guide
npx skills add kieksme/skills@1.2.0 --skill iac-infrastructure-as-code
```

To use the current `main` branch instead of a pinned release:

```bash
npx skills add kieksme/skills --skill mcp-builder
```

The unpinned pnpm variant is:

```bash
pnpx skills add kieksme/skills --skill mcp-builder
```

The CLI usually detects Codex automatically. For a specific local agent, set the target explicitly, for example with `--agent codex` or `--agent claude-code`.

The Claude MCP plugins in `.claude-plugin/marketplace.json` are not ChatGPT skills. ChatGPT requires MCPs to be configured as a separate connector or supported remote MCP integration; the commands above install skill definitions only. See the [official OpenAI skills guide](https://learn.chatgpt.com/docs/build-skills) for the ChatGPT/Codex workflow.
