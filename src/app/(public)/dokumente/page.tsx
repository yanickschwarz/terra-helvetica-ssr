"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const DocCard = ({ name, url }: { name: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between gap-4 px-6 py-5 border border-border rounded-lg hover:border-primary group transition-colors bg-background"
  >
    <span className="font-medium text-sm group-hover:text-primary transition-colors">{name}</span>
    <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
  </a>
);

export default function Dokumente() {
  const [showAllReportingsDE, setShowAllReportingsDE] = useState(false);
  const [showAllReportingsFR, setShowAllReportingsFR] = useState(false);

  const { data: documents, isLoading } = useQuery({
    queryKey: ["th_documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("th_documents")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const reglemente = documents?.filter((d) => d.category === "reglemente") || [];
  const prospekteDE = documents?.filter((d) => d.category === "prospekte" && d.language === "de") || [];
  const prospekteFR = documents?.filter((d) => d.category === "prospekte" && d.language === "fr") || [];
  const geschaeftsberichteDE = documents?.filter((d) => d.category === "geschaeftsberichte" && d.language === "de") || [];
  const geschaeftsberichteFR = documents?.filter((d) => d.category === "geschaeftsberichte" && d.language === "fr") || [];
  const reportingsDE = documents?.filter((d) => d.category === "reportings" && d.language === "de") || [];
  const reportingsFR = documents?.filter((d) => d.category === "reportings" && d.language === "fr") || [];
  const nachhaltigkeitsReportingsDE = documents?.filter((d) => d.category === "nachhaltigkeits-reportings" && d.language === "de") || [];
  const nachhaltigkeitsReportingsFR = documents?.filter((d) => d.category === "nachhaltigkeits-reportings" && d.language === "fr") || [];

  const visibleReportingsDE = showAllReportingsDE ? reportingsDE : reportingsDE.slice(0, 4);
  const visibleReportingsFR = showAllReportingsFR ? reportingsFR : reportingsFR.slice(0, 4);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-lg" />
      ))}
    </div>
  );

  return (
    <>
    {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px]">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/images/mountains-divider.png"
          alt="Bergpanorama"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* Title */}
      <section className="py-16 md:py-20 3xl:py-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <FadeIn>
              <h1 className="text-3xl md:text-5xl 3xl:text-6xl font-heading font-medium text-primary">Dokumente</h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-foreground/80 max-w-lg text-lg 3xl:text-xl">
                Hier finden Sie wichtige Unterlagen, Merkblätter und Formulare.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Reglemente & Statuten */}
      <section className="pb-20 md:pb-28 3xl:pb-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium mb-10">
              Reglemente & Statuten
            </h2>
          </FadeIn>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-4" staggerDelay={0.08}>
              {reglemente.map((doc) => (
                <StaggerItem key={doc.id}>
                  <DocCard name={doc.name} url={doc.url} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Prospekte */}
      <section className="py-20 md:py-28 3xl:py-36 bg-secondary">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium text-primary mb-10">
              Prospekte, Broschüren & Produktinformationsblätter
            </h2>
          </FadeIn>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                <FadeIn delay={0.1}>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Deutsch</h3>
                </FadeIn>
                <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                  {prospekteDE.map((doc) => (
                    <StaggerItem key={doc.id}>
                      <DocCard name={doc.name} url={doc.url} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
              <div>
                <FadeIn delay={0.15}>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Französisch</h3>
                </FadeIn>
                <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                  {prospekteFR.map((doc) => (
                    <StaggerItem key={doc.id}>
                      <DocCard name={doc.name} url={doc.url} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Geschäftsberichte */}
      <section className="py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium mb-10">
              Geschäftsberichte
            </h2>
          </FadeIn>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                <FadeIn delay={0.1}>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Deutsch</h3>
                </FadeIn>
                <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                  {geschaeftsberichteDE.map((doc) => (
                    <StaggerItem key={doc.id}>
                      <DocCard name={doc.name} url={doc.url} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
              <div>
                <FadeIn delay={0.15}>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Französisch</h3>
                </FadeIn>
                <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                  {geschaeftsberichteFR.map((doc) => (
                    <StaggerItem key={doc.id}>
                      <DocCard name={doc.name} url={doc.url} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reportings */}
      <section className="py-20 md:py-28 3xl:py-36 bg-secondary">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium text-primary mb-10">
              Reportings
            </h2>
          </FadeIn>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                <FadeIn delay={0.1}>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Deutsch</h3>
                </FadeIn>
                <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                  {visibleReportingsDE.map((doc) => (
                    <StaggerItem key={doc.id}>
                      <DocCard name={doc.name} url={doc.url} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                {reportingsDE.length > 4 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowAllReportingsDE((v) => !v)}
                    className="mt-6"
                  >
                    {showAllReportingsDE ? "Weniger anzeigen" : `Alle anzeigen (${reportingsDE.length})`}
                  </Button>
                )}
              </div>
              <div>
                <FadeIn delay={0.15}>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Französisch</h3>
                </FadeIn>
                <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                  {visibleReportingsFR.map((doc) => (
                    <StaggerItem key={doc.id}>
                      <DocCard name={doc.name} url={doc.url} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                {reportingsFR.length > 4 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowAllReportingsFR((v) => !v)}
                    className="mt-6"
                  >
                    {showAllReportingsFR ? "Weniger anzeigen" : `Alle anzeigen (${reportingsFR.length})`}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nachhaltigkeits-Reportings */}
      {(nachhaltigkeitsReportingsDE.length > 0 || nachhaltigkeitsReportingsFR.length > 0) && (
        <section className="py-20 md:py-28 3xl:py-36">
          <div className="container mx-auto px-6">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium mb-10">
                Nachhaltigkeits-Reportings
              </h2>
            </FadeIn>

            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {nachhaltigkeitsReportingsDE.length > 0 && (
                  <div>
                    <FadeIn delay={0.1}>
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Deutsch</h3>
                    </FadeIn>
                    <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                      {nachhaltigkeitsReportingsDE.map((doc) => (
                        <StaggerItem key={doc.id}>
                          <DocCard name={doc.name} url={doc.url} />
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                )}
                {nachhaltigkeitsReportingsFR.length > 0 && (
                  <div>
                    <FadeIn delay={0.15}>
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Französisch</h3>
                    </FadeIn>
                    <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                      {nachhaltigkeitsReportingsFR.map((doc) => (
                        <StaggerItem key={doc.id}>
                          <DocCard name={doc.name} url={doc.url} />
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
);
}
