const productionHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const configuredSiteUrl =
  process.env.SITE_URL ||
  (productionHost
    ? `https://${productionHost}`
    : "https://addis-eats.vercel.app");

export const siteUrl = new URL(new URL(configuredSiteUrl).origin);
