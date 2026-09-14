# Contributing

Thanks for contributing to the kieks.me agent skill catalog. This guide covers the repository structure, local development, skill authoring, builds, and deployment.

## Project structure

```text
.
├── docs/                    # Astro documentation site
│   ├── src/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── styles/
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── skills/                  # Skill definitions (SKILL.md)
├── index.json               # Skill catalog metadata
├── .github/workflows/pages.yml
└── templates/basic-skill/
```

## Local development

Enable Corepack, activate the pinned pnpm version, synchronize the catalog data, and start the documentation site:

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
cp index.json docs/index.json
cd docs
pnpm install
pnpm dev
```

The catalog version in `index.json` must match the release tag `X.Y.Z`. Installation commands should be pinned to that tag, for example:

```bash
npx skills add kieksme/skills@1.2.0 --skill <skill-name>
```

The equivalent pnpm command is:

```bash
pnpx skills add kieksme/skills@1.2.0 --skill <skill-name>
```

## Build and checks

```bash
cd docs
pnpm check
pnpm build
```

## Adding a skill

1. Create a directory under the appropriate domain, for example `skills/<domain>/<skill-name>/` or, for Terraform, `skills/terraform/<area>/<skill-name>/`.
2. Add a `SKILL.md` with frontmatter.
3. Add the skill to `index.json`.
4. Add the skill to the AGENTS.md generator in `docs/src/pages/agent-md-generator.astro` by adding its name to the matching `domainMap` entry, or create a new domain.
5. Add an Open Graph asset at `docs/public/og/skills/<skill-name>.png` with dimensions of 1200×630.
6. Make sure `docs/public/og/default.png` exists as the fallback for non-skill pages.

## Deployment

The static documentation site is published to GitHub Pages by `.github/workflows/pages.yml`.

The workflow runs for published GitHub Releases and can also be started manually. Before the build, it copies `index.json`, `skills/`, and the mock harness snapshot into `docs/`.

The Skill Creator requires a separate server-side API because GitHub Pages does not execute API routes. Set `PUBLIC_SKILL_CREATOR_API_URL` to the external API base URL during the documentation build.

The API uses `OPENAI_API_KEY` and optionally `OPENAI_MODEL` as server secrets. A Netlify Functions reference implementation, including routing, is available in `docs/netlify/`.

`RELEASE_PLEASE_TOKEN` is required as a repository secret for the Release Please workflow.
