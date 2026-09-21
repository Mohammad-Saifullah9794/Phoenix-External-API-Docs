---
title: Get Department
---

# Get Department

Returns details for a single department.

<ApiEndpoint method="GET" path="/department/info/{department_id}" auth={true} />

## Permissions

Requires the `department:view` permission. See [Permissions](../../permissions).

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
curl --location '<BASE_URL>/department/info/<DEPARTMENT_ID>' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch(
  '<BASE_URL>/department/info/<DEPARTMENT_ID>',
  { headers: { 'x-api-key': '<API_KEY>' } },
);

const department = await response.json();
console.log(department);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/department/info/<DEPARTMENT_ID>',
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
  "department_id": "00000000-0000-0000-0000-000000000000",
  "department_name": "Engineering",
  "details": {
    "address": "admin",
    "description": "admin department",
    "notes": "",
    "authorized_persons": [
      {
        "name": "tst",
        "email": "sse@sds",
        "phone": "+91123113213"
      },
      {
        "name": "",
        "email": "",
        "phone": ""
      }
    ]
  },
  "created_at": "2025-06-01T10:00:00Z",
  "updated_at": "2025-06-01T10:00:00Z"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `department_id` | `string` (UUID) | The department's ID |
| `department_name` | `string` | Department name |
| `details` | `object` | Additional details stored with the department — see [Details object](#details-object) below |
| `created_at` | `string` (ISO 8601) | When the department was created |
| `updated_at` | `string` (ISO 8601) | When the department was last updated |

#### Details object

| Field | Type | Description |
|-------|------|-------------|
| `address` | `string` | Department's address |
| `description` | `string` | Free-text description of the department |
| `notes` | `string` | Additional notes about the department |
| `authorized_persons` | `array` of objects | People authorized to act for this department — see [Authorized person object](#authorized-person-object) below |

#### Authorized person object

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Person's name |
| `email` | `string` | Person's email address |
| `phone` | `string` | Person's phone number |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: department:view"
}
```

</TabItem>
</Tabs>

:::note Department not found
If `department_id` doesn't exist or belongs to another organization, the API returns `200 OK` with the body `null` rather than a `404`. If it isn't a valid UUID, you get `404` with a plain-text body.
:::

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `department:view` permission |
