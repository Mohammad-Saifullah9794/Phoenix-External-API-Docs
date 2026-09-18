---
title: Refresh Session
---

# Refresh Session

Reloads the current key's organization and permissions from the database and replaces the cached copy.

**Why this exists:** the API caches each key's details for **7 hours** after first use. If someone changes the key in the admin panel — adds or removes a permission, deactivates or deletes it — the API keeps using the old details until the cache expires. Call this endpoint once, with the key that was changed, to apply the change immediately.

You don't need to call it before normal requests. Once is enough after each change.

<ApiEndpoint method="POST" path="/self/refresh" auth={true} />

## Headers

| Header | Required | Description |
|--------|----------|-------------|
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

// Node.js 18+ (save as .mjs to use top-level await)
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

Returns the key's **updated** details, in the same shape as [Who Am I](./who-am-i).

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
| `organization_id` | `string` (UUID) | The organization this key belongs to. It's the same value as `organization_id` from [Get Organization](../organization). |
| `permissions` | `string[]` | Every permission granted to this key, in `resource:action` form. See [Permissions](../../permissions) for what each one unlocks. The list is in the order it was saved, not sorted. |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

The key is missing, not a UUID, or doesn't match an active key. The body is plain text.

```text
Unauthorized: Invalid API Key
```

Or: the key was deactivated or deleted in the admin panel. The API removes it from the cache, and every later request with this key gets `401 Unauthorized: Invalid API Key`.

```json
{
  "error": "Unauthorized: API key is no longer valid"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `401` (plain text) | Missing, malformed, or unknown `x-api-key` |
| `401` (JSON) | The key has been deactivated or deleted since it was cached — it is now removed |

## Example: apply a permission change

1. Call [Who Am I](./who-am-i) — `permissions` contains `department:view` only.
2. In the admin panel, edit the key and tick **Create** on Departments.
3. Call [Who Am I](./who-am-i) again — still `department:view` only (cached).
4. Call `POST /self/refresh` — the response now includes `department:create`.
5. [Create Department](../departments/create) now succeeds.
