---
title: Create Identity
---

# Create Identity

Creates a new identity (user account) on one of your domains, with its initial password.

<ApiEndpoint method="POST" path="/identity/create" auth={true} />

## Permissions

Requires the `identity:create` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email_prefix` | `string` | Yes | The part of the address before `@`, e.g. `jane.doe`. Lowercase only; must not contain `@`. |
| `domain_name` | `string` | Yes | One of your active, DNS-verified domains, e.g. `example.com`. Lowercase only. The full address `email_prefix@domain_name` must be at most 254 characters. |
| `encoded_password` | `string` | Yes | The initial password, **Base64-encoded**. Must meet the [password rules](./reset-password#password-rules). |
| `first_name` | `string` | Yes | First name. Must not be empty. |
| `last_name` | `string` or `null` | No | Last name |
| `primary_phone` | `string` | Yes | Primary phone number. Must not be empty. |
| `secondary_email` | `string` or `null` | No | Secondary / recovery email |
| `is_app_2fa_enabled` | `boolean` | Yes | Turn on authenticator-app 2FA |
| `is_sms_2fa_enabled` | `boolean` | Yes | Turn on SMS 2FA |
| `is_email_2fa_enabled` | `boolean` | Yes | Turn on email 2FA |
| `restriction_policy_id` | `string` (UUID) or `null` | No | Restriction policy to apply |
| `department_id` | `string` (UUID) or `null` | No | Department to put the identity in — use an ID from [List Departments](../departments/list) |
| `is_enabled` | `boolean` | Yes | `true` to let the user sign in straight away |

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
# Base64-encode the password first: echo -n 'SecurePass1!' | base64   → U2VjdXJlUGFzczEh
curl --request POST '<BASE_URL>/identity/create' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "email_prefix": "jane.doe",
  "domain_name": "example.com",
  "encoded_password": "U2VjdXJlUGFzczEh",
  "first_name": "Jane",
  "last_name": "Doe",
  "primary_phone": "+15551234567",
  "secondary_email": null,
  "is_app_2fa_enabled": false,
  "is_sms_2fa_enabled": false,
  "is_email_2fa_enabled": false,
  "restriction_policy_id": null,
  "department_id": null,
  "is_enabled": true
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
// Node.js 18+ (save as .mjs to use top-level await)
const response = await fetch('<BASE_URL>/identity/create', {
  method: 'POST',
  headers: {
    'x-api-key': '<API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email_prefix: 'jane.doe',
    domain_name: 'example.com',
    encoded_password: Buffer.from('SecurePass1!').toString('base64'),
    first_name: 'Jane',
    last_name: 'Doe',
    primary_phone: '+15551234567',
    secondary_email: null,
    is_app_2fa_enabled: false,
    is_sms_2fa_enabled: false,
    is_email_2fa_enabled: false,
    restriction_policy_id: null,
    department_id: null,
    is_enabled: true,
  }),
});

console.log(response.status, await response.text());
```

</TabItem>
<TabItem value="python" label="Python">

```python
import base64
import requests

response = requests.post(
    '<BASE_URL>/identity/create',
    headers={'x-api-key': '<API_KEY>'},
    json={
        'email_prefix': 'jane.doe',
        'domain_name': 'example.com',
        'encoded_password': base64.b64encode('SecurePass1!'.encode()).decode(),
        'first_name': 'Jane',
        'last_name': 'Doe',
        'primary_phone': '+15551234567',
        'secondary_email': None,
        'is_app_2fa_enabled': False,
        'is_sms_2fa_enabled': False,
        'is_email_2fa_enabled': False,
        'restriction_policy_id': None,
        'department_id': None,
        'is_enabled': True,
    },
)
print(response.status_code, response.text)
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

The number of identities created (always `1` on success). Fetch the new identity with [Get Identity](./get) using `email_prefix@domain_name`.

```json
1
```

Your organization's `utilized_email_identities` ([Get Organization](../organization/get)) goes up by 1.

</TabItem>
<TabItem value="400" label="400 Bad Request">

A field failed validation. Possible messages:

```json
{ "error": "Bad Request: Email prefix should not contain '@'" }
```

- `Encoded password cannot be empty`
- `Email prefix cannot be empty` / `Domain name cannot be empty` / `First name cannot be empty` / `Primary phone cannot be empty`
- `Email prefix should not contain uppercase characters` / `Domain name should not contain uppercase characters`
- `Constructed email is too long`

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{ "error": "Unauthorized: Missing required permission: identity:create" }
```

</TabItem>
<TabItem value="403" label="403 Forbidden">

The domain isn't one of your active, DNS-verified domains:

```json
{ "error": "Forbidden: Access to the specified domain is not allowed" }
```

Or your organization has no identity slots left:

```json
{ "error": "Forbidden: Organization has reached its limit for email identities" }
```

</TabItem>
<TabItem value="422" label="422 Unprocessable Entity">

The decoded password breaks a [password rule](./reset-password#password-rules):

```json
{ "error": "Unprocessable: Password must contain at least one digit" }
```

</TabItem>
<TabItem value="417" label="417 Expectation Failed">

The address already exists, or `department_id` / `restriction_policy_id` doesn't exist. The message comes from the database.

```json
{ "error": "PostgreSQL error: duplicate key value violates unique constraint ..." }
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | A field failed validation (see messages above) |
| `401` | Missing/invalid `x-api-key`, or missing `identity:create` permission |
| `403` | Domain not accessible, or identity limit reached |
| `417` | Address already exists, or a referenced ID doesn't exist |
| `422` | Password breaks a password rule |
