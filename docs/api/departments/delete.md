---
title: Delete Department
---

# Delete Department

Permanently deletes a department. Identities in the department are **not** deleted — their `department_id` is set to `null`.

<ApiEndpoint method="DELETE" path="/department/delete/{department_id}" auth={true} />

## Permissions

Requires the `department:delete` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `department_id` | `string` (UUID) | The department's ID — the `department_id` returned by [Create Department](./create) or [List Departments](./list). Replace `<DEPARTMENT_ID>` in the examples with it. |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request DELETE '<BASE_URL>/department/delete/<DEPARTMENT_ID>' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch(
  '<BASE_URL>/department/delete/<DEPARTMENT_ID>',
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
    '<BASE_URL>/department/delete/<DEPARTMENT_ID>',
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
  "error": "Unauthorized: Missing required permission: department:delete"
}
```

</TabItem>
<TabItem value="404" label="404 Not Found">

```json
{
  "error": "Resource not found: Department not found"
}
```

</TabItem>
</Tabs>

:::danger Irreversible
Deleting a department cannot be undone via the API.
:::

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `department:delete` permission |
| `404` | Department not found for your organization, or `department_id` isn't a valid UUID |
