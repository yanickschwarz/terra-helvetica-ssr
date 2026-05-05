import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anlagegruppe «Wohnen Schweiz»",
  description: "Die Anlagegruppe «Wohnen Schweiz» der Terra Helvetica Anlagestiftung — nachhaltige Immobilienanlagen mit Fokus auf bezahlbares Wohnen in der Schweiz.",
  openGraph: {
    title: "Anlagegruppe «Wohnen Schweiz»",
    description: "Die Anlagegruppe «Wohnen Schweiz» der Terra Helvetica Anlagestiftung — nachhaltige Immobilienanlagen mit Fokus auf bezahlbares Wohnen in der Schweiz.",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
