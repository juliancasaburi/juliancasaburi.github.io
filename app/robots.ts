import { envConfig } from "@/config/env-config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${envConfig.BASE_URL}/sitemap.xml`,
  };
}
