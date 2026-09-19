---
title: Refresh Session
---

# Refresh Session

Refreshes the cached session for the current `X-API-Key`. Session lookups (organization, permissions) are cached for performance; call this after changing a key's permissions if you need the change to be reflected immediately instead of waiting for the cache to expire.

<ApiEndpoint method="POST" path="/self/refresh" auth={true} />

## Headers

| Header | Required | Description |
|--------|----------|--------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Request

No path parameters, query parameters, or request body.

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request POST '<BASE_URL>/self/refresh' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/self/refresh', {
  method: 'POST',
  headers: {
    'x-api-key': '<API_KEY>',
  },
});

const session = await response.json();
console.log(session);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.post(
    '<BASE_URL>/self/refresh',
    headers={'x-api-key': '<API_KEY>'},
)
print(response.json())
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

The response shape is identical to [Who Am I](./who-am-i).

```json
{
  "api_key": "<API_KEY>",
  "organization_id": "9185b224-89ee-72df-8530-b2473f54530b",
  "permissions": [
    "domain:view",
    "mailbox:view"
  ]
}
```

| Field | Type | Description |
|-------|------|--------------|
| `api_key` | `string` (UUID) | The API key that made the request, echoed back |
| `organization_id` | `string` (UUID) | The organization this key belongs to |
| `permissions` | `string[]` | Permission strings granted to this key, in `resource:action` form |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

The key is missing, malformed, or doesn't match an active key.

```text
Unauthorized: Invalid API Key
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing, malformed, or inactive `x-api-key` |
