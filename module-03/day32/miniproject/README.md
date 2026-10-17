# Restaurant Menu

## State architecture

The cart lives in a Zustand store because it is shared by the header, menu, and cart panel. Each consumer subscribes through a narrow selector, so changes only update components that use the changed slice. The store owns cart actions and persists its `items` array with the `restaurant-cart` storage key.

The `persist` middleware restores quantities, totals, and insertion order after a reload. Adding an existing dish increments its quantity without moving it; removing decrements it, and `clear` empties the store.

Authentication remains in React Context because it is session-scoped provider state with login and logout behavior. Theme state is also an independent React provider. Both contexts expose guarded hooks that fail clearly when used outside their providers.

## Manual verification

1. Add two different dishes and confirm their order.
2. Add one of those dishes again and confirm its quantity increases.
3. Reload and confirm the items, quantities, order, and total are restored.
4. Remove an item quantity, then clear the cart.
5. Open checkout while logged out and confirm it redirects to login.

## Commands

```bash
npm install
npm run lint
npm run build
npm run dev
```
