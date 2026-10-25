# Addis Eats

## Menu JavaScript size

I measured the JavaScript loaded on a fresh production visit to `/menu` by adding the browser's `encodedBodySize` values for its `/_next/static/chunks/*.js` resources. This is the script body total; Next 16.4.2's Turbopack build report does not print the older `First Load JS` column.

| Build | `/menu` JavaScript |
| --- | ---: |
| Before the component-boundary changes | 139,456 bytes (136.2 KiB) |
| After the component-boundary changes | 139,862 bytes (136.6 KiB) |
| Difference | +406 bytes (+0.4 KiB) |

The starting menu was already a Server Component and had no `useFetch` hook. The provider and client shell required for this exercise add a small amount of JavaScript, so this change does not make the measured total smaller.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Menu and orders

- `GET /api/dishes` returns a paginated menu as JSON and accepts `page` and `q` query parameters. `GET /api/dishes/[id]` returns one dish or a 404 error.
- `POST /api/orders` accepts `name`, `phone`, `area`, and optional `notes`. Invalid fields return 422 with `fieldErrors`.
- Checkout uses the `placeOrder` server action and supports cancellation through an owner-checked `cancelOrder` action.
- `/orders/[id]` renders the signed-in owner's order status on the server and refreshes it every five seconds. Its polling endpoint is `GET /api/orders/[id]`.
- `/menu` supports page links through `?page=<number>` and debounced dish search. Query keys and refresh behavior are documented in [DATA.md](./DATA.md).
- Orders are stored in memory for this exercise and are cleared when the server restarts.

The `.env.local` file is ignored by Git. Keep secrets in server-only code and do not expose them with `NEXT_PUBLIC_` variables.
Set `SITE_URL` in `.env.local` to the canonical HTTPS production origin before
building for deployment. Metadata, Open Graph image URLs, canonical links,
`robots.txt`, and the sitemap use this origin. The default is
`https://addis-eats.vercel.app`; replace it if the deployment uses another
domain.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
