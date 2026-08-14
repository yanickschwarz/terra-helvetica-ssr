import type { Metadata } from "next";
import StatusPage from "@/components/StatusPage";

export const metadata: Metadata = {
  title: "Vielen Dank für Ihre Anmeldung",
  description: "Ihre Newsletter-Anmeldung wurde erfolgreich übermittelt.",
  robots: { index: false, follow: false },
};

export default function DankeNewsletter() {
  return (
    <StatusPage
      variant="success"
      title="Vielen Dank für Ihre Anmeldung"
      message="Zur Bestätigung erhalten Sie in Kürze eine E-Mail. Bitte klicken Sie darin auf den Bestätigungslink – erst danach ist Ihre Anmeldung aktiv."
      hint="Sollte die E-Mail nicht ankommen, prüfen Sie bitte Ihren Spam-Ordner."
    />
  );
}
