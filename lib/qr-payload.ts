export type QrPayload = { ok: true; value: string } | { ok: false; reason: "empty" | "url" | "ssid" };

function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export function textPayload(value: string): QrPayload {
  if (value.trim() === "") return { ok: false, reason: "empty" };
  return { ok: true, value };
}

export function urlPayload(value: string): QrPayload {
  const trimmed = value.trim();
  if (trimmed === "") return { ok: false, reason: "empty" };
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return { ok: false, reason: "url" };
    return { ok: true, value: url.toString() };
  } catch {
    return { ok: false, reason: "url" };
  }
}

export function wifiPayload(ssid: string, password: string, security: "WPA" | "WEP" | "nopass"): QrPayload {
  if (ssid.trim() === "") return { ok: false, reason: "ssid" };
  const type = security === "nopass" ? "nopass" : security;
  const passwordPart = type === "nopass" ? "" : `P:${escapeWifi(password)};`;
  return { ok: true, value: `WIFI:T:${type};S:${escapeWifi(ssid)};${passwordPart};` };
}
