# Rendering Strategy

| Route | Strategy | Reason |
| --- | --- | --- |
| `/` | Static | Specials and dish catalog are public and change infrequently; the page needs no request-specific data. |
| `/menu` | ISR, 3600 seconds | The menu is public and can be up to an hour stale; filtering runs in a small client control. |
| `/menu/[id]` | Static via `generateStaticParams` | Dish IDs are known at build time, so every dish detail can be generated ahead of requests. |
| `/cart` | Static server shell with client state | Cart contents are private to this browser tab and live in the client store; its cookie mirror is read only by checkout. |
| `/checkout` | Dynamic | The server reads the signed session and cart cookie for authorization and a trusted server-priced summary. |

## Build Evidence

Verified with `npm run build`:

```text
Route (app)            Revalidate  Expire
| ○ /
| ƒ /api/orders
| ○ /cart
| ƒ /checkout
| ○ /menu                      1h      1y
|   /menu/[id]
|   ├ ● /menu/1
|   ├ ● /menu/2
|   ├ ● /menu/3
|   └ ● [+5 more paths]

○ Static
● SSG using generateStaticParams
ƒ Dynamic
```

The API route is an endpoint, not one of the five page routes.
