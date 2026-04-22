# Agent Skills

Agent-Skill-Katalog der kieks.me GbR.

## Projektstruktur

```text
.
├── docs/                    # Astro docs-site (Quellcode)
│   ├── src/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── styles/
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── skills/                  # Skill-Definitionen (SKILL.md)
├── index.json               # Skill-Katalog-Metadaten
├── .github/workflows/pages.yml
└── templates/basic-skill/
```

## Entwicklung

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
cp index.json docs/index.json
cd docs
pnpm install
pnpm dev
```

The catalog version in `index.json` matches the release tag `X.Y.Z`. Installation commands should be pinned to that tag, for example `npx skills add kieksmeRepo/tp-skills@1.5.0 --skill <skill-name>`.

## Build

```bash
cd docs
pnpm check
pnpm build
```

## Skills hinzufügen

1. Ordner unter einer Domäne anlegen, z. B. `skills/<domain>/<skill-name>/` oder für Terraform `skills/terraform/<area>/<skill-name>/`
2. `SKILL.md` mit Frontmatter erstellen
3. Skill in `index.json` ergänzen
4. Skill im AGENTS.md-Generator verknüpfen: in `docs/src/pages/agent-md-generator.astro` unter `domainMap` den Skill-Namen zur passenden Domäne hinzufügen (oder eine neue Domäne anlegen)
5. Open-Graph-Asset anlegen: `docs/public/og/skills/<skill-name>.png` (1200×630)
6. Sicherstellen, dass `docs/public/og/default.png` vorhanden ist (Fallback für Nicht-Skill-Seiten)

## Deployment

GitHub Pages wird im Workflow `.github/workflows/release-please.yml` gebaut und aus `docs/` veröffentlicht.
Das Deployment läuft nur dann, wenn `Release Please` tatsächlich ein neues Release erstellt (`releases_created == true`).
Set the `RELEASE_PLEASE_TOKEN` repository secret (PAT or GitHub App token) so PR-triggered checks run for Release Please PRs.
