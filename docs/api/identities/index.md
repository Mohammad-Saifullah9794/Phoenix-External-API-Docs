---
title: Identities
---

# Identities

Endpoints for managing email identities (mailboxes' login identities) within a domain. Identity creation is not yet exposed via the API.

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | [`/identity/list/{domain_name}`](./list) | List identities within a domain |
| `GET` | [`/identity/info/{email_id}`](./get) | Get details for a single identity |
| `PATCH` | [`/identity/update`](./update) | Update an identity |
| `DELETE` | [`/identity/delete/{email_id}`](./delete) | Delete an identity |
| `PUT` | [`/identity/update/password/{email_id}`](./reset-password) | Reset an identity's password |

:::note Domain access is scoped to your organization
Every identity endpoint checks that the identity's domain belongs to your organization (and, for listing, that it's active and DNS-verified). Requests against a domain you don't own get a `403 Forbidden`.
:::
