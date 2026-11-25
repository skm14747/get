import type { MessageKey } from "@/locales/en";

export const locale = "fr" as const;
export const direction = "ltr" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "Aller au contenu",
  home: "Accueil",
  privacy: "Confidentialité",
  contact: "Contact",
  toolsNav: "Outils",
  siteNav: "Site",
  footerNote: "Chaque outil fonctionne dans votre navigateur. Rien ne quitte la page.",
  consent:
    "La mesure optionnelle enregistre quel outil a été utilisé. Elle n'enregistre ni le texte saisi ni les nombres calculés. Rien n'est envoyé tant qu'une adresse d'analyse n'est pas configurée.",
  allowMeasurement: "Autoriser la mesure",
  denyMeasurement: "Ne pas autoriser",
  notFoundTitle: "Page introuvable",
  notFoundBody: "Cette adresse ne correspond à aucun des outils de ce site.",
  notFoundLink: "Retour aux outils",
};
