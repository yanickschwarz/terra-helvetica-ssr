import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

interface StatusPageProps {
  variant: "success" | "error";
  title: string;
  message: string;
  /** Optionaler Zusatzhinweis, z. B. alternativer Kontaktweg im Fehlerfall. */
  hint?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}

export default function StatusPage({
  variant,
  title,
  message,
  hint,
  backHref = "/",
  backLabel = "Zurück zur Startseite",
}: StatusPageProps) {
  const isSuccess = variant === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-2xl">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div
              className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
                isSuccess ? "bg-primary/10" : "bg-destructive/10"
              }`}
            >
              <Icon
                className={`h-8 w-8 ${isSuccess ? "text-primary" : "text-destructive"}`}
                strokeWidth={1.75}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-medium mb-4">
              {title}
            </h1>

            <p className="text-foreground/80 leading-relaxed max-w-xl">{message}</p>

            {hint && (
              <p className="mt-4 text-sm text-foreground/70 leading-relaxed max-w-xl">
                {hint}
              </p>
            )}

            <Link
              href={backHref}
              className="mt-10 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {backLabel}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
