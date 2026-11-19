export type UrlEncodeMode = "component" | "full-url" | "query-params";

export type QueryParamPair = {
  key: string;
  value: string;
};

export type UrlEncodeResult =
  | { ok: true; result: string; params?: QueryParamPair[] }
  | { ok: false; reason: string };

export function encodeUrlComponent(text: string, spaceAsPlus: boolean = false): string {
  if (!text) return "";
  const encoded = encodeURIComponent(text);
  return spaceAsPlus ? encoded.replace(/%20/g, "+") : encoded;
}

export function decodeUrlComponent(text: string): UrlEncodeResult {
  if (!text) return { ok: true, result: "" };
  try {
    // Treat '+' as space in query contexts
    const normalized = text.replace(/\+/g, "%20");
    const decoded = decodeURIComponent(normalized);
    return { ok: true, result: decoded };
  } catch {
    return { ok: false, reason: "Malformed URI sequence: contains invalid percent-encoded byte sequences." };
  }
}

export function encodeFullUrl(text: string): string {
  if (!text) return "";
  return encodeURI(text);
}

export function decodeFullUrl(text: string): UrlEncodeResult {
  if (!text) return { ok: true, result: "" };
  try {
    const decoded = decodeURI(text);
    return { ok: true, result: decoded };
  } catch {
    return { ok: false, reason: "Malformed URI sequence: contains invalid percent-encoded byte sequences." };
  }
}

export function parseQueryParams(input: string): QueryParamPair[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  let queryString = trimmed;
  const questionIndex = trimmed.indexOf("?");
  if (questionIndex !== -1) {
    queryString = trimmed.slice(questionIndex + 1);
  }
  const hashIndex = queryString.indexOf("#");
  if (hashIndex !== -1) {
    queryString = queryString.slice(0, hashIndex);
  }

  const pairs: QueryParamPair[] = [];
  const entries = queryString.split("&");

  for (const entry of entries) {
    if (!entry) continue;
    const eqIdx = entry.indexOf("=");
    if (eqIdx === -1) {
      const decodedKey = decodeUrlComponent(entry);
      pairs.push({
        key: decodedKey.ok ? decodedKey.result : entry,
        value: "",
      });
    } else {
      const rawKey = entry.slice(0, eqIdx);
      const rawVal = entry.slice(eqIdx + 1);
      const decodedKey = decodeUrlComponent(rawKey);
      const decodedVal = decodeUrlComponent(rawVal);
      pairs.push({
        key: decodedKey.ok ? decodedKey.result : rawKey,
        value: decodedVal.ok ? decodedVal.result : rawVal,
      });
    }
  }

  return pairs;
}

export function formatQueryParams(pairs: QueryParamPair[]): string {
  return pairs
    .filter((p) => p.key.trim().length > 0)
    .map((p) => `${encodeUrlComponent(p.key.trim())}=${encodeUrlComponent(p.value.trim())}`)
    .join("&");
}
