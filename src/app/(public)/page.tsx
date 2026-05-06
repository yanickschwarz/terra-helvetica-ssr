import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import { MotionImage, MotionDiv } from "@/components/motion/MotionPrimitives";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { de } from "date-fns/locale";

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

const memberships = [
  { name: "SSREI", logo: "/images/logos/ssrei.png", url: "https://ssrei.ch/", label: "Swiss Sustainable Real Estate Index" },
  { name: "ASIP", logo: "/images/logos/asip.png", url: "https://www.asip.ch/de/", label: "Schweizerischer Pensionskassenverband" },
  { name: "SSF", logo: "/images/logos/ssf.png", url: "https://www.sustainablefinance.ch/", label: "Swiss Sustainable Finance" },
  { name: "KGAST", logo: "/images/logos/kgast.png", url: "https://www.kgast.ch/home", label: "KGAST" },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: latestNews } = await supabase
    .from("th_news")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <>
      {/* Hero Section - 100vh */}
      <section className="relative h-screen min-h-[600px] flex items-center md:items-end md:pb-[10%]">
        <MotionImage
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/images/hero-mountains.png"
          alt="Schweizer Bergpanorama"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative container mx-auto px-6 flex flex-col md:flex-row md:items-end md:justify-between w-full gap-6">
          <FadeIn delay={0.3} duration={0.8}>
            <h1
              className="text-3xl md:text-5xl 3xl:text-6xl font-heading font-bold leading-tight max-w-2xl 3xl:max-w-3xl text-primary"
              style={{
                textShadow: '0 0 24px rgba(255,255,255,0.95), 0 1px 8px rgba(255,255,255,0.9), 0 2px 4px rgba(255,255,255,0.8)',
              }}
            >
              Die nachhaltige Anlagestiftung für bezahlbaren Wohnraum.
            </h1>
          </FadeIn>
          <FadeIn delay={0.6} duration={0.8}>
            <Link
              href="/anlagegruppe#zeichnen"
              className="inline-flex md:hidden items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Offen für neue Zeichnungen
            </Link>
            <Link
              href="/anlagegruppe#zeichnen"
              className="hidden md:inline-flex items-center px-8 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Offen für neue Zeichnungen
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Info Block */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-xs font-heading font-medium uppercase tracking-[0.3em] mb-2 text-primary-foreground/70">
              Terra Helvetica Anlagestiftung
            </h2>
            <div className="w-16 h-0.5 bg-primary-foreground/40 mb-10" />
          </FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <FadeIn delay={0.2} className="flex-1">
              <p className="text-lg md:text-xl 3xl:text-2xl leading-relaxed max-w-3xl 3xl:max-w-4xl font-body">
                Die Terra Helvetica Anlagestiftung investiert in nachhaltige Immobilienanlagen und setzt den
                Fokus auf bezahlbares Wohnen. Wir erzielen attraktive Renditen, die wir fair erwirtschaften.
                Wir arbeiten transparent und kostenbewusst — dank dem Gebührenmodell 23.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Link
                href="/ueber-uns"
                className="inline-flex items-center px-10 py-3 rounded-lg border-2 border-primary-foreground text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary-foreground/10 transition-colors whitespace-nowrap self-start"
              >
                Mehr erfahren
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl 3xl:text-5xl font-heading font-medium mb-16">
              Unsere Mitgliedschaften
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-12 3xl:gap-16 items-start" staggerDelay={0.15}>
            {memberships.map((m) => (
              <StaggerItem key={m.name}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-start gap-4 group"
                >
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                  <img
                    src={m.logo}
                    alt={m.label}
                    className="h-20 md:h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mountain Divider */}
      <section className="w-full">
        <img
          src="/images/mountains-divider.png"
          alt="Bergpanorama"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </section>

      {/* Gebührenmodell */}
      <section className="py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl 3xl:text-5xl font-heading font-medium mb-10">
              Das Gebührenmodell 23
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 3xl:gap-28">
            <FadeIn delay={0.1}>
              <blockquote className="border-l-4 border-primary pl-6 py-2">
                <p className="text-lg md:text-xl 3xl:text-2xl font-heading font-medium text-primary leading-relaxed">
                  Im Interesse unserer Kunden: Bei der Terra Helvetica Anlagestiftung gibt es keine Managementgebühr.
                </p>
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-4 text-foreground/80 font-body leading-relaxed">
                <p>
                  Für die Verwaltung der Vorsorgevermögen erhebt die Finanzindustrie Gebühren, die immer
                  stärker in den Fokus der Öffentlichkeit rücken. Eine besonders gewichtige Gebühr ist die
                  in der Branche übliche Managementgebühr.
                </p>
                <p className="font-semibold text-foreground">
                  Sie steigt unbegrenzt linear zum verwalteten Vorsorgevermögen — obwohl mehr Vorsorgevermögen
                  kaum mehr Verwaltungsaufwand bedeutet. Das ist nicht im Sinne der Versicherten.
                </p>
                <p>
                  Deshalb gibt es bei der Terra Helvetica Anlagestiftung keine Managementgebühr. An ihre
                  Stelle tritt ein Geschäftsführungshonorar, das gestuft und begrenzt ist. Es deckt
                  lediglich die effektiven Kosten der Vermögensverwaltung ab — damit mehr für die Rente
                  der Versicherten übrigbleibt.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="mt-10">
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.terrahelvetica-anlagestiftung.ch/_files/ugd/15b021_730d83ca7a0043238b2086fad950b28f.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary/90 transition-colors"
              >
                Gebührenmodell 23
              </a>
              <Link
                href="/anlagegruppe"
                className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-primary text-primary text-sm font-medium tracking-wider hover:bg-primary/5 transition-colors"
              >
                Mehr erfahren
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl 3xl:text-5xl font-heading font-medium mb-12">
              News
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {latestNews?.map((article) => (
              <StaggerItem key={article.id}>
                <div className="group bg-background border border-border overflow-hidden h-full flex flex-col">
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
                      <p className="text-sm text-muted-foreground line-clamp-2">{article.subtitle}</p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.3} className="mt-10">
            <Link
              href="/news"
              className="inline-flex items-center px-10 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary/90 transition-colors"
            >
              Alle News anzeigen
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Anlagegruppe Teaser */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        <div className="bg-primary text-primary-foreground flex items-center">
          <div className="w-full py-16 md:py-24 pl-6 pr-8 md:pl-8 md:pr-12 xl:pl-[104px] xl:pr-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl 3xl:text-5xl font-heading font-medium mb-2">
                Anlagegruppe
              </h2>
              <h3 className="text-2xl md:text-3xl 3xl:text-4xl font-heading font-light mb-6">
                «Wohnen Schweiz»
              </h3>
              <p className="text-primary-foreground/90 font-body leading-relaxed mb-10 max-w-md">
                Die Anlagegruppe «Wohnen Schweiz» mit neuwertigen und nachhaltigen Liegenschaften
                fokussiert auf bezahlbares Wohnen. Sie bringt nicht nur Mehrwert für die Investoren,
                sondern stärkt auch den sozialen Gedanken.
              </p>
              <Link
                href="/anlagegruppe"
                className="inline-flex items-center px-10 py-3 rounded-lg border-2 border-primary-foreground text-primary-foreground text-sm font-medium tracking-wider hover:bg-primary-foreground/10 transition-colors"
              >
                Mehr erfahren
              </Link>
            </FadeIn>
          </div>
        </div>
        <MotionDiv
          className="overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/images/luetisburg.jpg"
            alt="Anlagegruppe Wohnen Schweiz"
            className="w-full h-full object-cover min-h-[400px]"
            loading="lazy"
          />
        </MotionDiv>
      </section>
    </>
  );
}
