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
|--------|----------|--------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|--------------|
| `domain_name` | `string` | The domain to update, e.g. `example.com` |

## Request Body

All fields are required and fully replace the current value — this is not a partial update.

| Field | Type | Description |
|-------|------|--------------|
| `details` | `object` | Free-form domain metadata |
| `is_active` | `boolean` | Whether the domain is active |
| `filter_policy_id` | `string` (UUID) or `null` | Filter policy to apply |
| `attachment_policy_id` | `string` (UUID) or `null` | Attachment policy to apply |
| `disclaimer_id` | `string` (UUID) or `null` | Disclaimer to apply |
| `caution_id` | `string` (UUID) or `null` | Caution to apply |

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request PATCH '<BASE_URL>/domain/update/example.com' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "details": {},
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
    details: {},
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
        'details': {},
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
| `401` | Missing/invalid `x-api-key`, or missing `domain:edit` permission |
| `404` | Domain not found for your organization |
