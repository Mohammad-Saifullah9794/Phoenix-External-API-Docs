---
title: Mailboxes
---

# Mailboxes

A **mailbox** is the actual mail storage (inbox, folders and quota) behind an email address. An [identity](../identities) is the user account and login; its mailbox is provisioned separately, and the API does not check that a matching identity exists before creating or deleting one.

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| `GET` | [`/mailbox/list/{domain_name}`](./list) | `mailbox:view` | List mailboxes on a domain |
| `GET` | [`/mailbox/info/{email_id}`](./get) | `mailbox:view` | Get one mailbox |
| `POST` | [`/mailbox/create`](./create) | `mailbox:create` | Create a mailbox |
| `PATCH` | [`/mailbox/update`](./update) | `mailbox:edit` | Update a mailbox's enabled state and policies |
| `PUT` | [`/mailbox/update/quota`](./quota) | `mailbox:edit` | Change a mailbox's storage quota |
| `DELETE` | [`/mailbox/delete/{domain_name}/{email_prefix}`](./delete) | `mailbox:delete` | Delete a mailbox |

## Which domains you can use

- **List and Create** only work on domains that belong to your organization **and** are active **and** DNS-verified. Any other domain returns `403 Forbidden: Access to the specified domain is not allowed`.
- **Update and Update Quota** require the `domain_name` you send in the body to be one of your active, DNS-verified domains.
- **Get** works on any mailbox on a domain your organization owns — an active/verified domain is not required. A mailbox you don't own looks like it doesn't exist — `null` for Get.
- **Delete** only requires that `domain_name` belongs to your organization; it doesn't need to be active or DNS-verified.

## Storage quota uses two different units

[Get Mailbox](./get) returns `quota_allocated` **in GB** but `quota_utilized_bytes` **in bytes**. To compare the two, divide `quota_utilized_bytes` by `1024^3`. This mirrors [Get Organization](../organization/get), whose own `quota_allocated` / `quota_utilized` are both in GB.

## New mailboxes start disabled

[Create Mailbox](./create) always sets `is_enabled` to `false` — there's no field to override this. The mail server provisions the mailbox asynchronously after the API call returns; enable it with [Update Mailbox](./update) once it's ready.
