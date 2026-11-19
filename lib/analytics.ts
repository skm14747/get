export const ANALYTICS_EVENTS = [
  "tool_view",
  "tool_input_started",
  "tool_completed",
  "tool_error",
  "copy_result",
  "clear_input",
  "related_tool_clicked",
  "download_result",
  "file_processing_started",
  "file_processing_completed",
  "locale_changed",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsValue = string | number | boolean;

const ALLOWED_KEYS = new Set([
  "tool_id",
  "operation",
  "error_code",
  "destination_tool_id",
  "locale",
]);

const BLOCKED_KEY = /text|input|value|query|document|price|amount|content|paste|result_text|password|filename|secret|ssid/i;

export function sanitizeProperties(
  properties: Record<string, unknown> | undefined,
): Record<string, AnalyticsValue> {
  if (!properties) return {};
  const clean: Record<string, AnalyticsValue> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (!ALLOWED_KEYS.has(key) || BLOCKED_KEY.test(key)) continue;
    if (typeof value === "number") {
      if (!Number.isFinite(value)) continue;
      clean[key] = value;
      continue;
    }
    if (typeof value === "boolean") {
      clean[key] = value;
      continue;
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.length === 0 || trimmed.length > 64) continue;
      if (!/^[a-z0-9_-]+$/i.test(trimmed)) continue;
      clean[key] = trimmed;
    }
  }
  return clean;
}

export type AnalyticsPayload = {
  name: AnalyticsEventName;
  properties: Record<string, AnalyticsValue>;
};

export function buildPayload(
  name: AnalyticsEventName,
  properties?: Record<string, unknown>,
): AnalyticsPayload {
  return { name, properties: sanitizeProperties(properties) };
}

export function analyticsEndpoint(): string | null {
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT?.trim();
  if (!endpoint) return null;
  try {
    const url = new URL(endpoint);
    if (url.username || url.password || url.search || url.hash) return null;
    if (url.protocol !== "https:" && url.hostname !== "localhost") return null;
    return url.toString();
  } catch {
    return null;
  }
}

const seenViews = new Set<string>();

export function track(name: AnalyticsEventName, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const payload = buildPayload(name, properties);
  if (name === "tool_view") {
    const toolId = String(payload.properties.tool_id ?? "");
    if (seenViews.has(toolId)) return;
    seenViews.add(toolId);
  }
  const consent = window.localStorage.getItem("goeasytools.analytics-consent");
  if (consent !== "granted") return;
  const endpoint = analyticsEndpoint();
  if (!endpoint) return;
  const body = JSON.stringify(payload);
  if (typeof navigator.sendBeacon === "function") {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
    credentials: "omit",
  }).catch(() => undefined);
}

export function resetAnalyticsForTests(): void {
  seenViews.clear();
}
