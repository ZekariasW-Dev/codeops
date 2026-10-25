# Production performance check

Audits used Lighthouse 12.8.2 against the production home page in Chrome
155.0.8059.82. Both runs used simulated throttling and a 4x CPU slowdown.

| Metric | Before changes | After changes | Difference |
| --- | ---: | ---: | ---: |
| Largest Contentful Paint (LCP) | 1,629 ms | 1,805 ms | +176 ms |
| Cumulative Layout Shift (CLS) | 0.000 | 0.000 | no change |
| Interaction to Next Paint (INP) | Not measured | Not measured | unavailable in navigation-mode audits without a measured interaction |
| Total Blocking Time (TBT) | 1,014 ms | 322 ms | -692 ms |
| Performance score | 0.78 | 0.92 | +0.14 |

The only change affecting page rendering between these builds was loading Geist
through `next/font`. The project had no external font link; its original font
was system Arial. CLS did not improve because it was already zero in the
baseline. The LCP result was 176 ms slower in the post-change run. TBT and the
overall score improved, but these are single lab runs and should not be
interpreted as a guaranteed production-user improvement.

No `<img>` elements or other image sources exist in the app, so there were no
images to convert, size, or prioritize. No third-party scripts were found, so
there was nothing to move to `next/script`.

The `.env.example` file documents the app's server-side authentication
variables. `.env.local` remains ignored by Git, while `.env.example` is
explicitly allowed.
