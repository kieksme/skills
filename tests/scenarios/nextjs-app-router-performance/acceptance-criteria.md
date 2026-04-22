# Acceptance Criteria: nextjs-app-router-performance

## Rendering and Cache Diagnostics

### ✅ Correct
```text
Analyze TTFB across static, dynamic, and ISR strategies.
Differentiate fetch cache and route cache before prioritizing optimizations.
```

### ❌ Incorrect
```text
Use only client-side rendering; caching is not relevant.
```

## Interaction Performance

### ✅ Correct
```text
Explain INP regressions through Re-Renders and Overfetching.
Include deduplicated requests and at least one quick win.
```

### ❌ Incorrect
```text
INP is optional and Re-Renders have no impact.
```

## Bundle and Hydration Cost

### ✅ Correct
```text
Separate Bundle and Hydration costs.
Evaluate segmentation with Server Components and Client Components.
```

### ❌ Incorrect
```text
All components should be Client Components; segmentation is unnecessary.
```
