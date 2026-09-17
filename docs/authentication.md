---
sidebar_position: 2
---

# Authentication

All protected endpoints authenticate requests using an API key sent in the `X-API-Key` header. There is no separate login step — the key itself is the credential.

## Authentication Header

**Header name**: `x-api-key` 


**Header value**: your API key, a UUID (e.g. `<API_KEY>`)

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/self/who-am-i' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/self/who-am-i', {
  headers: {
    'x-api-key': '<API_KEY>',
  },
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/self/who-am-i',
    headers={'x-api-key': '<API_KEY>'},
)
```

</TabItem>
</Tabs>

:::danger Keep your API key secret
Anyone with your API key can make requests as your organization, scoped to whatever permissions the key holds. Never log it, commit it to version control, or expose it to client-side code.
:::

## How it's validated

Each key is looked up against an `is_active` record tied to an organization and a set of permission strings. A valid, active key is cached (in Redis) after its first use, so subsequent requests resolve without a database round trip.

```text title="401 Unauthorized"
Unauthorized: Invalid API Key
```

You'll get this if the header is missing, isn't a valid UUID, or doesn't match an active key.

## Checking what a key can do

Call [`GET /self/who-am-i`](./api/self/who-am-i) with your key to see the organization it belongs to and the permissions it holds. If you've just changed a key's permissions and need that change reflected immediately, call [`POST /self/refresh`](./api/self/refresh) to bust the cache.

## Which endpoints need this?

Every endpoint documents whether it requires authentication via an **Auth required** / **No auth** badge at the top of its page.
