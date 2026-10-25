# Addis Eats

A responsive food-ordering frontend for Addis Ababa, built as the Day 35 vertical-slice mini-project.

## Routes

| Path | Screen | Behavior |
| --- | --- | --- |
| `/` | Home | Today's specials and a link to the menu |
| `/menu` | Menu | Fetched dishes and a category filter stored in `?category=` |
| `/menu/:id` | Dish detail | Dish information, add-to-order action, and unknown-id handling |
| `/cart` | Basket | Order lines, quantity controls, and an ETB total |
| `/checkout` | Checkout | Sign-in guarded, validated delivery form |
| `/signin` | Sign in | Local demo sign-in; returns to the guarded route |
| `*` | Not found | Helpful message and links back to the app |

## Structure

`src/` is grouped by feature: `api/`, `hooks/`, `ui/`, `cart/`, `menu/`, `checkout/`, and `auth/`.
Cart and authentication state are shared through context; the menu filter is represented in the URL.
Dishes are fetched from `public/dishes.json` in an abortable effect. Checkout is lazy-loaded and guarded.

## Run and verify

```bash
npm install
npm run lint
npm run build
npm run dev
```

Sign in with any valid email and a password of at least six characters to open checkout. The session is intentionally in-memory for this learning project.

See [`../../exerise/README.md`](../../exerise/README.md) for the step checklist and manual failure/accessibility checks.
