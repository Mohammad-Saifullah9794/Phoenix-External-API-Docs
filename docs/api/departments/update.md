---
title: Update Department
---

# Update Department

Updates a department's name and `details`. Both fields are required and both are replaced — to keep existing `details`, send them back unchanged (get them from [Get Department](./get)).

<ApiEndpoint method="PATCH" path="/department/update/{department_id}" auth={true} />

## Permissions

Requires the `department:edit` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `department_id` | `string` (UUID) | The department's ID — the `department_id` returned by [Create Department](./create) or [List Departments](./list). Replace `<DEPARTMENT_ID>` in the examples with it. |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `department_name` | `string` | Yes | New name. Up to 250 characters; must be unique within your organization. |
| `details` | `object` | Yes | Details to store with the department — see [Details object](#details-object) below. This replaces the existing value in full. |

#### Details object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `address` | `string` | Yes | Department's address. Send `""` if unused. |
| `description` | `string` | Yes | Free-text description of the department. Send `""` if unused. |
| `notes` | `string` | Yes | Additional notes about the department. Send `""` if unused. |
| `authorized_persons` | `array` of objects | Yes | People authorized to act for this department — see [Authorized person object](#authorized-person-object) below. Send `[]` if unused. |

#### Authorized person object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Person's name |
| `email` | `string` | Yes | Person's email address |
| `phone` | `string` | Yes | Person's phone number |

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location --request PATCH '<BASE_URL>/department/update/<DEPARTMENT_ID>' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "department_name": "Platform Engineering",
  "details": {
    "address": "admin",
    "description": "admin department",
    "notes": "",
    "authorized_persons": [
      {
        "name": "tst",
        "email": "sse@sds",
        "phone": "+91123113213"
      }
    ]
  }
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch(
  '<BASE_URL>/department/update/<DEPARTMENT_ID>',
  {
    method: 'PATCH',
    headers: {
      'x-api-key': '<API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      department_name: 'Platform Engineering',
      details: {
        address: 'admin',
        description: 'admin department',
        notes: '',
        authorized_persons: [
          { name: 'tst', email: 'sse@sds', phone: '+91123113213' },
        ],
      },
    }),
  },
);

const result = await response.json();
console.log(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.patch(
    '<BASE_URL>/department/update/<DEPARTMENT_ID>',
    headers={'x-api-key': '<API_KEY>'},
    json={
        'department_name': 'Platform Engineering',
        'details': {
            'address': 'admin',
            'description': 'admin department',
            'notes': '',
            'authorized_persons': [
                {'name': 'tst', 'email': 'sse@sds', 'phone': '+91123113213'},
            ],
        },
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
  "error": "Unauthorized: Missing required permission: department:edit"
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

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `department:edit` permission |
| `404` | Department not found for your organization, or `department_id` isn't a valid UUID |
| `417` | Another department already has this name |
