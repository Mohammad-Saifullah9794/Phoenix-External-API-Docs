---
title: Get Organization
---

# Get Organization

Returns details about the organization your API key belongs to — quota usage, enabled services, and identity allocation.

<ApiEndpoint method="GET" path="/organization/info" auth={true} />

## Permissions

Requires the `organization:view` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|--------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Request

No path parameters, query parameters, or request body.

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/organization/info' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/organization/info', {
  headers: {
    'x-api-key': '<API_KEY>',
  },
});

const org = await response.json();
console.log(org);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/organization/info',
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
  "organization_id": "9185b224-89ee-72df-8530-b2473f54530b",
  "organization_name": "Acme Inc",
  "organization_info": {},
  "is_active": true,
  "allocated_email_identities": 100,
  "utilized_email_identities": 42,
  "quota_allocated": 500.0,
  "quota_utilized": 128.4,
  "chat_service_enabled": false,
  "email_service_enabled": true,
  "file_service_enabled": false,
  "created_at": "2025-01-10T09:12:00Z"
}
```

| Field | Type | Description |
|-------|------|--------------|
| `organization_id` | `string` (UUID) | Your organization's ID |
| `organization_name` | `string` | Organization display name |
| `organization_info` | `object` | Free-form organization metadata |
| `is_active` | `boolean` | Whether the organization is active |
| `allocated_email_identities` | `integer` | Total email identity slots allocated |
| `utilized_email_identities` | `integer` | Email identity slots currently in use |
| `quota_allocated` | `number` | Total storage quota allocated (GB) |
| `quota_utilized` | `number` | Storage quota currently used (GB) |
| `chat_service_enabled` | `boolean` | Whether the chat service is enabled |
| `email_service_enabled` | `boolean` | Whether the email service is enabled |
| `file_service_enabled` | `boolean` | Whether the file service is enabled |
| `created_at` | `string` (ISO 8601) | When the organization was created |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

The key is missing, malformed, inactive, or lacks the `organization:view` permission.

```text
Unauthorized: Invalid API Key
```

```json
{
  "error": "Unauthorized: Missing required permission: organization:view"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `organization:view` permission |
