---
title: Reset Password
---

# Reset Password

Sets a new password for an identity. The password is sent Base64-encoded (not hashed) — the server hashes it before storing.

<ApiEndpoint method="PUT" path="/identity/update/password/{email_id}" auth={true} />

## Permissions

Requires the `identity:edit` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|--------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|--------------|
| `email_id` | `string` | The identity's email address, e.g. `jane.doe@example.com` |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| `encoded_password` | `string` | Yes | The new password, Base64-encoded. See password rules below. |

:::info Password rules
Once Base64-decoded, the password must be **at least 8 characters**, contain **at least one uppercase letter, one lowercase letter, one digit, and one special character**, and contain **no whitespace**.
:::

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
# Base64-encode the password first: echo -n 'SecurePass1!' | base64
curl --location --request PUT '<BASE_URL>/identity/update/password/jane.doe@example.com' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "encoded_password": "U2VjdXJlUGFzczEh"
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const password = 'SecurePass1!';
const encoded_password = Buffer.from(password).toString('base64');

const response = await fetch(
  `<BASE_URL>/identity/update/password/${encodeURIComponent('jane.doe@example.com')}`,
  {
    method: 'PUT',
    headers: {
      'x-api-key': '<API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ encoded_password }),
  },
);

const result = await response.json();
console.log(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import base64
import requests

password = 'SecurePass1!'
encoded_password = base64.b64encode(password.encode()).decode()

response = requests.put(
    '<BASE_URL>/identity/update/password/jane.doe@example.com',
    headers={'x-api-key': '<API_KEY>'},
    json={'encoded_password': encoded_password},
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
  "error": "Unauthorized: Missing required permission: identity:edit"
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
<TabItem value="422" label="422 Unprocessable Entity">

The decoded password fails one of the password rules above.

```json
{
  "error": "Unprocessable: Password must contain at least one special character"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `identity:edit` permission |
| `404` | Identity not found for your organization |
| `422` | Decoded password fails a password rule |
