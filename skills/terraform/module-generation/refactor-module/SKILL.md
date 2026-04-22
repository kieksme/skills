---
name: refactor-module
description: Refactor monolithic Terraform into reusable modules with clear inputs, outputs, and migration safety.
version: 1.0.0
scope: terraform-module-generation
---

# Refactor Module

Use this skill to split large Terraform configurations into composable modules without unsafe state churn.

## Process

1. Identify cohesive resource groups and dependencies.
2. Design stable module interfaces (typed variables + documented outputs).
3. Replace duplicated patterns with reusable module blocks.
4. Plan state migration (`moved` blocks or `terraform state mv`).
5. Validate with tests and zero-diff migration plans.

## Pitfalls to Avoid

- Over-generic module interfaces (`map(any)` everywhere)
- Hidden coupling between modules
- State moves without rehearsal in non-production

## Reference

- https://developer.hashicorp.com/terraform/language/modules/develop
- Source adapted from HashiCorp skill: https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/module-generation/skills/refactor-module/SKILL.md
