---
title: API Health
sidebar_label: API Health
---

# API Health

Confirms that the API server, its PostgreSQL connection pool, and its Redis cache are all reachable. This is a single combined check — a `200` means every dependency responded — so it's a good fit for load balancer and uptime-monitor probes.

<ApiEndpoint method="GET" path="/health/api" auth={false} />

## Headers

None. This endpoint does not need an API key, so you can point an uptime monitor or load balancer at it without sharing a credential. Try it in your browser: [`https://v3-api.test.yukthi.net/health/api`](https://v3-api.test.yukthi.net/health/api).

The status indicator in the footer of this site calls this same endpoint every 60 seconds.

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
// Node.js 18+; save as health.mjs and run: node health.mjs
const response = await fetch('<BASE_URL>/health/api');
console.log(response.status, await response.text());
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get('<BASE_URL>/health/api')
print(response.status_code, response.text)
```

</TabItem>
</Tabs>

## Response

<Tabs groupId="response-status">
<TabItem value="200" label="200 OK">

The API, database, and cache are all reachable. The body is plain text, not JSON.

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

The database returned an error while running the health query (e.g. connectivity was lost mid-check).

```json
{
  "error": "PostgreSQL client error: <details>"
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
