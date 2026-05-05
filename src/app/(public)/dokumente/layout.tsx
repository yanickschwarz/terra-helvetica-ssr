import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumente",
  description: "Reglemente, Prospekte, Geschäftsberichte, Reportings und Nachhaltigkeits-Reportings der Terra Helvetica Anlagestiftung zum Download.",
  openGraph: {
    title: "Dokumente",
    description: "Reglemente, Prospekte, Geschäftsberichte, Reportings und Nachhaltigkeits-Reportings der Terra Helvetica Anlagestiftung zum Download.",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
