---
sidebar_position: 2
title: Authentication
---

# Authentication

Every endpoint except [API Health](./api/health) needs an API key. There is no login step and no token to refresh — you send the key itself with every request.

## Get a key

API keys are created by an administrator in the Phoenix Admin Panel under **Settings → API Keys**. See [Create an API key](./api-keys) for a step-by-step guide. The key is a UUID such as `3f2b8c1e-7a4d-4e9b-8c2f-1d5e6a7b8c9d`.

## Send the key in the `x-api-key` header

| Header name | Header value |
|-------------|-------------|
| `x-api-key` | Your API key (UUID) |

Header names are not case-sensitive, so `X-API-Key` works too. Do not add a prefix such as `Bearer`.

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl '<BASE_URL>/self/who-am-i' \
  --header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

Requires Node.js 18 or later (built-in `fetch`). Save as `who-am-i.mjs` and run `node who-am-i.mjs`.

```js
const response = await fetch('<BASE_URL>/self/who-am-i', {
  headers: { 'x-api-key': '<API_KEY>' },
});

console.log(response.status, await response.text());
```

</TabItem>
<TabItem value="python" label="Python">

Requires the `requests` package: `pip install requests`.

```python
import requests

response = requests.get(
    '<BASE_URL>/self/who-am-i',
    headers={'x-api-key': '<API_KEY>'},
)
print(response.status_code, response.text)
```

</TabItem>
</Tabs>

:::danger Keep your API key secret
Anyone who has the key can act as your organization, within the permissions the key holds. Keep it on your server, never in browser or mobile app code, and never commit it to a repository. If a key leaks, deactivate or delete it in the admin panel and create a new one.
:::

## When a key is rejected

If the header is missing, is not a valid UUID, or does not match an active key, the API responds with `401` and a **plain-text** body (not JSON):

```text title="401 Unauthorized"
Unauthorized: Invalid API Key
```

If the key is valid but lacks the permission an endpoint needs, the API also responds with `401`, this time with a JSON body:

```json title="401 Unauthorized"
{
  "error": "Unauthorized: Missing required permission: domain:view"
}
```

See [Errors](./errors) for every status code the API can return.

## How key details are cached

The first time a key is used, the API loads its organization and permissions from the database and **caches them for 7 hours**. Every request after that uses the cached copy.

This means changes made to a key in the admin panel — adding or removing a permission, deactivating it — **do not take effect for up to 7 hours** on their own. To apply a change immediately, call [`POST /self/refresh`](./api/self/refresh) once with that key after you change it. You do not need to call it before normal requests.

:::caution Deactivating or deleting a leaked key
A deactivated or deleted key keeps working until its cache entry expires (up to 7 hours) or until `POST /self/refresh` is called with it. If a key has leaked, call `POST /self/refresh` with that key right after deactivating it — the API then clears it from the cache and rejects it from that point on.
:::

To see what a key can do right now, call [`GET /self/who-am-i`](./api/self/who-am-i).
