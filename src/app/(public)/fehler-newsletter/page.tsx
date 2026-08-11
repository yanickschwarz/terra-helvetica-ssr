import type { Metadata } from "next";
import StatusPage from "@/components/StatusPage";

export const metadata: Metadata = {
  title: "Anmeldung konnte nicht übermittelt werden",
  description: "Bei der Newsletter-Anmeldung ist ein Fehler aufgetreten.",
  robots: { index: false, follow: false },
};

export default function FehlerNewsletter() {
  return (
    <StatusPage
      variant="error"
      title="Ihre Anmeldung konnte nicht übermittelt werden"
      message="Beim Verarbeiten Ihrer Newsletter-Anmeldung ist ein Fehler aufgetreten. Bitte versuchen Sie es in einigen Minuten erneut."
      hint={
        <>
          Falls das Problem bestehen bleibt, erreichen Sie uns unter{" "}
          <a
            href="mailto:info@terrahelvetica-anlagestiftung.ch"
            className="text-primary hover:underline"
          >
            info@terrahelvetica-anlagestiftung.ch
          </a>
          .
        </>
      }
      backHref="/news"
      backLabel="Zurück zu den News"
    />
  );
}
