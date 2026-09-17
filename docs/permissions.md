---
sidebar_position: 3
---

# Permissions

Every API key holds a list of permission strings, returned by [Who Am I](./api/self/who-am-i). Each protected endpoint requires one specific permission — if it's missing, the request fails with `401 Unauthorized: Missing required permission: <permission>`.

Permissions follow a `resource:action` naming convention.

| Permission | Grants |
|------------|--------|
| `organization:view` | Read your organization's info via [Get Organization](./api/organization) |
| `domain:view` | List and read domains via [List Domains](./api/domains/list) / [Get Domain](./api/domains/get) |
| `domain:edit` | Update a domain via [Update Domain](./api/domains/update) |
| `identity:view` | List and read identities via [List Identities](./api/identities/list) / [Get Identity](./api/identities/get) |
| `identity:edit` | Update an identity or reset its password via [Update Identity](./api/identities/update) / [Reset Password](./api/identities/reset-password) |
| `identity:delete` | Delete an identity via [Delete Identity](./api/identities/delete) |
| `department:view` | List and read departments via [List Departments](./api/departments/list) / [Get Department](./api/departments/get) |
| `department:create` | Create a department via [Create Department](./api/departments/create) |
| `department:edit` | Update a department via [Update Department](./api/departments/update) |
| `department:delete` | Delete a department via [Delete Department](./api/departments/delete) |

:::info No predefined permission sets
Permissions are assigned individually to each API key — there's no bundled "read-only" or "admin" preset. Grant only what a given key needs.
:::

:::tip Checking a key's permissions
Call [`GET /self/who-am-i`](./api/self/who-am-i) to see exactly which permissions the current key holds.
:::

## What's not here yet

Mailbox management is scaffolded in the API but not yet exposed publicly — its permissions (`mailbox:view`, `mailbox:create`, `mailbox:edit`, `mailbox:delete`) aren't live yet and will be documented once they ship.
