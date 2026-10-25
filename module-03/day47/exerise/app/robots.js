import { siteUrl } from "./data/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
