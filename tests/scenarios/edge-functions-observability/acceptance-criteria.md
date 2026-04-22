# Acceptance Criteria: edge-functions-observability

## Regional Latency Incidents

### ✅ Correct
```text
Investigate P99 by Region using Traces and Upstream dependencies.
Define fallback strategies and safe immediate mitigations.
```

### ❌ Incorrect
```text
Ignore regional differences and deploy global changes without verification.
```

## Cold Start Correlation

### ✅ Correct
```text
Combine Cold Start observations with Log Correlation and Config Diff.
Describe Blast Radius and reversible steps.
```

### ❌ Incorrect
```text
Cold Starts are always normal and do not require correlation.
```

## Retry and Timeout Stability

### ✅ Correct
```text
Analyze Timeout/Retry interaction with Downstream behavior.
Use rollback-first approach and Circuit-Breaker for stabilization.
```

### ❌ Incorrect
```text
Increase retries without limits; timeouts will resolve themselves.
```
