"use server";

import { createClient } from "@/lib/supabase/server";
import { contactHandlerUrl, forwardToPardot, recordCrmStatus } from "@/lib/salesforce";

export interface ContactFormData {
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string;
  firma?: string;
  betreff: string;
  nachricht: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Verarbeitet eine Kontaktanfrage:
 *  1. Edge Function `send-contact-email` (Speicherung + Mail an info@ + Bestaetigung)
 *  2. Weiterleitung an den Salesforce Form Handler
 *
 * Schritt 2 ist bewusst nachgelagert und nicht erfolgskritisch: Schlaegt die
 * Weiterleitung fehl, sieht der Besucher trotzdem die Erfolgsmeldung, weil die
 * Anfrage bei uns bereits vollstaendig erfasst und zugestellt wurde. Der
 * Fehlschlag wird in `th_contact_messages.crm_status` protokolliert.
 */
export async function submitContact(
  formData: ContactFormData
): Promise<ContactSubmitResult> {
  const { vorname, nachname, email, betreff, nachricht } = formData;

  if (!vorname?.trim() || !nachname?.trim() || !email?.trim() || !betreff?.trim() || !nachricht?.trim()) {
    return { ok: false, error: "Bitte alle Pflichtfelder ausfüllen." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Bitte eine gültige E-Mail-Adresse eingeben." };
  }

  const supabase = await createClient();

  // Schritt 1: bestehende Verarbeitung (unveraendert)
  const { data, error } = await supabase.functions.invoke("send-contact-email", {
    body: formData,
  });

  if (error) {
    return {
      ok: false,
      error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
    };
  }
  if (data?.error) {
    return { ok: false, error: String(data.error) };
  }

  // Schritt 2: Weiterleitung an Salesforce (nicht erfolgskritisch)
  const crm = await forwardToPardot(
    contactHandlerUrl(),
    {
      vorname: formData.vorname,
      nachname: formData.nachname,
      email: formData.email,
      telefon: formData.telefon,
      firma: formData.firma,
      betreff: formData.betreff,
      nachricht: formData.nachricht,
    },
    "kontakt"
  );

  // Status am zuletzt erfassten Datensatz dieser Adresse festhalten.
  const { data: latest } = await supabase
    .from("th_contact_messages")
    .select("id")
    .eq("email", formData.email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string }>();

  if (latest?.id) {
    await recordCrmStatus(supabase, "th_contact_messages", latest.id, crm);
  }

  return { ok: true };
}
