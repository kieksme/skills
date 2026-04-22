---
name: big-data-platform-optimization
description: Use this skill for Spark/Flink/Hadoop/Databricks workloads when big data job cost, runtime, or stability must be improved.
version: 1.0.0
scope: big-data-engineering
allowed-tools:
  - job-profile-analysis
  - query-plan-inspection
  - storage-layout-review
  - cost-monitoring
safe-defaults:
  - no-direct-job-deletion
  - optimize-with-rollback-plan
---

# Big Data Platform Optimization

## When to Use?

- Jobs laufen zu lange oder instabil
- Compute-/Storage-Kosten steigen
- SLA-Verletzungen bei ETL/ELT Pipelines
- Ressourcenüberbelegung oder wiederkehrende Out-of-Memory Fehler

## Process

1. **Workload segmentieren**: Batch, Streaming, ad-hoc Analytics
2. **Plan & Runtime analysieren**: Shuffle, Skew, Joins, Serialization, Caching
3. **Storage Design prüfen**: Dateiformat, Partitionierung, Compaction, Z-Ordering/Clustering
4. **Kostenhebel priorisieren**: right-sizing, autoscaling policy, spot/on-demand mix
5. **Umsetzungsplan**: Quick Wins vs. strukturelle Änderungen mit Messkriterien

## Edge Cases

- Data Skew nur periodisch: Zeitfenster und saisonale Last berücksichtigen
- Kosten sinken, aber SLA bricht: Trade-off transparent machen
- Multi-Tenant Cluster: Nachbarschaftseffekte und Fair Scheduling prüfen

## Example Input

> "Unsere nächtlichen Spark-Jobs brauchen inzwischen 4 Stunden statt 90 Minuten. Bitte Optimierungsplan mit Kostenwirkung erstellen."

## Example Output

- Primärer Engpass: Shuffle Skew in Join auf hochkardinaler Dimension
- Quick Win: adaptive query execution aktivieren, kleine Dateien kompaktieren
- Strukturmaßnahme: Partitionierungsstrategie und Cluster Autoscaling überarbeiten
