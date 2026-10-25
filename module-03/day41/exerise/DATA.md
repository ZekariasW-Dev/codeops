# Data and Fetching

## Menu

`app/data/dishes.js` is the in-memory dish catalog. `getDishPage(query, page)` filters names, descriptions, and categories, then returns this shape:

```json
{
  "dishes": [],
  "page": 1,
  "pageSize": 5,
  "total": 13,
  "totalPages": 3
}
```

`GET /api/dishes?q=shiro&page=1` returns the same shape. The menu page reads `page` from its query string and provides that page as server-rendered initial data. A blank search uses a null SWR key; non-empty searches are debounced by 300 ms and use `keepPreviousData` so existing results stay visible while the next request is pending.

## Orders

Checkout creates orders in the in-memory store in `app/data/orders.js`. Orders are cleared when the server process restarts. The `order-session` cookie identifies the owner.

`GET /api/orders/{id}` returns the public order fields (`id`, `name`, `area`, and `status`) only to the session that created the order. It returns `404` for missing or unowned orders and disables HTTP caching. The `/main?orderId={id}` server component supplies the initial order as SWR `fallbackData`; the client then refreshes the status every 3 seconds.

The order tracking link appears after successful checkout. Open the browser Network panel on that page and filter for `/api/orders/`; repeated GET requests at roughly three-second intervals confirm polling. Cancelling the order in another checkout view is reflected on the next poll.