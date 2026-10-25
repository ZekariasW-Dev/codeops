import { dishes } from "./data/dishes";
import { siteUrl } from "./data/site";

export default function sitemap() {
  const publicPaths = ["/", "/menu", ...dishes.map((dish) => `/menu/${dish.id}`)];

  return publicPaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
