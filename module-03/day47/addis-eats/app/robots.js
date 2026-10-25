import { siteUrl } from "./data/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cart",
        "/checkout",
        "/sign-in",
        "/staff",
        "/orders",
        "/api/orders",
      ],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
