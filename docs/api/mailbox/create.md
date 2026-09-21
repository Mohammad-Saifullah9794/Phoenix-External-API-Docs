---
title: Create Mailbox
---

# Create Mailbox

Creates a new mailbox on one of your domains and allocates its storage quota from your organization's pool.

The mailbox is always created **disabled** (`is_enabled: false`) — provisioning on the actual mail server happens asynchronously after the call returns. Enable it with [Update Mailbox](./update) once it's ready.

<ApiEndpoint method="POST" path="/mailbox/create" auth={true} />

## Permissions

Requires the `mailbox:create` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `string` | Yes | The mailbox's address. Must end with `@domain_name`. |
| `domain_name` | `string` | Yes | One of your active, DNS-verified domains, e.g. `example.com`. Must exactly match the part of `email` after `@`. |
| `forwarding_policy_id` | `string` (UUID) or `null` | No | Forwarding policy to apply |
| `distribution_policy_id` | `string` (UUID) or `null` | No | Distribution-list policy to apply |
| `general_policy_id` | `string` (UUID) or `null` | No | General policy to apply |
| `quota_allocated` | `number` | Yes | Storage quota to allocate, **in GB**. Must be at least `0.1`. Deducted from your organization's available quota — see [Get Organization](../organization/get). |

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request POST '<BASE_URL>/mailbox/create' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "email": "jane.doe@example.com",
  "domain_name": "example.com",
  "forwarding_policy_id": null,
  "distribution_policy_id": null,
  "general_policy_id": null,
  "quota_allocated": 5.0
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/mailbox/create', {
  method: 'POST',
  headers: {
    'x-api-key': '<API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'jane.doe@example.com',
    domain_name: 'example.com',
    forwarding_policy_id: null,
    distribution_policy_id: null,
    general_policy_id: null,
    quota_allocated: 5.0,
  }),
});

const result = await response.json();
console.log(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.post(
    '<BASE_URL>/mailbox/create',
    headers={'x-api-key': '<API_KEY>'},
    json={
        'email': 'jane.doe@example.com',
        'domain_name': 'example.com',
        'forwarding_policy_id': None,
        'distribution_policy_id': None,
        'general_policy_id': None,
        'quota_allocated': 5.0,
    },
)
print(response.json())
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

The number of mailboxes created (always `1` on success). Fetch the new mailbox with [Get Mailbox](./get) using `email`.

```json
1
```

Your organization's `quota_utilized` ([Get Organization](../organization/get)) goes up by `quota_allocated`.

</TabItem>
<TabItem value="400" label="400 Bad Request">

A field failed validation, or your organization doesn't have enough free quota left:

```json
{ "error": "Bad Request: Quota allocated must be a positive number greater than 0.1" }
```

- `Email cannot be empty` / `Domain name cannot be empty`
- `Email must match the domain name`
- `Insufficient quota` — your organization's `quota_allocated − quota_utilized` (in GB) is less than the `quota_allocated` you requested

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{ "error": "Unauthorized: Missing required permission: mailbox:create" }
```

</TabItem>
<TabItem value="403" label="403 Forbidden">

The domain isn't one of your active, DNS-verified domains:

```json
{ "error": "Forbidden: Access to the specified domain is not allowed" }
```

Or the email service isn't enabled for your organization, or your organization is inactive:

```json
{ "error": "Forbidden: Email service is not enabled for this organization" }
```

```json
{ "error": "Forbidden: Organization is not active" }
```

</TabItem>
<TabItem value="417" label="417 Expectation Failed">

The address already has a mailbox, or a `*_policy_id` doesn't exist. The message comes from the database.

```json
{ "error": "PostgreSQL error: duplicate key value violates unique constraint ..." }
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | A field failed validation, or insufficient organization quota (see messages above) |
| `401` | Missing/invalid `x-api-key`, or missing `mailbox:create` permission |
| `403` | Domain not accessible, email service disabled, or organization inactive |
| `417` | A mailbox already exists for that address, or a referenced policy ID doesn't exist |
