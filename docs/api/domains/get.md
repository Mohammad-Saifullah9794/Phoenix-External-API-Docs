---
title: Get Domain
---

# Get Domain

Returns full details for a single domain owned by your organization.

<ApiEndpoint method="GET" path="/domain/info/{domain_name}" auth={true} />

## Permissions

Requires the `domain:view` permission. See [Permissions](../../permissions).

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `x-api-key` | Yes | Your API key, as a UUID. See [Authentication](../../authentication). |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `domain_name` | `string` | The domain to look up, e.g. `example.com` |

## Request

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/domain/info/example.com' \
--header 'x-api-key: <API_KEY>'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/domain/info/example.com', {
  headers: {
    'x-api-key': '<API_KEY>',
  },
});

const domain = await response.json();
console.log(domain);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    '<BASE_URL>/domain/info/example.com',
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
  "domain_name": "example.com",
  "anti_phishing_secret_code": "a1b2c3d4",
  "details": {
    "description": null,
    "address": null
  },
  "is_active": true,
  "is_dns_txt_verified": true,
  "dns_txt_verification_key": "phoenix-verify-9f1c2b",
  "spam_destination": "Folder",
  "spam_destination_properties": {},
  "filter_policy_id": null,
  "attachment_policy_id": null,
  "catch_all": false,
  "catch_all_forward_to_email": null,
  "is_hybrid": false,
  "connector_properties": {},
  "max_password_age": 90,
  "max_password_age_properties": {},
  "session_timeout": 30,
  "disclaimer_id": null,
  "caution_id": null,
  "created_at": "2025-06-01T10:00:00Z"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `domain_name` | `string` | The domain name |
| `anti_phishing_secret_code` | `string` | Anti-phishing secret code configured for this domain in the admin panel |
| `details` | `object` | Additional details stored with the domain — see [Details object](#details-object) below |
| `is_active` | `boolean` | Whether the domain is active |
| `is_dns_txt_verified` | `boolean` | Whether domain ownership has been verified via DNS TXT record |
| `dns_txt_verification_key` | `string` | The TXT record value expected for verification |
| `spam_destination` | `string` | Where spam is routed (e.g. `"Folder"`) |
| `spam_destination_properties` | `object` | Configuration for the spam destination |
| `filter_policy_id` | `string` (UUID) or `null` | Applied filter policy, if any |
| `attachment_policy_id` | `string` (UUID) or `null` | Applied attachment policy, if any |
| `catch_all` | `boolean` | Whether catch-all routing is enabled |
| `catch_all_forward_to_email` | `string` or `null` | Catch-all forwarding address, if enabled |
| `is_hybrid` | `boolean` | Whether hybrid mail routing is enabled |
| `connector_properties` | `object` | Hybrid connector configuration |
| `max_password_age` | `integer` | Maximum password age, in days |
| `max_password_age_properties` | `object` | Password expiry notification configuration |
| `session_timeout` | `integer` | Session timeout, in minutes |
| `disclaimer_id` | `string` (UUID) or `null` | Applied disclaimer, if any |
| `caution_id` | `string` (UUID) or `null` | Applied caution, if any |
| `created_at` | `string` (ISO 8601) | When the domain was created |

#### Details object

| Field | Type | Description |
|-------|------|-------------|
| `description` | `string` or `null` | Free-text note about the domain, set via the admin panel |
| `address` | `string` or `null` | Postal address associated with the domain, set via the admin panel |

</TabItem>
<TabItem value="401" label="401 Unauthorized">

The key is missing, malformed, inactive, or lacks the `domain:view` permission.

```json
{
  "error": "Unauthorized: Missing required permission: domain:view"
}
```

</TabItem>
</Tabs>

:::note Domain not found
If `domain_name` doesn't exist (or doesn't belong to your organization), the API currently returns `200 OK` with a JSON `null` body rather than a `404`.
:::

## Errors

| Status | Meaning |
|--------|---------|
| `401` | Missing/invalid `x-api-key`, or missing `domain:view` permission |
