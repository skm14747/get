export type Base64Result = { ok: true; value: string } | { ok: false; reason: "empty" | "invalid" };

export function encodeUtf8(text: string): Base64Result {
  if (text.length === 0) return { ok: false, reason: "empty" };
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
  }
  return { ok: true, value: btoa(binary) };
}

export function decodeUtf8(value: string): Base64Result {
  const trimmed = value.trim();
  if (trimmed === "") return { ok: false, reason: "empty" };
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(trimmed) || trimmed.length % 4 !== 0) {
    return { ok: false, reason: "invalid" };
  }
  try {
    const binary = atob(trimmed);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return { ok: true, value: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}
