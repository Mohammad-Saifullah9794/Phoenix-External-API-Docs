---
title: Update Mailbox Quota
---

# Update Mailbox Quota

Changes the storage quota allocated to a mailbox, adjusting your organization's available quota to match.

<ApiEndpoint method="PUT" path="/mailbox/update/quota" auth={true} />

## Permissions

Requires the `mailbox:edit` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | The mailbox to update. |
| `domain_name` | `string` | Yes | Must equal the part of `email` after `@`, and be one of your active, DNS-verified domains. |
| `new_quota_allocated` | `number` | Yes | New storage quota, **in GB**. Must be at least `0.1`, must be **greater than** the mailbox's current usage, and must be **different** from its current `quota_allocated`. |

:::note Comparing against usage
The mailbox's current usage ([Get Mailbox](./get)'s `quota_utilized_bytes`) is in bytes; the API converts it to GB (`quota_utilized_bytes / 1024^3`) before comparing it with `new_quota_allocated`.
:::

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request PUT '<BASE_URL>/mailbox/update/quota' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "email": "jane.doe@example.com",
  "domain_name": "example.com",
  "new_quota_allocated": 10.0
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/mailbox/update/quota', {
  method: 'PUT',
  headers: {
    'x-api-key': '<API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'jane.doe@example.com',
    domain_name: 'example.com',
    new_quota_allocated: 10.0,
  }),
});

const result = await response.json();
console.log(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.put(
    '<BASE_URL>/mailbox/update/quota',
    headers={'x-api-key': '<API_KEY>'},
    json={
        'email': 'jane.doe@example.com',
        'domain_name': 'example.com',
        'new_quota_allocated': 10.0,
    },
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

Increasing the quota raises your organization's `quota_utilized` ([Get Organization](../organization/get)) by the difference; lowering it (down to no less than current usage) lowers `quota_utilized` by the difference.

</TabItem>
<TabItem value="400" label="400 Bad Request">

```json
{
  "error": "Bad Request: Insufficient quota"
}
```

Returned when you're **increasing** the quota and your organization's `quota_allocated − quota_utilized` (in GB) is less than the increase requested. Also returned for field validation failures: `Email cannot be empty`, `Domain name cannot be empty`, `Email must match the domain name`, `New quota allocated must be a positive number greater than 0.1`.

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: mailbox:edit"
}
```

</TabItem>
<TabItem value="403" label="403 Forbidden">

`domain_name` isn't accessible to your organization.

```json
{
  "error": "Forbidden: Access to the specified domain is not allowed"
}
```

</TabItem>
<TabItem value="404" label="404 Not Found">

```json
{
  "error": "Resource not found: Mailbox not found"
}
```

</TabItem>
<TabItem value="409" label="409 Conflict">

```json
{
  "error": "Conflict: New quota allocation cannot be less than or equal to the currently used quota"
}
```

Or:

```json
{
  "error": "Conflict: New quota allocation cannot be equal to the current quota allocation"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | A field failed validation, or your organization doesn't have enough free quota for the increase |
| `401` | Missing/invalid `x-api-key`, or missing `mailbox:edit` permission |
| `403` | `domain_name` is not accessible to your organization |
| `404` | Mailbox not found |
| `409` | `new_quota_allocated` is at or below current usage, or equal to the current allocation |
