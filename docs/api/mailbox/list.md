---
title: List Mailboxes
---

# List Mailboxes

Returns a paginated list of mailboxes on a domain.

<ApiEndpoint method="GET" path="/mailbox/list/{domain_name}" auth={true} />

## Permissions

Requires the `mailbox:view` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `domain_name` | `string` | The domain to list mailboxes for, e.g. `example.com`. Must be an active, DNS-verified domain owned by your organization. |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | integer | Yes | Items per page. Must be between 1 and 100. |
| `offset` | integer | Yes | Number of items to skip. Must be 0 or greater. |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/mailbox/list/example.com?limit=10&offset=0' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/mailbox/list/example.com?limit=10&offset=0', {
  headers: {
    'x-api-key': '<API_KEY>',
  },
});

const mailboxes = await response.json();
console.log(mailboxes);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/mailbox/list/example.com',
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
      "is_enabled": true,
      "forwarding_policy_id": null,
      "distribution_policy_id": null,
      "general_policy_id": null,
      "quota_allocated": 5.0,
      "quota_utilized_bytes": 734003200,
      "total_messages_count": 128
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
| `items` | `Mailbox[]` | Mailboxes on this page, sorted by email. Each has the fields listed under [Get Mailbox → Response Fields](./get#response-fields). |
| `total` | `integer` | Total number of mailboxes on the domain |
| `current_count` | `integer` | Number of mailboxes in `items` |
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
  "error": "Unauthorized: Missing required permission: mailbox:view"
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
| `401` | Missing/invalid `x-api-key`, or missing `mailbox:view` permission |
| `403` | `domain_name` is not accessible to your organization |
