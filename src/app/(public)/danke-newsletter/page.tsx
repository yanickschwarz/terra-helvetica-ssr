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
      message="Ihre Anmeldung zum Newsletter ist bei uns eingegangen. Zur Bestätigung erhalten Sie in Kürze eine E-Mail — bitte klicken Sie darin auf den Bestätigungslink."
    />
  );
}
