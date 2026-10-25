const configuredSiteUrl = process.env.SITE_URL || "http://localhost:3000";

export const siteUrl = new URL(new URL(configuredSiteUrl).origin);
