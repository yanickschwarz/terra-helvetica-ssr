# Salesforce Account Engagement (Pardot) — Formularanbindung

Ansprechpartnerin: Nicole Wicki, Mayoris AG (im Auftrag von Christian Kaiser, Admicasa)

## Funktionsweise

Die Formulare bleiben unveraendert React-Komponenten mit serverseitiger
Verarbeitung. Nach der eigenen Verarbeitung (Supabase + Mailversand) wird die
Einsendung zusaetzlich per POST an den Pardot Form Handler weitergeleitet.

Die Weiterleitung ist **nicht erfolgskritisch**: Schlaegt sie fehl, sieht der
Besucher trotzdem die Erfolgsmeldung, weil die Anfrage bei uns bereits erfasst
und zugestellt wurde. Der Fehlschlag wird protokolliert.

Implementierung: `src/lib/salesforce.ts`, aufgerufen aus
`src/app/actions/contact.ts` und `src/app/actions/newsletter.ts`.

## Form Handler

| Formular | URL |
|---|---|
| Kontakt | `https://info.terrahelvetica-anlagestiftung.ch/l/1055563/2024-02-16/3d5xm` |
| Newsletter | `https://info.terrahelvetica-anlagestiftung.ch/l/1055563/2024-02-16/3d5xq` |

Ueberschreibbar per Env-Var `PARDOT_CONTACT_HANDLER_URL` bzw.
`PARDOT_NEWSLETTER_HANDLER_URL`. Ein leerer Wert deaktiviert die Weiterleitung
(Status `skipped`) — nuetzlich fuer Preview-Umgebungen, in denen keine echten
Leads erzeugt werden sollen.

## Feldzuordnung

Kontaktformular:

| Gesendet | Salesforce-Feld | Pflicht |
|---|---|---|
| `email` | Standardfeld: Email | ja |
| `vorname` | Standardfeld: First Name | ja |
| `nachname` | Standardfeld: Last Name | ja |
| `betreff` | Benutzerdefiniert: Betreff Kontaktformular | ja |
| `telefon` | Standardfeld: Phone | nein |
| `firma` | Standardfeld: Company | nein |
| `nachricht` | Benutzerdefiniert: Kommentar Kontaktformular | nein |

Newsletterformular:

| Gesendet | Salesforce-Feld | Pflicht |
|---|---|---|
| `email` | Standardfeld: Email | ja |
| `vorname` | Standardfeld: First Name | ja |
| `nachname` | Standardfeld: Last Name | ja |
| `anrede` | Standardfeld: Salutation | ja |

`anrede` sendet `Herr`, `Frau` oder `Divers`. Alle drei Werte wurden von Mayoris
in der Salesforce-Auswahlliste hinterlegt.

Leere optionale Felder werden nicht mitgesendet, damit bestehende Werte in
Salesforce nicht mit Leerstrings ueberschrieben werden.

## Erfolgskontrolle

Der Form Handler antwortet mit `302` auf die hinterlegte Success- bzw.
Error-Location. Daran wird der Status abgeleitet und in den Spalten
`crm_status`, `crm_detail` und `crm_synced_at` festgehalten
(`th_contact_messages`, `th_newsletter_subscribers`):

| Status | Bedeutung |
|---|---|
| `sent` | Redirect auf `/danke-*` — angenommen |
| `rejected` | Redirect auf `/fehler-*` — abgewiesen (z. B. Pflichtfeld fehlt) |
| `failed` | Netzwerkfehler, Timeout (5 s) oder unerwarteter Statuscode |
| `skipped` | Weiterleitung per Env-Var deaktiviert |

Zusaetzlich Logging nach stdout mit Praefix `[pardot:kontakt]` bzw.
`[pardot:newsletter]` — in den Vercel Runtime Logs einsehbar.

### ⚠️ RLS-Fallstrick — kein `.select()` nach dem Insert

Die RLS-Policies erlauben oeffentlich **nur INSERT**, weder SELECT noch UPDATE
(`th_newsletter_subscribers`: "Anyone can subscribe"; `th_contact_messages`:
gar kein oeffentlicher Zugriff, dort schreibt die Edge Function mit Service Role).

Ein `.insert().select()` fuehrt PostgREST in **einer Transaktion** aus. Der
verweigerte SELECT laesst die gesamte Transaktion zurueckrollen — die Anmeldung
schlaegt mit `42501` fehl und der Besucher sieht eine Fehlermeldung, obwohl der
Insert selbst zulaessig waere. Genau das ist beim ersten Go-live passiert und hat
das Newsletterformular vollstaendig blockiert.

Deshalb:

- Insert **immer ohne** `.select()` / `.single()`
- Die Statusprotokollierung laeuft ueber die SECURITY-DEFINER-Funktion
  `th_record_crm_status(p_table, p_email, p_status, p_detail)`. Sie aktualisiert
  nur die crm_*-Spalten des jeweils neuesten Datensatzes zur Adresse, gibt
  nichts zurueck und prueft Tabellen- und Statuswert gegen eine Whitelist.

Aenderungen an den Formular-Actions immer gegen die echten RLS-Policies testen,
nicht nur gegen einen erfolgreichen Build.

## Status-Seiten

`/danke-kontakt`, `/fehler-kontakt`, `/danke-newsletter`, `/fehler-newsletter`
— alle `noindex`. Bei der serverseitigen Loesung wird der Besucher nicht dorthin
weitergeleitet; die Seiten sind in Pardot als Ziele hinterlegt und dienen uns
zur Auswertung der Handler-Antwort.

## Offen / spaeter

**Tracking-Code** — derzeit **nicht** eingebunden. Von Mayoris zur Ablage
geliefert, falls die Besucher-Attribution spaeter gewuenscht wird. Eine
Einbindung setzt eine Ergaenzung der Datenschutzerklaerung um einen Abschnitt zu
Salesforce Account Engagement voraus (Cookies) und ist mit Christian Kaiser
abzustimmen. Vorteil einer Einbindung: Die `visitor_id` liesse sich als
verstecktes Feld mitsenden, wodurch eine Einsendung der vorangegangenen
Besuchersession zugeordnet werden koennte.

```html
<script type='text/javascript'>
piAId = '1056563';
piCId = '171844';
piHostname = 'info.terrahelvetica-anlagestiftung.ch';

(function() {
    function async_load(){
        var s = document.createElement('script'); s.type = 'text/javascript';
        s.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + piHostname + '/pd.js';
        var c = document.getElementsByTagName('script')[0]; c.parentNode.insertBefore(s, c);
    }
    if(window.attachEvent) { window.attachEvent('onload', async_load); }
    else { window.addEventListener('load', async_load, false); }
})();
</script>
```

**Weitere offene Punkte**

- Mehrfach-Einsendungen: Mayoris prueft, ob wiederholte Nachrichten im Feld
  "Kommentar Kontaktformular" ergaenzt statt ueberschrieben werden.
- Abschaltung der `info@`-Benachrichtigung und der eigenen Bestaetigungsmail:
  erst nach verifiziertem Parallelbetrieb und Freigabe durch Christian Kaiser.
- Newsletter-Bestand: allfaellige separate Opt-in-Kampagne fuer die bisherigen
  Anmeldungen — offen bei Mayoris/Kaiser.
