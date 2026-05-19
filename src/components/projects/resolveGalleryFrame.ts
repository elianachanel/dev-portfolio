import type { GalleryItem } from "@/components/projects/ProjectGalleryRail";

export type GalleryDevice = "mobile" | "mixed" | "web";

const WEB_TITLE_KEYWORDS = ["web", "admin", "dashboard", "desktop"];

export function resolveGalleryFrame(
  item: GalleryItem,
  galleryDevice?: GalleryDevice,
): "phone" | "browser" {
  if (item.frame) return item.frame;
  if (galleryDevice === "mobile" || galleryDevice === "web") {
    return galleryDevice === "web" ? "browser" : "phone";
  }

  const title = item.title.toLowerCase();
  if (WEB_TITLE_KEYWORDS.some((k) => title.includes(k))) {
    return "browser";
  }

  return "phone";
}
