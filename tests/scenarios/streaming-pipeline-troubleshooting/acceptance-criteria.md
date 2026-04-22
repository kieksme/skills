# Acceptance Criteria: streaming-pipeline-troubleshooting

## Incident Diagnostics

### ✅ Correct
```text
Analyze Consumer Lag at partition level.
Identify the bottleneck and provide an immediate action plus stabilization plan.
```

### ❌ Incorrect
```text
Change directly in production without controlled rollout or risk assessment.
```

## Delivery Semantics

### ✅ Correct
```text
Compare at most once, at least once, and exactly once.
Use idempotent processing and dedup as primary controls for duplicates.
```

### ❌ Incorrect
```text
Semantics do not matter; retries alone solve duplicates and reordering.
```

## Partitioning Strategy

### ✅ Correct
```text
Detect Hot Partitioning, evaluate Partition Keys, and plan a reversible
mitigation rollout with small Blast Radius.
```

### ❌ Incorrect
```text
Ignore Partition Keys and only scale globally.
```
