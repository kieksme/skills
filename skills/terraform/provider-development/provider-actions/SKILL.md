---
name: provider-actions
description: Implement Terraform provider lifecycle actions with Plugin Framework schema, progress, and error handling patterns.
version: 1.0.0
scope: terraform-provider-development
---

# Provider Actions

Use this skill for imperative provider actions triggered at Terraform lifecycle points.

## Implementation Checklist

1. Define strict action schema (types, validators, defaults).
2. Implement `Invoke` with robust diagnostics and progress updates.
3. Enforce timeout handling and long-running polling patterns.
4. Add acceptance tests for success, failure, and timeout cases.
5. Document examples and changelog entries.

## Guardrails

- Validate every input before API calls.
- Return actionable errors with resource context.
- Avoid silent retries without visibility.

## Reference

- <https://developer.hashicorp.com/terraform/plugin/framework>
- Source adapted from HashiCorp skill: <https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/provider-development/skills/provider-actions/SKILL.md>
