---
sidebar_position: 6
title: Errors
---

# Errors

The API uses standard HTTP status codes. A `2xx` status means success; anything else is an error.

## Error format

Most errors are JSON with a single `error` field. The text starts with the error type, followed by a message you can show in logs:

```json
{
  "error": "Resource not found: Department not found"
}
```

A few errors come back as **plain text** instead of JSON — an invalid API key, and requests the API cannot parse (see [Request format errors](#request-format-errors)). Check the `Content-Type` response header, or read the body as text first, before parsing it as JSON.

## Status codes

| Status | Error prefix | When it happens | What to do |
|--------|--------------|-----------------|------------|
| `400 Bad Request` | `Bad Request:` | A field failed validation — empty required field, `limit` above 100, email and domain don't match | Fix the request using the message |
| `401 Unauthorized` | `Unauthorized:` | Key missing, not a UUID, inactive or unknown (plain text `Unauthorized: Invalid API Key`), **or** the key lacks the endpoint's permission (JSON `Unauthorized: Missing required permission: <permission>`) | Check the key and its [permissions](./permissions) |
| `403 Forbidden` | `Forbidden:` | The domain is not one of your organization's **active, DNS-verified** domains, or your organization has used all its identity slots | Use a domain you own; ask for more identities |
| `404 Not Found` | `Resource not found:` | The record doesn't exist in your organization (update and delete endpoints), the URL is wrong, or a path ID is not a valid UUID | Check the path |
| `409 Conflict` | `Conflict:` | The action conflicts with existing data — e.g. deleting an identity that still has a mailbox | Remove the dependency first |
| `422 Unprocessable Entity` | `Unprocessable:` | The password fails a [password rule](./api/identities/reset-password#password-rules) | Choose a stronger password |
| `417 Expectation Failed` | `PostgreSQL error:` | The database rejected the change — most often a **duplicate** (same department name, or an email that already exists) or a reference to an ID that doesn't exist | Check for duplicates and that referenced IDs exist |
| `424 Failed Dependency` | `DB:` | The API could not get a database connection | Retry later; contact support if it persists |
| `503 Service Unavailable` | `Redis:` | The API's cache is unreachable | Retry later; contact support if it persists |

:::note Get endpoints return `null`, not 404
[Get Domain](./api/domains/get), [Get Identity](./api/identities/get), [Get Department](./api/departments/get) and [Get Mailbox](./api/mailbox/get) return `200 OK` with the body `null` when the record doesn't exist or belongs to another organization. Check for `null` before reading fields.
:::

## Request format errors

These are returned before your request reaches the endpoint, as **plain text**:

| Status | Example body | Cause |
|--------|--------------|-------|
| `400` | ``Json deserialize error: missing field `department_name` at line 4 column 1`` | Body is not valid JSON, a required field is missing, or a field has the wrong type |
| `400` | `Content type error` | `Content-Type: application/json` header missing on a request with a body |
| `400` | ``Query deserialize error: missing field `limit` `` | `limit`/`offset` missing on a list endpoint |
| `404` | *(empty or parse message)* | A path parameter that must be a UUID (e.g. `department_id`) isn't one |
| `405` | *(empty)* | Wrong HTTP method for the path, e.g. `GET /department/create` |

## Handling errors in code

```js
const res = await fetch(url, options);
if (!res.ok) {
  const text = await res.text();
  let message = text;
  try { message = JSON.parse(text).error; } catch { /* plain-text error */ }
  throw new Error(`${res.status}: ${message}`);
}
const data = await res.json();
```
