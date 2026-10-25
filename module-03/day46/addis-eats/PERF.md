# Performance improvements

## Lighthouse before and after

Measured the production build at `/` with Lighthouse 12.8.2 on October 19,
2026. Both runs used the same local URL, Chrome, mobile emulation, and simulated
network/CPU throttling (412 px viewport, 4x CPU slowdown). The first run was
captured before the changes below.

| Lighthouse measure | Before | After | Change |
| --- | ---: | ---: | ---: |
| Performance | 40 | 80 | +40 points |
| Accessibility | 100 | 100 | — |
| Best Practices | 96 | 96 | — |
| SEO | 100 | 100 | — |
| First Contentful Paint | 8.7 s | 1.8 s | 6.9 s faster |
| Largest Contentful Paint | 9.9 s | 2.8 s | 7.1 s faster |
| Speed Index | 22.5 s | 11.0 s | 11.5 s faster |
| Total Blocking Time | 590 ms | 250 ms | 340 ms lower |
| Cumulative Layout Shift | 0 | 0 | — |

## What changed and why

- **Added a responsive hero image with `next/image`.** Before, the homepage
  contained only text, and Lighthouse identified the heading as the LCP element.
  The page now has a meaningful, responsive hero image with explicit dimensions
  and `sizes`. It is the only image marked `priority`, so the browser can
  prioritize the visual that anchors the homepage. Menu cards and dish detail
  pages also use `next/image`, with dimensions, responsive sizing, and
  descriptive alt text. This establishes a consistent image pipeline and
  reserves image layout space.
- **Configured the Unsplash image host.** `images.unsplash.com` is explicitly
  allowed in `next.config.mjs` so Next.js can serve the remote images through
  its image optimizer.
- **Switched from the system Arial stack to a self-hosted Geist font.** The
  local WOFF2 font is loaded with `next/font/local` and `display: swap`; the
  page no longer depends on a runtime Google Fonts request.
- **Kept third-party scripts out of the initial page.** The site has no
  third-party scripts to load, so no script was added. If one is introduced,
  use `next/script` with a loading strategy appropriate to its purpose rather
  than a blocking script tag.
- **Made environment setup safe to share.** `.env.example` documents the
  server-only authentication variables with placeholders. `.env*.local` files
  remain ignored, and the example is explicitly unignored. The application does
  not use `NEXT_PUBLIC_` secrets.
- **Added `public/robots.txt`.** Lighthouse verified crawl access after the
  change; the final SEO score is 100.

## Measurement notes

Lighthouse's simulated scores vary between runs. The after-run reported a
2.87 s root-document response time, compared with 8 ms in the baseline, even
though the other primary paint and responsiveness measures improved. This
suggests substantial run-to-run local server or machine contention; the score
is a measured result, not a claim that every environment will reproduce it.
The after-run's image-delivery audit also estimated approximately 39 KiB of
potential savings for the hero image, which remains a follow-up optimization.
