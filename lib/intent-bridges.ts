import { getTool, type ToolDefinition, type ToolId } from "@/lib/tools";

export type IntentBridge = {
  sourceToolId: string;
  targetToolId: string;
  headline: string;
  description: string;
  callToAction: string;
};

export const intentBridges: readonly IntentBridge[] = [
  {
    sourceToolId: "word-counter",
    targetToolId: "case-converter",
    headline: "Formatting headlines or code identifiers?",
    description: "Convert your text into Title Case, UPPERCASE, camelCase, or kebab-case with one click.",
    callToAction: "Open Case Converter",
  },
  {
    sourceToolId: "character-counter",
    targetToolId: "word-counter",
    headline: "Need a full editorial breakdown?",
    description: "Analyze total words, sentences, paragraphs, and estimated reading time in real time.",
    callToAction: "Open Word Counter",
  },
  {
    sourceToolId: "case-converter",
    targetToolId: "word-counter",
    headline: "Checking word counts or reading speed?",
    description: "Verify word limits, character counts, and sentence structure without leaving your browser.",
    callToAction: "Open Word Counter",
  },
  {
    sourceToolId: "percentage-calculator",
    targetToolId: "discount-calculator",
    headline: "Calculating retail sales or shopping markdowns?",
    description: "Calculate sale prices and savings from single or sequential stacked discounts.",
    callToAction: "Open Discount Calculator",
  },
  {
    sourceToolId: "discount-calculator",
    targetToolId: "percentage-calculator",
    headline: "Need general percentage increases or differences?",
    description: "Calculate multi-scenario percentage changes, differences, and relative shares.",
    callToAction: "Open Percentage Calculator",
  },
  {
    sourceToolId: "gst-calculator",
    targetToolId: "emi-calculator",
    headline: "Planning commercial financing or business loans?",
    description: "Estimate monthly loan repayments with complete principal and interest breakdowns.",
    callToAction: "Open EMI Calculator",
  },
  {
    sourceToolId: "emi-calculator",
    targetToolId: "gst-calculator",
    headline: "Need to account for taxes or invoice totals?",
    description: "Calculate inclusive or exclusive GST amounts with CGST, SGST, and IGST breakdowns.",
    callToAction: "Open GST Calculator",
  },
  {
    sourceToolId: "unit-converter",
    targetToolId: "percentage-calculator",
    headline: "Need to calculate percentage variance or tolerance?",
    description: "Compute relative percentage differences and changes alongside your unit measurements.",
    callToAction: "Open Percentage Calculator",
  },
  {
    sourceToolId: "date-calculator",
    targetToolId: "age-calculator",
    headline: "Looking for chronological age or birthday countdown?",
    description: "Calculate exact age in years, months, and days with leap-year anniversary rules.",
    callToAction: "Open Age Calculator",
  },
  {
    sourceToolId: "age-calculator",
    targetToolId: "date-calculator",
    headline: "Need business days or contract milestone counts?",
    description: "Calculate Monday-to-Friday business days or add days between any calendar dates.",
    callToAction: "Open Date Calculator",
  },
  {
    sourceToolId: "json-formatter",
    targetToolId: "base64",
    headline: "Handling API authorization tokens or data URIs?",
    description: "Encode strings to Base64 or decode binary-safe payloads with complete UTF-8 support.",
    callToAction: "Open Base64 Encoder",
  },
  {
    sourceToolId: "base64",
    targetToolId: "json-formatter",
    headline: "Decoded a raw JSON response or payload?",
    description: "Validate syntax, debug line errors, and pretty-print nested JSON objects in-browser.",
    callToAction: "Open JSON Formatter",
  },
  {
    sourceToolId: "password-generator",
    targetToolId: "qr-code-generator",
    headline: "Sharing Wi-Fi passwords with guests or team members?",
    description: "Generate a scan-to-connect Wi-Fi QR code with your secure network credentials.",
    callToAction: "Open QR Code Generator",
  },
  {
    sourceToolId: "qr-code-generator",
    targetToolId: "password-generator",
    headline: "Configuring a new wireless network or router?",
    description: "Generate a cryptographically strong, high-entropy random Wi-Fi passphrase.",
    callToAction: "Open Password Generator",
  },
  {
    sourceToolId: "image-compressor",
    targetToolId: "image-resizer",
    headline: "Need specific pixel width or height dimensions?",
    description: "Resize image dimensions while preserving aspect ratio and visual clarity locally.",
    callToAction: "Open Image Resizer",
  },
  {
    sourceToolId: "image-resizer",
    targetToolId: "image-compressor",
    headline: "Need to reduce image file size for web uploads?",
    description: "Compress JPG, PNG, and WebP images locally to minimize bandwidth and storage.",
    callToAction: "Open Image Compressor",
  },
  {
    sourceToolId: "merge-pdf",
    targetToolId: "split-pdf",
    headline: "Need to extract specific pages before combining?",
    description: "Extract individual pages or custom ranges into a standalone PDF document.",
    callToAction: "Open Split PDF",
  },
  {
    sourceToolId: "split-pdf",
    targetToolId: "merge-pdf",
    headline: "Have multiple PDF extracts to combine?",
    description: "Combine multiple PDF files into one clean document in custom reading order.",
    callToAction: "Open Merge PDF",
  },
  {
    sourceToolId: "jpg-to-pdf",
    targetToolId: "merge-pdf",
    headline: "Need to combine your image PDF with other documents?",
    description: "Merge multiple PDF files into a single unified document in your browser.",
    callToAction: "Open Merge PDF",
  },
  {
    sourceToolId: "rotate-pdf",
    targetToolId: "organize-pdf",
    headline: "Need to rearrange or remove pages too?",
    description: "Reorder pages, remove unwanted ones, or duplicate pages in any order you need.",
    callToAction: "Open Organize PDF",
  },
  {
    sourceToolId: "organize-pdf",
    targetToolId: "rotate-pdf",
    headline: "Pages facing the wrong direction?",
    description: "Rotate all pages by 90°, 180°, or 270° clockwise without uploading anywhere.",
    callToAction: "Open Rotate PDF",
  },
  {
    sourceToolId: "crop-pdf",
    targetToolId: "rotate-pdf",
    headline: "Need to fix page orientation before cropping?",
    description: "Rotate scanned pages to the correct orientation before trimming margins.",
    callToAction: "Open Rotate PDF",
  },
  {
    sourceToolId: "add-page-numbers",
    targetToolId: "watermark-pdf",
    headline: "Want to add a text watermark too?",
    description: "Stamp a semi-transparent text overlay on every page before sharing your document.",
    callToAction: "Open Watermark PDF",
  },
  {
    sourceToolId: "watermark-pdf",
    targetToolId: "add-page-numbers",
    headline: "Need sequential page numbering?",
    description: "Add page numbers in six positions with adjustable font size and start number.",
    callToAction: "Open Add Page Numbers",
  },
  {
    sourceToolId: "unlock-pdf",
    targetToolId: "merge-pdf",
    headline: "Unlocked your PDF? Ready to merge it?",
    description: "Combine multiple PDF files into one clean document in your browser.",
    callToAction: "Open Merge PDF",
  },
  {
    sourceToolId: "pdf-to-jpg",
    targetToolId: "jpg-to-pdf",
    headline: "Need to convert images back to PDF?",
    description: "Combine JPG and PNG images into a single PDF document in your browser.",
    callToAction: "Open JPG to PDF",
  },
  {
    sourceToolId: "compress-pdf",
    targetToolId: "merge-pdf",
    headline: "Have multiple compressed PDFs to combine?",
    description: "Merge multiple PDF files into one document in custom reading order.",
    callToAction: "Open Merge PDF",
  },
  {
    sourceToolId: "france-tva-calculator",
    targetToolId: "vat-calculator-uk",
    headline: "Working with UK VAT instead?",
    description: "Calculate UK VAT additions and reverse deductions with official HMRC standard, reduced, and zero rates.",
    callToAction: "Open UK VAT Calculator",
  },
  {
    sourceToolId: "belgium-tva-calculator",
    targetToolId: "france-tva-calculator",
    headline: "Need French TVA rates instead?",
    description: "Calculate French TVA at normal, intermediate, reduced, and super-reduced rates.",
    callToAction: "Open France TVA Calculator",
  },
  {
    sourceToolId: "edit-pdf",
    targetToolId: "watermark-pdf",
    headline: "Want to stamp a watermark instead?",
    description: "Add a semi-transparent text overlay on every page in one step.",
    callToAction: "Open Watermark PDF",
  },
  {
    sourceToolId: "pdf-forms",
    targetToolId: "edit-pdf",
    headline: "Need to add text outside form fields?",
    description: "Place custom text annotations at exact coordinates on any PDF page.",
    callToAction: "Open Edit PDF",
  },
  {
    sourceToolId: "sign-pdf",
    targetToolId: "pdf-forms",
    headline: "Need to fill form fields before signing?",
    description: "Auto-detect and fill text fields, checkboxes, and dropdowns in interactive PDF forms.",
    callToAction: "Open PDF Forms",
  },
  {
    sourceToolId: "delete-pdf-pages",
    targetToolId: "merge-pdf",
    headline: "Need to combine what remains with another PDF?",
    description: "Merge multiple PDF files into one clean document in custom reading order.",
    callToAction: "Open Merge PDF",
  },
  {
    sourceToolId: "extract-pdf-pages",
    targetToolId: "merge-pdf",
    headline: "Have multiple page extracts to combine?",
    description: "Merge multiple PDF files into one unified document in your browser.",
    callToAction: "Open Merge PDF",
  },
  {
    sourceToolId: "pdf-pipeline",
    targetToolId: "sign-pdf",
    headline: "Ready to sign the finished document?",
    description: "Draw, type, or upload a visual signature and place it on any page.",
    callToAction: "Open Sign PDF",
  },
  {
    sourceToolId: "vat-calculator-uk",
    targetToolId: "percentage-calculator",
    headline: "Need general percentage increases or differences?",
    description: "Calculate multi-scenario percentage changes, differences, and relative shares.",
    callToAction: "Open Percentage Calculator",
  },
  {
    sourceToolId: "gst-calculator-australia",
    targetToolId: "gst-calculator",
    headline: "Working with international GST or flexible rates?",
    description: "Calculate inclusive or exclusive GST amounts with customizable rates and splits.",
    callToAction: "Open GST Calculator",
  },
  {
    sourceToolId: "slug-generator",
    targetToolId: "case-converter",
    headline: "Formatting code identifiers or title cases?",
    description: "Convert text into camelCase, PascalCase, snake_case, or Title Case with one click.",
    callToAction: "Open Case Converter",
  },
  {
    sourceToolId: "text-compare",
    targetToolId: "word-counter",
    headline: "Checking document length or reading times?",
    description: "Count words, characters, sentences, paragraphs, and reading time in real time.",
    callToAction: "Open Word Counter",
  },
  {
    sourceToolId: "france-tva-calculator",
    targetToolId: "belgium-tva-calculator",
    headline: "Facturation en Belgique ou taux intra-communautaire ?",
    description: "Calculer la TVA belge aux taux standard de 21% et taux réduits de 12% et 6%.",
    callToAction: "Open Belgium TVA",
  },
  {
    sourceToolId: "belgium-tva-calculator",
    targetToolId: "france-tva-calculator",
    headline: "Opérations commerciales en France ?",
    description: "Calculer la TVA française aux taux officiel 20%, 10%, 5.5% et 2.1%.",
    callToAction: "Open France TVA",
  },
  {
    sourceToolId: "remove-duplicate-lines",
    targetToolId: "case-converter",
    headline: "Need to change text capitalization or casing?",
    description: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, and kebab-case.",
    callToAction: "Open Case Converter",
  },
  {
    sourceToolId: "color-converter",
    targetToolId: "base64",
    headline: "Working with data URLs or encoded assets?",
    description: "Encode and decode UTF-8 text and binary strings safely in your browser.",
    callToAction: "Open Base64 Encoder",
  },
  {
    sourceToolId: "unix-timestamp-converter",
    targetToolId: "date-calculator",
    headline: "Need to calculate days between dates or add working days?",
    description: "Calculate elapsed calendar days and Monday-to-Friday business days.",
    callToAction: "Open Date Calculator",
  },
  {
    sourceToolId: "jwt-decoder",
    targetToolId: "base64",
    headline: "Need to encode or decode raw payloads?",
    description: "Convert UTF-8 text and binary data to standard Base64 safely in your browser.",
    callToAction: "Open Base64 Encoder",
  },
];

export function intentBridgeFor(toolId: string): (IntentBridge & { targetTool: ToolDefinition }) | undefined {
  const match = intentBridges.find((bridge) => bridge.sourceToolId === toolId);
  if (!match) return undefined;
  try {
    const targetTool = getTool(match.targetToolId as ToolId);
    return { ...match, targetTool };
  } catch {
    return undefined;
  }
}
