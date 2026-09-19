---
sidebar_position: 5
title: Pagination
---

# Pagination

Every list endpoint ([List Domains](./api/domains/list), [List Identities](./api/identities/list), [List Departments](./api/departments/list), [List Mailboxes](./api/mailbox/list)) returns results one page at a time.

## Query parameters

Both parameters are **required**.

| Parameter | Type | Rules | Meaning |
|-----------|------|-------|---------|
| `limit` | integer | 1 – 100 | How many items to return |
| `offset` | integer | 0 or more | How many items to skip from the start |

To get page *N* with page size *L*, use `offset = (N − 1) × L`. For example, page 3 with 10 per page is `?limit=10&offset=20`.

## Response shape

```json
{
  "items": [ ... ],
  "total": 42,
  "current_count": 10,
  "current_page": 3,
  "total_pages": 5
}
```

| Field | Type | Description |
|-------|------|-------------|
| `items` | `array` | The records on this page. The object type depends on the endpoint (Domain, Identity, Department or Mailbox). |
| `total` | `integer` | Total number of matching records across all pages |
| `current_count` | `integer` | Number of records in `items` on this page (at most `limit`) |
| `current_page` | `integer` | Page number, starting at 1, calculated as `offset ÷ limit + 1` (rounded down) |
| `total_pages` | `integer` | `total ÷ limit`, rounded up |

Results are sorted alphabetically — by domain name, email address, or department name.

:::note Offset past the end
If `offset` is greater than or equal to the number of records, `items` is empty **and `total` and `total_pages` are both `0`**, even though records exist. Use `total` from an earlier page to know when to stop.
:::

## Errors

| Situation | Status | Body |
|-----------|--------|------|
| `limit` is 0 or negative | `400` | `{"error": "Bad Request: Limit must be greater than 0"}` |
| `limit` is above 100 | `400` | `{"error": "Bad Request: Limit cannot be greater than 100"}` |
| `offset` is negative | `400` | `{"error": "Bad Request: Offset cannot be negative"}` |
| `limit` or `offset` missing or not a number | `400` | Plain text, e.g. ``Query deserialize error: missing field `limit` `` |

## Example: fetch every page

```python
import requests

BASE_URL = 'https://v3-api.test.yukthi.net'
HEADERS = {'x-api-key': '<API_KEY>'}

def fetch_all(path, limit=100):
    items, offset = [], 0
    while True:
        page = requests.get(f'{BASE_URL}{path}', headers=HEADERS,
                            params={'limit': limit, 'offset': offset}).json()
        items += page['items']
        if page['current_count'] < limit:
            return items
        offset += limit

departments = fetch_all('/department/list')
```
