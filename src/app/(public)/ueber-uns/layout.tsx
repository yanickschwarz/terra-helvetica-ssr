import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Stiftungsrat, Geschäftsleitung und Team der Terra Helvetica Anlagestiftung — die Menschen hinter der nachhaltigen Anlagestiftung für bezahlbaren Wohnraum.",
  openGraph: {
    title: "Über uns",
    description: "Stiftungsrat, Geschäftsleitung und Team der Terra Helvetica Anlagestiftung — die Menschen hinter der nachhaltigen Anlagestiftung für bezahlbaren Wohnraum.",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
