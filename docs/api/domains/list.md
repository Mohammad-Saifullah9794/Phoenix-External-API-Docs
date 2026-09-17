---
title: List Domains
---

# List Domains

Returns a paginated list of domains owned by your organization, ordered by domain name.

<ApiEndpoint method="GET" path="/domain/list" auth={true} />

## Permissions

Requires the `domain:view` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|--------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|--------------|
| `limit` | integer | Yes | Items per page. Must be between 1 and 100. |
| `offset` | integer | Yes | Number of items to skip. Must be 0 or greater. |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/domain/list?limit=10&offset=0' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/domain/list?limit=10&offset=0', {
  headers: {
    'x-api-key': '<API_KEY>',
  },
});

const domains = await response.json();
console.log(domains);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/domain/list',
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
      "domain_name": "example.com",
      "anti_phishing_secret_code": "a1b2c3d4",
      "details": {},
      "is_active": true,
      "is_dns_txt_verified": true,
      "dns_txt_verification_key": "phoenix-verify-9f1c2b",
      "spam_destination": "Folder",
      "spam_destination_properties": {},
      "filter_policy_id": null,
      "attachment_policy_id": null,
      "catch_all": false,
      "catch_all_forward_to_email": null,
      "is_hybrid": false,
      "connector_properties": {},
      "max_password_age": 90,
      "max_password_age_properties": {},
      "session_timeout": 30,
      "disclaimer_id": null,
      "caution_id": null,
      "created_at": "2025-06-01T10:00:00Z"
    }
  ],
  "total": 1,
  "current_count": 1,
  "current_page": 1,
  "total_pages": 1
}
```

The `items` array holds [Domain objects](./get#response-fields); `total`, `current_count`, `current_page`, and `total_pages` describe the pagination state for the `limit`/`offset` you passed.

</TabItem>
<TabItem value="400" label="400 Bad Request">

`limit` or `offset` is missing or out of range.

```json
{
  "error": "Bad Request: Limit cannot be greater than 100"
}
```

</TabItem>
<TabItem value="401" label="401 Unauthorized">

The key is missing, malformed, inactive, or lacks the `domain:view` permission.

```json
{
  "error": "Unauthorized: Missing required permission: domain:view"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | `limit`/`offset` missing or out of the allowed range |
| `401` | Missing/invalid `x-api-key`, or missing `domain:view` permission |
