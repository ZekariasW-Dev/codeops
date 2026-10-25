# Day 35 Exercises

## Addis Eats component tree

```text
App
├── AuthProvider                         owns signed-in user
├── CartProvider                         owns order lines and cart actions
└── BrowserRouter
    └── Layout                           owns shared navigation and footer
        ├── Header                       receives cart count and auth state
        └── Route content
            ├── HomePage                 reads specials; links to menu
            ├── MenuPage                 owns URL category filter; reads dishes
            │   ├── CategoryFilter       receives selected category and callback
            │   └── DishCard             receives dish and add-to-cart callback
            ├── DishPage                 reads route id and dish; adds to cart
            ├── CartPage                 reads order lines; changes quantities
            ├── CheckoutPage             owns form values, touched state, errors
            ├── SignInPage               owns sign-in form
            └── NotFoundPage             renders useful fallback navigation
```

## State placement

| State | Owner | Why |
| --- | --- | --- |
| Signed-in user | `AuthProvider` | Shared by the header, sign-in flow, and checkout guard |
| Cart lines | `CartProvider` | Read and changed by the menu, dish detail, header, and cart |
| Selected category | `MenuPage` URL query string | Shareable, reload-safe filter state |
| Dish list, loading, and error | `useDishes` hook | Needed only by pages that display fetched dishes |
| Checkout field values, touched fields, and submit state | `CheckoutPage` | No other screen needs the in-progress form |
| Sign-in email and password | `SignInPage` | Local to the sign-in form |

## Feature-based structure

The exercise scaffold includes the requested feature folders. The implemented mini-project fills them with the corresponding feature code.

```text
src/
├── api/
├── hooks/
├── ui/
├── cart/
├── menu/
├── checkout/
└── auth/
```

## Vertical-slice checklist

- [x] Step 1: Routes and layout — every screen is reachable, including the not-found route.
- [x] Step 2: The menu — fetch, loading, error, and dish list.
- [x] Step 3: The filter and dish detail route.
- [x] Step 4: The cart store and adding from the menu.
- [x] Step 5: The guarded checkout form with validation.
- [x] Step 6: Error boundary, lazy-loaded checkout route, and responsive/accessibility polish.

## Failure and accessibility checks

- [ ] Throttle the browser to Slow 3G and confirm the menu loading status is announced.
- [ ] Temporarily rename `public/dishes.json` and confirm the menu error state and retry action.
- [ ] Select a category with no matching items and confirm the empty state.
- [ ] Visit a nonsense URL and confirm the not-found page provides navigation back.
- [ ] Sign out and open `/checkout`; confirm redirect to sign-in and return to checkout after signing in.
- [ ] Reload `/`, `/menu`, `/menu/:id`, `/cart`, and `/checkout`; confirm each route loads.
- [ ] Complete checkout using only the keyboard; confirm labels, focus, validation, and submission work.
- [ ] Inspect the app in greyscale and confirm status and controls do not rely on color alone.

## Capstone kickoff

The accompanying `../capstone/my-capstone` scaffold uses the sample pharmacy-stock-book brief in its README. It contains a shared layout, five empty routes, and a not-found route.

```bash
cd ../capstone/my-capstone
npm install
npm run dev
```
