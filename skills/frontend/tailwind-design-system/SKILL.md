---
name: tailwind-design-system
description: Use this skill to build scalable, accessible design systems with Tailwind CSS v4.
version: 1.0.0
scope: frontend-design-system
allowed-tools:
  - design-token-planning
  - component-variant-audit
  - accessibility-review
  - responsive-layout-review
safe-defaults:
  - semantic-design-tokens
  - accessible-focus-states
  - mobile-first-layouts
---

# Tailwind Design System (v4)

## When to Use

- You are creating a reusable UI component library.
- You want to standardize design tokens and variants.
- You are migrating from Tailwind CSS v3 to v4.
- You need consistent accessibility and responsive behavior.

## Process

1. Define semantic tokens in CSS using `@theme`.
2. Build shared components with clear variant and size APIs.
3. Apply accessible focus, disabled, and error states by default.
4. Validate responsive behavior across small, medium, and large breakpoints.
5. Document usage patterns and anti-patterns for each component family.

## Output Expectations

- A clear token hierarchy (`brand -> semantic -> component`).
- Components with consistent variant naming and state behavior.
- Strong keyboard and screen reader support for interactive UI.
- Maintainable Tailwind utility composition with minimal duplication.
