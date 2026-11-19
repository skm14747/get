export type CsvDelimiter = "auto" | "," | "\t" | ";" | "|";

export type CsvToJsonOptions = {
  delimiter?: CsvDelimiter;
  firstRowHeader?: boolean;
  parseTypes?: boolean;
};

export type JsonToCsvOptions = {
  delimiter?: "," | "\t" | ";" | "|";
};

export type CsvJsonSuccess = {
  ok: true;
  result: string;
  rowCount: number;
  columnCount: number;
};

export type CsvJsonFailure = {
  ok: false;
  reason: string;
};

export type CsvJsonResult = CsvJsonSuccess | CsvJsonFailure;

export function detectDelimiter(text: string): "," | "\t" | ";" | "|" {
  const firstLine = text.split(/\r\n|\n|\r/)[0] ?? "";
  const counts = {
    ",": (firstLine.match(/,/g) || []).length,
    "\t": (firstLine.match(/\t/g) || []).length,
    ";": (firstLine.match(/;/g) || []).length,
    "|": (firstLine.match(/\|/g) || []).length,
  };

  let maxDelim: "," | "\t" | ";" | "|" = ",";
  let maxCount = counts[","];

  if (counts["\t"] > maxCount) {
    maxDelim = "\t";
    maxCount = counts["\t"];
  }
  if (counts[";"] > maxCount) {
    maxDelim = ";";
    maxCount = counts[";"];
  }
  if (counts["|"] > maxCount) {
    maxDelim = "|";
  }

  return maxDelim;
}

export function parseCsvRows(csvStr: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  let i = 0;
  const len = csvStr.length;

  while (i < len) {
    const char = csvStr[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < len && csvStr[i + 1] === '"') {
          // Escaped quote: ""
          currentField += '"';
          i += 2;
          continue;
        } else {
          // Closing quote
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        currentField += char;
        i++;
        continue;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        i++;
        continue;
      } else if (char === delimiter) {
        currentRow.push(currentField);
        currentField = "";
        i++;
        continue;
      } else if (char === "\r") {
        if (i + 1 < len && csvStr[i + 1] === "\n") {
          i++;
        }
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
        i++;
        continue;
      } else if (char === "\n") {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
        i++;
        continue;
      } else {
        currentField += char;
        i++;
        continue;
      }
    }
  }

  // Push final field and row
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows.filter((r) => r.length > 0 && r.some((c) => c.trim().length > 0));
}

function parseValue(val: string, parseTypes: boolean): unknown {
  const trimmed = val.trim();
  if (!parseTypes) return val;

  if (trimmed === "") return null;
  if (trimmed.toLowerCase() === "true") return true;
  if (trimmed.toLowerCase() === "false") return false;
  if (trimmed.toLowerCase() === "null") return null;

  if (/^-?\d+$/.test(trimmed)) {
    const num = Number(trimmed);
    if (!isNaN(num) && Number.isSafeInteger(num)) return num;
  }
  if (/^-?\d+\.\d+$/.test(trimmed)) {
    const num = Number(trimmed);
    if (!isNaN(num)) return num;
  }

  return val;
}

export function csvToJson(
  csvStr: string,
  options: CsvToJsonOptions = {}
): CsvJsonResult {
  const trimmed = csvStr.trim();
  if (!trimmed) {
    return { ok: false, reason: "Please enter CSV data to convert." };
  }

  const delimiter =
    options.delimiter && options.delimiter !== "auto"
      ? options.delimiter
      : detectDelimiter(trimmed);

  const rows = parseCsvRows(trimmed, delimiter);
  if (rows.length === 0) {
    return { ok: false, reason: "No valid rows found in CSV." };
  }

  const firstRowHeader = options.firstRowHeader ?? true;
  const parseTypes = options.parseTypes ?? true;

  if (firstRowHeader) {
    const headers = rows[0]!.map((h, idx) => h.trim() || `column_${idx + 1}`);
    const dataRows = rows.slice(1);

    const jsonObjects: Record<string, unknown>[] = [];
    for (const row of dataRows) {
      const obj: Record<string, unknown> = {};
      for (let c = 0; c < headers.length; c++) {
        const header = headers[c]!;
        const rawVal = row[c] ?? "";
        obj[header] = parseValue(rawVal, parseTypes);
      }
      jsonObjects.push(obj);
    }

    return {
      ok: true,
      result: JSON.stringify(jsonObjects, null, 2),
      rowCount: jsonObjects.length,
      columnCount: headers.length,
    };
  } else {
    // Array of arrays
    const formatted = rows.map((r) => r.map((c) => parseValue(c, parseTypes)));
    return {
      ok: true,
      result: JSON.stringify(formatted, null, 2),
      rowCount: rows.length,
      columnCount: rows[0]?.length ?? 0,
    };
  }
}

function escapeCsvField(val: unknown, delimiter: string): string {
  if (val === null || val === undefined) return "";
  const str = typeof val === "object" ? JSON.stringify(val) : String(val);

  if (
    str.includes(delimiter) ||
    str.includes('"') ||
    str.includes("\n") ||
    str.includes("\r")
  ) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function jsonToCsv(
  jsonStr: string,
  options: JsonToCsvOptions = {}
): CsvJsonResult {
  const trimmed = jsonStr.trim();
  if (!trimmed) {
    return { ok: false, reason: "Please enter JSON data to convert." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Invalid JSON syntax.";
    return { ok: false, reason: `JSON Syntax Error: ${msg}` };
  }

  const delimiter = options.delimiter ?? ",";

  if (!Array.isArray(parsed)) {
    if (typeof parsed === "object" && parsed !== null) {
      // Single object converted to 1-row CSV
      parsed = [parsed];
    } else {
      return { ok: false, reason: "JSON must be an array of objects to convert to CSV." };
    }
  }

  const items = parsed as unknown[];
  if (items.length === 0) {
    return { ok: true, result: "", rowCount: 0, columnCount: 0 };
  }

  // Extract all distinct keys from objects
  const headerSet = new Set<string>();
  for (const item of items) {
    if (typeof item === "object" && item !== null && !Array.isArray(item)) {
      for (const k of Object.keys(item)) {
        headerSet.add(k);
      }
    }
  }

  const headers = Array.from(headerSet);
  if (headers.length === 0) {
    return { ok: false, reason: "Array must contain objects with key-value properties." };
  }

  const csvLines: string[] = [];
  // Header line
  csvLines.push(headers.map((h) => escapeCsvField(h, delimiter)).join(delimiter));

  for (const item of items) {
    if (typeof item === "object" && item !== null) {
      const obj = item as Record<string, unknown>;
      const line = headers
        .map((h) => escapeCsvField(obj[h], delimiter))
        .join(delimiter);
      csvLines.push(line);
    }
  }

  return {
    ok: true,
    result: csvLines.join("\n"),
    rowCount: items.length,
    columnCount: headers.length,
  };
}
