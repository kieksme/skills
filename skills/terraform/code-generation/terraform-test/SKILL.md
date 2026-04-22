---
name: terraform-test
description: Write and run Terraform tests with .tftest.hcl files, run blocks, assertions, and mock-aware strategies.
version: 1.0.0
scope: terraform-code-generation
---

# Terraform Test

Use this skill to create deterministic Terraform tests and split fast plan tests from slower apply tests.

## When to Use

- Building `.tftest.hcl` suites
- Validating module behavior with assertions
- Debugging `terraform test` failures

## Process

1. Start with plan-mode tests for defaults, validation rules, and outputs.
2. Add focused apply-mode integration tests only where runtime behavior matters.
3. Keep clear naming (`*_unit_test.tftest.hcl`, `*_integration_test.tftest.hcl`).
4. Add precise assertion messages for fast diagnosis.
5. Use `expect_failures` for negative validation scenarios.

## Commands

- `terraform test`
- `terraform test -verbose`
- `terraform test -no-cleanup` (debug only)

## Reference

- https://developer.hashicorp.com/terraform/language/tests
- Source adapted from HashiCorp skill: https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/code-generation/skills/terraform-test/SKILL.md
