# Server and Client Boundary

| Component or module | Runtime | Reason |
| --- | --- | --- |
| `proxy.js` | Next.js 16 request middleware | Checks for the session cookie before checkout and order API requests; it does not replace signature verification. |
| `app/sign-in/page.js` | Dynamic server page | Reads the verified demo session and hosts the sign-in form. |
| `components/SignInForm.jsx` | Client leaf with server action | Owns pending/error UI while sign-in is completed by the server. |
| `app/layout.js` | Server | Owns metadata and shared document shell. |
| `components/SiteHeader.jsx` | Client | Reads cart state and current pathname. |
| `app/page.js` | Server | Renders public specials from local dish data. |
| `components/AddToCartButton.jsx` | Client | Button event writes to the cart store. |
| `app/menu/layout.js` | Server | Wraps the menu segment without adding state. |
| `app/menu/page.js` | Server | Reads the catalog and renders server markup; revalidates hourly. |
| `components/MenuExplorer.jsx` | Client | Owns only search and category selection around server-rendered children. |
| `components/DishCard.jsx` | Server | Dish markup and links; embeds the interactive add button as a leaf. |
| `app/menu/[id]/page.js` | Server | Resolves static params and calls `notFound()` for unknown IDs. |
| `app/menu/loading.js` | Server | Renders the menu segment loading shell. |
| `app/menu/error.js` | Client | Next error boundary requires client-side reset handling. |
| `app/menu/not-found.js`, `app/not-found.js` | Server | Render route-specific and global not-found UI. |
| `app/cart/page.js` | Server | Provides static page shell. |
| `components/CartView.jsx` | Client | Cart is tab-local, persisted in browser storage, and interactive. |
| `app/checkout/page.js` | Server, dynamic | Re-verifies the signed session, reads the cart cookie, and computes server-trusted prices. |
| `components/CheckoutForm.jsx` | Client leaf with server action | Accessible form state and progressive action submission. |
| `app/actions.js` | Server action | Signs in/out and re-verifies session plus role before order placement. |
| `app/api/orders/route.js` | Route handler | Re-verifies the signed session and role; uses session identity instead of a client-supplied name. |
| `lib/dishes.js`, `lib/order-schema.js` | Shared pure modules | Catalog and validation can be imported by server pages, actions, and the route handler. |
| `lib/session.js`, `lib/cart-cookie.js` | Server-only | Sign/verify sessions, authorize order placement, read cart cookies, and keep signing keys off the client. |
| `stores/cartStore.js` | Client-only | Zustand state, local persistence, and non-sensitive cart cookie mirror. |

`CheckoutForm` receives only serializable session/cart data from its server page. The interactive menu receives server-rendered cards through `children`; callbacks do not cross the server/client boundary.
