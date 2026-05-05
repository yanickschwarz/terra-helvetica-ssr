import FadeIn from "@/components/motion/FadeIn";

export const metadata = {
  title: "Impressum",
  description: "Impressum der Terra Helvetica Anlagestiftung. Herausgeber, Kontakt und rechtliche Informationen.",
};


export default function Impressum() {
  return (
    <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-heading font-medium mb-8">Impressum</h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <div>
                <h2 className="font-heading font-medium text-lg text-foreground mb-2">Herausgeber</h2>
                <p>Terra Helvetica Anlagestiftung</p>
                <p>Bahnhofstrasse 92</p>
                <p>CH-8500 Frauenfeld</p>
              </div>
              <div>
                <h2 className="font-heading font-medium text-lg text-foreground mb-2">Kontakt</h2>
                <p>Telefon: <a href="tel:+41433117000" className="text-primary hover:underline">+41 43 311 70 00</a></p>
                <p>E-Mail: <a href="mailto:info@terrahelvetica-anlagestiftung.ch" className="text-primary hover:underline">info@terrahelvetica-anlagestiftung.ch</a></p>
              </div>
              <div>
                <h2 className="font-heading font-medium text-lg text-foreground mb-2">Haftungsausschluss</h2>
                <p>
                  Der Inhalt dieser Website dient ausschliesslich zu Informationszwecken und stellt kein Angebot
                  und keine Aufforderung zur Zeichnung, zum Kauf oder Verkauf von Anteilen dar.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
);
}
