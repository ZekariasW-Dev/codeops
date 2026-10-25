# Authentication and route protection

## Configuration

Configure these server-only environment variables before signing in:

- `AUTH_SECRET`: a random secret of at least 32 characters, used to sign sessions.
- `AUTH_USER_EMAIL` and `AUTH_USER_PASSWORD`: the customer account.
- `AUTH_STAFF_EMAIL` and `AUTH_STAFF_PASSWORD`: the staff account.

Do not prefix these values with `NEXT_PUBLIC_`. The application fails explicitly
when authentication is attempted without the required configuration.

## Session and sign-in

`app/data/session.js` is the shared session helper. `getSession()` reads and
validates the signed `addis-eats-session` cookie for the Next.js proxy middleware,
pages, actions, and route handlers. The cookie is `httpOnly`, `sameSite=lax`, scoped to `/`, and
has a 30-day lifetime; `secure` is enabled in production. The signed payload
contains a random session id, email, role, and expiration time. Sign-in creates
a fresh id; sign-out deletes the cookie.

The `next` parameter accepts only a local path beginning with one slash; absolute
URLs, protocol-relative URLs, backslashes, and control characters fall back to
`/`. The validated path is checked again when the sign-in page renders and when
the sign-in action redirects.

## Protected routes and proof layers

| Route | Middleware | Render/handler check | What the layer proves |
| --- | --- | --- | --- |
| `/checkout` | Narrow matcher validates the signed session and redirects anonymous visitors to sign-in while preserving the local destination. | Checkout page calls `getSession()` before rendering; `placeOrder` checks it again before creating an order. | Proxy middleware is an early navigation gate; rendering and the write action independently require a valid session. |
| `/orders/[id]` | Same signed-session matcher and remembered destination. | The page checks the session, then queries by both route id and session id. The polling handler independently checks the session and performs the same scoped query. `cancelOrder` checks the session and owner-scoped order before changing status. | A valid session is required at every entry point, and a guessed order id cannot select another owner's record. |
| `/staff` | Same signed-session matcher and remembered destination. | The page calls `getSession()` and renders only when the role is `staff`; other users receive not-found. | Proxy middleware proves authentication only; the page enforces staff authorization. |
| `POST /api/orders` | Not in the page middleware matcher. | The handler requires `getSession()` before parsing or creating an order and assigns ownership from the session id. | Direct API access cannot create an anonymous order or choose its owner. |

The menu, cart, and dish routes remain public. Order records are currently
in-memory and are cleared when the server restarts.

## Attack checks

These checks were run against the local app using configured customer and staff
accounts:

| Attack | Attempt | Result |
| --- | --- | --- |
| Open redirect | Sign in using `next=https://attacker.example/` (also tested `//attacker.example/`). | Rejected as a destination; sign-in redirects to `/`, not the supplied host. |
| Session tampering | Change a character in a valid session cookie and request `/checkout`. | Signature validation fails; middleware redirects to `/sign-in` and preserves `/checkout` as the local destination. |
| Cross-owner order access (IDOR) | Create an order in one customer session and request its id from a different customer session. | Owner-scoped lookup returns `404 Order not found`; the second session cannot read or cancel the order. |
