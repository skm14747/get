export type BarcodeFormat = "CODE128" | "EAN13" | "UPCA" | "CODE39";

export type BarcodePatternSuccess = {
  ok: true;
  bars: string; // binary 1s and 0s
  format: BarcodeFormat;
  displayText: string;
};

export type BarcodePatternFailure = {
  ok: false;
  reason: string;
};

export type BarcodePatternResult = BarcodePatternSuccess | BarcodePatternFailure;

// Code 128 Table B encoding patterns (index 0 to 106)
const CODE128_PATTERNS = [
  "11011001100", "11001101100", "11001100110", "10010011000", "10010001100",
  "10001001100", "10011001000", "10011000100", "10001100100", "11001001000",
  "11001000100", "11000100100", "10110011100", "10011011100", "10011001110",
  "10111001100", "10011101100", "10011100110", "11001110010", "11001011100",
  "11001001110", "11011100100", "11001110100", "11101101110", "11101001100",
  "11100101100", "11100100110", "11101100100", "11100110100", "11100110010",
  "11011011000", "11011000110", "11000110110", "10100011000", "10001011000",
  "10001000110", "10110001000", "10001101000", "10001100010", "11010001000",
  "11000101000", "11000100010", "10110111000", "10110001110", "10001101110",
  "10111011000", "10111000110", "10001110110", "11101110110", "11010001110",
  "11000101110", "11011101000", "11011100010", "11011101110", "11101011000",
  "11101000110", "11100010110", "11101101000", "11101100010", "11100011010",
  "11101111010", "11001000010", "11110001010", "10100110000", "10100001100",
  "10010110000", "10010000110", "10000101100", "10000100110", "10110010000",
  "10110000100", "10011010000", "10011000010", "10000110100", "10000110010",
  "11000010010", "11001010000", "11110111010", "11000010100", "10001111010",
  "10100111100", "10010111100", "10010011110", "10111100100", "10011110100",
  "10011110010", "11110100100", "11110010100", "11110010010", "11011011110",
  "11011110110", "11110110110", "10101111000", "10100011110", "10001011110",
  "10111101000", "10111100010", "11110101000", "11110100010", "10111011110",
  "10111101110", "11101011110", "11110101110", "11010000100", "11010010000",
  "11010011100", "1100011101011",
];

const CODE39_MAP: Record<string, string> = {
  "0": "101001101101", "1": "110100101011", "2": "101100101011", "3": "110110010101",
  "4": "101001101011", "5": "110100110101", "6": "101100110101", "7": "101001011011",
  "8": "110100101101", "9": "101100101101", "A": "110101001011", "B": "101101001011",
  "C": "110110100101", "D": "101011001011", "E": "110101100101", "F": "101101100101",
  "G": "101010011011", "H": "110101001101", "I": "101101001101", "J": "101011001101",
  "K": "110101010011", "L": "101101010011", "M": "110110101001", "N": "101011010011",
  "O": "110101101001", "P": "101101101001", "Q": "101010110011", "R": "110101011001",
  "S": "101101011001", "T": "101011011001", "U": "110010101011", "V": "100110101011",
  "W": "110011010101", "X": "100101101011", "Y": "110010110101", "Z": "100110110101",
  "-": "100101011011", ".": "110010101101", " ": "100110101101", "$": "100100100101",
  "/": "100100101001", "+": "100101001001", "%": "101001001001", "*": "100101101101",
};

export function encodeCode128(text: string): BarcodePatternResult {
  if (!text) {
    return { ok: false, reason: "Text is required for Code 128 encoding." };
  }

  // Check valid ASCII (0-127)
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code < 32 || code > 126) {
      return { ok: false, reason: "Code 128 accepts standard printable ASCII characters (ASCII 32-126)." };
    }
  }

  // Start Code B is index 104
  const startCode = 104;
  let checksumTotal = startCode;
  const indices: number[] = [startCode];

  for (let i = 0; i < text.length; i++) {
    const val = text.charCodeAt(i) - 32;
    indices.push(val);
    checksumTotal += val * (i + 1);
  }

  const checkDigit = checksumTotal % 103;
  indices.push(checkDigit);
  const stopCode = 106;
  indices.push(stopCode);

  const bars = indices.map((idx) => CODE128_PATTERNS[idx] ?? "").join("");

  return {
    ok: true,
    bars,
    format: "CODE128",
    displayText: text,
  };
}

