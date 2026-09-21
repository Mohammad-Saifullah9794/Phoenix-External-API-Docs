---
sidebar_position: 1
title: Introduction
---

# Introduction

**Docs version: v1.0** — see [Tools and source code](#tools-and-source-code) below for where changes are tracked.

The Phoenix Admin API lets your own software do what an administrator does in the **Phoenix Admin Panel** — list your domains, create and manage identities, reset passwords, organize people into departments, and manage mailboxes — using an API key instead of a login.

:::warning Under active development
New endpoints are being added. Existing request and response shapes may still change before a stable release. Changes are tracked in the [API source repository](https://github.com/Yukthi-Systems/Phoenix-External-API/commits).
:::

## Base URL

The **base URL** is the address of the API server. Every endpoint path in these docs is added to the end of it to form the full request URL.

In the code samples, the base URL is written as `<BASE_URL>` and your key as `<API_KEY>`. Replace both before running a sample.

## Quick start

1. **Create an API key** in the admin panel — see [Create an API key](./api-keys). Copy the secret straight away, because it is only shown once.
2. **Check that the API is reachable** — open `<BASE_URL>/health/api` in your browser. You should see `API is healthy!`.
3. **Make your first authenticated call:**

   ```bash
   curl '<BASE_URL>/self/who-am-i' \
     --header 'x-api-key: <API_KEY>'
   ```

   The response shows your organization ID and the permissions your key holds.
4. **Call the endpoints your key has permission for.** The [Permissions](./permissions) page lists which permission each endpoint needs.

## What's available today

| Area | What you can do |
|------|-----------------|
| [API Health](./api/health) | Check that the API, its database and its cache are up (no key needed) |
| [Self](./api/self) | See the organization and permissions of your key, and reload them after a change |
| [Organization](./api/organization) | Read your organization's details, identity allocation and storage quota |
| [Domains](./api/domains) | List domains, read one, and update a limited set of domain settings |
| [Identities](./api/identities) | Create, list, read, update and delete identities, and reset their passwords |
| [Departments](./api/departments) | Create, list, read, update and delete departments |
| [Mailboxes](./api/mailbox) | Create, list, read, update and delete mailboxes, and manage their storage quota |

Before you build, it is worth reading [Errors](./errors) (the error format and what each status code means).

## Tools and source code

- **Postman collection** — [download it here](pathname:///postman/collection.json), import it into Postman, then set the `API_KEY` collection variable. `BASE_URL` is already set to the test environment.
- **API source code** — [Yukthi-Systems/Phoenix-External-API](https://github.com/Yukthi-Systems/Phoenix-External-API)
- **Docs source code** — [Yukthi-Systems/Phoenix-External-API-Docs](https://github.com/Yukthi-Systems/Phoenix-External-API-Docs). 

Spotted a mistake? Use the **Edit this page** link at the bottom of any page to propose a fix.
