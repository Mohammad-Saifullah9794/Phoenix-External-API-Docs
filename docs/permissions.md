---
sidebar_position: 4
title: Permissions
---

# Permissions

Each API key holds a list of permission strings, chosen when the key is created in the admin panel (see [Create an API key](./api-keys)). Permissions use the form `resource:action`. Every protected endpoint needs exactly one permission; [Who Am I](./api/self/who-am-i) shows which ones your key has.

Permissions follow one shape per resource — `view`, `create`, `edit`, `delete` — so the list below is a matrix rather than one row per permission. Click a resource to see exactly which endpoint each permission maps to.

| Resource | View | Create | Edit | Delete |
|----------|------|--------|------|--------|
| [Organization](./api/organization) | `organization:view` | — | — | — |
| [Domains](./api/domains) | `domain:view` | —¹ | `domain:edit` | —¹ |
| [Identities](./api/identities) | `identity:view` | `identity:create` | `identity:edit`² | `identity:delete` |
| [Departments](./api/departments) | `department:view` | `department:create` | `department:edit` | `department:delete` |
| [Mailboxes](./api/mailbox) | `mailbox:view` | `mailbox:create` | `mailbox:edit` | `mailbox:delete`³ |

¹ `domain:create` and `domain:delete` exist as grantable permissions, but domains can only be created or deleted from the admin panel — there's no API endpoint for them.<br/>
² Also covers [Reset Password](./api/identities/reset-password).<br/>
³ Not enforced yet — [Delete Mailbox](./api/mailbox/delete) currently only requires a valid key with access to the domain, not this permission.

The [API Health](./api/health) and [Self](./api/self) endpoints need a valid key (Self) or nothing at all (Health), but no specific permission. [Delete Mailbox](./api/mailbox/delete) also needs no specific permission today — see the note below.

## What happens without the permission

The request fails with `401 Unauthorized` and a JSON body naming the missing permission:

```json
{
  "error": "Unauthorized: Missing required permission: department:create"
}
```

If you just added the permission in the admin panel, call [`POST /self/refresh`](./api/self/refresh) once so the API picks it up — otherwise the old permission list stays cached for up to 7 hours.

:::tip Grant the least you need
There are no preset bundles such as "read-only" or "admin" — tick each permission individually. A reporting script only needs the `:view` permissions.
:::
