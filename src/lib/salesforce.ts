/**
 * Serverseitige Weiterleitung von Formulareinsendungen an die
 * Salesforce Account Engagement (Pardot) Form Handler.
 *
 * Ablauf: Die eigene Verarbeitung (Supabase + Mailversand) laeuft unveraendert
 * weiter. Erst danach wird die Einsendung zusaetzlich per POST an den Form
 * Handler geschickt. Der Handler antwortet mit einem 302 auf die im Pardot
 * hinterlegte Success- bzw. Error-Location — daran erkennen wir, ob die
 * Einsendung angenommen wurde.
 *
 * Diese Funktion wirft nie. Eine Stoerung auf Salesforce-Seite darf das
 * Formular des Besuchers niemals blockieren.
 */

const DEFAULT_CONTACT_HANDLER =
  "https://info.terrahelvetica-anlagestiftung.ch/l/1055563/2024-02-16/3d5xm";
const DEFAULT_NEWSLETTER_HANDLER =
  "https://info.terrahelvetica-anlagestiftung.ch/l/1055563/2024-02-16/3d5xq";

/** Timeout in ms. Pardot antwortet normalerweise in <1s. */
const TIMEOUT_MS = 5000;

export type CrmStatus =
  /** Vom Form Handler angenommen (Redirect auf die Success-Location). */
  | "sent"
  /** Vom Form Handler abgewiesen (Redirect auf die Error-Location). */
  | "rejected"
  /** Netzwerkfehler, Timeout oder unerwarteter Statuscode. */
  | "failed"
  /** Weiterleitung ist deaktiviert (Handler-URL leer gesetzt). */
  | "skipped";

export interface ForwardResult {
  status: CrmStatus;
  /** Kurze Diagnose fuer Logs und die DB-Spalte. Nie fuer den Besucher sichtbar. */
  detail: string;
}

/**
 * Schreibt das Ergebnis der Weiterleitung in die crm_*-Spalten.
 *
 * Die RLS-Policies erlauben oeffentlich nur INSERT — weder SELECT noch UPDATE.
 * Ein direktes Update aus der Server Action wuerde daher wirkungslos bleiben,
 * ein `.select()` nach dem Insert wuerde sogar die ganze Transaktion
 * zurueckrollen. Deshalb laeuft die Protokollierung ueber eine
 * SECURITY-DEFINER-Funktion, die nur die crm_*-Spalten anfasst und nichts
 * zurueckgibt.
 *
 * Wirft nie: eine fehlgeschlagene Protokollierung darf den Ablauf des
 * Formulars unter keinen Umstaenden beeintraechtigen.
 */
interface RpcCapableClient {
  rpc: (fn: string, args: Record<string, unknown>) => Promise<{ error: unknown }>;
}

export async function recordCrmStatus(
  supabase: unknown,
  table: "th_contact_messages" | "th_newsletter_subscribers",
  email: string,
  result: ForwardResult
): Promise<void> {
  try {
    const { error } = await (supabase as RpcCapableClient).rpc("th_record_crm_status", {
      p_table: table,
      p_email: email,
      p_status: result.status,
      p_detail: result.detail,
    });
    if (error) {
      console.error(`[pardot] Status nicht gespeichert: ${JSON.stringify(error)}`);
    }
  } catch (e) {
    console.error(`[pardot] Status nicht gespeichert: ${String(e)}`);
  }
}

export const contactHandlerUrl = (): string =>
  process.env.PARDOT_CONTACT_HANDLER_URL ?? DEFAULT_CONTACT_HANDLER;

export const newsletterHandlerUrl = (): string =>
  process.env.PARDOT_NEWSLETTER_HANDLER_URL ?? DEFAULT_NEWSLETTER_HANDLER;

/**
 * Wertet die Antwort des Form Handlers aus.
 *
 * Pardot antwortet auf einen erfolgreichen POST mit 302 + Location auf die
 * konfigurierte Success-Seite, bei Validierungsfehlern auf die Error-Seite.
 * Manche Konfigurationen liefern stattdessen ein blankes 200 — das werten wir
 * ebenfalls als Erfolg.
 */
function interpretResponse(status: number, location: string | null): ForwardResult {
  const target = (location ?? "").toLowerCase();

  if (status >= 300 && status < 400) {
    if (target.includes("/fehler-")) {
      return { status: "rejected", detail: `302 -> ${location}` };
    }
    if (target.includes("/danke-")) {
      return { status: "sent", detail: `302 -> ${location}` };
    }
    // Unbekanntes Redirect-Ziel: nicht als Erfolg werten, aber festhalten.
    return { status: "failed", detail: `302 auf unerwartetes Ziel: ${location}` };
  }

  if (status >= 200 && status < 300) {
    return { status: "sent", detail: `HTTP ${status} ohne Redirect` };
  }

  return { status: "failed", detail: `HTTP ${status}` };
}

/**
 * Sendet die Felder als application/x-www-form-urlencoded an den Form Handler.
 * Leere Werte werden weggelassen, damit optionale Felder in Salesforce nicht
 * mit Leerstrings ueberschrieben werden.
 */
export async function forwardToPardot(
  handlerUrl: string,
  fields: Record<string, string | null | undefined>,
  label: string
): Promise<ForwardResult> {
  if (!handlerUrl.trim()) {
    return { status: "skipped", detail: "Handler-URL nicht konfiguriert" };
  }

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    const trimmed = String(value ?? "").trim();
    if (trimmed) body.append(key, trimmed);
  }

  try {
    const response = await fetch(handlerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      // Wir wollen den Location-Header selbst auswerten, nicht folgen.
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const result = interpretResponse(response.status, response.headers.get("location"));

    if (result.status === "sent") {
      console.log(`[pardot:${label}] ${result.status} — ${result.detail}`);
    } else {
      console.error(`[pardot:${label}] ${result.status} — ${result.detail}`);
    }

    return result;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const detail = message.includes("timed out") || message.includes("abort")
      ? `Timeout nach ${TIMEOUT_MS}ms`
      : message;
    console.error(`[pardot:${label}] failed — ${detail}`);
    return { status: "failed", detail };
  }
}
