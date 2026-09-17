---
sidebar_position: 1
---

# Introduction

Welcome to the Phoenix Admin API documentation. The API is built in Rust on Actix Web and is currently in **active early-stage development** — the reference below covers what's live today and will grow as new resources ship.

:::warning Early Stage
This API is public and under active development. Endpoints, request/response shapes, and permission names may change without a deprecation period until the API reaches a stable release.
:::

## Base URL

Every request in this reference is shown against a placeholder:

```
<BASE_URL>
```

Replace `<BASE_URL>` with the base URL for your environment. Contact us if you don't have one yet.

## What's available today

- **[API Health](./api/health)** — an unauthenticated check that the API, database, and cache are all reachable
- **[Self](./api/self)** — inspect the organization and permissions tied to your API key, and refresh its cached session
- **[Organization](./api/organization)** — read your organization's quota, identity allocation, and enabled services
- **[Domains](./api/domains)** — list domains and update a limited set of domain settings
- **[Identities](./api/identities)** — list, read, update, delete identities within a domain, and reset their passwords
- **[Departments](./api/departments)** — full CRUD for organizing identities into departments

## Authentication at a glance

Every protected endpoint expects an `X-API-Key` header, and most also require a specific permission on that key. See the [Authentication](./authentication) guide for the header details, [Permissions](./permissions) for the full permission list, and [Who Am I](./api/self/who-am-i) to check what a given key is allowed to do.

## What's coming next

Mailbox management is scaffolded in the API but not yet exposed publicly. It'll be documented here once it ships.

## Getting Started

1. **Check [API Health](./api/health)** to confirm you can reach the API
2. **Read [Authentication](./authentication)** to obtain and use your `X-API-Key`
3. **Call [Who Am I](./api/self/who-am-i)** to verify your key and see its permissions
4. **Browse [Permissions](./permissions)** to see what each permission unlocks
