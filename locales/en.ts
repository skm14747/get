export const locale = "en" as const;
export const direction = "ltr" as const;

export const messages = {
  skipToContent: "Skip to content",
  home: "Home",
  privacy: "Privacy",
  contact: "Contact",
  toolsNav: "Tools",
  siteNav: "Site",
  footerNote: "Every tool runs in your browser. Nothing leaves the page.",
  consent:
    "Optional measurement records which tool was used. It does not record the text you type or the numbers you calculate. Nothing is sent until an analytics address is configured.",
  allowMeasurement: "Allow measurement",
  denyMeasurement: "Don’t allow",
  notFoundTitle: "Page not found",
  notFoundBody: "That address is not one of the tools on this site.",
  notFoundLink: "Back to the tools",
} as const;

export type MessageKey = keyof typeof messages;
