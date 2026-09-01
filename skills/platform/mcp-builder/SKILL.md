---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services. kieksme MCP servers are built in TypeScript (Node/MCP SDK) only.
version: 3.0.0
license: Complete terms in LICENSE-Apache-2.0-Anthropic.md
---

# MCP Server Development Guide

## Overview

Create MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. The quality of an MCP server is measured by how well it enables LLMs to accomplish real-world tasks.

---

# Process

## 🚀 High-Level Workflow

Creating a high-quality MCP server involves five main phases:

### Phase 1: Deep Research and Planning

#### 1.1 Understand Modern MCP Design

**API Coverage vs. Workflow Tools:**
Balance comprehensive API endpoint coverage with specialized workflow tools. Workflow tools can be more convenient for specific tasks, while comprehensive coverage gives agents flexibility to compose operations. Performance varies by client—some clients benefit from code execution that combines basic tools, while others work better with higher-level workflows. When uncertain, prioritize comprehensive API coverage.

**Tool Naming and Discoverability:**
Clear, descriptive tool names help agents find the right tools quickly. Use consistent prefixes (e.g., `github_create_issue`, `github_list_repos`) and action-oriented naming.

**Context Management:**
Agents benefit from concise tool descriptions and the ability to filter/paginate results. Design tools that return focused, relevant data. Some clients support code execution which can help agents filter and process data efficiently.

**Actionable Error Messages:**
Error messages should guide agents toward solutions with specific suggestions and next steps.

#### 1.2 Study MCP Protocol Documentation

**Navigate the MCP specification:**

Start with the sitemap to find relevant pages: `https://modelcontextprotocol.io/sitemap.xml`

Then fetch specific pages with `.md` suffix for markdown format (e.g., `https://modelcontextprotocol.io/specification/draft.md`).

Key pages to review:
- Specification overview and architecture
- Transport mechanisms (streamable HTTP, stdio)
- Tool, resource, and prompt definitions

#### 1.3 Study Framework Documentation

**Required stack (not a choice):**
- **Language**: TypeScript, always — kieksme does not build MCP servers in Python or any other language. TypeScript has high-quality SDK support, good compatibility across execution environments (e.g. MCPB), and AI models are good at generating it, benefiting from its broad usage, static typing, and good linting tools.
- **Package manager**: kieksme projects standardize on `pnpm` via Corepack (`corepack enable && corepack prepare pnpm@latest --activate`); use it for install/build/test/lint scripts instead of `npm`/`yarn` unless the target repo already commits to a different tool.
- **Transport**: support **both** stdio and Streamable HTTP from the same server (mandatory — see 2.4). stdio covers local/desktop clients (Claude Desktop, Cursor, VS Code, OpenCode running the server as a child process); Streamable HTTP, using stateless JSON (simpler to scale and maintain than stateful sessions), covers remote/hosted deployments.

**Load framework documentation:**

- **MCP Best Practices**: [📋 View Best Practices](./reference/mcp_best_practices.md) - Core guidelines
- **TypeScript SDK**: Use WebFetch to load `https://raw.githubusercontent.com/modelcontextprotocol/typescript-sdk/main/README.md`
- [⚡ TypeScript Guide](./reference/node_mcp_server.md) - TypeScript patterns and examples

If a request calls for a Python or other non-TypeScript MCP server, say so explicitly and confirm
before proceeding — this skill's guidance, templates, and lint setup all assume TypeScript.

#### 1.4 Plan Your Implementation

**Understand the API:**
Review the service's API documentation to identify key endpoints, authentication requirements, and data models. Use web search and WebFetch as needed.

**Tool Selection:**
Prioritize comprehensive API coverage. List endpoints to implement, starting with the most common operations.

**Authentication for the Streamable HTTP transport (decide now, not during implementation):**
Since the server must support Streamable HTTP (see 1.3/2.4), pick one before writing code:

| Method | Use when |
|--------|----------|
| **OAuth 2.1** | Multi-tenant / hosted for other people; each caller acts as their own identity; required if the upstream API itself is OAuth-protected on behalf of a user |
| **Static bearer token / API key header** | Single-tenant or internal deployment where one shared credential is acceptable |
| **mTLS / network-level (VPN, private endpoint)** | Enterprise-internal server never exposed to the public internet |
| **None** | Only for a server bound to `localhost`/loopback for local dev — never for anything publicly reachable |

Document the chosen method in the README's Configuration section (see Phase 5) and enforce it at
the transport layer, not per-tool — an unauthenticated tool call should never reach the API client.

**Touching cloud infrastructure?**
If the server will provision, inspect, or mutate cloud resources (Terraform state, cloud APIs, IaC pipelines), review kieksme's [`iac-infrastructure-as-code`](../iac-infrastructure-as-code/SKILL.md) skill first — it defines the security, cost, and risk-review bar that tools touching infrastructure should meet before they ship.

---

### Phase 2: Implementation

#### 2.1 Set Up Project Structure

