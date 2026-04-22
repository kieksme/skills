---
name: streaming-pipeline-troubleshooting
description: Use this skill for Kafka/Kinesis/PubSub/Fluentd issues such as lag, throughput drops, duplicates, or event loss.
version: 1.0.0
scope: streaming-systems
allowed-tools:
  - metrics-analysis
  - log-analysis
  - topology-inspection
  - consumer-group-diagnostics
safe-defaults:
  - read-only-diagnostics
  - no-production-mutation
---

# Streaming Pipeline Troubleshooting

## When to Use?

- Consumer Lag steigt
- End-to-End Latenz verletzt SLOs
- Duplikate, Reordering oder Data Loss vermutet
- Backpressure in Producer/Consumer Ketten

## Process

1. **Symptom eingrenzen**: welcher Stream, welche Partitionen, seit wann
2. **Pipeline map**: Producer → Broker → Consumer → Sink
3. **Bottleneck finden**: CPU, Netzwerk, Partitionierung, Commit-Strategie, Batch- und Retry-Settings
4. **Semantik prüfen**: at-most-once / at-least-once / exactly-once und Nebenwirkungen
5. **Stabilisierungsplan**: Sofortmaßnahmen + nachhaltige Korrekturen

## Edge Cases

- Nur Teilpartition betroffen: Hot Partitioning prüfen
- Duplikate ohne Broker-Fehler: idempotente Consumer und dedup keys prüfen
- Incident aktiv: nur reversible Maßnahmen mit kleinem Blast Radius

## Example Input

> "Unser Kafka Consumer Lag explodiert seit dem letzten Release. Bitte Ursache und sichere Maßnahmen priorisieren."

## Example Output

- Ursache wahrscheinlich: unbalancierte Partition Keys + erhöhtes Processing pro Event
- Sofortmaßnahme: Consumer parallelism erhöhen, max.poll.interval korrekt setzen
- Dauerhafte Maßnahme: Keying-Strategie anpassen, Batch-Größe neu kalibrieren
