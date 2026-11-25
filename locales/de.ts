import type { MessageKey } from "@/locales/en";

export const locale = "de" as const;
export const direction = "ltr" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "Zum Inhalt springen",
  home: "Startseite",
  privacy: "Datenschutz",
  contact: "Kontakt",
  toolsNav: "Werkzeuge",
  siteNav: "Seite",
  footerNote: "Jedes Werkzeug läuft in Ihrem Browser. Nichts verlässt die Seite.",
  consent:
    "Die optionale Messung erfasst, welches Werkzeug verwendet wurde. Sie erfasst weder den eingegebenen Text noch die berechneten Zahlen. Es wird nichts gesendet, bis eine Analyseadresse konfiguriert ist.",
  allowMeasurement: "Messung erlauben",
  denyMeasurement: "Nicht erlauben",
  notFoundTitle: "Seite nicht gefunden",
  notFoundBody: "Diese Adresse gehört zu keinem der Werkzeuge auf dieser Seite.",
  notFoundLink: "Zurück zu den Werkzeugen",
};
