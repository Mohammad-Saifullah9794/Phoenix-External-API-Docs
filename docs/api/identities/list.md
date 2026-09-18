---
title: List Identities
---

# List Identities

Returns a paginated list of identities within a domain.

<ApiEndpoint method="GET" path="/identity/list/{domain_name}" auth={true} />

## Permissions

Requires the `identity:view` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `domain_name` | `string` | The domain to list identities for, e.g. `example.com`. Must be an active, DNS-verified domain owned by your organization. |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | integer | Yes | Items per page. Must be between 1 and 100. |
| `offset` | integer | Yes | Number of items to skip. Must be 0 or greater. |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/identity/list/example.com?limit=10&offset=0' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/identity/list/example.com?limit=10&offset=0', {
  headers: {
    'x-api-key': '<API_KEY>',
  },
});

const identities = await response.json();
console.log(identities);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/identity/list/example.com',
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
      "email": "jane.doe@example.com",
      "domain_name": "example.com",
      "first_name": "Jane",
      "last_name": "Doe",
      "primary_phone": "+15551234567",
      "secondary_email": null,
      "is_app_2fa_enabled": false,
      "is_sms_2fa_enabled": false,
      "is_email_2fa_enabled": true,
      "restriction_policy_id": null,
      "department_id": null,
      "is_password_expired": false,
      "is_enabled": true,
      "password_updated_at": "2025-08-01T12:00:00Z",
      "created_at": "2025-06-01T10:00:00Z",
      "updated_at": "2025-08-01T12:00:00Z"
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
| `items` | `Identity[]` | Identities on this page, sorted by email. Each has the fields listed under [Get Identity → Response Fields](./get#response-fields). |
| `total` | `integer` | Total number of identities on the domain |
| `current_count` | `integer` | Number of identities in `items` |
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
  "error": "Unauthorized: Missing required permission: identity:view"
}
```

</TabItem>
<TabItem value="403" label="403 Forbidden">

`domain_name` isn't an active, DNS-verified domain owned by your organization.

```json
{
  "error": "Forbidden: Access to the specified domain is not allowed"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | `limit`/`offset` missing or out of the allowed range |
| `401` | Missing/invalid `x-api-key`, or missing `identity:view` permission |
| `403` | `domain_name` is not accessible to your organization |
