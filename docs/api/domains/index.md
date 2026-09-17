---
title: Domains
---

# Domains

Endpoints for listing and managing the email domains your organization owns. Domain creation and deletion are handled from the admin panel — the API can only read and edit a limited set of fields on existing domains.

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | [`/domain/list`](./list) | List all domains in your organization |
| `GET` | [`/domain/info/{domain_name}`](./get) | Get details for a single domain |
| `PATCH` | [`/domain/update/{domain_name}`](./update) | Update an existing domain |
