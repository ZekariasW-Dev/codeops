# Client-side data queries

All SWR queries use the shared `fetcher` in `app/lib/fetcher.js`. It throws for
non-OK responses, so SWR receives failed requests as errors rather than
successful-looking empty data.

| Query | Key | Refresh rule | Reasoning |
| --- | --- | --- | --- |
| Menu search | `/api/dishes?q=<encoded-term>&page=<page>`; `null` while the debounced term is empty | Starts 300 ms after the input settles; SWR revalidates on mount, focus, and reconnect, with no interval | Debouncing avoids a request for each keystroke; `keepPreviousData` retains the prior list while the matching page loads. |
| Paged dish list | `/api/dishes?page=<page>`; `null` while a non-empty debounced search is active | SWR revalidates on mount, focus, and reconnect, with no interval | The page is part of the key and URL, so a page can be bookmarked; server-provided `fallbackData` renders the first list without a loading spinner. |
| Order status | `/api/orders/<order-id>` | Poll every 5,000 ms; SWR also revalidates on focus and reconnect | Server-rendered `fallbackData` gives an immediate status, and five-second polling picks up changes such as a cancellation. |

The server renders `/menu?page=<page>` (and the optional `q` search term) using
the same pagination function as the dishes API. Pagination links include the
page number and active search term, so they remain shareable. The order-status
page checks session ownership both when rendering and when its API is polled.
