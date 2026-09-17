---
title: Self
---

# Self

Endpoints for inspecting the API key making the request — its organization and the permissions it holds. Everything under `/self` requires the `X-API-Key` header described in [Authentication](../../authentication).

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | [`/self/who-am-i`](./who-am-i) | Return the organization and permissions tied to the current API key |
| `POST` | [`/self/refresh`](./refresh) | Refresh the cached session for the current API key |
