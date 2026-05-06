"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FadeIn from "@/components/motion/FadeIn";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const stammdaten = [
  { label: "Name der Anlagegruppe", value: "Wohnen Schweiz" },
  { label: "Region", value: "Schweiz" },
  { label: "Strategie", value: "Immobilien im Bestand – Bezahlbares Wohnen" },
  { label: "Benchmark", value: "KGAST Immo-Index" },
  { label: "Anlageklasse", value: "Immobilien direkt" },
  { label: "Geschäftsführung", value: "Admicasa Management AG" },
  { label: "Administration", value: "Admicasa Management AG" },
  { label: "Depotbank", value: "Banque Cantonale Vaudoise" },
  { label: "Bewertungsexperten", value: "ZIBAG" },
  { label: "Revisionsstelle", value: "Deloitte Schweiz" },
  { label: "Aufsichtsbehörde", value: "OAK BV" },
  { label: "Geschäftsjahr", value: "01.01 – 31.12" },
  { label: "NAV-Kalkulation", value: "monatlich und bei Ausgaben & Rücknahmen" },
  { label: "Min. Zeichnungsbetrag", value: "CHF 100'000.00" },
  { label: "Geschäftsführungshonorar", value: "gemäss Gebührenmodell 23" },
  { label: "TER ISA (GAV)", value: "0.48%" },
  { label: "Ausgabe- und Rücknahmekommission", value: "1.50%" },
  { label: "Anlagezielrendite", value: "angestrebt 4% p.a." },
  { label: "Ertragsverwendung", value: "thesaurierend" },
  { label: "Fremdfinanzierungsquote", value: "max. 33.33%" },
  { label: "ISIN", value: "CH0544073437" },
  { label: "Valor", value: "54407343" },
  { label: "Kundenbetreuung", value: "Admicasa Management AG" },
];

const gebuehrenmodell = [
  { von: "0", bis: "50", verguetung: "100'000" },
  { von: "50", bis: "100", verguetung: "200'000" },
  { von: "100", bis: "150", verguetung: "300'000" },
  { von: "150", bis: "250", verguetung: "400'000" },
  { von: "250", bis: "375", verguetung: "500'000" },
  { von: "375", bis: "500", verguetung: "700'000" },
  { von: "500", bis: "750", verguetung: "1'000'000" },
  { von: "750", bis: "1'000", verguetung: "1'250'000" },
  { von: "1'000", bis: "100'000", verguetung: "1'500'000" },
];

