import Link from "next/link";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      {/* Legal disclaimer */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-6">
          <p className="text-[11px] text-muted-foreground leading-relaxed max-w-5xl">
            Die Terra Helvetica Anlagestiftung ist eine Anlagestiftung nach Schweizer Recht und richtet sich
            ausschliesslich an in der Schweiz domizilierte, registrierte und steuerbefreite Vorsorgeeinrichtungen
            privaten oder öffentlichen Rechts sowie juristische Personen, die kollektive Anlagen solcher
            Vorsorgeeinrichtungen verwalten, von der Eidgenössischen Finanzmarktaufsicht (FINMA) beaufsichtigt
            werden und bei der Anlagestiftung ausschliesslich Gelder für diese Einrichtungen anlegen.
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 py-12 3xl:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 gap-12 items-start">
          {/* Logo */}
          <div>
            <img
              src="/images/logo.avif"
              alt="Terra Helvetica Anlagestiftung Logo"
              className="h-16 md:h-20 mb-4"
            />
          </div>

          {/* Navigation */}
          <div>
            <nav className="flex flex-col gap-2 text-sm text-foreground/70">
              <Link href="/anlagegruppe" className="hover:text-primary transition-colors">Anlagegruppe</Link>
              <Link href="/ueber-uns" className="hover:text-primary transition-colors">Über uns</Link>
              <Link href="/dokumente" className="hover:text-primary transition-colors">Dokumente</Link>
              <Link href="/news" className="hover:text-primary transition-colors">News</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="text-sm text-foreground/70 space-y-3">
            <div>
              <p>Terra Helvetica Anlagestiftung</p>
              <p>Bahnhofstrasse 92</p>
              <p>CH-8500 Frauenfeld</p>
            </div>
            <div>
              <a href="mailto:info@terrahelvetica-anlagestiftung.ch" className="hover:text-primary transition-colors">
                info@terrahelvetica-anlagestiftung.ch
              </a>
              <br />
              <a href="tel:+41433117000" className="hover:text-primary transition-colors">
                +41 43 311 70 00
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/impressum" className="hover:text-primary transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Terra Helvetica Anlagestiftung
            </span>
            <span className="text-xs text-muted-foreground">
              Website by{" "}
              <a
                href="https://www.vlix.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Vlix
              </a>
            </span>
            <a
              href="https://www.linkedin.com/company/terra-helvetica-anlagestiftung/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-brand-teal text-brand-teal-foreground flex items-center justify-center hover:bg-brand-teal/90 transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
