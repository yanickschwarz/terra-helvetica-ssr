"use client";

import { Download } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { data: documents, isLoading } = useQuery<
    {
      id: string;
      name: string;
      url: string;
      category: string;
      language: string;
      sort_order: number;
    }[]
  >({
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
  const geschaeftsberichteDE = documents?.filter((d) => d.category === "geschaeftsberichte" && d.language === "de") || [];
  const geschaeftsberichteFR = documents?.filter((d) => d.category === "geschaeftsberichte" && d.language === "fr") || [];
  const reportingsDE = documents?.filter((d) => d.category === "reportings" && d.language === "de") || [];
  const reportingsFR = documents?.filter((d) => d.category === "reportings" && d.language === "fr") || [];
  const klimaEnergieDE = documents?.filter((d) => d.category === "klima-energie" && d.language === "de") || [];
  const klimaEnergieFR = documents?.filter((d) => d.category === "klima-energie" && d.language === "fr") || [];
  const ssreiDocs = documents?.filter((d) => d.category === "ssrei") || [];

  const visibleReportingsDE = reportingsDE.slice(0, 4);
  const visibleReportingsFR = reportingsFR.slice(0, 4);

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

      {/* Reglemente, Statuten und Prospekt */}
      <section className="pb-20 md:pb-28 3xl:pb-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium mb-10">
              Reglemente, Statuten und Prospekt
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

      {/* Geschäftsberichte */}
      <section className="py-20 md:py-28 3xl:py-36 bg-secondary">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium text-primary mb-10">
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
      <section className="py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium mb-10">
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
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nachhaltigkeit: Reportings */}
      {(klimaEnergieDE.length > 0 || klimaEnergieFR.length > 0 || ssreiDocs.length > 0) && (
        <section className="py-20 md:py-28 3xl:py-36 bg-secondary">
          <div className="container mx-auto px-6">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium text-primary mb-12">
                Nachhaltigkeit: Reportings
              </h2>
            </FadeIn>

            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="space-y-16">
                {/* Klima- und Energiewerte */}
                {(klimaEnergieDE.length > 0 || klimaEnergieFR.length > 0) && (
                  <div>
                    <FadeIn>
                      <h3 className="text-xl md:text-2xl font-heading font-medium mb-8">
                        Klima- und Energiewerte
                      </h3>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <div>
                        <FadeIn delay={0.1}>
                          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Deutsch</h4>
                        </FadeIn>
                        <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                          {klimaEnergieDE.map((doc) => (
                            <StaggerItem key={doc.id}>
                              <DocCard name={doc.name} url={doc.url} />
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                      <div>
                        <FadeIn delay={0.15}>
                          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Französisch</h4>
                        </FadeIn>
                        <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
                          {klimaEnergieFR.map((doc) => (
                            <StaggerItem key={doc.id}>
                              <DocCard name={doc.name} url={doc.url} />
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </div>
                  </div>
                )}

                {/* SSREI: Reportings (only DE) */}
                {ssreiDocs.length > 0 && (
                  <div>
                    <FadeIn>
                      <h3 className="text-xl md:text-2xl font-heading font-medium mb-8">
                        SSREI: Reportings
                      </h3>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-4" staggerDelay={0.08}>
                      {ssreiDocs.map((doc) => (
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
