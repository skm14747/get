"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { localeLinksForPage } from "@/lib/locale-links";

export function LocaleMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = localeLinksForPage(pathname);
  const current = links.find((l) => l.active) ?? links[0];

  return (
    <div className="relative">
      <button
        type="button"
        className="btn btn-secondary px-2.5"
        aria-expanded={open}
        aria-controls="locale-menu"
        onClick={() => setOpen((v) => !v)}
      >
        🌐 {current?.name ?? "English"}
      </button>
      {open ? (
        <div id="locale-menu" className="absolute end-0 z-30 mt-1.5 w-64 rounded-lg border border-line bg-surface p-3 text-sm shadow-[var(--shadow-lg)]">
          <p className="text-xs font-medium text-faint">Language</p>
          <ul className="mt-2 grid gap-0.5">
            {links.map((link) => (
              <li key={link.code}>
                <Link
                  href={link.href}
                  className={`flex items-center justify-between gap-3 rounded-md px-2.5 py-1.5 no-underline transition-colors ${link.active ? "bg-action-soft font-medium text-action" : "hover:bg-action-soft hover:text-ink"}`}
                  onClick={() => setOpen(false)}
                >
                  <span className={link.active ? "text-action" : "text-ink"}>{link.name}</span>
                  <span className="text-xs text-muted">{link.code}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
