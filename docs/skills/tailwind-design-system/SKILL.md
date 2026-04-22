---
name: tailwind-design-system
description: Build scalable, accessible design systems with Tailwind CSS v4 — CSS-first @theme, semantic tokens, component variants (e.g. CVA), responsive layouts, dark mode, and a11y. Use for component libraries, design tokens, UI standardization, or v3→v4 migration.
version: 1.4.0
scope: frontend-design-system
allowed-tools:
  - design-token-planning
  - component-variant-audit
  - accessibility-review
  - responsive-layout-review
  - theme-css-first-setup
  - v3-to-v4-migration-audit
safe-defaults:
  - semantic-design-tokens
  - accessible-focus-states
  - mobile-first-layouts
  - oklch-or-semantic-colors-over-raw-hex
---

# Tailwind Design System (v4)

Build production-ready design systems with Tailwind CSS v4: CSS-first configuration (`@import "tailwindcss"`, `@theme`), semantic tokens, typed component variants, responsive patterns, and accessible interactive states.

> **Scope:** This skill targets **Tailwind CSS v4**. For v3-only codebases, use the official [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide) and treat v3 config as legacy.

## When to Use

- Creating or extending a reusable UI component library on Tailwind v4.
- Defining design tokens and theming with CSS-first configuration (`@theme`).
- Standardizing variants, sizes, and state styling across a codebase.
- Shipping responsive, keyboard-friendly, screen-reader-aware UI.
- Migrating from Tailwind v3 to v4 or aligning an existing library with v4 patterns.

## Key v4 vs v3 Patterns

| v3 | v4 |
| --- | --- |
| `tailwind.config.ts` for theme | `@theme` in CSS |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| `darkMode: "class"` | `@custom-variant dark (...)` (or media-based dark) |
| `theme.extend.colors` | `@theme { --color-*: … }` |
| Plugin-based animation packages | `@keyframes` in `@theme` + utilities; native CSS motion where appropriate |

## Core Concepts

### 1. Token hierarchy

```
Brand (palette) → Semantic (role: primary, muted, destructive) → Component usage (bg-primary, text-muted-foreground)
```

Prefer **semantic** utilities in components (`bg-card`, `border-border`) so themes and dark mode stay consistent.

### 2. Component styling layers

```
Base → Variants → Sizes → States (hover/focus/disabled/error) → Overrides (className)
```

Encode variants with a small, consistent API (e.g. **CVA** + `VariantProps`) and merge classes with **`cn` (`clsx` + `tailwind-merge`)** to avoid conflicting utilities.

## Process

1. **Tokens:** Define semantic colors, radii, motion, and fonts in `@theme`. Prefer **OKLCH** (or project-agreed spaces) for perceptually stable ramps; use `color-mix()` / steps when you need alpha variants.
2. **Dark mode:** Override semantic CSS variables under a class (e.g. `.dark`) or use media — match `@custom-variant` to how the app toggles theme.
3. **Primitives:** Build buttons, inputs, labels with shared focus rings (`focus-visible:ring-*`, `ring-offset-*`), disabled styles, and form **ARIA** (`aria-invalid`, `aria-describedby`, `role="alert"` for errors).
4. **Layout:** Use mobile-first breakpoints; optional **container queries** for card/grid behavior inside components.
5. **Docs:** For each family, document allowed variants, default props, and anti-patterns (e.g. raw palette colors in feature code).

## CSS-First Quick Start (abbreviated)

```css
@import "tailwindcss";

@theme {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(20% 0.02 264);
  --color-primary: oklch(45% 0.2 264);
  --color-primary-foreground: oklch(98% 0.01 264);
  --color-border: oklch(91% 0.01 264);
  --color-ring: oklch(45% 0.2 264);
  --color-destructive: oklch(52% 0.2 27);
  --radius-md: 0.375rem;
}

@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: oklch(14% 0.02 264);
  --color-foreground: oklch(98% 0.01 264);
  --color-primary: oklch(75% 0.12 264);
  --color-border: oklch(25% 0.02 264);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

## Implementation Patterns (choose what fits the stack)

Longer copy-paste examples (Button, Card, Input, Grid, `cn`, CSS utilities, **ThemeProvider**, **Dialog** motion + **DialogTitle** / **DialogDescription**) live in **[EXAMPLES.md](./EXAMPLES.md)**.

- **Variants:** CVA (`class-variance-authority`) for `variant` + `size` + defaults; export `VariantProps` for typed props.
- **Composition:** Compound subcomponents (card header/content/footer) with shared token classes.
- **Forms:** Pair `Label` + `Input`; surface errors with visible text and `aria-invalid` / `aria-describedby`.
- **Grids/containers:** CVA or small wrappers for `grid-cols-*` + `max-w-*` + horizontal padding — keep breakpoints aligned with design tokens.
- **Motion:** Prefer tokens like `--animate-*` in `@theme`; use **`@starting-style`** where native entry/exit animations apply (e.g. popovers/dialogs).
- **Utilities:** Reuse **`cn`** everywhere; optional shared strings for focus/disabled if many components repeat them.

## Advanced v4 (short reference)

- **`@utility`:** Encapsulate repeated one-off compositions (decorations, gradients) instead of copying long `apply` chains.
- **`@theme inline` / `@theme static`:** Inline for referencing other variables; static when variables must exist in CSS even if unused.
- **Namespaces:** `--color-*: initial` then redefine only what you need for a minimal or white-label theme.
- **Container queries:** Define `@container-*` sizes in `@theme` when components must respond to their parent, not only the viewport.

## v3 → v4 Migration Checklist

- Replace legacy `@tailwind` directives with `@import "tailwindcss"`.
- Move extended theme from JS config into `@theme { … }`.
- Map `darkMode: "class"` to `@custom-variant` + variable overrides on `.dark` (or equivalent).
- Co-locate `@keyframes` with theme when they back `--animate-*` utilities.
- Prefer `size-*` where you previously paired matching `w-*` and `h-*`.
- Replace ad-hoc arbitrary colors with semantic tokens where possible.
- Audit plugins: recreate small behavior with `@utility` or native CSS when feasible.

## Do / Don’t

**Do:** CSS-first `@theme`, semantic class names in components, test light + dark + keyboard focus, use `tailwind-merge` in `cn` for overrides.

**Don’t:** Hardcode palette steps in app features, skip focus styles on custom controls, or rely on huge arbitrary values where a token would do.

## Output Expectations

- A clear token hierarchy (brand → semantic → component usage).
- Components with consistent variant naming and predictable state behavior (hover, focus-visible, disabled, invalid).
- Strong keyboard and screen reader support for interactive UI.
- Maintainable Tailwind composition: shared primitives, minimal duplication, merge-safe `className` handling.

## References

- [Tailwind CSS v4 docs](https://tailwindcss.com/docs)
- [Upgrade guide (v3 → v4)](https://tailwindcss.com/docs/upgrade-guide)
