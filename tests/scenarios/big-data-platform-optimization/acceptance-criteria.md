# Acceptance Criteria: big-data-platform-optimization

## Spark Runtime Regression

### ✅ Correct
```text
Evaluate Shuffle and Skew as primary causes.
Prioritize quick wins and define metrics with cost impact.
```

### ❌ Incorrect
```text
Skew is secondary; tuning without metrics is sufficient.
```

## Cost and SLA Trade-offs

### ✅ Correct
```text
Include right-sizing, autoscaling, and spot/on-demand trade-offs.
Derive actions that protect SLA while reducing cost.
```

### ❌ Incorrect
```text
Optimize only for minimum cost without SLA consideration.
```

## Seasonal and Multi-Tenant Effects

### ✅ Correct
```text
Evaluate seasonal Data Skew patterns.
Consider Multi-Tenant effects and Fair Scheduling.
```

### ❌ Incorrect
```text
Month-end spikes are random and do not require dedicated analysis.
```
