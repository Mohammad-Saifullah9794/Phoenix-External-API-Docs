---
title: Update Department
---

# Update Department

Updates a department's name and metadata.

<ApiEndpoint method="PATCH" path="/department/update/{department_id}" auth={true} />

## Permissions

Requires the `department:edit` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|--------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|--------------|
| `department_id` | `string` (UUID) | The department to update |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| `department_name` | `string` | Yes | New department name |
| `details` | `object` | Yes | Free-form department metadata |

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request PATCH '<BASE_URL>/department/update/7f9c2a10-4e3b-4c8a-9d2e-6b1f0a3c5d7e' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "department_name": "Platform Engineering",
  "details": {}
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch(
  '<BASE_URL>/department/update/7f9c2a10-4e3b-4c8a-9d2e-6b1f0a3c5d7e',
  {
    method: 'PATCH',
    headers: {
      'x-api-key': '<API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      department_name: 'Platform Engineering',
      details: {},
    }),
  },
);

const result = await response.json();
console.log(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.patch(
    '<BASE_URL>/department/update/7f9c2a10-4e3b-4c8a-9d2e-6b1f0a3c5d7e',
    headers={'x-api-key': '<API_KEY>'},
    json={'department_name': 'Platform Engineering', 'details': {}},
)
print(response.json())
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

The number of rows updated (always `1` on success).

```json
1
```

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: department:edit"
}
```

</TabItem>
<TabItem value="404" label="404 Not Found">

```json
{
  "error": "Resource not found: Department not found"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `department:edit` permission |
| `404` | Department not found for your organization |
