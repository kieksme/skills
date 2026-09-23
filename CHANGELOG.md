# Changelog

## [2.1.0](https://github.com/kieksme/skills/compare/2.0.0...2.1.0) (2026-09-23)


### Skills

* **skills:** standardize kieksme MCP license and artifact names ([7d4ae81](https://github.com/kieksme/skills/commit/7d4ae81009d074e5042d12fcf3fcfe47594a0ffc))
* **skills:** standardize kieksme MCP license and artifact names ([d86f7d4](https://github.com/kieksme/skills/commit/d86f7d4616fdd0e8694535e752170d9a5f4df9d9))


### Features

* **marketplace:** add Contabo cloud logo ([e297361](https://github.com/kieksme/skills/commit/e297361a3ab2c2ad25e85de389b6a66c2b5b4919))


### Bug Fixes

* **marketplace:** show kieks.me as owner ([a203d5e](https://github.com/kieksme/skills/commit/a203d5e9c23df48e350e2a1748e23bce508e7db0))


### Documentation

* **readme:** split contribution guide ([d52776f](https://github.com/kieksme/skills/commit/d52776f12bcbd63dfd5afc27d5681b4bd55e4b0e))

## [2.0.0](https://github.com/kieksme/skills/compare/1.2.0...2.0.0) (2026-09-14)


### ⚠ BREAKING CHANGES

* **skills:** mcp-builder no longer supports building Python MCP servers; use a different skill/guide for that.

### Skills

* **skills:** mandate dual transport, HTTP auth choice, linting, and client install UX for mcp-builder ([2219270](https://github.com/kieksme/skills/commit/22192704473121c5827215049c20095ac6a28e0a))
* **skills:** mandatory unit tests, README template, and marketplace listing guidance for mcp-builder ([9e4b959](https://github.com/kieksme/skills/commit/9e4b959142370c689dbf1f28f444db4eb444f801))
* **skills:** re-vendor mcp-builder from anthropics/skills, add kieksme conventions ([de6d16e](https://github.com/kieksme/skills/commit/de6d16e6ee573941b47ca40d3fde0e5395933868))
* **skills:** restrict mcp-builder to TypeScript-only ([a9f8482](https://github.com/kieksme/skills/commit/a9f84820e2a9a4fde35932343fc65d072c17338b))


### Features

* add OpenAI integration for skill creation ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* add OpenAI utility functions ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* **api:** add tryParseJsonObject function to improve JSON parsing ([3d497ed](https://github.com/kieksme/skills/commit/3d497ed0c471ce188a3300ba40a6f80b36928aaf))
* **chat.ts:** enforce binary options for yes/no questions to ensure consistent response format ([86ca870](https://github.com/kieksme/skills/commit/86ca8700e4e6a679aec6c89eacd2481cea5c7da5))
* **chat.ts:** enhance chat response with structured JSON format ([f6a65f1](https://github.com/kieksme/skills/commit/f6a65f1ec44b84dcb055b2e44ba919e1240f74c6))
* **docs:** add Skill Creator page for creating and exporting skills ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* enhance SiteNavbar with Skill Creator link ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* implement skill creator API endpoints ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* Initialize project structure with essential files including .gitignore, README, and configuration for GitHub Actions workflows. Add skill definitions and metadata in index.json, AGENTS.md for agent guidelines, and setup for documentation site using Astro. Include license and changelog files for project compliance and tracking. Establish release management with release-please configuration. ([d435c69](https://github.com/kieksme/skills/commit/d435c69ec4ba05e79cb2909e1f0fd72025586f46))
* integrate Netlify deployment ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* **marketplace:** add kieksme MCP plugins ([8616990](https://github.com/kieksme/skills/commit/8616990f666bf9e187afe51d7a640b9944967d0c))
* **SiteNavbar.astro:** implement light and dark mode logos for improved visual consistency and branding ([536f597](https://github.com/kieksme/skills/commit/536f5971017bb0ee7cc5b66d1d16718bfd405fbb))
* **skill-creator:** add clarification questions UI for user input ([f6a65f1](https://github.com/kieksme/skills/commit/f6a65f1ec44b84dcb055b2e44ba919e1240f74c6))
* **skill-creator:** add voice input functionality using SpeechRecognition API ([7f32c6b](https://github.com/kieksme/skills/commit/7f32c6bbd0457ad83dd68520be2eb4224ec81936))
* **skill-creator:** enhance package preview with file snippets ([3d497ed](https://github.com/kieksme/skills/commit/3d497ed0c471ce188a3300ba40a6f80b36928aaf))


### Bug Fixes

* add jszip module declaration ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* **chat.ts:** adjust multiSelect flag for binary questions to false for clarity ([86ca870](https://github.com/kieksme/skills/commit/86ca8700e4e6a679aec6c89eacd2481cea5c7da5))
* **skill-creator.astro:** change message send shortcut from Ctrl/Meta + Enter to Shift + Enter for consistency with hint ([86ca870](https://github.com/kieksme/skills/commit/86ca8700e4e6a679aec6c89eacd2481cea5c7da5))
* **skill-creator:** improve assistant message for clarity ([3d497ed](https://github.com/kieksme/skills/commit/3d497ed0c471ce188a3300ba40a6f80b36928aaf))


### Documentation

* **AGENTS.md:** add information about navbar logos and their source for better clarity on asset management ([536f597](https://github.com/kieksme/skills/commit/536f5971017bb0ee7cc5b66d1d16718bfd405fbb))
* **AGENTS.md:** add typography details for UI architecture ([007db6f](https://github.com/kieksme/skills/commit/007db6f250e8a5342d03997f24f1f3fc2d40fad2))
* create README for self-hosting brand fonts ([007db6f](https://github.com/kieksme/skills/commit/007db6f250e8a5342d03997f24f1f3fc2d40fad2))
* **skill-creator.astro:** add hint for using Shift + Enter to send messages to improve user experience ([86ca870](https://github.com/kieksme/skills/commit/86ca8700e4e6a679aec6c89eacd2481cea5c7da5))
* **skill-creator:** update package preview with instructions ([3d497ed](https://github.com/kieksme/skills/commit/3d497ed0c471ce188a3300ba40a6f80b36928aaf))


### Styles

* **BaseLayout.astro:** update theme color and add Google Fonts links ([007db6f](https://github.com/kieksme/skills/commit/007db6f250e8a5342d03997f24f1f3fc2d40fad2))
* **skill-creator:** adjust chat message container height ([3d497ed](https://github.com/kieksme/skills/commit/3d497ed0c471ce188a3300ba40a6f80b36928aaf))
* **tailwind.css:** define font variables and apply to body and headings ([007db6f](https://github.com/kieksme/skills/commit/007db6f250e8a5342d03997f24f1f3fc2d40fad2))


### Miscellaneous Chores

* **docs:** remove .env file from docs to prevent sensitive data exposure ([7c7306f](https://github.com/kieksme/skills/commit/7c7306f38af8819df0a29d95e77a067bee891988))
* **gitignore:** add .env and .env.* to ignore sensitive environment files ([7c7306f](https://github.com/kieksme/skills/commit/7c7306f38af8819df0a29d95e77a067bee891988))
* **main:** release 1.1.0 ([5d3b6b2](https://github.com/kieksme/skills/commit/5d3b6b232717434e4c5edfd87fa0ceaa0fe08635))
* **main:** release 1.1.0 ([66c6e74](https://github.com/kieksme/skills/commit/66c6e749da8e68c4c0f23310f55da2b8055fdd85))
* **sync-wiki.yml:** update temporary directory name for clarity and consistency ([9c74f14](https://github.com/kieksme/skills/commit/9c74f1415368c6f008af90447720b484b20c5b9e))
* **tsconfig.json:** update TypeScript configuration to include Astro types and exclude dist directory ([f6b7508](https://github.com/kieksme/skills/commit/f6b7508d23a45809c34b6bb9212091ec2506329c))
* update .gitignore for Netlify ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* update branding from "kieksme" to "kieks.me GbR" across documentation and codebase ([62c4416](https://github.com/kieksme/skills/commit/62c4416c0a94a0a66bb100d99e357e3318d39dbd))
* update UI components and styles to incorporate new brand colors and improve consistency across the documentation site ([2d769d2](https://github.com/kieksme/skills/commit/2d769d21cd2db68308174f2797bbd75d388e9fbb))


### Code Refactoring

* remove obsolete skill content ([980be5f](https://github.com/kieksme/skills/commit/980be5ff234769f04e683ec153a62ba65b055852))


### Tests

* **e2e:** add test for Skill Creator chat and zip flow with mocked API ([f44fbf6](https://github.com/kieksme/skills/commit/f44fbf698fc5b1c71cd39f2ed1badf6e4dde7a1c))
* **skill-creator:** update e2e tests for clarification questions ([f6a65f1](https://github.com/kieksme/skills/commit/f6a65f1ec44b84dcb055b2e44ba919e1240f74c6))

## [1.1.0](https://github.com/kieksme/skills/compare/1.0.0...1.1.0) (2026-04-22)


### Features

* Initialize project structure with essential files including .gitignore, README, and configuration for GitHub Actions workflows. Add skill definitions and metadata in index.json, AGENTS.md for agent guidelines, and setup for documentation site using Astro. Include license and changelog files for project compliance and tracking. Establish release management with release-please configuration. ([d435c69](https://github.com/kieksme/skills/commit/d435c69ec4ba05e79cb2909e1f0fd72025586f46))


### Documentation

* **AGENTS.md:** add typography details for UI architecture ([007db6f](https://github.com/kieksme/skills/commit/007db6f250e8a5342d03997f24f1f3fc2d40fad2))
* create README for self-hosting brand fonts ([007db6f](https://github.com/kieksme/skills/commit/007db6f250e8a5342d03997f24f1f3fc2d40fad2))


### Styles

* **BaseLayout.astro:** update theme color and add Google Fonts links ([007db6f](https://github.com/kieksme/skills/commit/007db6f250e8a5342d03997f24f1f3fc2d40fad2))
* **tailwind.css:** define font variables and apply to body and headings ([007db6f](https://github.com/kieksme/skills/commit/007db6f250e8a5342d03997f24f1f3fc2d40fad2))


### Miscellaneous Chores

* **sync-wiki.yml:** update temporary directory name for clarity and consistency ([9c74f14](https://github.com/kieksme/skills/commit/9c74f1415368c6f008af90447720b484b20c5b9e))
* **tsconfig.json:** update TypeScript configuration to include Astro types and exclude dist directory ([f6b7508](https://github.com/kieksme/skills/commit/f6b7508d23a45809c34b6bb9212091ec2506329c))
* update branding from "kieksme" to "kieks.me GbR" across documentation and codebase ([62c4416](https://github.com/kieksme/skills/commit/62c4416c0a94a0a66bb100d99e357e3318d39dbd))
* update UI components and styles to incorporate new brand colors and improve consistency across the documentation site ([2d769d2](https://github.com/kieksme/skills/commit/2d769d21cd2db68308174f2797bbd75d388e9fbb))

## Changelog
