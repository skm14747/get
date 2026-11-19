"use client";

import Link from "next/link";

/**
 * Renders a blog body string with basic markdown-to-HTML conversion.
 * Handles: ## headings, **bold**, [links](href), unordered lists, ordered lists,
 * | tables |, and paragraphs.
 *
 * Intentionally simple — no third-party markdown parser needed.
 */
export function BlogBody({ body }: { body: string }) {
  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!.trimEnd();

    // Empty line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="mb-3 mt-8 text-xl font-bold tracking-tight first:mt-0">
          {inline(line.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }

    // Table block
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i]!.trim().startsWith("|")) {
        tableLines.push(lines[i]!.trim());
        i++;
      }
      elements.push(<BlogTable key={key++} lines={tableLines} />);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-3 list-decimal space-y-1.5 pl-6 text-[0.9375rem] leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{inline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i]!.trim().startsWith("- ")) {
        items.push(lines[i]!.trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 list-disc space-y-1.5 pl-6 text-[0.9375rem] leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{inline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="my-3 text-[0.9375rem] leading-relaxed">
        {inline(line.trim())}
      </p>,
    );
    i++;
  }

  return <div className="mt-6">{elements}</div>;
}

/* ── Inline formatting ── */

function inline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Match: **bold**, [text](href), or plain text
  const re = /(\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let key = 0;
  let match;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      // Bold
      parts.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      // Link
      const href = match[4];
      if (href.startsWith("/")) {
        parts.push(
          <Link key={key++} href={href} className="text-accent hover:underline">
            {match[3]}
          </Link>,
        );
      } else {
        parts.push(
          <a key={key++} href={href} className="text-accent hover:underline" rel="noopener noreferrer">
            {match[3]}
          </a>,
        );
      }
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}

/* ── Table rendering ── */

function BlogTable({ lines }: { lines: string[] }) {
  if (lines.length < 2) return null;

  const parseRow = (line: string) =>
    line
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

  const headers = parseRow(lines[0]!);
  // Skip separator row (index 1)
  const rows = lines.slice(2).map(parseRow);

  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold">
                {inline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/50">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2">
                  {inline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
