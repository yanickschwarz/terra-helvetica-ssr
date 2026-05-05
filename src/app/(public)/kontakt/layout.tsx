import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie die Terra Helvetica Anlagestiftung — Bahnhofstrasse 92, 8500 Frauenfeld. Telefon, E-Mail und Kontaktformular.",
  openGraph: {
    title: "Kontakt",
    description: "Kontaktieren Sie die Terra Helvetica Anlagestiftung — Bahnhofstrasse 92, 8500 Frauenfeld. Telefon, E-Mail und Kontaktformular.",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
