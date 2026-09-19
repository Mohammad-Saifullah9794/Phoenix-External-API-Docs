---
title: Update Identity
---

# Update Identity

Updates an identity's profile. The identity is chosen by `email` and `domain_name` **in the body**, not in the URL.

This is a **full replace**: every field is written on each call. Optional fields you leave out are set to `null` — for example, omitting `department_id` removes the identity from its department. Fetch the current values with [Get Identity](./get) first and send them back with your changes. To change the password, use [Reset Password](./reset-password).

<ApiEndpoint method="PATCH" path="/identity/update" auth={true} />

## Permissions

Requires the `identity:edit` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | The identity to update. Lowercase only. Cannot be changed. |
| `domain_name` | `string` | Yes | Must equal the part of `email` after `@`, and be one of your active, DNS-verified domains. Lowercase only. |
| `first_name` | `string` | Yes | First name. Must not be empty. |
| `last_name` | `string` or `null` | No | Last name. Omitted = `null`. |
| `primary_phone` | `string` | Yes | Primary phone number. Must not be empty. |
| `secondary_email` | `string` or `null` | No | Secondary / recovery email. Omitted = `null`. |
| `is_app_2fa_enabled` | `boolean` | Yes | Whether authenticator-app 2FA is enabled |
| `is_sms_2fa_enabled` | `boolean` | Yes | Whether SMS 2FA is enabled |
| `is_email_2fa_enabled` | `boolean` | Yes | Whether email 2FA is enabled |
| `restriction_policy_id` | `string` (UUID) or `null` | No | Restriction policy to apply. Omitted = `null`. |
| `department_id` | `string` (UUID) or `null` | No | Department to assign ([List Departments](../departments/list)). Omitted = `null`. |
| `is_enabled` | `boolean` | Yes | Whether the identity is enabled |

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request PATCH '<BASE_URL>/identity/update' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
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
  "is_enabled": true
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/identity/update', {
  method: 'PATCH',
  headers: {
    'x-api-key': '<API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'jane.doe@example.com',
    domain_name: 'example.com',
    first_name: 'Jane',
    last_name: 'Doe',
    primary_phone: '+15551234567',
    secondary_email: null,
    is_app_2fa_enabled: false,
    is_sms_2fa_enabled: false,
    is_email_2fa_enabled: true,
    restriction_policy_id: null,
    department_id: null,
    is_enabled: true,
  }),
});

const result = await response.json();
console.log(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.patch(
    '<BASE_URL>/identity/update',
    headers={'x-api-key': '<API_KEY>'},
    json={
        'email': 'jane.doe@example.com',
        'domain_name': 'example.com',
        'first_name': 'Jane',
        'last_name': 'Doe',
        'primary_phone': '+15551234567',
        'secondary_email': None,
        'is_app_2fa_enabled': False,
        'is_sms_2fa_enabled': False,
        'is_email_2fa_enabled': True,
        'restriction_policy_id': None,
        'department_id': None,
        'is_enabled': True,
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

</TabItem>
<TabItem value="400" label="400 Bad Request">

A field failed validation. Possible messages: `Email cannot be empty`, `Domain name cannot be empty`, `First name cannot be empty`, `Primary phone cannot be empty`, `Email should not contain uppercase characters`, `Domain name should not contain uppercase characters`, `Invalid email format`, `Email domain does not match the specified domain name`.

```json
{
  "error": "Bad Request: Email domain does not match the specified domain name"
}
```

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: identity:edit"
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
  "error": "Resource not found: Identity not found"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | A required field is empty, or `email`/`domain_name` mismatch |
| `401` | Missing/invalid `x-api-key`, or missing `identity:edit` permission |
| `403` | `domain_name` is not accessible to your organization |
| `404` | Identity not found |
| `417` | `department_id` or `restriction_policy_id` doesn't exist |
