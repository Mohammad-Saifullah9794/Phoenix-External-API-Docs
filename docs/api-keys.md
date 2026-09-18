---
sidebar_position: 3
title: Create an API key
---

# Create an API key

API keys are created and managed by an administrator in the **Phoenix Admin Panel** under **Settings → API Keys**. Each key belongs to one organization and can only reach that organization's data.

{/* TODO(screenshots): the images below are from an older build (they still list policy:* permissions
    that the wizard no longer offers). Retake all four from the current admin panel, crop out the top
    header bar (no personal email/avatar visible), keep the same file names, and delete this comment. */}

## 1. Open API Keys

Sign in to the admin panel, open **Settings** in the left menu and choose **API Keys**. The page lists existing keys and shows the **Base URL** your keys work with, plus a link back to these docs. Click **Create**.

![API Keys list in the admin panel](/img/admin-panel/api-key-view.png)

## 2. Basic info

- **Key Name** (required) — name the key after the service that will use it, for example `Billing Sync`. This is what appears in the list.
- **Description** — what the key is for and who owns the integration.
- **Metadata / Additional Details** — optional key/value tags (environment, ticket number, owning team). They are for your reference only and do not change what the key can do.

![Step 1 — Basic info](/img/admin-panel/api-key-create-1.png)

## 3. Permissions

Tick only what the integration needs. Each ticked box becomes one permission string on the key, in `resource:action` form — for example ticking **View** on **Departments** grants `department:view`.

| Admin panel section | Module | Actions offered | Used by the API today |
|---------------------|--------|-----------------|-----------------------|
| Administration | Organization | View | [Get Organization](./api/organization) |
| Administration | Identity Management | View, Create, Edit, Delete | [Identities](./api/identities) |
| Mail Flow | Domains | View, Create, Edit, Delete | View and Edit only — see [Domains](./api/domains) |
| Mail Flow | MailBox | View, Create, Edit, Delete | Not yet documented — coming soon |
| Mail Management | Departments | View, Create, Edit, Delete | [Departments](./api/departments) |

The full mapping of permission to endpoint is on the [Permissions](./permissions) page.

![Step 2 — Permissions](/img/admin-panel/api-key-create-2.png)

## 4. Preview and create

Check the name, description, tags and permission list, then click **Create API Key**.

![Step 3 — Preview](/img/admin-panel/api-key-create-3.png)

:::danger The key is shown only once
After you click **Create API Key**, a dialog shows the key one time. Copy it or download the PDF straight away. If you close the dialog without saving it, you cannot view it again — create a new key instead.
:::

## 5. Test the key

```bash
curl 'https://v3-api.test.yukthi.net/self/who-am-i' \
  --header 'x-api-key: <API_KEY>'
```

A `200` response listing your organization ID and permissions means the key works. See [Who Am I](./api/self/who-am-i).

## Editing, deactivating or deleting a key

Use the **⋮** menu next to a key in the list to view, edit or delete it.

:::caution Changes are not instant
The API caches each key's permissions for up to **7 hours**. After you edit, deactivate or delete a key, call [`POST /self/refresh`](./api/self/refresh) once with that key so the change applies immediately. See [How key details are cached](./authentication#how-key-details-are-cached).
:::
