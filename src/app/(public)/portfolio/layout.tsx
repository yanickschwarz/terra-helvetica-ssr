import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Das Immobilien-Portfolio der Anlagegruppe «Wohnen Schweiz» — neuwertige und nachhaltige Liegenschaften mit Fokus auf bezahlbares Wohnen.",
  openGraph: {
    title: "Portfolio",
    description: "Das Immobilien-Portfolio der Anlagegruppe «Wohnen Schweiz» — neuwertige und nachhaltige Liegenschaften mit Fokus auf bezahlbares Wohnen.",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
