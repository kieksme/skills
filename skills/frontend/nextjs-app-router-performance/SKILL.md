---
name: nextjs-app-router-performance
description: Use this skill for Next.js App Router regressions around Core Web Vitals, caching, and rendering strategy.
version: 1.0.0
scope: web-performance
allowed-tools:
  - trace-analysis
  - bundle-inspection
  - cache-diagnostics
  - route-segmentation-review
safe-defaults:
  - no-production-config-overwrite
  - benchmark-before-after
---

# Next.js App Router Performance

## When to Use?

- TTFB oder INP regressions nach einem Release
- Unerwartet viele dynamische Renderings statt statischer Auslieferung
- Hohe Bundle-Größen oder langsame Route Transitions

## Process

1. Rendering-Strategie je Route prüfen (static, dynamic, ISR, streaming)
2. Caching-Ebenen analysieren (fetch cache, route cache, CDN cache)
3. Bundle- und Hydration-Kosten identifizieren
4. Quick-Wins und strukturelle Maßnahmen priorisieren

## Edge Cases

- Mischbetrieb aus Server und Client Components mit versteckten Re-Renders
- Overfetching durch nicht deduplizierte Requests
- RSC kompatible Libraries fehlen und erzwingen Client Fallbacks

## Example Input

> "Unsere App Router Seite ist nach dem letzten Release deutlich langsamer. Bitte Ursache und sichere Optimierungen priorisieren."

## Example Output

- Hauptursache: dynamischer Fetch ohne Cache auf kritischem Pfad
- Quick Win: `revalidate` und deduplizierte data loader einsetzen
- Nachhaltig: große Client-Komponenten in kleinere Server-/Client-Schnitte aufteilen
