---
name: terraform-stacks
description: Build and operate Terraform Stacks across environments and regions using .tfcomponent.hcl and .tfdeploy.hcl.
version: 1.0.0
scope: terraform-module-generation
---

# Terraform Stacks

Use this skill when orchestrating multiple Terraform components and deployments with Terraform Stacks.

## Core Concepts

- Components define reusable infrastructure units.
- Deployments instantiate components for environment/region/account targets.
- Stack files use dedicated extensions (`.tfcomponent.hcl`, `.tfdeploy.hcl`).

## Process

1. Define required providers and components.
2. Model deployment inputs per environment.
3. Configure identity tokens and secure variable stores.
4. Validate and upload stack configuration.
5. Monitor deployment runs and approvals.

## Guardrails

- Keep component boundaries clean and explicit.
- Commit lock files.
- Use workload identity over static credentials.

## Reference

- https://developer.hashicorp.com/terraform/language/stacks
- Source adapted from HashiCorp skill: https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/module-generation/skills/terraform-stacks/SKILL.md