See the [⚡ TypeScript Guide](./reference/node_mcp_server.md) for project structure, `package.json`, and `tsconfig.json`.

**Set up linting alongside the project (mandatory):**
Copy [`templates/eslint.config.template.mjs`](./templates/eslint.config.template.mjs) to the
server repo as `eslint.config.mjs` (ESLint 9 flat config + `typescript-eslint`), then add these
`package.json` scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test": "vitest run"
  }
}
```

Run `pnpm lint` as part of Phase 3 review, and wire `pnpm lint`, `pnpm test`, and `pnpm build`
into CI (Phase 5) so a lint or test failure blocks the build, the same as a compile error.

#### 2.2 Implement Core Infrastructure

Create shared utilities:
- API client with authentication
- Error handling helpers
- Response formatting (JSON/Markdown)
- Pagination support

**Secure defaults (non-negotiable):**
- Load credentials from environment variables or a secrets manager — never hardcode tokens, keys, or connection strings in source or example config.
- Request the narrowest API scope/permission that the tool set actually needs (least privilege); document the required scopes in the server's README.
- Never log full request/response bodies that may contain secrets or personal data; redact before logging.

#### 2.3 Implement Tools

For each tool:

**Input Schema:**
- Use Zod
- Include constraints and clear descriptions
- Add examples in field descriptions

**Output Schema:**
- Define `outputSchema` where possible for structured data
- Use `structuredContent` in tool responses (TypeScript SDK feature)
- Helps clients understand and process tool outputs

**Tool Description:**
- Concise summary of functionality
- Parameter descriptions
- Return type schema

**Implementation:**
- Async/await for I/O operations
- Proper error handling with actionable messages
- Support pagination where applicable
- Return both text content and structured data when using modern SDKs

**Annotations:**
- `readOnlyHint`: true/false
- `destructiveHint`: true/false
- `idempotentHint`: true/false
- `openWorldHint`: true/false

#### 2.4 Support Both Transports (mandatory)

A kieksme MCP server runs over **both** stdio and Streamable HTTP from the same codebase — pick
the transport at startup, not at build time:

- Register tools once against a single server instance; only the transport binding differs.
- Select the transport via a CLI flag (`--transport stdio|http`) or `MCP_TRANSPORT` env var,
  defaulting to `stdio` (works immediately via `npx`, no hosting required).
- Implement the Streamable HTTP path with the authentication method decided in Phase 1.4
  (OAuth 2.1, static bearer token, mTLS, or none-for-localhost-only) — enforce it in the
  transport/middleware layer so an unauthenticated request never reaches a tool handler.
- Test both paths in Phase 3 — MCP Inspector supports both `stdio` and `http` targets.
- **Never write to stdout in the stdio path** — it carries JSON-RPC framing; log via `console.error`/stderr (or a logger configured to stderr) instead. The lint config in 2.1 flags stray `console.log` for this reason.

See the [⚡ TypeScript Guide](./reference/node_mcp_server.md) for transport bootstrapping code;
extend the single-transport example there to branch on the flag/env var above instead of
hardcoding one transport.

---

### Phase 3: Review and Test

#### 3.1 Code Quality

Review for:
- No duplicated code (DRY principle)
- Consistent error handling
- Full type coverage
- Clear tool descriptions

#### 3.2 Build and Test

- Run `pnpm build` (or `npm run build` if the target repo isn't on pnpm) to verify compilation
- Run `pnpm lint` (fix with `pnpm lint:fix`) — see the ESLint setup in 2.1
- Test with MCP Inspector: `npx @modelcontextprotocol/inspector`, against both the stdio and HTTP transport (2.4)

See the [⚡ TypeScript Guide](./reference/node_mcp_server.md) for detailed testing approaches and quality checklists.

#### 3.3 Unit Tests (mandatory)

Every tool ships with automated unit tests — this is not optional, and evaluations (Phase 4) do
not substitute for it: evaluations check end-to-end agent behavior against a live server,
unit tests check each tool's logic in isolation, fast and without live credentials.

Use [Vitest](https://vitest.dev) (`pnpm add -D vitest`, run via `pnpm test`) — matches the
toolchain kieksme already standardizes on for TypeScript projects.

Minimum coverage per tool:
- One happy-path test with a realistic input
- One test per validation/error branch (bad input, upstream API error, empty result)
- Mock the external API/service — unit tests must not require live network access or real credentials

Wire the test command into CI (see Phase 5) so a broken tool fails the build, not just the evaluation.

---

### Phase 4: Create Evaluations

After implementing your MCP server, create comprehensive evaluations to test its effectiveness.

**Load [✅ Evaluation Guide](./reference/evaluation.md) for complete evaluation guidelines.**

#### 4.1 Understand Evaluation Purpose

Use evaluations to test whether LLMs can effectively use your MCP server to answer realistic, complex questions.

#### 4.2 Create 10 Evaluation Questions

To create effective evaluations, follow the process outlined in the evaluation guide:

1. **Tool Inspection**: List available tools and understand their capabilities
2. **Content Exploration**: Use READ-ONLY operations to explore available data
3. **Question Generation**: Create 10 complex, realistic questions
4. **Answer Verification**: Solve each question yourself to verify answers

#### 4.3 Evaluation Requirements

Ensure each question is:
- **Independent**: Not dependent on other questions
- **Read-only**: Only non-destructive operations required
- **Complex**: Requiring multiple tool calls and deep exploration
- **Realistic**: Based on real use cases humans would care about
- **Verifiable**: Single, clear answer that can be verified by string comparison
- **Stable**: Answer won't change over time

#### 4.4 Output Format

Create an XML file with this structure:

```xml
<evaluation>
  <qa_pair>
    <question>Find discussions about AI model launches with animal codenames. One model needed a specific safety designation that uses the format ASL-X. What number X was being determined for the model named after a spotted wild cat?</question>
    <answer>3</answer>
  </qa_pair>
