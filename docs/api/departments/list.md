---
title: List Departments
---

# List Departments

Returns a paginated list of departments in your organization.

<ApiEndpoint method="GET" path="/department/list" auth={true} />

## Permissions

Requires the `department:view` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | integer | Yes | Items per page. Must be between 1 and 100. |
| `offset` | integer | Yes | Number of items to skip. Must be 0 or greater. |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/department/list?limit=10&offset=0' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/department/list?limit=10&offset=0', {
  headers: {
    'x-api-key': '<API_KEY>',
  },
});

const departments = await response.json();
console.log(departments);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/department/list',
    params={'limit': 10, 'offset': 0},
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
  "items": [
    {
      "department_id": "00000000-0000-0000-0000-000000000000",
      "department_name": "Engineering",
      "details": {
        "address": "admin",
        "description": "admin department",
        "notes": "",
        "authorized_persons": []
      },
      "created_at": "2025-06-01T10:00:00Z",
      "updated_at": "2025-06-01T10:00:00Z"
    }
  ],
  "total": 1,
  "current_count": 1,
  "current_page": 1,
  "total_pages": 1
}
```

| Field | Type | Description |
|-------|------|-------------|
| `items` | `Department[]` | Departments on this page, sorted by name. Each has the fields listed under [Get Department → Response Fields](./get#response-fields). |
| `total` | `integer` | Total number of departments in your organization |
| `current_count` | `integer` | Number of departments in `items` |
| `current_page` | `integer` | Page number, starting at 1 |
| `total_pages` | `integer` | Total pages for the `limit` you sent |

See [Pagination](../../pagination) for how to page through results.

</TabItem>
<TabItem value="400" label="400 Bad Request">

```json
{
  "error": "Bad Request: Limit cannot be greater than 100"
}
```

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: department:view"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | `limit`/`offset` missing or out of the allowed range |
| `401` | Missing/invalid `x-api-key`, or missing `department:view` permission |
