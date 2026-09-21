---
title: Delete Mailbox
---

# Delete Mailbox

Permanently deletes a mailbox and returns its allocated storage to your organization's and its mail server's available quota.

<ApiEndpoint method="DELETE" path="/mailbox/delete/{domain_name}/{email_prefix}" auth={true} />

## Permissions

Requires the `mailbox:delete` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `domain_name` | `string` | The domain the mailbox is on, e.g. `example.com`. Must belong to your organization. |
| `email_prefix` | `string` | The part of the address before `@`, e.g. `jane.doe`. Combined with `domain_name` to form the full address. |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request DELETE '<BASE_URL>/mailbox/delete/example.com/jane.doe' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/mailbox/delete/example.com/jane.doe', {
  method: 'DELETE',
  headers: { 'x-api-key': '<API_KEY>' },
});

console.log(response.status);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.delete(
    '<BASE_URL>/mailbox/delete/example.com/jane.doe',
    headers={'x-api-key': '<API_KEY>'},
)
print(response.status_code)
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

Success has **no response body** — unlike the other Delete endpoints in this API, this one does not return a row count. Check the status code only.

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: mailbox:delete"
}
```

</TabItem>
<TabItem value="403" label="403 Forbidden">

`domain_name` isn't owned by your organization.

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

:::danger Irreversible
Deleting a mailbox cannot be undone via the API — its messages are gone along with it.
:::

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `mailbox:delete` permission |
| `403` | `domain_name` is not owned by your organization |
| `404` | Mailbox not found for that address |
