---
title: Organization
---

# Organization

Your **organization** is the account your API key belongs to — its profile details, identity allocation, storage quota and enabled services. The API can only read these details; they're managed from the admin panel.

| Method | Endpoint | Permission | Description |
|--------|----------|------------|-------------|
| `GET` | [`/organization/info`](./get) | `organization:view` | Get your organization's profile, quota and identity allocation |
