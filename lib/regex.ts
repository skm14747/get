export type RegexFlag = "g" | "i" | "m" | "s" | "u";

export type RegexMatchItem = {
  match: string;
  index: number;
  groups: string[];
  namedGroups: Record<string, string>;
};

export type RegexSegment = {
  text: string;
  isMatch: boolean;
  matchIndex?: number;
};

export type RegexSuccess = {
  ok: true;
  matches: RegexMatchItem[];
  matchCount: number;
  segments: RegexSegment[];
  executionTimeMs: number;
};

export type RegexFailure = {
  ok: false;
  reason: string;
};

export type RegexResult = RegexSuccess | RegexFailure;

export type RegexPreset = {
  name: string;
  pattern: string;
  flags: string;
  sample: string;
};

export const REGEX_PRESETS: RegexPreset[] = [
  {
    name: "Email Address",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    sample: "Contact us at support@example.com or admin@corp.org for inquiries.",
  },
  {
    name: "Web URL (HTTP/HTTPS)",
    pattern: "https?:\\/\\/[\\w\\-\\.]+(?::\\d+)?(?:\\/[\\w\\-._~:/?#\\[\\]@!$&'()*+,;=]*)?",
    flags: "g",
    sample: "Visit https://goeasytools.com/regex-tester or http://localhost:3000/docs for details.",
  },
  {
    name: "IPv4 Address",
    pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    flags: "g",
    sample: "Router IPs include 192.168.1.1, 10.0.0.254, and DNS 8.8.8.8.",
  },
  {
    name: "Hex Color Code",
    pattern: "#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\\b",
    flags: "g",
    sample: "Primary colors: #3b82f6, #fff, and #10B981 on dark slate background #0F172A.",
  },
  {
    name: "ISO 8601 Date",
    pattern: "\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])\\b",
    flags: "g",
    sample: "Events scheduled on 2026-10-24, 2026-11-19, and completed by 2026-12-31.",
  },
];

export function evaluateRegex(
  pattern: string,
  flags: string,
  testString: string
): RegexResult {
  if (!pattern) {
    return {
      ok: true,
      matches: [],
      matchCount: 0,
      segments: [{ text: testString, isMatch: false }],
      executionTimeMs: 0,
    };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Invalid regular expression.";
    return { ok: false, reason: msg };
  }

  const startTime = performance.now();
  const matches: RegexMatchItem[] = [];
  const segments: RegexSegment[] = [];

  const isGlobal = flags.includes("g");

  if (!isGlobal) {
    const match = regex.exec(testString);
    if (match) {
      const matchText = match[0];
      const matchIndex = match.index;
      const groups = match.slice(1);
      const namedGroups = match.groups ? { ...match.groups } : {};

      matches.push({
        match: matchText,
        index: matchIndex,
        groups,
        namedGroups,
      });

      if (matchIndex > 0) {
        segments.push({ text: testString.slice(0, matchIndex), isMatch: false });
      }
      segments.push({ text: matchText, isMatch: true, matchIndex: 0 });
      if (matchIndex + matchText.length < testString.length) {
        segments.push({
          text: testString.slice(matchIndex + matchText.length),
          isMatch: false,
        });
      }
    } else {
      segments.push({ text: testString, isMatch: false });
    }
  } else {
    // Global matching with loop protection
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let iterations = 0;
    const MAX_MATCHES = 1000;

    while ((match = regex.exec(testString)) !== null) {
      iterations++;
      if (iterations > MAX_MATCHES) break;

      const matchText = match[0];
      const matchIndex = match.index;
      const groups = match.slice(1);
      const namedGroups = match.groups ? { ...match.groups } : {};

      matches.push({
        match: matchText,
        index: matchIndex,
        groups,
        namedGroups,
      });

      if (matchIndex > lastIndex) {
        segments.push({ text: testString.slice(lastIndex, matchIndex), isMatch: false });
      }
      segments.push({
        text: matchText,
        isMatch: true,
        matchIndex: matches.length - 1,
      });

      lastIndex = matchIndex + matchText.length;

      // Handle zero-length matches (e.g. /a*/ or /^/) to prevent infinite loops
      if (matchText.length === 0) {
        regex.lastIndex++;
        if (regex.lastIndex > testString.length) break;
      }
    }

    if (lastIndex < testString.length) {
      segments.push({ text: testString.slice(lastIndex), isMatch: false });
    }
  }

  const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

  return {
    ok: true,
    matches,
    matchCount: matches.length,
    segments,
    executionTimeMs,
  };
}
