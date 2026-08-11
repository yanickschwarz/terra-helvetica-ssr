import type { Metadata } from "next";
import StatusPage from "@/components/StatusPage";

export const metadata: Metadata = {
  title: "Vielen Dank für Ihre Anfrage",
  description: "Ihre Kontaktanfrage wurde erfolgreich übermittelt.",
  robots: { index: false, follow: false },
};

export default function DankeKontakt() {
  return (
    <StatusPage
      variant="success"
      title="Vielen Dank für Ihre Anfrage"
      message="Wir haben Ihre Nachricht erhalten und melden uns so bald wie möglich bei Ihnen. Eine Bestätigung geht Ihnen per E-Mail zu."
    />
  );
}
