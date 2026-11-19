"use client";

import { useEffect } from "react";

export function LocaleHead({ lang, dir }: { lang: string; dir: "ltr" | "rtl" }) {
  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.lang;
    const prevDir = html.dir;
    html.lang = lang;
    html.dir = dir;
    return () => {
      html.lang = prevLang;
      html.dir = prevDir || "ltr";
    };
  }, [lang, dir]);

  return null;
}
