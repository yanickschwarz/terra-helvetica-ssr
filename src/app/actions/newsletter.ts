"use server";

import { createClient } from "@/lib/supabase/server";
import { forwardToPardot, newsletterHandlerUrl, recordCrmStatus } from "@/lib/salesforce";

export interface NewsletterSubscribeResult {
  ok: boolean;
  error?: string;
}

export async function subscribeNewsletter(formData: {
  anrede: string;
  vorname: string;
  nachname: string;
  email: string;
}): Promise<NewsletterSubscribeResult> {
  const { anrede, vorname, nachname, email } = formData;

  if (!vorname || !nachname || !email) {
    return { ok: false, error: "Bitte alle Felder ausfüllen." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Bitte eine gültige E-Mail-Adresse eingeben." };
  }

  const supabase = await createClient();

  // Bewusst ein reiner Insert ohne .select(): Die RLS-Policy erlaubt
  // oeffentlich kein SELECT, wodurch PostgREST die gesamte Transaktion
  // zurueckrollen wuerde und die Anmeldung fehlschlaegt.
  const { error } = await supabase.from("th_newsletter_subscribers").insert({
    anrede,
    vorname,
    nachname,
    email,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Diese E-Mail-Adresse ist bereits angemeldet." };
    }
    console.error(`[newsletter] Insert fehlgeschlagen: ${JSON.stringify(error)}`);
    return {
      ok: false,
      error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
    };
  }

  // Weiterleitung an Salesforce — nicht erfolgskritisch. Die Anmeldung ist bei
  // uns bereits erfasst; ein Fehlschlag wird nur protokolliert.
  const crm = await forwardToPardot(
    newsletterHandlerUrl(),
    { anrede, vorname, nachname, email },
    "newsletter"
  );

  await recordCrmStatus(supabase, "th_newsletter_subscribers", email, crm);

  return { ok: true };
}
