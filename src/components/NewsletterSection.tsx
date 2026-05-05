"use client";

import { useState, useTransition } from "react";
import FadeIn from "@/components/motion/FadeIn";
import { subscribeNewsletter } from "@/app/actions/newsletter";

const NewsletterSection = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    anrede: "Herr",
    vorname: "",
    nachname: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("idle");

    startTransition(async () => {
      const result = await subscribeNewsletter(form);
      if (!result.ok) {
        setStatus("error");
        setErrorMsg(result.error || "Ein Fehler ist aufgetreten.");
        return;
      }
      setStatus("success");
      setForm({ anrede: "Herr", vorname: "", nachname: "", email: "" });
    });
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/40 text-white placeholder-transparent py-3 text-sm focus:outline-none focus:border-white transition-colors";
  const labelClass = "block text-xs text-white/70 mb-1 tracking-wide";

  return (
    <section className="py-20 md:py-28 3xl:py-36 bg-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <FadeIn>
            <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-heading font-medium text-white mb-6">
              Newsletter
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-sm">
              Damit Sie die News, Finanzberichte und Investor Reportings automatisch zugesendet
              bekommen, können Sie sich hier ganz einfach anmelden.
            </p>
          </FadeIn>

          {/* Right */}
          <FadeIn delay={0.15}>
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-8">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg mb-1">
                    Vielen Dank für Ihre Anmeldung!
                  </p>
                  <p className="text-white/70 text-sm">
                    Sie erhalten ab sofort unsere News, Finanzberichte und Investor Reportings
                    direkt in Ihr Postfach.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Anrede */}
                <div>
                  <label className={labelClass}>Anrede</label>
                  <div className="relative">
                    <select
                      name="anrede"
                      value={form.anrede}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-8 cursor-pointer`}
                      style={{ background: "transparent" }}
                    >
                      <option value="Herr" style={{ color: "#1a1a1a" }}>
                        Herr
                      </option>
                      <option value="Frau" style={{ color: "#1a1a1a" }}>
                        Frau
                      </option>
                      <option value="Divers" style={{ color: "#1a1a1a" }}>
                        Divers
                      </option>
                    </select>
                    <svg
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Vorname */}
                <div>
                  <label className={labelClass}>Vorname</label>
                  <input
                    type="text"
                    name="vorname"
                    value={form.vorname}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Nachname */}
                <div>
                  <label className={labelClass}>Nachname</label>
                  <input
                    type="text"
                    name="nachname"
                    value={form.nachname}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="text-white/80 text-sm bg-white/10 rounded-lg px-4 py-3">
                    {errorMsg}
                  </p>
                )}

                {/* Button */}
                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="px-8 py-3 rounded-full border-2 border-white text-white text-sm font-medium hover:bg-white hover:text-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? "Wird angemeldet…" : "Anmelden"}
                  </button>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
