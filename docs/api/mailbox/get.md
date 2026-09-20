---
title: Get Mailbox
---

# Get Mailbox

Returns full details for a single mailbox.

<ApiEndpoint method="GET" path="/mailbox/info/{email_id}" auth={true} />

## Permissions

Requires the `mailbox:view` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `email_id` | `string` | The mailbox's email address, e.g. `jane.doe@example.com` |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/mailbox/info/jane.doe@example.com' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch(
  `<BASE_URL>/mailbox/info/${encodeURIComponent('jane.doe@example.com')}`,
  { headers: { 'x-api-key': '<API_KEY>' } },
);

const mailbox = await response.json();
console.log(mailbox);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/mailbox/info/jane.doe@example.com',
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
  "is_enabled": true,
  "forwarding_policy_id": null,
  "distribution_policy_id": null,
  "general_policy_id": null,
  "quota_allocated": 5.0,
  "quota_utilized_bytes": 734003200,
  "total_messages_count": 128
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `email` | `string` | The mailbox's email address |
| `domain_name` | `string` | The domain this mailbox belongs to |
| `is_enabled` | `boolean` | `false` means the mailbox cannot send or receive mail. New mailboxes are always created disabled — see [Create Mailbox](./create). |
| `forwarding_policy_id` | `string` (UUID) or `null` | Forwarding policy applied, if any (created in the admin panel under **Policies**) |
| `distribution_policy_id` | `string` (UUID) or `null` | Distribution-list policy applied, if any |
| `general_policy_id` | `string` (UUID) or `null` | General policy applied, if any |
| `quota_allocated` | `number` | Storage quota allocated to this mailbox, **in GB** |
| `quota_utilized_bytes` | `integer` | Storage actually used, **in bytes** — a different unit from `quota_allocated`. Divide by `1024^3` to compare the two in GB. |
| `total_messages_count` | `integer` | Total number of messages currently stored in the mailbox |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: mailbox:view"
}
```

</TabItem>
</Tabs>

:::note Mailbox not found
If `email_id` doesn't exist, or its domain isn't owned by your organization, the API returns `200 OK` with the body `null` rather than a `404`.
:::

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `mailbox:view` permission |
