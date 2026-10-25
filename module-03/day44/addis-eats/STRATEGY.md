# Route Strategy

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | The home page has no request-specific data. |
| `/menu` | Static with `revalidate = 60` | The menu can refresh once a minute. |
| `/menu/[id]` | Static with `generateStaticParams` | The known dishes can be built ahead of time. |
| `/cart` | Static | This example cart has no user-specific data. |
| `/checkout` | Static | The form reads the session only when a server action runs. |
| Not-found UI | Static | It is shared by unknown URLs and dishes. |

The menu layout keeps the sidebar and counter while the dish list streams in.
