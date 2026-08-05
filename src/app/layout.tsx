import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import AuthProviderWrapper from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.terrahelvetica-anlagestiftung.ch"),
  title: {
    default: "Terra Helvetica Anlagestiftung",
    template: "%s | Terra Helvetica Anlagestiftung",
  },
  description:
    "Terra Helvetica Anlagestiftung – Schweizer Anlagestiftung für Vorsorgeeinrichtungen mit Fokus auf nachhaltige Immobilienanlagen in der Schweiz.",
  keywords: [
    "Anlagestiftung",
    "Schweiz",
    "Immobilien",
    "Vorsorgeeinrichtungen",
    "Pensionskasse",
    "BVG",
    "Real Estate",
  ],
  authors: [{ name: "Terra Helvetica Anlagestiftung" }],
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://www.terrahelvetica-anlagestiftung.ch",
    siteName: "Terra Helvetica Anlagestiftung",
    title: "Terra Helvetica Anlagestiftung",
    description:
      "Schweizer Anlagestiftung für Vorsorgeeinrichtungen mit Fokus auf nachhaltige Immobilienanlagen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terra Helvetica Anlagestiftung",
    description:
      "Schweizer Anlagestiftung für Vorsorgeeinrichtungen mit Fokus auf nachhaltige Immobilienanlagen.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AuthProviderWrapper>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AuthProviderWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
