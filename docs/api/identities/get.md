---
title: Get Identity
---

# Get Identity

Returns full details for a single identity.

<ApiEndpoint method="GET" path="/identity/info/{email_id}" auth={true} />

## Permissions

Requires the `identity:view` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|--------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|--------------|
| `email_id` | `string` | The identity's email address, e.g. `jane.doe@example.com` |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/identity/info/jane.doe@example.com' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch(
  `<BASE_URL>/identity/info/${encodeURIComponent('jane.doe@example.com')}`,
  { headers: { 'x-api-key': '<API_KEY>' } },
);

const identity = await response.json();
console.log(identity);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/identity/info/jane.doe@example.com',
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
```

#### Response Fields

| Field | Type | Description |
|-------|------|--------------|
| `email` | `string` | The identity's email address |
| `domain_name` | `string` | The domain this identity belongs to |
| `first_name` | `string` | First name |
| `last_name` | `string` or `null` | Last name |
| `primary_phone` | `string` | Primary phone number |
| `secondary_email` | `string` or `null` | Secondary/recovery email |
| `is_app_2fa_enabled` | `boolean` | Whether authenticator-app 2FA is enabled |
| `is_sms_2fa_enabled` | `boolean` | Whether SMS 2FA is enabled |
| `is_email_2fa_enabled` | `boolean` | Whether email 2FA is enabled |
| `restriction_policy_id` | `string` (UUID) or `null` | Applied restriction policy, if any |
| `department_id` | `string` (UUID) or `null` | Assigned department, if any |
| `is_password_expired` | `boolean` | Whether the current password has expired |
| `is_enabled` | `boolean` | Whether the identity is enabled |
| `password_updated_at` | `string` (ISO 8601) | When the password was last changed |
| `created_at` | `string` (ISO 8601) | When the identity was created |
| `updated_at` | `string` (ISO 8601) | When the identity was last updated |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: identity:view"
}
```

</TabItem>
</Tabs>

:::note Identity not found
If `email_id` doesn't exist, the API currently returns `200 OK` with a JSON `null` body rather than a `404`.
:::

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `identity:view` permission |
