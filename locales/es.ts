import type { MessageKey } from "@/locales/en";

export const locale = "es" as const;
export const direction = "ltr" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "Ir al contenido",
  home: "Inicio",
  privacy: "Privacidad",
  contact: "Contacto",
  toolsNav: "Herramientas",
  siteNav: "Sitio",
  footerNote: "Cada herramienta funciona en tu navegador. Nada sale de la página.",
  consent:
    "La medición opcional registra qué herramienta se utilizó. No registra el texto que escribes ni los números que calculas. No se envía nada hasta que se configure una dirección de análisis.",
  allowMeasurement: "Permitir medición",
  denyMeasurement: "No permitir",
  notFoundTitle: "Página no encontrada",
  notFoundBody: "Esa dirección no corresponde a ninguna de las herramientas de este sitio.",
  notFoundLink: "Volver a las herramientas",
};
