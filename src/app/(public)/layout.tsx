import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 xl:pt-32">{children}</main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
