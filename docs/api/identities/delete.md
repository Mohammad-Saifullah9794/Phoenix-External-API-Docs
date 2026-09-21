---
title: Delete Identity
---

# Delete Identity

Permanently deletes an identity. Your organization's `utilized_email_identities` ([Get Organization](../organization/get)) goes down by 1.

An identity that still has a **[mailbox](../mailbox), chat account or file-storage account** cannot be deleted — remove those first (see [Delete Mailbox](../mailbox/delete)), otherwise you get `409 Conflict`.

<ApiEndpoint method="DELETE" path="/identity/delete/{email_id}" auth={true} />

## Permissions

Requires the `identity:delete` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `email_id` | `string` | The identity's email address, e.g. `jane.doe@example.com` |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request DELETE '<BASE_URL>/identity/delete/jane.doe@example.com' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch(
  `<BASE_URL>/identity/delete/${encodeURIComponent('jane.doe@example.com')}`,
  {
    method: 'DELETE',
    headers: { 'x-api-key': '<API_KEY>' },
  },
);

const result = await response.json();
console.log(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.delete(
    '<BASE_URL>/identity/delete/jane.doe@example.com',
    headers={'x-api-key': '<API_KEY>'},
)
print(response.json())
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

The number of rows deleted (always `1` on success).

```json
1
```

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: identity:delete"
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
<TabItem value="409" label="409 Conflict">

The identity still has a mailbox, chat or file account.

```json
{
  "error": "Conflict: Identity has associated services and cannot be deleted"
}
```

</TabItem>
</Tabs>

:::danger Irreversible
Deleting an identity cannot be undone via the API.
:::

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `identity:delete` permission |
| `404` | Identity not found for your organization |
| `409` | Identity still has a mailbox, chat or file account |
