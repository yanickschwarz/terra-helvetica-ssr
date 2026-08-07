import type { Metadata } from "next";
import StatusPage from "@/components/StatusPage";

export const metadata: Metadata = {
  title: "Anfrage konnte nicht übermittelt werden",
  description: "Beim Übermitteln der Kontaktanfrage ist ein Fehler aufgetreten.",
  robots: { index: false, follow: false },
};

export default function FehlerKontakt() {
  return (
    <StatusPage
      variant="error"
      title="Ihre Anfrage konnte nicht übermittelt werden"
      message="Beim Verarbeiten Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es in einigen Minuten erneut."
      hint={
        <>
          Falls das Problem bestehen bleibt, erreichen Sie uns direkt unter{" "}
          <a
            href="mailto:info@terrahelvetica-anlagestiftung.ch"
            className="text-primary hover:underline"
          >
            info@terrahelvetica-anlagestiftung.ch
          </a>{" "}
          oder telefonisch unter{" "}
          <a href="tel:+41433117000" className="text-primary hover:underline">
            +41 43 311 70 00
          </a>
          .
        </>
      }
      backHref="/kontakt"
      backLabel="Zurück zum Kontaktformular"
    />
  );
}
