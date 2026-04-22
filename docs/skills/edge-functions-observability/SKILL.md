---
name: edge-functions-observability
description: Use this skill for diagnosing latency, cold starts, and error spikes in edge/serverless functions.
version: 1.0.0
scope: edge-runtime
allowed-tools:
  - metrics-analysis
  - distributed-tracing
  - log-correlation
  - config-diff
safe-defaults:
  - read-only-diagnostics
  - rollback-first-strategy
---

# Edge Functions Observability

## When to Use?

- P95/P99 Latenz steigt nach Deployments
- Fehlerquote erhöht sich regional oder nur unter Last
- Cold Start Verhalten verschlechtert sich

## Process

1. Fehler und Latenz nach Region, Route und Runtime korrelieren
2. Traces entlang externer Abhängigkeiten analysieren
3. Konfigurationsänderungen (Env, Limits, Timeouts) gegenprüfen
4. Stabilisierungsmaßnahmen mit kleinem Blast Radius planen

## Edge Cases

- Nur einzelne Regionen betroffen durch Datenresidenz oder Upstream-Routing
- Timeouts maskieren eigentliche Downstream-Fehler
- Retry-Strategie verstärkt Lastspitzen

## Example Input

> "Unsere Edge Function hat seit gestern eine P99-Latenzverdopplung. Bitte sichere Ursachenanalyse und Maßnahmen liefern."

## Example Output

- Primäre Ursache: region-spezifischer Upstream mit hoher Antwortzeit
- Sofortmaßnahme: Timeout/Retry feinjustieren und Fallback Route aktivieren
- Dauerhaft: regionales Failover und Circuit-Breaker Schwellenwerte nachschärfen
