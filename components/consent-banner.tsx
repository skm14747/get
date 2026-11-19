"use client";

import { useEffect, useState } from "react";
import { messages } from "@/locales/en";

const STORAGE_KEY = "goeasytools.analytics-consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setVisible(stored !== "granted" && stored !== "denied");
  }, []);

  if (!visible) return null;

  function choose(value: "granted" | "denied") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface px-4 py-3 shadow-[var(--shadow)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-muted">{messages.consent}</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>{messages.allowMeasurement}</button>
          <button type="button" className="btn btn-secondary" onClick={() => choose("denied")}>{messages.denyMeasurement}</button>
        </div>
      </div>
    </div>
  );
}
