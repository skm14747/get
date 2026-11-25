export function PdfFormsGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Upload a PDF that contains interactive form fields (AcroForms). The tool detects text fields, checkboxes, dropdowns, and radio buttons automatically. Fill in values and download the completed form. Optionally flatten to lock the fields as static content. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool reads the PDF&apos;s AcroForm dictionary using pdf-lib to discover all interactive fields, their types, and their current values. You can modify any field, and the changes are written back into the PDF form data before download.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Supported field types</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Text fields:</strong> Single-line and multi-line text inputs for names, addresses, dates, and other typed information.</li>
          <li><strong>Checkboxes:</strong> Toggle fields for yes/no selections, agreement confirmations, and option lists.</li>
          <li><strong>Dropdown menus:</strong> Select one value from a predefined list of options.</li>
          <li><strong>Radio buttons:</strong> Choose one option from a mutually exclusive group of choices.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Government and tax forms:</strong> Fill out IRS, HMRC, or other government PDF forms digitally instead of printing and handwriting.</li>
          <li><strong>Employment applications:</strong> Complete job application forms, W-4s, or I-9s electronically before submitting to HR.</li>
          <li><strong>Insurance claims:</strong> Fill in claim forms with policy numbers, dates, and descriptions without installing Adobe Acrobat.</li>
          <li><strong>School and university forms:</strong> Complete enrollment, financial aid, or registration forms provided as interactive PDFs.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Flattening form fields</h2>
        <p className="mt-2">
          Flattening converts interactive form fields into static page content. After flattening, the filled values become part of the page graphics and can no longer be edited. This is useful when submitting final versions of forms — it ensures the recipient sees exactly what you typed, regardless of their PDF viewer.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">AcroForms vs. XFA forms</h2>
        <p className="mt-2">
          PDF forms come in two flavors. <strong>AcroForms</strong> (the original PDF form standard) store fields directly in the PDF page dictionary and are universally supported. <strong>XFA forms</strong> (XML Forms Architecture) are a newer format created by Adobe that embeds XML-based form definitions. This tool works with standard AcroForms. XFA forms, commonly found in some government and enterprise PDFs created with Adobe LiveCycle Designer, may not be fully compatible.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Flatten the form before submitting final documents to prevent accidental edits by recipients.</li>
          <li>Keep an unflattened copy for your records in case you need to make corrections later.</li>
          <li>If the tool shows no form fields, the PDF may use static layout (not AcroForms) — use the Edit PDF tool to add text instead.</li>
          <li>Some complex forms with JavaScript validation or XFA fields may not be fully supported — standard AcroForms work best.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. No file content or filled data leaves your device. All form field detection and value writing happens in browser memory.
        </p>
      </section>
    </div>
  );
}
