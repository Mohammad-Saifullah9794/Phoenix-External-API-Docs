---
title: Self
---

# Self

"Self" means **the API key making the request**. These endpoints tell you which organization the key belongs to and what it is allowed to do. They need a valid `x-api-key` header ([Authentication](../../authentication)) but no specific permission.

| Method | Endpoint | Use it to |
|--------|----------|-----------|
| `GET` | [`/self/who-am-i`](./who-am-i) | Check a key works and see its organization ID and permissions |
| `POST` | [`/self/refresh`](./refresh) | Apply a change made to the key in the admin panel immediately,  |

Typical use: call **Who Am I** once when your integration starts, to confirm the key is valid and has the permissions you need. Call **Refresh** only after someone edits the key in the admin panel — not before every request.
