---
name: provider-test-patterns
description: Apply proven acceptance-test patterns for Terraform providers using terraform-plugin-testing and Plugin Framework.
version: 1.0.0
scope: terraform-provider-development
---

# Provider Test Patterns

Use this skill for acceptance-test architecture, not just single test cases.

## Patterns

- Basic + update scenarios in one test flow
- Import verification with clear ignore lists where needed
- Disappears checks for external deletions
- Validation tests with expected errors
- Regression tests tied to concrete bug IDs

## Best Practices

1. Prefer `ConfigStateChecks` in new tests.
2. Use deterministic config helper builders.
3. Keep `CheckDestroy` strong and explicit.
4. Gate tests by Terraform version where necessary.

## Reference

- <https://developer.hashicorp.com/terraform/plugin/testing/testing-patterns>
- Source adapted from HashiCorp skill: <https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/provider-development/skills/provider-test-patterns/SKILL.md>
