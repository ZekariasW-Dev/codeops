# Authentication and Authorization

This phase hardens the existing instructional demo session. It is not production account authentication: sign-in accepts a name without a password or account lookup, and orders are not persisted. Do not use this flow to protect real customer records.

## Route and Action Layers

| Route or action | Middleware layer (`proxy.js`): cookie presence | Page/handler: verified session | Action/ownership permission |
| --- | --- | --- | --- |
| `/sign-in` | Public by design | Page reads and validates any existing session before redirecting | `signIn` validates the submitted display name, creates a signed session, and restricts the return path to `/checkout`; account credentials are not implemented. |
| `/checkout` | Requires `addis-demo-session`; missing cookie redirects to sign-in | Page calls `requireDemoUser`, which verifies signature, expiry, identity, and role | `placeOrder` independently verifies the session and `customer` role; it gets the name from the session rather than form data. No stored order exists yet to check ownership against. |
| `POST /api/orders` | Requires `addis-demo-session`; missing cookie returns `401` | Route handler independently verifies signature, expiry, identity, and role | Handler checks `customer` permission and takes the name from the session, not the JSON body. No stored order exists yet to check ownership against. |
| `signIn` server action | Public by design; no existing identity is required to sign in | Validates input and creates the signed session on the server | No resource is accessed; this demo action does not authenticate credentials. |
| `signOut` server action | Invoked from the protected checkout page | Independently verifies the signed session | Requires a valid current session before clearing it; it does not accept a user ID from the client. |
| `placeOrder` server action | Invoked through the protected checkout page | Independently verifies the signed session | Requires `customer` role and derives the customer identity from the verified session. No stored order exists yet to check ownership against. |

The cookie is `httpOnly`, `sameSite=lax`, scoped to `/`, and `secure` in production. Its payload includes a random user ID, random session ID, role, display name, and expiry; an HMAC-SHA256 signature is verified with constant-time comparison. `SESSION_SECRET` must be set server-side and contain at least 32 characters.

## Attack Checks

| Attempt | Expected result | What stops it |
| --- | --- | --- |
| Request `/checkout` or `POST /api/orders` without the session cookie | Redirect to `/sign-in` or `401` JSON | Middleware cookie-presence gate. |
| Send a made-up or modified cookie to `/checkout` or `POST /api/orders` | Invalid session is rejected; checkout redirects to sign-in and the API returns `401` | Page/handler verifies the HMAC, expiry, and payload schema; middleware presence alone grants no access. |
| Submit another `name`, `userId`, or role in order form/API JSON | Name and role are taken from the verified session; client identity fields do not grant another user's permissions | The write handlers do not trust client identity fields and check the session role. Persistent cross-user order ownership cannot be tested until an account and order database exists. |

In the local production build, missing-cookie requests returned `307` from `/checkout` and `401` from `POST /api/orders`; a fabricated cookie also returned `307`/`401`. A signed-in browser request with altered `name`, `userId`, and `role` fields returned `201` without using those fields as identity. Sign-in, checkout access, and sign-out were exercised in the browser.

These checks should be rerun after adding persistent accounts and owned records. At that point, every record lookup and mutation must include the authenticated session's stable account ID in its database predicate.
