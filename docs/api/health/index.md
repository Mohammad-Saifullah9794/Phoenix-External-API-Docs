---
title: API Health
---

# API Health

Confirms that the API server, its PostgreSQL connection pool, and its Redis cache are all reachable. This is a single combined check — a `200` means every dependency responded — so it's a good fit for load balancer and uptime-monitor probes.

<ApiEndpoint method="GET" path="/health/api" auth={false} />

## Headers

This endpoint does not require an `X-API-Key` header, so it can be safely wired into external monitoring tools without a credential.

| Header | Required | Description |
|--------|----------|--------------|
| — | — | No headers required |

## Request

No path parameters, query parameters, or request body.

<Tabs groupId="code-samples">
<TabItem value="curl" label="cURL">

```bash
curl --location '<BASE_URL>/health/api'
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const response = await fetch('<BASE_URL>/health/api');
const status = await response.text();

console.log(status);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get('<BASE_URL>/health/api')
print(response.text)
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

The API, database, and cache are all reachable.

```text
API is healthy!
```

</TabItem>
<TabItem value="424" label="424 Failed Dependency">

The PostgreSQL connection pool is exhausted or misconfigured.

```json
{
  "error": "DB: <pool error details>"
}
```

</TabItem>
<TabItem value="417" label="417 Expectation Failed">

The database driver returned an error while running the health query (e.g. connectivity was lost mid-check).

```json
{
  "error": "PostgreSQL: <driver error details>"
}
```

</TabItem>
<TabItem value="503" label="503 Service Unavailable">

Redis could not be reached.

```json
{
  "error": "Redis: <connection error details>"
}
```

</TabItem>
</Tabs>

## Errors

| Status | Meaning |
|--------|---------|
| `424` | PostgreSQL connection pool error |
| `417` | PostgreSQL query/driver error |
| `503` | Redis connection error |
