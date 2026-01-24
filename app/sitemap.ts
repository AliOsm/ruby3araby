import { MetadataRoute } from "next";
import { getCourseStructure } from "@/lib/course-loader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ruby3araby.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const course = getCourseStructure();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/progress`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic lesson pages
  const lessonPages: MetadataRoute.Sitemap = [];

  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      lessonPages.push({
        url: `${siteUrl}/lessons/${section.slug}/${lesson.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return [...staticPages, ...lessonPages];
}
