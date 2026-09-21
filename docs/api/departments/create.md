---
title: Create Department
---

# Create Department

Creates a department in your organization. Departments group identities — assign one by passing its `department_id` to [Create Identity](../identities/create) or [Update Identity](../identities/update).

<ApiEndpoint method="POST" path="/department/create" auth={true} />

## Permissions

Requires the `department:create` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |
| `Content-Type` | Yes | Must be `application/json`. |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `department_name` | `string` | Yes | Department name. Up to 250 characters; must be unique within your organization. |
| `details` | `object` | Yes | Details to store with the department — see [Details object](#details-object) below. |

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
curl --location '<BASE_URL>/department/create' \
--header 'x-api-key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
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
  }
}'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/department/create', {
  method: 'POST',
  headers: {
    'x-api-key': '<API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    department_name: 'Engineering',
    details: {
      address: 'admin',
      description: 'admin department',
      notes: '',
      authorized_persons: [
        { name: 'tst', email: 'sse@sds', phone: '+91123113213' },
        { name: '', email: '', phone: '' },
      ],
    },
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
    '<BASE_URL>/department/create',
    headers={'x-api-key': '<API_KEY>'},
    json={
        'department_name': 'Engineering',
        'details': {
            'address': 'admin',
            'description': 'admin department',
            'notes': '',
            'authorized_persons': [
                {'name': 'tst', 'email': 'sse@sds', 'phone': '+91123113213'},
                {'name': '', 'email': '', 'phone': ''},
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

```json
{
  "department_id": "7f9c2a10-4e3b-4c8a-9d2e-6b1f0a3c5d7e",
  "result": 1
}
```

| Field | Type | Description |
|-------|------|-------------|
| `department_id` | `string` (UUID) | ID of the new department. Save it — you need it for Get, Update and Delete. |
| `result` | `integer` | Number of rows inserted (always `1` on success) |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

```json
{
  "error": "Unauthorized: Missing required permission: department:create"
}
```

</TabItem>
<TabItem value="417" label="417 Expectation Failed">

A department with this name already exists in your organization (or the name is longer than 250 characters).

```json
{
  "error": "PostgreSQL error: duplicate key value violates unique constraint ..."
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `400` | Body is not valid JSON, or a field is missing (plain text) |
| `401` | Missing/invalid `x-api-key`, or missing `department:create` permission |
| `417` | Duplicate name, or name longer than 250 characters |
