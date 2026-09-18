---
sidebar_position: 4
title: Permissions
---

# Permissions

Each API key holds a list of permission strings, chosen when the key is created in the admin panel (see [Create an API key](./api-keys)). Permissions use the form `resource:action`. Every protected endpoint needs exactly one permission; [Who Am I](./api/self/who-am-i) shows which ones your key has.

| Permission | Endpoints it unlocks |
|------------|----------------------|
| `organization:view` | [Get Organization](./api/organization) |
| `domain:view` | [List Domains](./api/domains/list), [Get Domain](./api/domains/get) |
| `domain:edit` | [Update Domain](./api/domains/update) |
| `identity:view` | [List Identities](./api/identities/list), [Get Identity](./api/identities/get) |
| `identity:create` | [Create Identity](./api/identities/create) |
| `identity:edit` | [Update Identity](./api/identities/update), [Reset Password](./api/identities/reset-password) |
| `identity:delete` | [Delete Identity](./api/identities/delete) |
| `department:view` | [List Departments](./api/departments/list), [Get Department](./api/departments/get) |
| `department:create` | [Create Department](./api/departments/create) |
| `department:edit` | [Update Department](./api/departments/update) |
| `department:delete` | [Delete Department](./api/departments/delete) |

The [API Health](./api/health) and [Self](./api/self) endpoints need a valid key (Self) or nothing at all (Health), but no specific permission.

## What happens without the permission

The request fails with `401 Unauthorized` and a JSON body naming the missing permission:

```json
{
  "error": "Unauthorized: Missing required permission: department:create"
}
```

If you just added the permission in the admin panel, call [`POST /self/refresh`](./api/self/refresh) once so the API picks it up — otherwise the old permission list stays cached for up to 7 hours.

## Permissions offered in the admin panel but not used yet

- `domain:create` and `domain:delete` — domains can only be created or deleted from the admin panel, so the API has no endpoint for these.
- `mailbox:view`, `mailbox:create`, `mailbox:edit`, `mailbox:delete` — mailbox endpoints are being added and will be documented here when they're released.

:::tip Grant the least you need
There are no preset bundles such as "read-only" or "admin" — tick each permission individually. A reporting script only needs the `:view` permissions.
:::
