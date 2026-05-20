import { projectGalleries } from "@/data/profile";
import type { FeaturedProject } from "@/components/projects/FeaturedProjectBlock";
import type { Locale } from "@/i18n/locales";
import { localeContent, type LocaleContent } from "@/i18n/translations";

export function getLocalizedContent(locale: Locale): LocaleContent {
  const base = localeContent[locale];

  const featuredProjects: FeaturedProject[] = base.cv.featuredProjects.map(
    (project, index) => ({
      ...project,
      gallery: [...projectGalleries[index].gallery],
      galleryDevice: projectGalleries[index].galleryDevice,
    }),
  );

  return {
    ...base,
    cv: {
      ...base.cv,
      featuredProjects,
    },
  };
}
