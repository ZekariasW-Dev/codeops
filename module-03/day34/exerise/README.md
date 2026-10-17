# Cart State Exercise

This exercise compares React context, Zustand, and Redux Toolkit while keeping the restaurant cart behavior the same.

## State management

- `src/stores/cartStore.js` is the live cart implementation. It uses Zustand selectors and `persist` middleware with the `day32-cart` localStorage key.
- `src/redux/cartSlice.js` is an unconnected Redux Toolkit equivalent. It is intentionally not imported by the app.
- Auth and theme remain independent providers in `src/context`.

## Render observation

The recorded update pattern when adding a dish was a changed header cart count and a changed clicked dish. Enable React DevTools update highlighting to see those updates visually. The cart panel was not rendered on the menu route, and components that only select stable Zustand actions did not need a cart-state update. The existing `Profiler` around `DishList` also logs its render timing in development.

## Error boundaries and lazy routes

- Use `Trigger dish error` on the menu to throw during one dish render. The menu fallback replaces only the dish list; the header and cart navigation remain mounted.
- Use `Trigger cart error` on the cart page to test the independent cart fallback. The checkout link remains outside that boundary.
- Checkout and `/receipt` are lazy-loaded behind the route skeleton. The receipt page is a standalone route for demonstrating the loading boundary.

## Profiler recording

Record the comparison in a development browser session with React DevTools Profiler:

1. Start the app with `npm run dev`, open the menu, and start a Profiler recording.
2. Add three dishes, stop the recording, and note the `DishList` commit durations. The slowest component is the component with the largest `actualDuration` in the commit details.
3. Repeat after the category selection callback was stabilized with `useCallback` in `src/assets/Menu.jsx`.
4. Record the two values in this table from the same browser and machine:

| Session | Interaction | Slowest component | Total measured time |
| --- | --- | --- | --- |
| Before | Add three dishes | `DishList` or the component shown by DevTools | Record from Profiler |
| After | Add three dishes | `DishList` or the component shown by DevTools | Record from Profiler |

React StrictMode can produce extra development renders. Compare the same interaction and use the Profiler's commit timings rather than console log count.

## Accessible dish modal

Select `Quick view` on any dish. The dialog is rendered into `#modal-root`, receives focus on open, closes with Escape, and returns focus to the triggering button after it closes.

## Persistence check

Add a dish, refresh the page, and open the cart. The item count, quantity, and derived total survive the refresh. The cart's remove and clear actions remain available after rehydration.

## Redux comparison

Zustand exposes the cart through a store hook, so components subscribe directly to narrow selectors and no provider is required. Redux Toolkit describes the same `addItem`, `remove`, and `clear` transitions in a slice, but would need a Redux store and `<Provider>` before the app could use it. Persistence is supplied by Zustand middleware here; the Redux slice itself does not persist state.

## React + Vite template notes

This project uses Vite with HMR and ESLint.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
