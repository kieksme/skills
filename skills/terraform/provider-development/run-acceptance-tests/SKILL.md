---
name: run-acceptance-tests
description: Run and debug Terraform provider acceptance tests (TestAcc*) with progressive diagnostics.
version: 1.0.0
scope: terraform-provider-development
---

# Run Acceptance Tests

Use this skill when running provider tests with `TestAcc` prefixes.

## Standard Flow

1. Run focused test with `TF_ACC=1`.
2. Re-run with `-count=1` to avoid cached results.
3. Add `-v` for verbose logs.
4. Add `TF_LOG=debug` for deeper tracing.
5. Optionally persist working dirs for inspection.

## Minimal Command

`TF_ACC=1 go test -run=TestAccFeatureHappyPath`

## Reference

- Source adapted from HashiCorp skill: https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/provider-development/skills/run-acceptance-tests/SKILL.md
