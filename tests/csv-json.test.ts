import { describe, expect, it } from "vitest";
import { csvToJson, detectDelimiter, jsonToCsv, parseCsvRows } from "@/lib/csv-json";

describe("CSV ↔ JSON Converter", () => {
  it("detects delimiters accurately", () => {
    expect(detectDelimiter("name,age,city\nJohn,30,NY")).toBe(",");
    expect(detectDelimiter("name\tage\tcity\nJohn\t30\tNY")).toBe("\t");
    expect(detectDelimiter("name;age;city\nJohn;30;NY")).toBe(";");
    expect(detectDelimiter("name|age|city\nJohn|30|NY")).toBe("|");
  });

  it("parses CSV rows with quotes and escaped quotes per RFC 4180", () => {
    const csv = 'id,title,notes\n1,"Hello, World","He said ""Hello"""';
    const rows = parseCsvRows(csv, ",");
    expect(rows).toEqual([
      ["id", "title", "notes"],
      ["1", "Hello, World", 'He said "Hello"'],
    ]);
  });

  it("converts simple CSV to JSON array of objects with typed fields", () => {
    const csv = "id,name,active,score\n1,Alice,true,98.5\n2,Bob,false,85";
    const res = csvToJson(csv);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.rowCount).toBe(2);
    expect(res.columnCount).toBe(4);

    const parsed = JSON.parse(res.result);
    expect(parsed).toEqual([
      { id: 1, name: "Alice", active: true, score: 98.5 },
      { id: 2, name: "Bob", active: false, score: 85 },
    ]);
  });

  it("supports CSV to JSON without headers", () => {
    const csv = "1,Alice\n2,Bob";
    const res = csvToJson(csv, { firstRowHeader: false });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    const parsed = JSON.parse(res.result);
    expect(parsed).toEqual([
      [1, "Alice"],
      [2, "Bob"],
    ]);
  });

  it("converts JSON array of objects to RFC 4180 CSV", () => {
    const json = JSON.stringify([
      { id: 101, name: "Smith, John", role: 'Lead "Architect"' },
      { id: 102, name: "Jane Doe", role: "Developer" },
    ]);
    const res = jsonToCsv(json);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.rowCount).toBe(2);
    expect(res.columnCount).toBe(3);
    expect(res.result).toContain('id,name,role');
    expect(res.result).toContain('101,"Smith, John","Lead ""Architect"""');
    expect(res.result).toContain('102,Jane Doe,Developer');
  });

  it("converts single JSON object to CSV row", () => {
    const json = JSON.stringify({ sku: "A1", price: 19.99 });
    const res = jsonToCsv(json);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.result).toBe("sku,price\nA1,19.99");
  });

  it("supports custom delimiters in JSON to CSV", () => {
    const json = JSON.stringify([{ a: 1, b: 2 }]);
    const res = jsonToCsv(json, { delimiter: ";" });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.result).toBe("a;b\n1;2");
  });

  it("rejects non-object arrays in JSON to CSV", () => {
    const res = jsonToCsv(JSON.stringify([1, 2, 3]));
    expect(res.ok).toBe(false);
  });
});
