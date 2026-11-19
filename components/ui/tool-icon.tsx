export function ToolIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
      {name === "text" ? <path d="M5 6h14M12 6v12M8 18h8" /> : null}
      {name === "calculator" ? <path d="M7 3h10v18H7zM9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" /> : null}
      {name === "developer" ? <path d="M8 8 4 12l4 4M16 8l4 4-4 4M13 6l-2 12" /> : null}
      {name === "image" ? <path d="M4 6h16v12H4zM8 14l2.5-3 2 2.5L16 10l4 6" /> : null}
      {name === "pdf" ? <path d="M7 3h7l5 5v13H7zM14 3v5h5M9 14h6M9 17h4" /> : null}
      {name === "converter" ? <path d="M7 7h11M15 4l3 3-3 3M17 17H6M9 14l-3 3 3 3" /> : null}
      {name === "date" ? <path d="M5 6h14v13H5zM8 4v4M16 4v4M5 10h14" /> : null}
      {name === "finance" ? <path d="M5 18V8M10 18V5M15 18v-7M20 18V9" /> : null}
    </svg>
  );
}

const iconForGroup: Record<string, string> = {
  "text-tools": "text",
  calculators: "calculator",
  "developer-tools": "developer",
  "image-tools": "image",
  "pdf-tools": "pdf",
  converters: "converter",
  "date-and-time": "date",
  finance: "finance",
};

export function iconNameForGroup(id: string): string {
  return iconForGroup[id] ?? "text";
}

const categoryColors: Record<string, { bg: string; fg: string }> = {
  "text-tools": { bg: "bg-cat-text-soft", fg: "text-cat-text" },
  calculators: { bg: "bg-cat-calc-soft", fg: "text-cat-calc" },
  "developer-tools": { bg: "bg-cat-dev-soft", fg: "text-cat-dev" },
  "image-tools": { bg: "bg-cat-image-soft", fg: "text-cat-image" },
  "pdf-tools": { bg: "bg-cat-pdf-soft", fg: "text-cat-pdf" },
  converters: { bg: "bg-cat-convert-soft", fg: "text-cat-convert" },
  "date-and-time": { bg: "bg-cat-date-soft", fg: "text-cat-date" },
  finance: { bg: "bg-cat-finance-soft", fg: "text-cat-finance" },
};

export function categoryColorClasses(groupId: string): { bg: string; fg: string } {
  return categoryColors[groupId] ?? { bg: "bg-action-soft", fg: "text-action" };
}
