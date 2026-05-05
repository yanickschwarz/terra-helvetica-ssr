import FadeIn from "@/components/motion/FadeIn";

export const metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Terra Helvetica Anlagestiftung. Informationen zur Erhebung und Verarbeitung personenbezogener Daten.",
};


export default function Datenschutz() {
  return (
    <>
    <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-heading font-medium mb-12">Datenschutzerklärung</h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-10 text-foreground/80 leading-relaxed text-sm md:text-base">

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">1 Verantwortliche und Inhalt dieser Datenschutzerklärung</h2>
                <p>
                  Wir, die Terra Helvetica Anlagestiftung (Bahnhofstrasse 92, 8500 Frauenfeld, Schweiz), sind Betreiberin der Website www.terrahelvetica-anlagestiftung.ch (&quot;Website&quot;) sowie Ihre Vertragspartnerin bei Aufträgen an uns und sind, soweit dies nicht anders angegeben wird, verantwortlich für die in dieser Datenschutzerklärung aufgeführten Datenbearbeitungen.
                </p>
                <p className="mt-3">
                  Damit Sie wissen, welche Personendaten wir von Ihnen erheben und für welche Zwecke wir sie verwenden, nehmen Sie bitte die nachstehenden Informationen zur Kenntnis. Wir orientieren uns beim Datenschutz vorwiegend an den gesetzlichen Vorgaben des Schweizer Datenschutzrechts, insbesondere dem Bundesgesetz über den Datenschutz (&quot;DSG&quot;), sowie der EU-Datenschutzgrundverordnung (&quot;DSGVO&quot;), deren Vorschriften in Einzelfällen anwendbar sein können.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">2 Ansprechpartner für Datenschutz</h2>
                <p>
                  Wenn Sie Fragen zum Datenschutz haben oder Ihre Rechte ausüben möchten, wenden Sie sich bitte an unseren Ansprechpartner für Datenschutz, indem Sie eine E-Mail an folgende Adresse senden:{" "}
                  <a href="mailto:datenschutz@admicasa.ch" className="text-primary hover:underline">datenschutz@admicasa.ch</a>
                </p>
                <p className="mt-3">Alternativ können Sie sich per Post an folgende Adresse wenden:</p>
                <address className="mt-3 not-italic">
                  Terra Helvetica Anlagestiftung<br />
                  Datenschutz<br />
                  Bahnhofstrasse 92<br />
                  8500 Frauenfeld<br />
                  Schweiz
                </address>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">3 Beim Besuch unserer Website (Logfile-Daten)</h2>
                <p>
                  Beim Besuch unserer Website speichern die Server unseres Hosting-Providers jeden Zugriff in einer Protokolldatei (sog. Logfile) für einen Zeitraum von maximal 12 Monaten. Folgende Daten werden dabei erfasst und bis zur automatisierten Löschung von uns gespeichert:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>die IP-Adresse des anfragenden Rechners</li>
                  <li>das Datum und die Uhrzeit des Zugriffs</li>
                  <li>der Name und die URL der abgerufenen Datei</li>
                  <li>die Website, von der aus der Zugriff erfolgte, ggf. mit verwendetem Suchwort</li>
                  <li>das Betriebssystem Ihres Rechners und der von Ihnen verwendete Browser (inkl. Typ, Version und Spracheinstellung)</li>
                  <li>Gerätetyp im Falle von Zugriffen durch Mobiltelefone</li>
                  <li>die Stadt oder Region, von wo der Zugriff erfolgte sowie</li>
                  <li>der Name Ihres Internet-Access-Providers</li>
                </ul>
                <p className="mt-3">
                  Die Bearbeitung dieser Daten erfolgt zu dem Zweck, die Nutzung unserer Website zu ermöglichen, die Systemsicherheit und -stabilität dauerhaft zu gewährleisten sowie zur Fehler- und Performanceanalyse. Sie ermöglicht es uns zudem, unsere Website zu optimieren.
                </p>
                <p className="mt-3">
                  Im Falle eines Angriffes auf die Netzinfrastruktur der Website oder bei einem Verdacht auf eine andere unerlaubte oder missbräuchliche Website-Nutzung wird die IP-Adresse sowie die anderen Daten zur Aufklärung und Abwehr ausgewertet und gegebenenfalls im Rahmen eines Strafverfahrens zur Identifikation und zum zivil- und strafrechtlichen Vorgehen gegen die betreffenden Nutzer verwendet.
                </p>
                <p className="mt-3">
                  In den vorangehend beschriebenen Zwecken besteht unser berechtigtes Interesse an der Datenverarbeitung im Sinne von Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">4 Nutzung einer unserer Kontaktaufnahmemöglichkeiten</h2>
                <p>
                  Wenn Sie sich mit uns über unsere Kontaktadressen und -kanäle (z. B. per E-Mail, Telefon oder Kontaktformular) in Verbindung setzen, werden Ihre Personendaten bearbeitet. Bearbeitet werden die Daten, die Sie uns zur Verfügung gestellt haben, z.B. Ihr Name, Ihre Funktion, Ihre E-Mail-Adresse, Telefonnummer oder Ihre Adresse und Ihr Anliegen. Darüber hinaus wird der Zeitpunkt des Eingangs der Anfrage dokumentiert. Pflichtangaben sind in Kontaktformularen entsprechend gekennzeichnet (z.B. mit einem Sternchen).
                </p>
                <p className="mt-3">
                  Wir bearbeiten diese Daten ausschliesslich, um Ihre Anfrage bestmöglich zu beantworten. Rechtsgrundlage für diese Datenverarbeitung ist unser berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO an der Beantwortung Ihrer Anfrage oder, wenn Ihre Anfrage auf den Abschluss oder die Abwicklung eines Vertrages gerichtet ist, die Erforderlichkeit für die Durchführung der erforderlichen Massnahmen im Sinne von Art. 6 Abs. 1 lit. b DSGVO.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">5 Abwicklung von Ihren Aufträgen</h2>
                <p>
                  Wir führen die von Ihnen bei uns angeforderten Aufträge durch. Für die Auftragserfüllung erheben wir u.a. folgende Daten:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Kontaktdaten (wie Firma, Name, Vorname, E-Mail)</li>
                  <li>Rechnungs- und ggf. Lieferadresse</li>
                  <li>Andere Vertragsdaten</li>
                </ul>
                <p className="mt-3">
                  Diese Daten verwenden wir, um Ihren Auftrag im Sinne der Durchführung des Vertrags bestmöglich zu erfüllen, zur Administration des Auftrags sowie zur Verrechnung und Ablieferung des Auftrags. Ihre E-Mail-Adresse benötigen wir ferner zur Bestätigung Ihres Auftrags und für künftige zur Vertragsabwicklung erforderliche Kommunikation mit Ihnen.
                </p>
                <p className="mt-3">
                  Soweit dies für die Vertragserfüllung erforderlich ist, werden wir die benötigten Informationen auch an eventuelle Drittdienstleistungserbringer (z.B. Partner) weitergeben.
                </p>
                <p className="mt-3">
                  Rechtsgrundlage dieser Bearbeitung ist die Durchführung des Vertrags im Sinne von Art. 6 Abs. 1 lit. b DSGVO.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">6 Bewerbungen</h2>
                <p>
                  Sie haben die Möglichkeit, sich bei uns spontan oder auf einen spezifischen Stellenausschrieb über eine entsprechende E-Mail-Adresse zu bewerben. Wir bearbeiten folgende Daten:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Name</li>
                  <li>Vorname</li>
                  <li>E-Mail-Adresse</li>
                  <li>Motivationsschreiben</li>
                  <li>Lebenslauf (CV)</li>
                  <li>Zeugnisse und Diplome</li>
                </ul>
                <p className="mt-3">
                  Diese und weitere von Ihnen freiwillig angegebene Daten verwenden wir, um Ihre Bewerbung zu prüfen und den Bewerbungsprozess durchzuführen. Bewerbungsunterlagen von nicht berücksichtigten Bewerbenden werden nach Ablauf des Bewerbungsprozesses gelöscht, sofern Sie nicht explizit einer längeren Aufbewahrungsdauer zustimmen oder wir nicht gesetzlich zur längeren Aufbewahrung verpflichtet sind. Rechtsgrundlage für die Prüfung Ihrer Bewerbung und der Abwicklung des Bewerbungsprozesses ist die Durchführung vorvertraglicher Massnahmen im Sinne von Art. 6 Abs. 1 lit. b DSGVO.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">7 Nutzung Ihrer Daten zu Marketingzwecken</h2>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">7.1 Zentrale Datenspeicherung und -analyse im CRM-System</h3>
                <p>
                  Sofern eine eindeutige Zuordnung zu Ihrer Person möglich ist, werden wir die in dieser Datenschutzerklärung beschriebenen Daten, d.h. insb. Ihre Personalien, Ihre Kontaktaufnahmen, Ihre Vertragsdaten sowie Ihr Surfverhalten auf unserer Website in einer zentralen Datenbank speichern und verknüpfen. Dies dient der effizienten Verwaltung von Kundendaten und erlaubt uns, Ihre Anliegen adäquat zu beantworten, und ermöglicht die effiziente Erbringung der von Ihnen gewünschten Leistungen und Abwicklung der damit verbundenen Verträge. Rechtsgrundlage dieser Datenverarbeitung ist unser berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO an der effizienten Verwaltung von Nutzerdaten. Wir nutzen dafür die Software Salesforce von SFDC Ireland Limited (Level 1, Block, Nova Atria North, Sandyford Business District, Dublin 18, Ireland). Die Rechtsgrundlage für diese Bearbeitung ist unser berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO an der Nutzung der Dienste von Drittanbietern.
                </p>
                <p className="mt-3">
                  Wir werten diese Daten aus, um unsere Angebote bedürfnisorientiert weiterzuentwickeln und Ihnen möglichst relevante Informationen und Angebote vorzuschlagen. Wir setzen zudem Methoden ein, welche aufgrund Ihrer Websitenutzung mögliche Interessen und zukünftige Bestellungen vorhersagen. Rechtsgrundlage dieser Datenverarbeitungen ist unser berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO an der Durchführung von Marketingmassnahmen.
                </p>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">7.2 Abonnieren von Medienmitteilungen, Ad hoc-Mitteilungen und Finanzberichten</h3>
                <p>
                  Wenn Sie sich für unseren Mitteilungsservice (&quot;Newsletter&quot;) registrieren, erheben wir folgende Daten, wobei Pflichtangaben entsprechend gekennzeichnet (z.B. mit einem Sternchen):
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Anrede*</li>
                  <li>Vorname*</li>
                  <li>Nachname*</li>
                  <li>E-Mail-Adresse*</li>
                </ul>
                <p className="mt-3">
                  Zur Vermeidung von Missbräuchen und zur Sicherstellung, dass die Inhaberin einer E-Mail-Adresse tatsächlich selbst ihre Einwilligung erteilt hat, setzen wir für die Registrierung auf das Double-Opt-In-Verfahren. Nach der Absendung der Anmeldung erhalten Sie von uns eine E-Mail, in welcher ein Bestätigungslink enthalten ist. Um sich definitiv für den Newsletter anzumelden, müssen Sie diesen Link betätigen. Klicken Sie innert dem angegebenen Zeitraum nicht auf den Bestätigungslink, werden Ihre Daten wieder gelöscht und es erfolgt keine Zustellung unseres Newsletters an die angegebene Adresse.
                </p>
                <p className="mt-3">
                  Mit der Registrierung willigen Sie in die Bearbeitung dieser Daten ein, um von uns Nachrichten über unser Unternehmen sowie unsere Medienmitteilungen, Ad hoc Mitteilungen und Finanzberichte zu erhalten. Die Erhebung der Anrede und des Namens erlaubt uns den Inhalt der Mails zu personalisieren.
                </p>
                <p className="mt-3">
                  Wir verwenden Ihre Daten für den E-Mail-Versand so lange, bis Sie Ihre Einwilligung widerrufen. Ein Widerruf ist jederzeit über den Abmeldelink in allen unseren Newslettern möglich.
                </p>
                <p className="mt-3">
                  Unsere Newsletter können einen Web-Beacon oder 1x1-Pixel (Zählpixel) oder ähnliche technische Hilfsmittel enthalten. Ein Web-Beacon ist eine unsichtbare Grafik, die mit der User-ID des jeweiligen Newsletter-Abonnenten verknüpft ist. Für jeden versandten Newsletter erhalten wir Informationen dazu, welche Adressen die E-Mail noch nicht erhalten haben, an welche Adressen sie gesendet wurde und bei welchen Adressen der Versand fehlgeschlagen ist. Es wird auch angezeigt, welche Adressen die E-Mail wie lange geöffnet haben und auf welche Links sie geklickt haben. Schliesslich erhalten wir auch Informationen darüber, welche Adressen sich abgemeldet haben. Wir verwenden diese Daten für statistische Zwecke und zur Optimierung der Newsletter in Bezug auf Häufigkeit, Zeitpunkt, Aufbau und Inhalt der E-Mails. So können wir die Informationen und Angebote in unseren E-Mails besser auf die individuellen Interessen der Empfänger abstimmen.
                </p>
                <p className="mt-3">
                  Der Web-Beacon wird gelöscht, wenn Sie die E-Mail löschen. Um die Verwendung des Web-Beacons in unseren Newslettern zu verhindern, stellen Sie bitte Ihr E-Mail-Programm so ein, dass HTML in Nachrichten nicht angezeigt wird. In den Hilfeabschnitten Ihrer E-Mail-Software finden Sie Informationen, wie Sie diese Einstellung konfigurieren können, z. B. hier für Microsoft Outlook.
                </p>
                <p className="mt-3">
                  Mit der Anmeldung zum Newsletter willigen Sie auch in die statistische Auswertung des Nutzerverhaltens zum Zwecke der Optimierung und Anpassung des Newsletters ein. Diese Einwilligung stellt unsere Rechtsgrundlage für die Verarbeitung der Daten im Sinne von Art. 6 Abs. 1 lit. a DSGVO dar.
                </p>
                <p className="mt-3">
                  Wir nutzen die Software Mailchimp von The Rocket Science Group, LLC, 675 Ponce de Leon Ave E, Suite 5000, Atlanta, GA 30308 USA für den Versand des Newsletters. Daher werden Ihre Daten in einer Datenbank von Mailchimp gespeichert, wodurch diese auf Ihre Daten zugreifen kann. Die Rechtsgrundlage für diese Bearbeitung ist unser berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO an der Nutzung der Dienste von Drittanbietern.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">8 Cookies</h2>
                <p>
                  Cookies sind Informationsdateien, die Ihr Webbrowser auf der Festplatte oder dem Arbeitsspeicher Ihres Endgerätes speichert, wenn Sie unsere Website besuchen. Cookies werden Identifikationsnummern zugewiesen, über die Ihr Browser identifiziert wird und die im Cookie enthaltenen Informationen ausgelesen werden können.
                </p>
                <p className="mt-3">
                  Cookies helfen unter anderem, Ihren Besuch auf unserer Website einfacher, angenehmer und sinnvoller zu gestalten. Wir setzen Cookies zu verschiedenen Zwecken ein, die für die von Ihnen gewünschte Nutzung der Website technisch notwendig sind. Cookies übernehmen beispielsweise weitere für den Betrieb der Website erforderliche technische Funktionen, wie das Load Balancing, d.h. die Verteilung der Leistungslast der Seite auf verschiedene Webserver, um die Server zu entlasten. Schliesslich setzen wir Cookies auch im Rahmen der Gestaltung und Programmierung unserer Website ein, bspw. um das Hochladen von Scripts oder Codes zu ermöglichen.
                </p>
                <p className="mt-3">
                  Rechtsgrundlage dieser Datenverarbeitungen ist unser berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO an der Bereitstellung einer nutzerfreundlichen und zeitgemässen Website.
                </p>
                <p className="mt-3">
                  Die meisten Internet-Browser akzeptieren Cookies automatisch. Beim Zugriff auf unsere Website bitten wir Sie jedoch um Ihre Zustimmung zu den von uns eingesetzten technisch nicht notwendigen Cookies, insbesondere beim Einsatz von Cookies von Drittanbietern zu Marketingzwecken. Einzelheiten zu den mit den einzelnen Cookies verbundenen Diensten und Datenbearbeitungen finden Sie in den nachfolgenden Abschnitten dieser Datenschutzerklärung.
                </p>
                <p className="mt-3">
                  Sie können Ihren Browser ferner womöglich auch so konfigurieren, dass keine Cookies auf Ihrem Endgerät gespeichert werden oder stets ein Hinweis erscheint, wenn Sie ein neues Cookie erhalten. Die Deaktivierung von Cookies kann dazu führen, dass Sie nicht alle Funktionen unserer Website nutzen können.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">9 Tracking- und Webanalyse-Tools</h2>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">9.1 Allgemeine Informationen zum Tracking</h3>
                <p>
                  Zum Zwecke der bedarfsgerechten Gestaltung und fortlaufenden Optimierung unserer Website nutzen wir die nachfolgend aufgeführten Webanalyse-Dienste. In diesem Zusammenhang werden pseudonymisierte Nutzungsprofile erstellt und Cookies verwendet. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel zusammen mit den in Ziffer 3 aufgeführten Logfile-Daten an einen Server des Dienste-Anbieters übertragen, dort gespeichert und aufbereitet. Hierbei kann es auch zu einer Übertragung an Server im Ausland, z.B. den USA, kommen.
                </p>
                <p className="mt-3">Durch die Aufbereitung der Daten erhalten wir unter anderem folgende Informationen:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Navigationspfad, den ein Besucher auf der Site beschreitet (inkl. betrachtete Inhalte und ausgewählte oder erworbene Produkte)</li>
                  <li>Verweildauer auf der Website oder Unterseite</li>
                  <li>die Unterseite, auf welcher die Website verlassen wird</li>
                  <li>das Land, die Region oder die Stadt, von wo ein Zugriff erfolgt</li>
                  <li>Endgerät (Typ, Version, Farbtiefe, Auflösung, Breite und Höhe des Browserfensters) und</li>
                  <li>Wiederkehrender oder neuer Besucher</li>
                </ul>
                <p className="mt-3">
                  In unserem Auftrag wird der Anbieter diese Informationen verwenden, um die Nutzung der Website auszuwerten, um für uns Auswertungen über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu Zwecken der Marktforschung und bedarfsgerechten Gestaltung dieser Websites zu erbringen.
                </p>
                <p className="mt-3">
                  Die Rechtsgrundlage dieser Verarbeitungen mit den nachfolgenden Tools bildet Ihre Einwilligung im Sinne von Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit widerrufen bzw. die Verarbeitung ablehnen, indem Sie in den Einstellungen Ihres Webbrowsers die betreffenden Cookies abweisen bzw. ausschalten bzw. von den nachfolgend beschriebenen, dienstspezifischen Möglichkeiten Gebrauch machen.
                </p>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">9.2 Google Analytics</h3>
                <p>
                  Wir nutzen den Webanalyse-Dienst Google Analytics von Google Ireland Limited (Gordon House, 4 Barrow St, Dublin, D04 E5W5, Irland) bzw. Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) (&quot;Google&quot;).
                </p>
                <p className="mt-3">
                  Dabei können die in Ziffer 9.1 beschriebenen Daten über die Benutzung der Website zu den erläuterten Bearbeitungszwecken an die Server von Google in den USA übermittelt werden. Die IP-Adresse wird durch die Aktivierung der IP-Anonymisierung (&quot;anonymizeIP&quot;) auf dieser Website vor der Übermittlung innerhalb der Schweiz, Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.
                </p>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">9.3 Google Maps</h3>
                <p>
                  Wir setzen auf unserer Website Google Maps API (Application Programming Interface, &quot;Google Maps&quot;) von Google zur visuellen Darstellung von geographischen Informationen (Lagepläne) ein. Durch die Nutzung von Google Maps werden Informationen über die Nutzung unserer Website einschliesslich Ihrer IP-Adresse an einen Server von Google in den USA übertragen und dort gespeichert.
                </p>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">9.4 Google Tag Manager</h3>
                <p>
                  Auf unserer Website setzen wir den Google Tag Manager von Google ein. Google Tag Manager ist eine Lösung, mit der wir Vermarkter Website-Tags über eine Oberfläche verwalten können. Das Tool Tag Manager ist eine cookielose Domain und erfasst keine Personendaten. Das Tool sorgt für die Auslösung anderer Tags, die ihrerseits Personendaten erfassen. Google Tag Manager greift gemäss Google nicht auf diese Daten zu.
                </p>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">9.5 MyFonts by Monotype</h3>
                <p>
                  Auf unserer Website setzen wir die Web Fonts MyFonts by Monotype von Monotype Imaging Holdings Inc. (600 Unicorn Park Drive, Woburn, MA 01801, USA) ein. Web Fonts dienen der einheitlichen Darstellung von Schriftarten. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
                </p>
                <p className="mt-3">
                  MyFonts speichert die anonymisierte IP-Adresse und Projektidentifikationsnummer des Web Fonts in verschlüsselten Protokolldateien mit solchen Daten für einen Zeitraum von 30 Tagen, um die monatliche Anzahl der Seitenaufrufe zu bestimmen. Nach solcher Bestimmung und Speicherung der Anzahl der Seitenaufrufe werden die Protokolldateien gelöscht.
                </p>
                <p className="mt-3">
                  Die Nutzung von MyFonts erfolgt in unserem berechtigten Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO, an einer einheitlichen und ansprechenden Darstellung unserer Website.
                </p>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">9.6 ReCaptcha</h3>
                <p>
                  Auf unserer Website nutzen wir reCaptcha von Google. Mit reCaptcha soll überprüft werden, ob die Dateneingabe auf unserer Website (bspw. im Kontaktformular) durch einen Menschen oder durch ein automatisiertes Programm erfolgt. Hierzu analysiert reCaptcha das Verhalten des Websitebesuchers anhand verschiedener Merkmale.
                </p>
                <p className="mt-3">
                  Die Speicherung und Analyse der Daten erfolgt auf Grundlage unseres berechtigten Interesses im Sinne von Art. 6 Abs. 1 lit. f DSGVO daran, unsere Website vor missbräuchlicher automatisierter Ausspähung und vor Spam zu schützen.
                </p>

                <h3 className="font-heading font-medium text-base text-foreground mt-6 mb-2">9.7 YouTube</h3>
                <p>
                  Auf unserer Website binden wir Plugins des Videoportals YouTube der YouTube LLC (901 Cherry Ave., San Bruno, CA 94066, USA) (&quot;YouTube&quot;) ein. YouTube ist eine Tochtergesellschaft von Google. Bei jedem Aufruf einer Seite, die ein oder mehrere YouTube-Videoclips anbietet, wird eine direkte Verbindung zwischen Ihrem Browser und einem Server von YouTube in den USA hergestellt.
                </p>
                <p className="mt-3">
                  Die Rechtsgrundlage der Bearbeitung der Daten für diesen Zweck liegt in unserem berechtigten Interesse nach Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">10 Unsere Social Media Präsenzen</h2>
                <p>
                  Auf unserer Website finden Sie Links zu unseren Präsenzen auf folgenden sozialen Netzwerken:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>LinkedIn Unlimited Company, Wilton Place, Dublin 2, Irland.</li>
                </ul>
                <p className="mt-3">
                  Wenn Sie auf die Icons der sozialen Netzwerke klicken, werden Sie automatisch zu unserem Profil in dem jeweiligen Netzwerk weitergeleitet. Dabei wird eine direkte Verbindung zwischen Ihrem Browser und dem Server des jeweiligen sozialen Netzwerks hergestellt. Dadurch erhält das Netzwerk die Information, dass Sie mit Ihrer IP-Adresse unsere Website besucht und den Link angeklickt haben.
                </p>
                <p className="mt-3">
                  Wenn Sie auf einen Link zu einem Netzwerk klicken, während Sie in Ihrem Benutzerkonto bei dem betreffenden Netzwerk eingeloggt sind, kann der Inhalt unserer Website mit Ihrem Profil verknüpft werden, so dass das Netzwerk Ihren Besuch auf unserer Website direkt Ihrem Konto zuordnen kann. Wenn Sie dies verhindern wollen, sollten Sie sich ausloggen, bevor Sie die entsprechenden Links anklicken.
                </p>
                <p className="mt-3">
                  Rechtsgrundlage für eine gegebenenfalls uns zugerechnete Verarbeitung ist unser berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO an der Nutzung und Bewerbung von unseren Social Media Präsenzen.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">11 Weitergabe der Daten an Dritte</h2>
                <p>
                  Ohne die Unterstützung anderer Unternehmen könnten wir unsere Angebote nicht in der gewünschten Form erbringen. Damit wir die Dienstleistungen dieser Unternehmen nutzen können, ist in einem gewissen Umfang auch eine Weitergabe Ihrer Personendaten erforderlich. Eine solche Weitergabe erfolgt namentlich, soweit dies zur Erfüllung des von Ihnen gewünschten Vertrags erforderlich ist. Bei diesen Weitergaben ist die Erfüllung des Vertrags im Sinne von Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage.
                </p>
                <p className="mt-3">
                  Eine Weitergabe erfolgt ferner an ausgewählte Dienstleister und nur in dem Umfang, der für die Bereitstellung des Dienstes erforderlich ist. Verschiedene Drittdienstleister sind in dieser Datenschutzerklärung bereits explizit erwähnt. Es handelt sich im Übrigen z.B. um IT-Dienstleister (wie z.B. Anbieter von Softwarelösungen), Werbeagenturen, Beratungsunternehmen. Für diese Datenweitergabe bildet unser berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO am Bezug von Drittdienstleistungen die Rechtsgrundlage.
                </p>
                <p className="mt-3">
                  Darüber hinaus kann eine Weitergabe Ihrer Daten, insbesondere an Behörden oder Rechtsberater erfolgen, wenn wir hierzu gesetzlich verpflichtet sind oder dies zur Wahrung unserer Rechte, insbesondere zur Durchsetzung von Ansprüchen aus dem Verhältnis zu Ihnen, notwendig ist.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">12 Übermittlung Personendaten ins Ausland</h2>
                <p>
                  Wir sind berechtigt, Ihre Personendaten an Dritte im Ausland zu übertragen, sofern dies zur Durchführung der in dieser Datenschutzerklärung genannten Datenbearbeitungen erforderlich ist. Dabei werden die gesetzlichen Vorschriften zur Bekanntgabe von Personendaten an Dritte selbstverständlich eingehalten. Sofern das betreffende Land über kein angemessenes Datenschutzniveau verfügt, gewährleisten wir durch vertragliche Regelungen, dass Ihre Daten bei diesen Unternehmen angemessen geschützt sind.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">13 Aufbewahrungsfristen</h2>
                <p>
                  Wir speichern Personendaten nur so lange, wie es erforderlich ist, um die in dieser Datenschutzerklärung erläuterten Bearbeitungen im Rahmen unseres berechtigten Interesses durchzuführen. Bei Vertragsdaten wird die Speicherung durch gesetzliche Aufbewahrungspflichten vorgeschrieben. Vorgaben, die uns zur Aufbewahrung von Daten verpflichten, ergeben sich aus den Bestimmungen zur Rechnungslegung und aus steuerrechtlichen Vorschriften. Gemäss diesen Vorschriften sind namentlich geschäftliche Kommunikation, geschlossene Verträge und Buchungsbelege bis zu 10 Jahren aufzubewahren. Eine Löschung oder Anonymisierung der Daten erfolgt, sobald keine Aufbewahrungspflicht und kein berechtigtes Interesse an der Aufbewahrung mehr bestehen.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">14 Datensicherheit</h2>
                <p>
                  Wir bedienen uns geeigneter technischer und organisatorischer Sicherheitsmassnahmen, um Ihre bei uns gespeicherten Personendaten gegen Verlust und unrechtmässige Bearbeitungen, namentlich unbefugten Zugriff Dritter, zu schützen. Unsere Mitarbeiter und die von uns beauftragten Dienstleistungsunternehmen sind von uns zur Verschwiegenheit und zur Wahrung des Datenschutzes verpflichtet. Überdies wird diesen Personen der Zugriff auf die Personendaten nur so weit gewährt, wie es zur Erfüllung ihrer Aufgaben notwendig ist.
                </p>
                <p className="mt-3">
                  Unsere Sicherheitsmassnahmen werden entsprechend der technologischen Entwicklung fortlaufend angepasst. Jedoch birgt die Übermittlung von Informationen über das Internet und elektronische Kommunikationsmittel stets gewisse Sicherheitsrisiken und auch wir können für die Sicherheit von Informationen, die auf diese Weise übermittelt werden, keine absolute Garantie übernehmen.
                </p>
              </section>

              <section>
                <h2 className="font-heading font-medium text-lg text-foreground mb-3">15 Ihre Rechte</h2>
                <p>
                  Sofern die gesetzlichen Voraussetzungen erfüllt sind, haben Sie als von einer Datenbearbeitung betroffene Person die folgenden Rechte:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong>Recht auf Auskunft:</strong> Sie haben das Recht, jederzeit unentgeltlich Einsicht in Ihre bei uns gespeicherten Personendaten zu verlangen, wenn wir diese bearbeiten. So haben Sie die Möglichkeit, zu prüfen, welche Personendaten wir über Sie bearbeiten, und dass wir diese gemäss geltenden Datenschutzbestimmungen verwenden.</li>
                  <li><strong>Recht auf Berichtigung:</strong> Sie haben das Recht, unrichtige oder unvollständige Personendaten berichtigen zu lassen und über die Berichtigung informiert zu werden.</li>
                  <li><strong>Recht auf Löschung:</strong> Sie haben das Recht, dass Ihre Personendaten unter bestimmten Umständen gelöscht werden. Im Einzelfall, insbesondere bei gesetzlichen Aufbewahrungspflichten, kann das Recht auf Löschung ausgeschlossen sein.</li>
                  <li><strong>Recht auf Einschränkung der Bearbeitung:</strong> Sie haben das Recht, zu verlangen, dass die Bearbeitung Ihrer Personendaten eingeschränkt wird.</li>
                  <li><strong>Recht auf Datenübertragung:</strong> Sie haben das Recht, von uns die Personendaten, welche Sie uns bereitgestellt haben, unentgeltlich in einem lesbaren Format zu erhalten.</li>
                  <li><strong>Widerspruchsrecht:</strong> Sie können Datenbearbeitungen jederzeit widersprechen.</li>
                  <li><strong>Widerrufsrecht:</strong> Sie haben grundsätzlich das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. In der Vergangenheit auf Ihre Einwilligung gestützte Bearbeitungstätigkeiten werden durch Ihren Widerruf allerdings nicht unrechtmässig.</li>
                  <li><strong>Beschwerderecht:</strong> Sie haben das Recht, bei einer zuständigen Aufsichtsbehörde, z.B. gegen die Art und Weise der Bearbeitung Ihrer Personendaten, Beschwerde einzureichen.</li>
                </ul>
                <p className="mt-4">
                  Zur Ausübung dieser Rechte senden Sie uns bitte eine E-Mail an folgende Adresse:{" "}
                  <a href="mailto:datenschutz@admicasa.ch" className="text-primary hover:underline">datenschutz@admicasa.ch</a>
                </p>
              </section>

            </div>
          </FadeIn>
        </div>
      </section>
    </>
);
}
