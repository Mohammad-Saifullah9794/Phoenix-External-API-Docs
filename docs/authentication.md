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

> **Base URL**: The root URL of the Phoenix Admin API. All API endpoints are accessed by appending the endpoint path to the Base URL. In the examples below, replace `<BASE_URL>` with this root URL and `<API_KEY>` with your API key.

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/self/who-am-i' \
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

## How it's validated

Each key is looked up against an `is_active` record tied to an organization and a set of permission strings. A valid, active key is cached (in Redis) after its first use, so subsequent requests resolve without a database round trip.

```text title="401 Unauthorized"
Unauthorized: Invalid API Key
```

You'll get this if the header is missing, isn't a valid UUID, or doesn't match an active key.

## How key details are cached

A valid key's organization and permissions are cached in Redis for up to **7 hours** after they're first resolved. If you edit, deactivate or delete a key — or change its permissions — in the admin panel, that change is not picked up until the cache expires, unless you call [`POST /self/refresh`](./api/self/refresh) with that key to bust the cache immediately.

## Checking what a key can do

Call [`GET /self/who-am-i`](./api/self/who-am-i) with your key to see the organization it belongs to and the permissions it holds. If you've just changed a key's permissions and need that change reflected immediately, call [`POST /self/refresh`](./api/self/refresh) to bust the cache.

## Which endpoints need this?

Every endpoint documents whether it requires authentication via an **Auth required** / **No auth** badge at the top of its page.
