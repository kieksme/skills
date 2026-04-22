---
name: ai-sdk-tooling-integration
description: Use this skill for integrating AI SDK tools, guardrails, and streaming responses in production apps.
version: 1.0.0
scope: ai-application
allowed-tools:
  - prompt-flow-review
  - tool-contract-validation
  - streaming-diagnostics
  - safety-guardrail-check
safe-defaults:
  - no-secret-leakage
  - fail-safe-on-tool-errors
---

# AI SDK Tooling Integration

## When to Use?

- Tool Calls schlagen sporadisch fehl oder liefern inkonsistente Ergebnisse
- Streaming Responses brechen frühzeitig ab
- Sicherheits- oder Governance-Anforderungen sind nicht sauber abgebildet

## Process

1. Tool Contracts und Eingabe-/Ausgabe-Schemata validieren
2. Streaming- und Retry-Verhalten im Fehlerfall prüfen
3. Guardrails für PII, Secrets und unsafe outputs prüfen
4. Integrationsplan mit Monitoring und klaren Fallbacks liefern

## Edge Cases

- Teilweise erfolgreiche Tool-Ketten erzeugen inkonsistente Zustände
- Model-Upgrade ändert Tool-Call Format
- Hohe Parallelität führt zu race conditions im Session State

## Example Input

> "Bitte prüfe unsere AI-SDK Integration, weil Tool Calls nach dem Modellwechsel instabil sind."

## Example Output

- Risiko: Schema-Drift zwischen Tool-Definition und Handler-Implementierung
- Quick Win: strikte Schema-Validierung + idempotente Tool Handler
- Nachhaltig: Guardrail-Layer, Observability und Canary-Rollout ergänzen
