"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data: allNews, isLoading } = useQuery({
    queryKey: ["th_news_published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("th_news")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const totalPages = allNews ? Math.ceil(allNews.length / ITEMS_PER_PAGE) : 1;
  const paginatedNews = allNews?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
    {/* Hero */}
      <section className="relative h-[30vh] min-h-[200px]">
        <motion.img
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-background border border-border overflow-hidden">
                  <Skeleton className="w-full h-56" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <StaggerContainer key={`page-${currentPage}`} className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
                {paginatedNews?.map((article) => (
                  <StaggerItem key={article.id}>
                    <div
                      className="group bg-background border border-border overflow-hidden h-full flex flex-col cursor-pointer hover:border-primary transition-colors"
                      onClick={() => router.push(`/news/${article.id}`)}
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
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          />
                        </PaginationItem>
                      )}
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === i + 1}
                            onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
);
}
