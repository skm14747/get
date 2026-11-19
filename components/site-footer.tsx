import Link from "next/link";
import { browseGroups } from "@/lib/browse";
import { messages } from "@/locales/en";

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-line">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-[1rem] font-medium text-ink">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-action text-[0.625rem] font-medium text-white" aria-hidden="true">G</span>
            GoEasyTools
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{messages.footerNote}</p>
        </div>
        <nav aria-label={messages.toolsNav}>
          <p className="text-xs font-medium text-faint">Categories</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {browseGroups.map((group) => (
              <li key={group.id}>
                <Link href={group.path} className="text-muted no-underline transition-colors hover:text-ink">{group.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-4 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} GoEasyTools</p>
          <nav aria-label={messages.siteNav}>
            <ul className="flex gap-4">
              <li><Link href="/blog" className="no-underline transition-colors hover:text-ink">Blog</Link></li>
              <li><Link href="/privacy" className="no-underline transition-colors hover:text-ink">{messages.privacy}</Link></li>
              <li><Link href="/contact" className="no-underline transition-colors hover:text-ink">{messages.contact}</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
