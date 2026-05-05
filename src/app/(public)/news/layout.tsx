import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "Aktuelle News und Mitteilungen der Terra Helvetica Anlagestiftung zu Geschäftsentwicklung, Reportings und Personalia.",
  openGraph: {
    title: "News",
    description: "Aktuelle News und Mitteilungen der Terra Helvetica Anlagestiftung zu Geschäftsentwicklung, Reportings und Personalia.",
  },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
