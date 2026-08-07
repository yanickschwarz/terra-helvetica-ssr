"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { motion } from "framer-motion";
import { submitContact } from "@/app/actions/contact";

type Status = "idle" | "loading" | "success" | "error";

const initialForm = {
  vorname: "",
  nachname: "",
  email: "",
  telefon: "",
  firma: "",
  betreff: "",
  nachricht: "",
};

export default function Kontakt() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      !form.vorname.trim() ||
      !form.nachname.trim() ||
      !form.email.trim() ||
      !form.betreff.trim() ||
      !form.nachricht.trim()
    ) {
      setStatus("error");
      setErrorMsg("Bitte alle Pflichtfelder ausfüllen.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("error");
      setErrorMsg("Bitte eine gültige E-Mail-Adresse eingeben.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const result = await submitContact(form);

      if (!result.ok) {
        throw new Error(result.error || "Senden fehlgeschlagen");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      );
    }
  };

  const inputClass =
    "w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  const labelClass = "block text-sm font-medium text-foreground mb-2";

  return (
    <>
    {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          src="/images/kontakt-hero.png"
          alt="Bergpanorama"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 3xl:py-36">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl 3xl:text-5xl font-heading font-medium mb-12">Kontakt</h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Linke Spalte: Kontakt-Infos */}
            <FadeIn delay={0.15} className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xs font-heading font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    So erreichen Sie uns
                  </h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Wir freuen uns auf Ihre Nachricht und melden uns so bald wie möglich bei Ihnen zurück.
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-border">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Terra Helvetica Anlagestiftung</p>
                      <p className="text-foreground/70">Bahnhofstrasse 92</p>
                      <p className="text-foreground/70">CH-8500 Frauenfeld</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a href="tel:+41433117000" className="text-primary hover:underline font-medium">
                      +41 43 311 70 00
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <a
                      href="mailto:info@terrahelvetica-anlagestiftung.ch"
                      className="text-primary hover:underline font-medium break-all"
                    >
                      info@terrahelvetica-anlagestiftung.ch
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Rechte Spalte: Formular */}
            <FadeIn delay={0.3} className="lg:col-span-3">
              <div className="bg-secondary p-8 md:p-10 rounded-lg">
                <h2 className="text-xs font-heading font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Kontaktformular
                </h2>
                <h3 className="text-2xl md:text-3xl font-heading font-medium mb-8">
                  Schreiben Sie uns
                </h3>

                {status === "success" ? (
                  <div className="flex flex-col items-center text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                    <h4 className="text-xl font-heading font-medium mb-2">Vielen Dank!</h4>
                    <p className="text-foreground/70 max-w-md">
                      Ihre Nachricht wurde erfolgreich gesendet. Eine Bestätigung haben wir an Ihre E-Mail-Adresse geschickt.
                      Wir melden uns so bald wie möglich bei Ihnen.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-primary hover:underline font-medium"
                    >
                      Weitere Nachricht senden
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="vorname" className={labelClass}>
                          Vorname <span className="text-primary">*</span>
                        </label>
                        <input
                          id="vorname"
                          type="text"
                          name="vorname"
                          value={form.vorname}
                          onChange={handleChange}
                          className={inputClass}
                          disabled={status === "loading"}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="nachname" className={labelClass}>
                          Nachname <span className="text-primary">*</span>
                        </label>
                        <input
                          id="nachname"
                          type="text"
                          name="nachname"
                          value={form.nachname}
                          onChange={handleChange}
                          className={inputClass}
                          disabled={status === "loading"}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          E-Mail <span className="text-primary">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={inputClass}
                          disabled={status === "loading"}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="telefon" className={labelClass}>
                          Telefon
                        </label>
                        <input
                          id="telefon"
                          type="tel"
                          name="telefon"
                          value={form.telefon}
                          onChange={handleChange}
                          className={inputClass}
                          disabled={status === "loading"}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="firma" className={labelClass}>
                        Firma
                      </label>
                      <input
                        id="firma"
                        type="text"
                        name="firma"
                        value={form.firma}
                        onChange={handleChange}
                        className={inputClass}
                        disabled={status === "loading"}
                      />
                    </div>

                    <div>
                      <label htmlFor="betreff" className={labelClass}>
                        Betreff <span className="text-primary">*</span>
                      </label>
                      <input
                        id="betreff"
                        type="text"
                        name="betreff"
                        value={form.betreff}
                        onChange={handleChange}
                        className={inputClass}
                        disabled={status === "loading"}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="nachricht" className={labelClass}>
                        Nachricht <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="nachricht"
                        name="nachricht"
                        value={form.nachricht}
                        onChange={handleChange}
                        rows={6}
                        className={`${inputClass} resize-y min-h-[140px]`}
                        disabled={status === "loading"}
                        required
                      />
                    </div>

                    {status === "error" && errorMsg && (
                      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-md">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-destructive">{errorMsg}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary">*</span> Pflichtfelder
                      </p>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={status === "loading"}
                        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Wird gesendet…
                          </>
                        ) : (
                          "Nachricht senden"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
);
}
