import type { MessageKey } from "@/locales/en";

export const locale = "hi" as const;
export const direction = "ltr" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "सामग्री पर जाएँ",
  home: "होम",
  privacy: "गोपनीयता",
  contact: "संपर्क",
  toolsNav: "उपकरण",
  siteNav: "साइट",
  footerNote: "हर उपकरण आपके ब्राउज़र में चलता है। कुछ भी पेज से बाहर नहीं जाता।",
  consent:
    "वैकल्पिक मापन केवल यह दर्ज करता है कि कौन सा उपकरण उपयोग किया गया। यह आपके द्वारा टाइप किया गया पाठ या गणना की गई संख्या दर्ज नहीं करता। विश्लेषण पता कॉन्फ़िगर होने तक कुछ भी नहीं भेजा जाता।",
  allowMeasurement: "मापन की अनुमति दें",
  denyMeasurement: "अनुमति न दें",
  notFoundTitle: "पेज नहीं मिला",
  notFoundBody: "यह पता इस साइट के किसी भी उपकरण से मेल नहीं खाता।",
  notFoundLink: "उपकरणों पर वापस जाएँ",
};
