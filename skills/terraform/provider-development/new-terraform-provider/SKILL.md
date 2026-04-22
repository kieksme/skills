---
name: new-terraform-provider
description: Scaffold a new Terraform provider with Plugin Framework and baseline build/test checks.
version: 1.0.0
scope: terraform-provider-development
---

# New Terraform Provider

Use this skill when bootstrapping a provider repository.

## Process

1. Create a dedicated workspace named `terraform-provider-<name>`.
2. Initialize Go module and add `terraform-plugin-framework`.
3. Implement `main.go` provider entrypoint.
4. Run `go mod tidy`, build, and tests.

## Baseline Validation

- `go build -o /dev/null`
- `go test ./...`

## Reference

- <https://developer.hashicorp.com/terraform/plugin/framework>
- Source adapted from HashiCorp skill: <https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/provider-development/skills/new-terraform-provider/SKILL.md>
