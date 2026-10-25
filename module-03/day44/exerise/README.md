This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Menu and orders

- `GET /api/dishes` returns the menu, and `GET /api/dishes/[id]` returns one dish.
- `POST /api/orders` requires sign-in and accepts `name`, `phone`, `area`, and optional `notes`. Invalid fields are returned as `fieldErrors`.
- Sign in at `/login` using the configured customer or staff account. Protected pages redirect to sign-in and return to the requested internal path.
- Checkout uses a server action. `/orders` only shows orders owned by the signed-in session. Orders can be cancelled from the same session that created them.
- `/kitchen` requires a signed-in staff account; its role check runs on the server.

Orders are kept in memory for this exercise, so they are cleared when the server restarts.

### Local authentication configuration

Copy `.env.example` to `.env.local` before signing in, then replace the
placeholders with unique, strong passwords and a random session secret of at
least 32 characters. The staff credentials are optional, but must both be set
to enable staff sign-in:

```env
SESSION_SECRET=replace-with-a-random-secret-of-at-least-32-characters
CUSTOMER_EMAIL=customer@example.com
CUSTOMER_PASSWORD=replace-with-a-strong-customer-password
STAFF_EMAIL=staff@example.com
STAFF_PASSWORD=replace-with-a-strong-staff-password
```

Only server-side code reads these credentials. Do not commit `.env.local` or use
these example values in a deployed environment. This environment-backed login
is for the exercise; use an authentication provider and durable account store
for a production application.

Run `npm test` to check redirect validation (including protocol-relative crafted
links) and order ownership isolation.

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
