---
name: provider-resources
description: Build Terraform provider resources and data sources with clean schema, CRUD behavior, and acceptance tests.
version: 1.0.0
scope: terraform-provider-development
---

# Provider Resources

Use this skill for Terraform Plugin Framework resource and data source implementation.

## Process

1. Define schema with explicit validators and plan modifiers.
2. Implement full CRUD lifecycle and state reconciliation.
3. Handle not-found and eventual consistency cases.
4. Add import support and disappears tests.
5. Document arguments, attributes, and import examples.

## Testing Priorities

- Basic create/update/import flow
- Drift/disappears behavior
- Destroy cleanup checks

## Reference

- <https://developer.hashicorp.com/terraform/plugin/framework/resources>
- Source adapted from HashiCorp skill: <https://raw.githubusercontent.com/hashicorp/agent-skills/main/terraform/provider-development/skills/provider-resources/SKILL.md>
