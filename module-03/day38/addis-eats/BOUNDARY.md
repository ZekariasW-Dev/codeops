# Component Boundaries

| Component | Runs on | Why |
| --- | --- | --- |
| `RootLayout` | Server | Owns the document shell and renders shared providers. |
| `Navigation` | Server | Links do not need local state or browser APIs. |
| `Providers` | Client | Holds the cart context state. |
| `Home` | Server | Displays static home content. |
| `NotFound` | Server | Displays static not-found content. |
| `CartPage` | Server | Displays static cart content. |
| `CheckoutPage` | Server | Reads request cookies on the server. |
| `MenuLayout` | Server | Shares the sidebar and counter across menu routes. |
| `CategoryBar` | Server | Displays static category text. |
| `MenuCounter` | Client | Uses state and a click handler. |
| `MenuPage` | Server | Awaits the dish data and renders the route. |
| `DishList` | Server | Renders dish links without browser state. |
| `FilterShell` | Client | Provides the required client boundary around `children`. |
| `DishPage` | Server | Awaits route params and looks up the dish. |
| `Loading` | Server | Renders the route loading fallback. |
| `MenuError` | Client | Uses the error boundary's `reset` action. |
