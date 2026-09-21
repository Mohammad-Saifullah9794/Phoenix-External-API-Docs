---
title: Who Am I
---

# Who Am I

Returns the organization and permission set tied to the `X-API-Key` used on the request. Use this to verify a key is active and to see exactly what it's allowed to do before calling other endpoints.

<ApiEndpoint method="GET" path="/self/who-am-i" auth={true} />

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Request

No path parameters, query parameters, or request body.

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

// Node.js 18+ (save as .mjs to use top-level await)
const session = await response.json();
console.log(session);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/self/who-am-i',
    headers={'x-api-key': '<API_KEY>'},
)
print(response.json())
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

```json
{
  "api_key": "<API_KEY>",
  "organization_id": "9185b224-89ee-72df-8530-b2473f54530b",
  "permissions": [
    "organization:view",
    "domain:view",
    "department:view",
    "department:create"
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `api_key` | `string` (UUID) | The API key that made the request, echoed back |
| `organization_id` | `string` (UUID) | The organization this key belongs to. It's the same value as `organization_id` from [Get Organization](../organization/get). |
| `permissions` | `string[]` | Every permission granted to this key, in `resource:action` form. See [Permissions](../../permissions) for what each one unlocks. The list is in the order it was saved, not sorted. |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

The key is missing, not a UUID, or doesn't match an active key. The body is plain text.

```text
Unauthorized: Invalid API Key
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing, malformed, or inactive `x-api-key` |

## Notes

Session lookups are cached in Redis after the first request. If you've just updated a key's permissions and need the change reflected immediately, call [Refresh Session](./refresh) to bust the cache.
