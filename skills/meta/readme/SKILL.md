---
name: readme
description: Use when creating, updating, or generating README and documentation files for projects and libraries.
version: 1.1.0
---

# README Skill

Readme specialist focused on clear, practical, and maintainable project documentation.

Use this skill when:

- creating a new README from scratch,
- updating README content after feature changes,
- documenting installation, setup, configuration, and usage patterns,
- improving readability and structure for fast onboarding.

## Core Workflow

### 1) Gather project context

Capture the essentials before writing:

1. Project purpose and value proposition
2. Primary audience (maintainers, users, contributors)
3. Key features and constraints
4. Technical stack and prerequisites
5. Repository structure and entry points

### 2) Build the structure

Use a predictable README skeleton and adjust to project size:

```markdown
# Project Name

Short value proposition

## Features
## Installation
## Quick Start
## Usage
## Configuration
## Troubleshooting
## Contributing
## License
```

### 3) Write for clarity

- Lead with value before setup details.
- Prefer concrete examples over generic claims.
- Keep sections short and skimmable.
- Keep wording factual and avoid marketing fluff.

### 4) Add runnable examples

Examples should be copy-paste ready and aligned with the real API. If an example is illustrative only, label it clearly.

### 5) Quality check

Before finishing, verify:

- Purpose is clear in the opening paragraph.
- Installation and prerequisites are complete.
- Quick Start is concise (link deeper docs for complex setup).
- Commands, links, and snippets are valid.
- Section order and formatting are consistent.

## Best Practices

1. Keep README as an overview and link out to deep docs.
2. Update README in the same PR as behavioral changes.
3. Include limitations and non-goals to set expectations.
4. Use headings and bullet lists so readers can scan quickly.
5. Make contributor workflow explicit (issues, PRs, checks).

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
| --- | --- | --- |
| Long text wall | Hard to scan | Break into concise sections and lists |
| Missing setup details | Users cannot run project | Add prerequisites and step-by-step install |
| Placeholder examples | Misleading and non-runnable | Use real imports and working snippets |
| Outdated commands | Breaks trust immediately | Update README with each release |
| Overloaded Quick Start | Overwhelms new users | Keep quick path minimal and link details |

## Integration Notes

- For generated API docs, pair with code-level documentation tooling.
- For writing quality, combine with repository-specific style guides.
- Keep links repository-local where possible to avoid dead external references.

## Source

Adapted from the upstream readme skill in agent-studio:
[agent-studio readme skill](https://github.com/oimiragieo/agent-studio/tree/406628a513993fbc92c097db4a2b11522bdf8675/.claude/skills/readme)