export default function Anlagegruppe() {
  const { data: zeichnungDocs } = useQuery<
    { id: string; name: string; url: string; language: string; sort_order: number }[]
  >({
    queryKey: ["th_documents_zeichnen"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("th_documents")
        .select("id,name,url,language,sort_order")
        .eq("category", "zeichnen")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const zeichnungDE = zeichnungDocs?.filter((d) => d.language === "de") ?? [];
  const zeichnungFR = zeichnungDocs?.filter((d) => d.language === "fr") ?? [];

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
    {/* Hero - 100vh */}
      <section className="relative h-screen min-h-[600px] flex items-end">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/images/anlagegruppe-hero.png"
          alt="Anlagegruppe"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
        <div className="relative container mx-auto px-6 pb-16">
          <FadeIn delay={0.3}>
            <a
              href="#zeichnen"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary/90 transition-colors"
            >
              Offen für neue Zeichnungen
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Anlageziele */}
      <section className="py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl 3xl:text-5xl font-heading font-medium mb-4">
              Anlageziele und Fokus
            </h1>
            <h2 className="text-xl font-heading font-medium text-primary mb-6">
              Wir schaffen Mehrwert — mit ganzheitlichem und aktivem Management.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-foreground/80 leading-relaxed max-w-4xl 3xl:max-w-5xl 3xl:text-lg">
              Wir investieren in Bestandsliegenschaften mit nachhaltigen Ertragsperspektiven oder
              aussichtsreichem Entwicklungspotenzial und ergänzen das Portfolio mit Neubau- und
              Entwicklungsprojekten. Unser Fokus richtet sich unter Beachtung einer angemessenen
              Risikoverteilung auf direkt gehaltene Liegenschaften in der Schweiz, die das Angebot
              an bezahlbarem Wohnraum stärken.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Wohnen Schweiz - separate section */}
      <section className="py-20 md:py-28 3xl:py-36 bg-secondary">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-xs font-heading font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Anlagegruppe
            </h2>
            <h3 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium mb-6">Wohnen Schweiz</h3>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-foreground/80 leading-relaxed max-w-4xl mb-10">
              Die Anlagegruppe Wohnen Schweiz mit neuwertigen und nachhaltigen Liegenschaften
              fokussiert auf bezahlbares Wohnen. Sie bringt nicht nur Mehrwert für die Investoren,
              sondern stärkt auch den sozialen Gedanken.
            </p>
          </FadeIn>

          {/* Portfolio Gallery */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <Link href="/portfolio" className="col-span-2 row-span-2 overflow-hidden group">
                <img src="/images/portfolio/portfolio-1.jpg" alt="Portfolio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <Link href="/portfolio" className="overflow-hidden group">
                <img src="/images/portfolio/kradolf.jpg" alt="Kradolf" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <Link href="/portfolio" className="overflow-hidden group">
                <img src="/images/portfolio/kradolf-2.jpg" alt="Kradolf 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <Link href="/portfolio" className="col-span-2 overflow-hidden group">
                <img src="/images/portfolio/luetisburg.jpg" alt="Lütisburg" className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary/90 transition-colors"
            >
              Portfolio ansehen
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stammdaten */}
      <section className="py-20 md:py-28 3xl:py-36" id="stammdaten">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-xs font-heading font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Unser Portfolio «Wohnen Schweiz» auf einen Blick
            </h2>
            <h3 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-medium mb-8">
              Stammdaten der Anlagegruppe
            </h3>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-background overflow-hidden shadow-sm border border-border">
              <Table>
                <TableBody>
                  {stammdaten.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell className="font-medium text-foreground/70 w-1/3">{row.label}</TableCell>
                      <TableCell className="font-semibold">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gebührenmodell */}
      <section className="py-20 md:py-28 3xl:py-36 bg-secondary">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-heading font-medium mb-8">
              Gebührenmodell 23
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-background overflow-hidden shadow-sm border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary text-primary-foreground">
                    <TableHead className="text-primary-foreground font-semibold" colSpan={2}>Verkehrswerte (in MCHF)</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">Grundvergütung (in CHF pro Jahr)</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Von</TableHead>
                    <TableHead className="font-medium">Bis und mit</TableHead>
                    <TableHead className="font-medium"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gebuehrenmodell.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.von}</TableCell>
                      <TableCell>{row.bis}</TableCell>
                      <TableCell className="font-semibold">{row.verguetung}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Zeichnen - 100vh with background image */}
      <section id="zeichnen" className="relative min-h-screen flex items-center">
        <img
          src="/images/zeichnen-hero.jpg"
          alt="Liegenschaft"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative container mx-auto px-6 py-20">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-heading font-medium mb-4 text-primary-foreground">Zeichnen</h2>
            <h3 className="text-lg md:text-xl font-heading font-medium mb-6 text-primary-foreground/90">
              Anlagegruppe «Wohnen Schweiz»
            </h3>
            <p className="leading-relaxed max-w-3xl 3xl:max-w-4xl mb-12 text-primary-foreground/85 text-lg 3xl:text-xl">
              Wohnen Schweiz ist offen für neue Zeichnungen. Bitte lassen Sie die rechtsgültigen
              Zeichnungsbegehren und unterzeichneten Zeichnungsunterlagen der Geschäftsführung im
              Original zukommen.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h4 className="text-lg font-semibold mb-4 text-primary-foreground">Zeichnungsunterlagen</h4>
            <Tabs defaultValue="de" className="mb-12">
              <TabsList className="bg-primary-foreground/10">
                <TabsTrigger value="de" className="data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">Deutsch</TabsTrigger>
                <TabsTrigger value="fr" className="data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">Französisch</TabsTrigger>
              </TabsList>
              <TabsContent value="de" className="mt-4">
                <div className="flex flex-wrap gap-3">
                  {zeichnungDE.map((doc) => (
                    <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-lg border border-primary-foreground/50 text-primary-foreground text-sm hover:bg-primary-foreground/10 transition-colors">
                      {doc.name}
                    </a>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="fr" className="mt-4">
                <div className="flex flex-wrap gap-3">
                  {zeichnungFR.map((doc) => (
                    <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-lg border border-primary-foreground/50 text-primary-foreground text-sm hover:bg-primary-foreground/10 transition-colors">
                      {doc.name}
                    </a>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </section>
    </>
);
}
