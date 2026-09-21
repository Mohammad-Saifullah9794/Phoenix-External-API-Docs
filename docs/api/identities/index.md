---
title: Identities
sidebar_label: Overview
---

# Identities

An **identity** is a user account on one of your domains — an email address such as `jane.doe@example.com` with a password, profile details and 2FA settings. A [mailbox](../mailbox) (storage for mail) is attached to an identity separately.

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| `GET` | [`/identity/list/{domain_name}`](./list) | `identity:view` | List identities on a domain |
| `GET` | [`/identity/info/{email_id}`](./get) | `identity:view` | Get one identity |
| `POST` | [`/identity/create`](./create) | `identity:create` | Create an identity |
| `PATCH` | [`/identity/update`](./update) | `identity:edit` | Update an identity's profile |
| `PUT` | [`/identity/update/password/{email_id}`](./reset-password) | `identity:edit` | Set a new password |
| `DELETE` | [`/identity/delete/{email_id}`](./delete) | `identity:delete` | Delete an identity |

## Which domains you can use

- **List, Create and Update** only work on domains that belong to your organization **and** are active **and** DNS-verified. Any other domain returns `403 Forbidden: Access to the specified domain is not allowed`.
- **Get, Reset Password and Delete** work on any identity on a domain your organization owns. An identity you don't own looks like it doesn't exist — `null` for Get, `404` for the others.

## Identity count

Your organization can hold a limited number of identities (`allocated_email_identities` in [Get Organization](../organization/get)). Creating an identity adds 1 to `utilized_email_identities`; deleting one subtracts 1. When the limit is reached, [Create Identity](./create) returns `403`.
