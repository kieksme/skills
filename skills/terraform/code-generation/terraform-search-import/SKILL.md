---
name: terraform-search-import
description: Discover existing cloud resources with Terraform Search and import them safely into managed Terraform state.
version: 1.0.0
scope: terraform-code-generation
---

# Terraform Search and Import

Use this skill when you need to bring existing unmanaged resources under Terraform control.

## When to Use

- IaC migration from manually created infrastructure
- Inventory and import of cloud resources
- Controlled bootstrap of existing environments

## Process

1. Verify provider support for list resources.
2. Create `.tfquery.hcl` files with `list` blocks.
3. Run `terraform query` and inspect results.
4. Generate config via `-generate-config-out`.
5. Clean generated config before `plan` and `apply`.

## Guardrails

- Confirm Terraform version/provider compatibility first.
- Remove computed/read-only generated attributes.
- Rename generated resources to meaningful names before apply.

## Reference

- <https://developer.hashicorp.com/terraform/language/block/tfquery/list>
- <https://developer.hashicorp.com/terraform/language/import/bulk>
- Source adapted from HashiCorp skill: <https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/code-generation/skills/terraform-search-import/SKILL.md>
