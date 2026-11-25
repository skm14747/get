import type { MessageKey } from "@/locales/en";

export const locale = "it" as const;
export const direction = "ltr" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "Vai al contenuto",
  home: "Home",
  privacy: "Privacy",
  contact: "Contatto",
  toolsNav: "Strumenti",
  siteNav: "Sito",
  footerNote: "Ogni strumento funziona nel tuo browser. Nulla esce dalla pagina.",
  consent:
    "La misurazione opzionale registra quale strumento è stato utilizzato. Non registra il testo digitato né i numeri calcolati. Nulla viene inviato finché non viene configurato un indirizzo di analisi.",
  allowMeasurement: "Consenti misurazione",
  denyMeasurement: "Non consentire",
  notFoundTitle: "Pagina non trovata",
  notFoundBody: "Questo indirizzo non corrisponde a nessuno degli strumenti di questo sito.",
  notFoundLink: "Torna agli strumenti",
};
