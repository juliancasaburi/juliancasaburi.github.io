import { envConfig } from "@/config/env-config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: envConfig.BASE_URL,
      lastModified: new Date(),
    },
  ];
}