export function calculateEan13Checksum(twelveDigits: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = parseInt(twelveDigits[i]!, 10);
    sum += i % 2 === 0 ? d : d * 3;
  }
  const mod = sum % 10;
  return mod === 0 ? 0 : 10 - mod;
}

export function encodeEan13(text: string): BarcodePatternResult {
  const digits = text.replace(/\D/g, "");
  if (digits.length !== 12 && digits.length !== 13) {
    return { ok: false, reason: "EAN-13 requires exactly 12 or 13 numeric digits." };
  }

  const base12 = digits.slice(0, 12);
  const expectedCheck = calculateEan13Checksum(base12);

  if (digits.length === 13 && parseInt(digits[12]!, 10) !== expectedCheck) {
    return {
      ok: false,
      reason: `Invalid EAN-13 check digit. Expected ${expectedCheck}, received ${digits[12]}.`,
    };
  }

  const full13 = `${base12}${expectedCheck}`;

  // EAN-13 L, G, R coding tables
  const L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
  const G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
  const R = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];

  const FIRST_DIGIT_MAP = [
    "LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG",
    "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL",
  ];

  const firstDigit = parseInt(full13[0]!, 10);
  const structure = FIRST_DIGIT_MAP[firstDigit] ?? "LLLLLL";

  let bars = "101"; // Normal Guard

  // Left 6 digits
  for (let i = 1; i <= 6; i++) {
    const d = parseInt(full13[i]!, 10);
    const mode = structure[i - 1];
    bars += mode === "G" ? G[d]! : L[d]!;
  }

  bars += "01010"; // Center Guard

  // Right 6 digits
  for (let i = 7; i <= 12; i++) {
    const d = parseInt(full13[i]!, 10);
    bars += R[d]!;
  }

  bars += "101"; // Normal Guard

  return {
    ok: true,
    bars,
    format: "EAN13",
    displayText: full13,
  };
}

export function encodeCode39(text: string): BarcodePatternResult {
  const upper = text.toUpperCase().trim();
  if (!upper) {
    return { ok: false, reason: "Text is required for Code 39 encoding." };
  }

  for (let i = 0; i < upper.length; i++) {
    if (!CODE39_MAP[upper[i]!]) {
      return { ok: false, reason: `Character '${upper[i]}' is not supported by Code 39. Only A-Z, 0-9, and - . $ / + % space are allowed.` };
    }
  }

  const guarded = `*${upper}*`;
  const bars = guarded
    .split("")
    .map((c) => CODE39_MAP[c]! + "0")
    .join("");

  return {
    ok: true,
    bars,
    format: "CODE39",
    displayText: upper,
  };
}

export function generateBarcode(text: string, format: BarcodeFormat): BarcodePatternResult {
  switch (format) {
    case "CODE128":
      return encodeCode128(text);
    case "EAN13":
      return encodeEan13(text);
    case "UPCA": {
      // UPC-A is EAN-13 with leading 0
      const digits = text.replace(/\D/g, "");
      const res = encodeEan13(digits.length === 11 || digits.length === 12 ? `0${digits}` : digits);
      if (!res.ok) return res;
      return { ...res, format: "UPCA", displayText: res.displayText.slice(1) };
    }
    case "CODE39":
      return encodeCode39(text);
  }
}

export function renderBarcodeSvg(
  bars: string,
  displayText: string = "",
  options: { barWidth?: number; height?: number; showText?: boolean } = {}
): string {
  const barWidth = options.barWidth ?? 2;
  const height = options.height ?? 80;
  const showText = options.showText ?? true;
  const quietZone = 20;

  const totalWidth = bars.length * barWidth + quietZone * 2;
  const totalHeight = showText && displayText ? height + 24 : height;

  let rects = "";
  for (let i = 0; i < bars.length; i++) {
    if (bars[i] === "1") {
      const x = quietZone + i * barWidth;
      rects += `<rect x="${x}" y="0" width="${barWidth}" height="${height}" fill="#000000" />`;
    }
  }

  let textSvg = "";
  if (showText && displayText) {
    textSvg = `<text x="${totalWidth / 2}" y="${height + 16}" font-family="monospace" font-size="14" font-weight="600" text-anchor="middle" fill="#000000">${displayText}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}"><rect width="${totalWidth}" height="${totalHeight}" fill="#ffffff"/>${rects}${textSvg}</svg>`;
}
