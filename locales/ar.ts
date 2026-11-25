import type { MessageKey } from "@/locales/en";

export const locale = "ar" as const;
export const direction = "rtl" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "انتقل إلى المحتوى",
  home: "الرئيسية",
  privacy: "الخصوصية",
  contact: "اتصل بنا",
  toolsNav: "الأدوات",
  siteNav: "الموقع",
  footerNote: "كل أداة تعمل في متصفحك. لا شيء يغادر الصفحة.",
  consent:
    "القياس الاختياري يسجّل الأداة المستخدمة فقط. لا يسجّل النص الذي تكتبه أو الأرقام التي تحسبها. لا يُرسَل شيء حتى يتم تهيئة عنوان التحليلات.",
  allowMeasurement: "السماح بالقياس",
  denyMeasurement: "عدم السماح",
  notFoundTitle: "الصفحة غير موجودة",
  notFoundBody: "هذا العنوان لا يتوافق مع أي من الأدوات في هذا الموقع.",
  notFoundLink: "العودة إلى الأدوات",
};
