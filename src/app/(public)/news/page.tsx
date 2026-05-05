import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import { MotionImage } from "@/components/motion/MotionPrimitives";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import NewsletterSection from "@/components/NewsletterSection";

const ITEMS_PER_PAGE = 6;

// Revalidate every 60 seconds (ISR) so new news show up without rebuild
export const revalidate = 60;

export default async function News({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const supabase = await createClient();
  const { data: allNews } = await supabase
    .from("th_news")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const news = allNews ?? [];
  const totalPages = Math.max(1, Math.ceil(news.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedNews = news.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const pageHref = (n: number) => (n === 1 ? "/news" : `/news?page=${n}`);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[30vh] min-h-[200px]">
        <MotionImage
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/images/mountains-divider.png"
          alt="Bergpanorama"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* News Section */}
      <section className="py-16 md:py-20 3xl:py-28">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl 3xl:text-6xl font-heading font-medium text-primary mb-12">
              News
            </h1>
          </FadeIn>

          <StaggerContainer
            key={`page-${safePage}`}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={0.15}
          >
            {paginatedNews.map((article) => (
              <StaggerItem key={article.id}>
                <Link
                  href={`/news/${article.id}`}
                  className="group bg-background border border-border overflow-hidden h-full flex flex-col cursor-pointer hover:border-primary transition-colors"
                >
                  {article.image_url && (
                    <div className="overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    {article.published_at && (
                      <p className="text-xs text-muted-foreground mb-2">
                        {format(new Date(article.published_at), "d. MMMM yyyy", { locale: de })}
                      </p>
                    )}
                    <h3 className="font-heading font-medium text-lg text-primary mb-2">
                      {article.title}
                    </h3>
                    {article.subtitle && (
                      <p className="text-sm text-muted-foreground mb-3">{article.subtitle}</p>
                    )}
                    {article.content && (
                      <p className="text-sm text-foreground/70 leading-relaxed line-clamp-4 flex-1">
                        {article.content}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-4 group-hover:gap-2 transition-all">
                      Mehr lesen →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  {safePage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href={pageHref(safePage - 1)} />
                    </PaginationItem>
                  )}
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href={pageHref(i + 1)}
                        isActive={safePage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {safePage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={pageHref(safePage + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
