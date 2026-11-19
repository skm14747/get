"use client";

import Link from "next/link";
import { useState } from "react";
import { LocaleMenu } from "@/components/locale-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { ToolSearch } from "@/components/tool-search";
import { browseGroups } from "@/lib/browse";
import { messages } from "@/locales/en";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-[1rem] font-medium tracking-tight text-ink no-underline">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-action text-xs font-medium text-white" aria-hidden="true">G</span>
          <span className="hidden min-[360px]:inline">GoEasyTools</span>
        </Link>

        <div className="hidden min-w-0 flex-1 lg:block">
          <ToolSearch id="header-search" />
        </div>

        <nav aria-label={messages.toolsNav} className="hidden items-center gap-1 xl:flex">
          {browseGroups.slice(0, 5).map((group) => (
            <Link key={group.id} href={group.path} className="rounded-md px-2.5 py-1.5 text-[0.8125rem] font-medium text-muted no-underline transition-colors hover:bg-canvas hover:text-ink">
              {group.name}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <Link href="/#search" className="btn btn-secondary px-2.5 lg:hidden">Search</Link>
          <ThemeToggle />
          <div className="hidden sm:block"><LocaleMenu /></div>
          <button
            type="button"
            className="btn btn-secondary px-2.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label={messages.toolsNav} className="border-t border-line bg-surface px-4 pb-4 pt-2 lg:hidden">
          <ul className="grid gap-1">
            {browseGroups.map((group) => (
              <li key={group.id}>
                <Link href={group.path} className="block rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-ink no-underline transition-colors hover:bg-action-soft" onClick={() => setOpen(false)}>
                  {group.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 sm:hidden"><LocaleMenu /></div>
        </nav>
      ) : null}
    </header>
  );
}
