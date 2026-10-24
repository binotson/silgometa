import type { Metadata } from "next";

/** Per-page metadata with a canonical URL and matching Open Graph fields. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type },
    twitter: { title, description },
  };
}
