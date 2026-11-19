import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { addTextAnnotations, readFormFields, fillPdfForm } from "@/lib/pdf-tools";

async function makePdf(pages = 2): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([612, 792]);
  return doc.save();
}

async function makeFormPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const form = doc.getForm();
  const nameField = form.createTextField("name");
  nameField.setText("John");
  nameField.addToPage(page, { x: 50, y: 700, width: 200, height: 30 });
  const emailField = form.createTextField("email");
  emailField.addToPage(page, { x: 50, y: 650, width: 200, height: 30 });
  const acceptField = form.createCheckBox("accept_terms");
  acceptField.addToPage(page, { x: 50, y: 600, width: 20, height: 20 });
  const countryField = form.createDropdown("country");
  countryField.setOptions(["US", "UK", "IN"]);
  countryField.select("US");
  countryField.addToPage(page, { x: 50, y: 550, width: 200, height: 30 });
  return doc.save();
}

describe("addTextAnnotations", () => {
  it("adds text to a page", async () => {
    const pdf = await makePdf(2);
    const result = await addTextAnnotations(pdf, [
      { pageIndex: 0, x: 72, y: 700, text: "Hello World", fontSize: 14, color: { r: 0, g: 0, b: 0 } },
    ]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
    expect(result.bytes.length).toBeGreaterThan(pdf.length);
  });

  it("adds multiple annotations to different pages", async () => {
    const pdf = await makePdf(3);
    const result = await addTextAnnotations(pdf, [
      { pageIndex: 0, x: 72, y: 700, text: "Page 1", fontSize: 14, color: { r: 1, g: 0, b: 0 } },
      { pageIndex: 1, x: 72, y: 700, text: "Page 2", fontSize: 18, color: { r: 0, g: 0, b: 1 } },
      { pageIndex: 2, x: 100, y: 400, text: "Page 3", fontSize: 24, color: { r: 0, g: 0.5, b: 0 } },
    ]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
  });

  it("skips out-of-range page indices", async () => {
    const pdf = await makePdf(1);
    const result = await addTextAnnotations(pdf, [
      { pageIndex: 0, x: 72, y: 700, text: "Valid", fontSize: 14, color: { r: 0, g: 0, b: 0 } },
      { pageIndex: 99, x: 72, y: 700, text: "Invalid", fontSize: 14, color: { r: 0, g: 0, b: 0 } },
    ]);
    expect(result.ok).toBe(true);
  });

  it("refuses empty annotations", async () => {
    const pdf = await makePdf(1);
    const result = await addTextAnnotations(pdf, []);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("empty");
  });

  it("refuses unreadable data", async () => {
    const result = await addTextAnnotations(new Uint8Array([0, 1, 2]), [
      { pageIndex: 0, x: 72, y: 700, text: "Test", fontSize: 14, color: { r: 0, g: 0, b: 0 } },
    ]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("unreadable");
  });
});

describe("readFormFields", () => {
  it("reads form fields from a pdf", async () => {
    const pdf = await makeFormPdf();
    const result = await readFormFields(pdf);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.fields.length).toBe(4);
    const names = result.fields.map((f) => f.name);
    expect(names).toContain("name");
    expect(names).toContain("email");
    expect(names).toContain("accept_terms");
    expect(names).toContain("country");
  });

  it("reads field types correctly", async () => {
    const pdf = await makeFormPdf();
    const result = await readFormFields(pdf);
    if (!result.ok) return;
    const nameField = result.fields.find((f) => f.name === "name");
    expect(nameField?.type).toBe("text");
    expect(nameField?.value).toBe("John");
    const checkField = result.fields.find((f) => f.name === "accept_terms");
    expect(checkField?.type).toBe("checkbox");
    const ddField = result.fields.find((f) => f.name === "country");
    expect(ddField?.type).toBe("dropdown");
    expect(ddField?.options).toEqual(["US", "UK", "IN"]);
  });

  it("returns no_fields for a plain pdf", async () => {
    const pdf = await makePdf(1);
    const result = await readFormFields(pdf);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("no_fields");
  });

  it("refuses unreadable data", async () => {
    const result = await readFormFields(new Uint8Array([0, 1, 2]));
    expect(result.ok).toBe(false);
  });
});

describe("fillPdfForm", () => {
  it("fills text fields", async () => {
    const pdf = await makeFormPdf();
    const result = await fillPdfForm(pdf, [
      { name: "name", value: "Jane Doe" },
      { name: "email", value: "jane@example.com" },
    ], false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(1);
    // Verify the values were applied by re-reading
    const reRead = await readFormFields(result.bytes);
    if (!reRead.ok) return;
    expect(reRead.fields.find((f) => f.name === "name")?.value).toBe("Jane Doe");
    expect(reRead.fields.find((f) => f.name === "email")?.value).toBe("jane@example.com");
  });

  it("checks checkboxes", async () => {
    const pdf = await makeFormPdf();
    const result = await fillPdfForm(pdf, [
      { name: "accept_terms", value: "true" },
    ], false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const reRead = await readFormFields(result.bytes);
    if (!reRead.ok) return;
    expect(reRead.fields.find((f) => f.name === "accept_terms")?.value).toBe("true");
  });

  it("selects dropdown value", async () => {
    const pdf = await makeFormPdf();
    const result = await fillPdfForm(pdf, [
      { name: "country", value: "UK" },
    ], false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const reRead = await readFormFields(result.bytes);
    if (!reRead.ok) return;
    expect(reRead.fields.find((f) => f.name === "country")?.value).toBe("UK");
  });

  it("flattens the form", async () => {
    const pdf = await makeFormPdf();
    const result = await fillPdfForm(pdf, [{ name: "name", value: "Flat" }], true);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    // After flattening, re-reading should find no fields
    const reRead = await readFormFields(result.bytes);
    expect(reRead.ok).toBe(false);
    if (reRead.ok) return;
    expect(reRead.reason).toBe("no_fields");
  });

  it("skips unknown field names gracefully", async () => {
    const pdf = await makeFormPdf();
    const result = await fillPdfForm(pdf, [
      { name: "nonexistent", value: "test" },
    ], false);
    expect(result.ok).toBe(true);
  });

  it("refuses unreadable data", async () => {
    const result = await fillPdfForm(new Uint8Array([0, 1, 2]), [], false);
    expect(result.ok).toBe(false);
  });
});
