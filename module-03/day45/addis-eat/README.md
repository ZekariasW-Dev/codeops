# Addis Eats

Addis Eats is a Next.js App Router rebuild of the Day 34 food-ordering exercise. Public menu content is rendered on the server; browser-only cart state stays in the client store until checkout.

## Run

Requires Node.js and npm.

```bash
npm install
npm run dev
```

The signed demo session requires a server-only secret of at least 32 characters. For PowerShell:

```powershell
$env:SESSION_SECRET = "replace-this-with-a-local-secret-at-least-32-characters"
npm run build
npm run start
```

Set `SESSION_SECRET` in the server environment before using checkout. Never prefix it with `NEXT_PUBLIC_`. `/sign-in` creates an eight-hour signed demo session and checkout offers sign-out. Next.js 16's `proxy.js` request middleware checks for the session cookie; the checkout page and order handlers then verify its signature and role.

This remains an instructional session flow, not production authentication: sign-in accepts a name without password or account lookup, and orders are simulated rather than stored. Do not use it to protect real customer data. Production ownership checks require a persistent account and order store keyed by the authenticated user ID.

## Routes

| Route | What it does |
| --- | --- |
| `/` | Static landing page and today's specials. |
| `/menu` | Hourly ISR menu with search and category filtering. |
| `/menu/[id]` | Static dish details generated from catalog IDs. |
| `/cart` | Client-side order lines and running total. |
| `/sign-in` | Dynamic sign-in form for the instructional signed demo session. |
| `/checkout` | Dynamic, request-middleware- and session-guarded checkout with server validation. |

## Data and Orders

Menu and dish pages import `public/dishes.json` directly. No page calls a menu API. The Zustand cart keeps its items in browser storage and mirrors only dish IDs and quantities into a same-site cookie. Checkout resolves those IDs against the server catalog and recalculates prices; it never trusts client prices or totals.

`POST /api/orders` is the single route handler. The request middleware requires a session cookie, and the handler verifies the signed session and role. The handler takes the customer name from that verified session rather than the request body. It uses the same `validateOrder` helper as the `placeOrder` server action. Malformed JSON returns `400`; invalid fields return `422` with `fieldErrors`; valid data returns `201`. The server action independently verifies the signed session and permission before accepting an order.

Example invalid request:

```bash
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"name":"Almaz","phone":"0912","area":"Bole"}'
```

Expected without a signed session: `401`. With a signed session but an invalid phone: `422` and a `fieldErrors.phone` message.

## Production Build Evidence

Verified with `npm run build`:

```text
Route (app)            Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ƒ /api/orders
├ ○ /cart
├ ƒ /checkout
├ ○ /menu                      1h      1y
├ ƒ /sign-in
└   /menu/[id]
  ├ ● /menu/1
  ├ ● /menu/2
  ├ ● /menu/3
  └ ● [+5 more paths]

○ Static
● SSG using generateStaticParams
ƒ Dynamic
ƒ Proxy (Middleware)
```

See [STRATEGY.md](STRATEGY.md) for route decisions and [BOUNDARY.md](BOUNDARY.md) for the server/client map.

## Production Checks

1. Run `npm run build`, set `SESSION_SECRET`, and start with `npm run start`.
2. Visit all five pages and open `/menu/not-a-dish` to verify the menu not-found UI.
3. Send the invalid request above and confirm `422` plus `fieldErrors.phone`; submit a valid test request and confirm `201`.
4. Add an item, open checkout, sign in, then submit valid and invalid TeleBirr numbers. Confirm invalid details are shown beside their fields.
5. Disable JavaScript after establishing a cart cookie and verify sign-in and order submission still work through the server action.
6. Throttle the menu route to Slow 3G to inspect `loading.js`; verify the menu error boundary by temporarily throwing in its server page.
7. Search the generated client chunks under `.next/static` for the value of `SESSION_SECRET`; it must not appear.

Orders are simulated for this exercise; no payment processor or persistent order database is connected.
