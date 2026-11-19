export type JwtHeader = Record<string, unknown>;
export type JwtPayload = Record<string, unknown>;

export type JwtClaimInfo = {
  key: string;
  label: string;
  value: string;
  status?: "valid" | "expired" | "info";
};

export type JwtDecodeSuccess = {
  ok: true;
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
  rawHeader: string;
  rawPayload: string;
  claims: JwtClaimInfo[];
  isExpired: boolean | null;
  algorithm: string;
};

export type JwtDecodeFailure = {
  ok: false;
  reason: string;
};

export type JwtDecodeResult = JwtDecodeSuccess | JwtDecodeFailure;

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad === 2) {
    base64 += "==";
  } else if (pad === 3) {
    base64 += "=";
  } else if (pad === 1) {
    throw new Error("Invalid Base64URL string length");
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function formatTimestamp(timestampSec: number): string {
  try {
    const date = new Date(timestampSec * 1000);
    if (isNaN(date.getTime())) return `${timestampSec}`;
    return date.toISOString().replace(".000Z", " UTC").replace("T", " ");
  } catch {
    return `${timestampSec}`;
  }
}

export function formatTimeRelative(timestampSec: number, nowSec: number = Math.floor(Date.now() / 1000)): string {
  const diffSec = timestampSec - nowSec;
  if (diffSec === 0) return "just now";

  const isFuture = diffSec > 0;
  const absSec = Math.abs(diffSec);

  const minutes = Math.floor(absSec / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let duration = "";
  if (days > 0) {
    duration = `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    duration = `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    duration = `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    duration = `${absSec} second${absSec > 1 ? "s" : ""}`;
  }

  return isFuture ? `in ${duration}` : `${duration} ago`;
}

export function decodeJwt(rawToken: string, nowSec: number = Math.floor(Date.now() / 1000)): JwtDecodeResult {
  const trimmed = rawToken.trim();
  if (!trimmed) {
    return { ok: false, reason: "Please enter a JWT token." };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return {
      ok: false,
      reason: `A valid JWT must have 3 segments separated by dots (Header.Payload.Signature). Found ${parts.length} segment${parts.length === 1 ? "" : "s"}.`,
    };
  }

  const [headerB64, payloadB64, signature] = parts;

  let headerStr = "";
  let payloadStr = "";

  try {
    headerStr = base64UrlDecode(headerB64!);
  } catch {
    return { ok: false, reason: "Invalid Base64URL encoding in the JWT Header segment." };
  }

  try {
    payloadStr = base64UrlDecode(payloadB64!);
  } catch {
    return { ok: false, reason: "Invalid Base64URL encoding in the JWT Payload segment." };
  }

  let headerObj: JwtHeader;
  let payloadObj: JwtPayload;

  try {
    headerObj = JSON.parse(headerStr);
  } catch {
    return { ok: false, reason: "JWT Header is not valid JSON." };
  }

  try {
    payloadObj = JSON.parse(payloadStr);
  } catch {
    return { ok: false, reason: "JWT Payload is not valid JSON." };
  }

  const claims: JwtClaimInfo[] = [];
  let isExpired: boolean | null = null;

  if (typeof payloadObj.exp === "number") {
    const expired = payloadObj.exp < nowSec;
    isExpired = expired;
    claims.push({
      key: "exp",
      label: "Expiration Time",
      value: `${formatTimestamp(payloadObj.exp)} (${formatTimeRelative(payloadObj.exp, nowSec)})`,
      status: expired ? "expired" : "valid",
    });
  }

  if (typeof payloadObj.iat === "number") {
    claims.push({
      key: "iat",
      label: "Issued At",
      value: `${formatTimestamp(payloadObj.iat)} (${formatTimeRelative(payloadObj.iat, nowSec)})`,
      status: "info",
    });
  }

  if (typeof payloadObj.nbf === "number") {
    const notYetValid = payloadObj.nbf > nowSec;
    claims.push({
      key: "nbf",
      label: "Not Before",
      value: `${formatTimestamp(payloadObj.nbf)} (${formatTimeRelative(payloadObj.nbf, nowSec)})`,
      status: notYetValid ? "expired" : "valid",
    });
  }

  if (payloadObj.iss !== undefined) {
    claims.push({ key: "iss", label: "Issuer", value: String(payloadObj.iss), status: "info" });
  }

  if (payloadObj.sub !== undefined) {
    claims.push({ key: "sub", label: "Subject", value: String(payloadObj.sub), status: "info" });
  }

  if (payloadObj.aud !== undefined) {
    const audVal = Array.isArray(payloadObj.aud) ? payloadObj.aud.join(", ") : String(payloadObj.aud);
    claims.push({ key: "aud", label: "Audience", value: audVal, status: "info" });
  }

  const algorithm = typeof headerObj.alg === "string" ? headerObj.alg : "Unknown";

  return {
    ok: true,
    header: headerObj,
    payload: payloadObj,
    signature: signature ?? "",
    rawHeader: JSON.stringify(headerObj, null, 2),
    rawPayload: JSON.stringify(payloadObj, null, 2),
    claims,
    isExpired,
    algorithm,
  };
}
