---
title: Create Department
---

# Create Department

Creates a new department in your organization.

<ApiEndpoint method="POST" path="/department/create" auth={true} />

## Permissions

Requires the `department:create` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|--------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| `department_name` | `string` | Yes | Department name |
| `details` | `object` | Yes | Free-form department metadata |

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/department/create' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "department_name": "Engineering",
  "details": {}
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/department/create', {
  method: 'POST',
  headers: {
    'x-api-key': '<API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    department_name: 'Engineering',
    details: {},
  }),
});

const result = await response.json();
console.log(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.post(
    '<BASE_URL>/department/create',
    headers={'x-api-key': '<API_KEY>'},
    json={'department_name': 'Engineering', 'details': {}},
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
  "department_id": "7f9c2a10-4e3b-4c8a-9d2e-6b1f0a3c5d7e",
  "result": 1
}
```

| Field | Type | Description |
|-------|------|--------------|
| `department_id` | `string` (UUID) | The newly created department's ID |
| `result` | `integer` | Number of rows inserted (always `1` on success) |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: department:create"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `department:create` permission |
