---
title: Update Mailbox
---

# Update Mailbox

Updates a mailbox's enabled state and policies. The mailbox is chosen by `email` and `domain_name` **in the body**, not in the URL. This does not change storage quota — use [Update Mailbox Quota](./quota) for that.

This is a **full replace**: every field is written on each call. Optional fields you leave out are set to `null`. Fetch the current values with [Get Mailbox](./get) first and send them back with your changes.

<ApiEndpoint method="PATCH" path="/mailbox/update" auth={true} />

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
| `email` | `string` | Yes | The mailbox to update. Cannot be changed. |
| `domain_name` | `string` | Yes | Must equal the part of `email` after `@`, and be one of your active, DNS-verified domains. |
| `is_enabled` | `boolean` | Yes | `false` stops the mailbox sending or receiving mail |
| `forwarding_policy_id` | `string` (UUID) or `null` | No | Forwarding policy to apply. Omitted = `null`. |
| `distribution_policy_id` | `string` (UUID) or `null` | No | Distribution-list policy to apply. Omitted = `null`. |
| `general_policy_id` | `string` (UUID) or `null` | No | General policy to apply. Omitted = `null`. |

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request PATCH '<BASE_URL>/mailbox/update' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "email": "jane.doe@example.com",
  "domain_name": "example.com",
  "is_enabled": true,
  "forwarding_policy_id": null,
  "distribution_policy_id": null,
  "general_policy_id": null
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/mailbox/update', {
  method: 'PATCH',
  headers: {
    'x-api-key': '<API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'jane.doe@example.com',
    domain_name: 'example.com',
    is_enabled: true,
    forwarding_policy_id: null,
    distribution_policy_id: null,
    general_policy_id: null,
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
    '<BASE_URL>/mailbox/update',
    headers={'x-api-key': '<API_KEY>'},
    json={
        'email': 'jane.doe@example.com',
        'domain_name': 'example.com',
        'is_enabled': True,
        'forwarding_policy_id': None,
        'distribution_policy_id': None,
        'general_policy_id': None,
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

```json
{
  "error": "Bad Request: Email must match the domain name"
}
```

- `Email cannot be empty` / `Domain name cannot be empty`

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
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | A required field is empty, or `email`/`domain_name` mismatch |
| `401` | Missing/invalid `x-api-key`, or missing `mailbox:edit` permission |
| `403` | `domain_name` is not accessible to your organization |
| `404` | Mailbox not found |
