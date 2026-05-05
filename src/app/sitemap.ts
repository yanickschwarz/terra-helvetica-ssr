import type { MetadataRoute } from "next";
import { createStaticClient } from "@/lib/supabase/static";

const SITE_URL = "https://terrahelvetica.vlix.ch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient();

  // Fetch all published news for dynamic sitemap entries
  const { data: news } = await supabase
    .from("th_news")
    .select("id, published_at")
    .eq("is_published", true);

  const newsEntries: MetadataRoute.Sitemap = (news ?? []).map((n) => ({
    url: `${SITE_URL}/news/${n.id}`,
    lastModified: n.published_at ? new Date(n.published_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/anlagegruppe`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/ueber-uns`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/dokumente`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/impressum`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/datenschutz`, changeFrequency: "yearly", priority: 0.3 },
  ].map((r) => ({ ...r, lastModified: r.lastModified ?? new Date() }));

  return [...staticRoutes, ...newsEntries];
}
