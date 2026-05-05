import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/motion/FadeIn";
import { MotionImage } from "@/components/motion/MotionPrimitives";
import { Download, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Pre-render all published news at build time
export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("th_news")
    .select("id")
    .eq("is_published", true);

  return (data ?? []).map((n) => ({ id: String(n.id) }));
}

// Per-article SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = createStaticClient();
  const { data: article } = await supabase
    .from("th_news")
    .select("title, subtitle, image_url")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (!article) {
    return { title: "Beitrag nicht gefunden" };
  }

  return {
    title: article.title,
    description: article.subtitle || article.title,
    openGraph: {
      title: article.title,
      description: article.subtitle || undefined,
      images: article.image_url ? [{ url: article.image_url }] : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("th_news")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="relative h-[40vh] min-h-[280px] overflow-hidden">
            {article.image_url ? (
              <MotionImage
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                src={article.image_url}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <MotionImage
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                src="/images/mountains-divider.png"
                alt="Bergpanorama"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 3xl:py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Back button */}
          <FadeIn>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Zurück zur Übersicht
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            {article.published_at && (
              <p className="text-sm text-muted-foreground mb-4">
                {format(new Date(article.published_at), "d. MMMM yyyy", { locale: de })}
              </p>
            )}

            <h1 className="text-3xl md:text-4xl 3xl:text-5xl font-heading font-medium text-primary mb-4 leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {article.content && (
              <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            )}

            {article.document_url && (
              <div className="mt-12 pt-8 border-t border-border">
                <a
                  href={article.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  Dokument herunterladen
                </a>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
