import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllCaseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/certifications", "/contact", "/resume"];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const caseStudies: MetadataRoute.Sitemap = getAllCaseStudies().map((study) => ({
    url: `${site.url}/projects/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...caseStudies];
}
