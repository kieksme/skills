---
name: azure-verified-modules
description: Apply Azure Verified Modules requirements for Terraform module quality, compatibility, and certification readiness.
version: 1.0.0
scope: terraform-code-generation
---

# Azure Verified Modules

Use this skill when implementing or reviewing Azure Terraform modules that should align with AVM requirements.

## Focus Areas

- Provider/version constraints for `azurerm` and `azapi`
- Naming, ordering, and lifecycle conventions
- Variable and output quality standards
- Breaking-change safety and feature flags
- Required testing and documentation expectations

## Minimum Checklist

1. Explicit Terraform and provider constraints.
2. Typed variables with clear descriptions.
3. Sensitive values marked and handled safely.
4. Outputs avoid dumping whole resource objects.
5. New behavior in minor releases guarded by toggles.

## Reference

- <https://azure.github.io/Azure-Verified-Modules/>
- <https://azure.github.io/Azure-Verified-Modules/specs/terraform/>
- Source adapted from HashiCorp skill: <https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/code-generation/skills/azure-verified-modules/SKILL.md>
