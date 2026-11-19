export type UnixTimestampResult =
  | {
      ok: true;
      seconds: number;
      milliseconds: number;
      utcIso: string;
      utcString: string;
      localString: string;
      relativeString: string;
    }
  | { ok: false; reason: "invalid_timestamp" };

export function formatRelativeTime(date: Date, now: Date = new Date()): string {
  const diffSec = Math.round((date.getTime() - now.getTime()) / 1000);
  const absSec = Math.abs(diffSec);

  if (absSec < 5) return "just now";
  if (absSec < 60) return diffSec > 0 ? `in ${absSec} seconds` : `${absSec} seconds ago`;
  const mins = Math.round(absSec / 60);
  if (mins < 60) return diffSec > 0 ? `in ${mins} minutes` : `${mins} minutes ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return diffSec > 0 ? `in ${hours} hours` : `${hours} hours ago`;
  const days = Math.round(hours / 24);
  return diffSec > 0 ? `in ${days} days` : `${days} days ago`;
}

export function parseUnixTimestamp(
  input: number | string,
  unit?: "seconds" | "milliseconds"
): UnixTimestampResult {
  let numVal: number;

  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!/^-?\d+$/.test(trimmed)) {
      // Try parsing as ISO date string
      const parsedDate = new Date(trimmed);
      if (isNaN(parsedDate.getTime())) {
        return { ok: false, reason: "invalid_timestamp" };
      }
      numVal = parsedDate.getTime();
      unit = "milliseconds";
    } else {
      numVal = Number(trimmed);
    }
  } else {
    numVal = input;
  }

  if (!Number.isFinite(numVal)) {
    return { ok: false, reason: "invalid_timestamp" };
  }

  // Auto-detect unit if not explicitly supplied:
  // Timestamps < 1e11 (100 billion, year 5138) are in seconds
  let millis: number;
  let secs: number;

  if (unit === "milliseconds" || (unit === undefined && Math.abs(numVal) >= 1e11)) {
    millis = Math.round(numVal);
    secs = Math.floor(millis / 1000);
  } else {
    secs = Math.round(numVal);
    millis = secs * 1000;
  }

  const date = new Date(millis);
  if (isNaN(date.getTime())) {
    return { ok: false, reason: "invalid_timestamp" };
  }

  const utcIso = date.toISOString();
  const utcString = date.toUTCString();
  const localString = date.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  });
  const relativeString = formatRelativeTime(date);

  return {
    ok: true,
    seconds: secs,
    milliseconds: millis,
    utcIso,
    utcString,
    localString,
    relativeString,
  };
}

export function dateToUnixTimestamp(
  dateString: string
): { ok: true; seconds: number; milliseconds: number } | { ok: false; reason: "invalid_date" } {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) {
    return { ok: false, reason: "invalid_date" };
  }
  const ms = d.getTime();
  return { ok: true, seconds: Math.floor(ms / 1000), milliseconds: ms };
}
