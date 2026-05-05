"use client";

import { useEffect } from "react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const partners = [
  { name: "ZIBAG", logo: "/images/logos/zibag.png", url: "https://www.zibag.ch/" },
  { name: "BCV", logo: "/images/logos/bcv.png", url: "https://www.bcv.ch/" },
  { name: "Admicasa", logo: "/images/logos/admicasa.png", url: "https://admicasa.ch/" },
];

export default function UeberUns() {
  

  const { data: teamMembers, isLoading: teamLoading } = useQuery({
    queryKey: ["th_team_members", "team"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("th_team_members")
        .select("*")
        .eq("type", "team")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: stiftungsrat, isLoading: srLoading } = useQuery({
    queryKey: ["th_team_members", "stiftungsrat"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("th_team_members")
        .select("*")
        .eq("type", "stiftungsrat")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.slice(1);
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
      }
    }
  }, []);

  return (
    <>
    {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/images/about-hero.jpg"
          alt="Terra Helvetica - Über uns"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
      </section>

      {/* Fairplay Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        <div className="bg-brand-deep text-brand-deep-foreground flex items-center">
          <div className="px-8 md:px-16 py-16 md:py-24">
            <FadeIn>
              <h2 className="text-xs font-heading font-medium uppercase tracking-[0.3em] text-brand-deep-foreground/70 mb-2">
                Terra Helvetica Anlagestiftung
              </h2>
              <div className="w-16 h-0.5 bg-brand-deep-foreground/40 mb-8" />
              <h1 className="text-4xl md:text-5xl 3xl:text-6xl font-heading font-medium mb-8">Fairplay</h1>
              <p className="text-lg 3xl:text-xl text-brand-deep-foreground/90 leading-relaxed">
                Die Terra Helvetica Anlagestiftung setzt auf Nachhaltigkeit und Fairness. Wir investieren
                sorgfältig in nachhaltige Immobilienanlagen, die das Angebot an bezahlbarem Wohnraum stärken.
                Und wir nehmen die Interessen unserer Kunden ernst: Wir sind transparent, achten auf die Kosten
                und garantieren attraktive Gebühren. Weil wir überzeugt sind: Fairplay gewinnt.
              </p>
            </FadeIn>
          </div>
        </div>
        <div className="overflow-hidden">
          <img
            src="/images/luetisburg.jpg"
            alt="Liegenschaft"
            className="w-full h-full object-cover min-h-[350px]"
            loading="lazy"
          />
        </div>
      </section>

      {/* Stiftungsrat */}
      <section className="py-20 md:py-28 3xl:py-36" id="stiftungsrat">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-sm font-heading font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Der Stiftungsrat
            </h2>
          </FadeIn>
          {srLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="w-full h-[400px]" />
                  <div className="mt-5 space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {stiftungsrat?.map((member, i) => (
                <FadeIn key={member.id} delay={i * 0.15}>
                  <div className="bg-muted overflow-hidden">
                    <img
                      src={member.photo_url || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-[520px] object-cover object-top"
                    />
                  </div>
                  <div className="mt-5">
                    <h3 className="text-lg font-heading font-medium">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-foreground/70 leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 3xl:py-36 bg-brand-deep text-brand-deep-foreground" id="team">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-sm font-heading font-medium uppercase tracking-[0.2em] text-brand-deep-foreground/70 mb-8">
              Das Team
            </h2>
          </FadeIn>
          {teamLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-background overflow-hidden">
                  <Skeleton className="w-full h-72" />
                  <div className="p-6 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 gap-8" staggerDelay={0.15}>
              {teamMembers?.map((member) => (
                <StaggerItem key={member.id}>
                  <div className="bg-background text-foreground overflow-hidden">
                    <img
                      src={member.photo_url || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full aspect-square object-cover object-top"
                    />
                    <div className="p-6">
                      <h3 className="font-heading font-medium text-lg">{member.name}</h3>
                      <p className="text-sm text-primary mb-3">{member.role}</p>
                      <div className="space-y-1 text-sm">
                        {member.phone && (
                          <a href={`tel:${member.phone}`} className="block text-foreground/70 hover:text-primary transition-colors">
                            {member.phone}
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="block text-foreground/70 hover:text-primary transition-colors break-all text-xs">
                            {member.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-sm font-heading font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Erfahrene Partner
            </h2>
          </FadeIn>
          <StaggerContainer className="flex flex-wrap items-center gap-12" staggerDelay={0.1}>
            {partners.map((p) => (
              <StaggerItem key={p.name}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <img src={p.logo} alt={p.name} className="h-12 md:h-16 object-contain" />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
);
}
