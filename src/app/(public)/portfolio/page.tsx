"use client";

import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const splitByComma = (text: string) =>
  text
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, i) => (
      <span key={i} className="block">
        {part}
      </span>
    ));

export default function Portfolio() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["th_properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("th_properties")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Kanton aus location extrahieren (letzte 2 Buchstaben, z.B. "Widen AG" -> "AG")
  const getCanton = (location: string | null | undefined): string => {
    if (!location) return "ZZ";
    const match = location.trim().match(/\b([A-Z]{2})$/);
    return match ? match[1] : "ZZ";
  };

  // Nach Kanton, dann Ortsname sortieren
  const sortedProperties = properties
    ? [...properties].sort((a, b) => {
        const cantonA = getCanton(a.location);
        const cantonB = getCanton(b.location);
        if (cantonA !== cantonB) return cantonA.localeCompare(cantonB);
        return (a.location || "").localeCompare(b.location || "");
      })
    : [];

  return (
    <>
    {/* Hero */}
      <section className="relative h-screen min-h-[500px] flex items-center justify-center">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/images/anlagegruppe-hero.png"
          alt="Portfolio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />

        <FadeIn delay={0.3}>
          <h1 className="relative text-4xl md:text-5xl 3xl:text-6xl font-heading font-medium text-primary-foreground">
            Portfolio
          </h1>
        </FadeIn>
      </section>

      {/* Properties Grid */}
      <section className="py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium mb-4">Unsere Liegenschaften</h2>
            <p className="text-foreground/70 mb-12 max-w-2xl">
              Die Anlagegruppe «Wohnen Schweiz» investiert in neuwertige und nachhaltige Wohnliegenschaften in der gesamten
              Schweiz.
            </p>
          </FadeIn>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="w-full aspect-square" />
                </div>
              ))}
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {sortedProperties.map((p) => {
                const apartments = (p as { num_apartments?: number | null }).num_apartments;
                const commercial = (p as { num_commercial?: number | null }).num_commercial;
                const yearBuilt = (p as { year_built?: number | null }).year_built;

                const detailLines =
                  apartments != null || commercial != null || yearBuilt != null
                    ? [
                        apartments != null ? `Anzahl Wohnungen: ${apartments}` : null,
                        commercial != null ? `Anzahl Gewerbe: ${commercial}` : null,
                        yearBuilt != null ? `Baujahr: ${yearBuilt}` : null,
                      ].filter(Boolean) as string[]
                    : (p.description ?? "")
                        .split(",")
                        .map((part) => part.trim())
                        .filter(Boolean);

                return (
                  <StaggerItem key={p.id}>
                    <div className="group relative overflow-hidden aspect-square cursor-pointer">
                      <img
                        src={p.image_url || "/placeholder.svg"}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Petrol overlay on hover */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/85 transition-all duration-500 flex items-start justify-start p-8">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-primary-foreground">
                          <h3 className="font-heading font-medium text-lg md:text-xl mb-6">{splitByComma(p.name)}</h3>
                          {detailLines.length > 0 && (
                            <div className="space-y-1 text-sm text-primary-foreground/80">
                              {detailLines.map((line, index) => (
                                <p key={`${p.id}-${index}`}>{line}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
);
}
