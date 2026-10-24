import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/projects",
    ...projects.map((p) => `/projects/${p.slug}`),
    "/leadership",
    "/insights",
    ...insights.map((i) => `/insights/${i.slug}`),
    "/careers",
    "/contact",
    "/privacy",
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
