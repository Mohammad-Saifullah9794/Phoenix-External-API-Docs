---
title: Update Domain
---

# Update Domain

Updates a limited set of fields on an existing domain. Fields not listed below (name, quotas, DNS verification, hybrid connector, etc.) are managed from the admin panel only.

<ApiEndpoint method="PATCH" path="/domain/update/{domain_name}" auth={true} />

## Permissions

Requires the `domain:edit` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `domain_name` | `string` | The domain to update, e.g. `example.com` |

## Request Body

This is a **full replace**, not a partial update: every field below is written on each call. Send the current value of anything you don't want to change — get it first with [Get Domain](./get).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `details` | `object` | Yes | Details to store with the domain — see [Details object](#details-object) below. This replaces the existing value in full. |
| `is_active` | `boolean` | Yes | `false` deactivates the domain (see warning below) |
| `filter_policy_id` | `string` (UUID) or `null` | No | Filter policy to apply. **Leaving it out sets it to `null`.** |
| `attachment_policy_id` | `string` (UUID) or `null` | No | Attachment policy to apply. **Leaving it out sets it to `null`.** |
| `disclaimer_id` | `string` (UUID) or `null` | No | Disclaimer to apply. **Leaving it out sets it to `null`.** |
| `caution_id` | `string` (UUID) or `null` | No | Caution to apply. **Leaving it out sets it to `null`.** |

Policy, disclaimer and caution IDs are created in the admin panel (**Policies** menu). The API has no endpoint to list them yet.

#### Details object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | `string` or `null` | Yes | Free-text note about the domain |
| `address` | `string` or `null` | Yes | Postal address associated with the domain |

`details` is a full replace like the rest of the body: send both fields on every call, with `null` for anything you don't want to set.

:::warning Setting `is_active` to `false`
A deactivated domain is no longer accepted by the identity endpoints — [List](../identities/list), [Create](../identities/create) and [Update](../identities/update) Identity return `403 Forbidden` for it until you set `is_active` back to `true`.
:::

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request PATCH '<BASE_URL>/domain/update/example.com' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "details": {
    "description": null,
    "address": null
  },
  "is_active": true,
  "filter_policy_id": null,
  "attachment_policy_id": null,
  "disclaimer_id": null,
  "caution_id": null
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/domain/update/example.com', {
  method: 'PATCH',
  headers: {
    'x-api-key': '<API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    details: {
      description: null,
      address: null,
    },
    is_active: true,
    filter_policy_id: null,
    attachment_policy_id: null,
    disclaimer_id: null,
    caution_id: null,
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
    '<BASE_URL>/domain/update/example.com',
    headers={'x-api-key': '<API_KEY>'},
    json={
        'details': {
            'description': None,
            'address': None,
        },
        'is_active': True,
        'filter_policy_id': None,
        'attachment_policy_id': None,
        'disclaimer_id': None,
        'caution_id': None,
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
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: domain:edit"
}
```

</TabItem>
<TabItem value="404" label="404 Not Found">

`domain_name` doesn't exist or doesn't belong to your organization.

```json
{
  "error": "Resource not found: Domain not found"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | Body is not valid JSON, or `details`/`is_active` is missing (plain text) |
| `401` | Missing/invalid `x-api-key`, or missing `domain:edit` permission |
| `404` | Domain not found for your organization |
| `417` | A policy, disclaimer or caution ID doesn't exist |