<!-- More qa_pairs... -->
</evaluation>
```

---

### Phase 5: Publish & Distribute

#### 5.1 Use the kieksme README Template

Copy [`templates/README.template.md`](./templates/README.template.md) to the server repo's
root as `README.md` and fill in every `{{PLACEHOLDER}}`. It already wires up:

- The kieks.me banner (light/dark, via the `<picture>` element — no extra setup needed)
- A CI badge (points at `.github/workflows/ci.yml` — adjust the path if your workflow differs)
- A quality badge (`mcp-quality: evaluated`) that signals Phase 4's evaluation was run
- A license badge
- The mandatory sections: Tools, Configuration, Testing, and "Where to find this server"
- One-click **Add to Cursor** / **Add to VS Code** install buttons, plus config snippets for
  **Claude** (Desktop and Code) and **OpenCode** — for both the stdio and Streamable HTTP variant

Do not hand-roll a different README structure for a kieksme-built MCP server — consistency
across servers is the point of the template.

#### 5.2 Quality Badge

The quality badge in the template (`https://img.shields.io/badge/mcp--quality-evaluated-00FFDC?...`)
is a static, self-hosted shields.io badge — no signup or external service required. Only add it
once Phase 4's evaluation has actually been run and passes; do not add it as decoration before
the server is evaluated. If the repo has CI, wire a badge for that too (see the template).

#### 5.3 List on MCP Marketplaces

Once the server is built, tested, and evaluated, list it so agents/clients can discover it:

- **[MCP Market](https://mcpmarket.com/submit)** — dedicated submission form.
- **[MCP Marketplace](https://mcp-marketplace.io/)** — curated, security-scanned directory;
  submission requires creating an account and using its "Submit a Tool" flow.

Both submissions need a human to sign in and fill out the listing on that site — creating
accounts and submitting public listings on third-party services is **not** something an agent
should do unattended, even when asked to "register" a server. Prepare the listing content
(name, description, repo link, category) and hand it to the maintainer to submit themselves.

---

# Reference Files

## 📚 Documentation Library

Load these resources as needed during development:

### Core MCP Documentation (Load First)
- **MCP Protocol**: Start with sitemap at `https://modelcontextprotocol.io/sitemap.xml`, then fetch specific pages with `.md` suffix
- [📋 MCP Best Practices](./reference/mcp_best_practices.md) - Universal MCP guidelines including:
  - Server and tool naming conventions
  - Response format guidelines (JSON vs Markdown)
  - Pagination best practices
  - Transport selection (streamable HTTP vs stdio)
  - Security and error handling standards

### SDK Documentation (Load During Phase 1/2)
- **TypeScript SDK**: Fetch from `https://raw.githubusercontent.com/modelcontextprotocol/typescript-sdk/main/README.md`

### TypeScript Implementation Guide (Load During Phase 2)
- [⚡ TypeScript Implementation Guide](./reference/node_mcp_server.md) - Complete TypeScript guide with:
  - Project structure
  - Zod schema patterns
  - Tool registration with `server.registerTool`
  - Complete working examples
  - Quality checklist

### Evaluation Guide (Load During Phase 4)
- [✅ Evaluation Guide](./reference/evaluation.md) - Complete evaluation creation guide with:
  - Question creation guidelines
  - Answer verification strategies
  - XML format specifications
  - Example questions and answers
  - Running an evaluation with the provided scripts

### README Template (Load During Phase 5)
- [`templates/README.template.md`](./templates/README.template.md) — kieksme's standard MCP
  server README: banner, CI/quality/license badges, tools table, config, testing, marketplace
  checklist. Copy it into the server repo and fill in the placeholders.

## Related kieksme skills

- [`iac-infrastructure-as-code`](../iac-infrastructure-as-code/SKILL.md) — run this when the MCP server you're building manages or reads Terraform/Pulumi/CloudFormation state, so infrastructure-facing tools get the same risk, cost, and security review as manual IaC changes.
