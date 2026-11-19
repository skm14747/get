import { tools, type ToolDefinition } from "@/lib/tools";

export type BrowseGroup = {
  id: string;
  path: string;
  name: string;
  summary: string;
  overview: string;
  keyUseCases: string[];
  toolIds: string[];
};

export const browseGroups: readonly BrowseGroup[] = [
  {
    id: "text-tools",
    path: "/topics/text-tools",
    name: "Text tools",
    summary: "Count writing, analyze sentence structure, and convert casing without sending text to any server.",
    overview:
      "Text processing tasks—such as checking character counts for social posts, verifying word limits for academic essays, or converting variable names between programming casing conventions—should be instant and confidential. All text operations on GoEasyTools run purely in your browser runtime using standard Unicode code point segmentation.",
    keyUseCases: [
      "Count words, characters, sentences, paragraphs, and estimated reading time with real-time feedback.",
      "Ensure posts fit exact platform limits for Twitter/X (280 chars), SMS (160 chars), and SEO meta descriptions.",
      "Convert copy between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case.",
    ],
    toolIds: ["word-counter", "character-counter", "case-converter", "text-compare", "remove-duplicate-lines"],
  },
  {
    id: "calculators",
    path: "/topics/calculators",
    name: "Calculators",
    summary: "Percentages, shares, changes, and discounts with explicit mathematical formulas beside every result.",
    overview:
      "Everyday business and personal mathematics require fast, transparent calculations. Whether you are computing sales markdowns, tracking percentage increases across quarterly metrics, or evaluating directionless percentage differences, our calculators show the exact mathematical formula alongside the result.",
    keyUseCases: [
      "Calculate percentages of a total, percentage increases/decreases, and directionless percentage differences.",
      "Calculate retail discounts, money saved, and stacked sequential second discounts across major global currencies.",
      "Understand mathematical edge cases like division by zero, percentage-point changes, and rounding rules.",
    ],
    toolIds: ["percentage-calculator", "discount-calculator"],
  },
  {
    id: "developer-tools",
    path: "/topics/developer-tools",
    name: "Developer tools",
    summary: "Format JSON, encode Base64, generate passwords, and draw QR codes locally in your browser.",
    overview:
      "Modern developers frequently need quick utility conversions during API integration, debugging, and configuration. Traditional online formatters often pose security risks by uploading authorization headers, database dumps, or passwords to cloud servers. GoEasyTools executes all parsing, cryptographic randomness, and matrix rendering entirely client-side.",
    keyUseCases: [
      "Validate, pretty-print, and minify JSON payloads with line-and-column syntax error diagnostics.",
      "Safely encode UTF-8 text into standard Base64 or decode binary strings without network transmission.",
      "Generate cryptographically secure random passwords using Web Crypto API (crypto.getRandomValues).",
      "Create permanent, high-resolution static QR codes for website links, plain text, and Wi-Fi networks.",
    ],
    toolIds: ["json-formatter", "base64", "password-generator", "qr-code-generator", "slug-generator", "color-converter", "unix-timestamp-converter"],
  },
  {
    id: "image-tools",
    path: "/topics/image-tools",
    name: "Image tools",
    summary: "Compress and resize JPG, PNG, and WebP images locally via HTML5 canvas with zero server uploads.",
    overview:
      "Preparing images for websites, presentations, and applications requires balancing visual fidelity with file size. GoEasyTools processes photos directly in browser memory using the HTML5 2D canvas context. Your private photos never leave your device, eliminating privacy concerns associated with cloud-based compression services.",
    keyUseCases: [
      "Reduce JPG, WebP, and PNG file sizes with adjustable quality controls and real-time byte comparison.",
      "Resize pixel width and height dimensions with aspect-ratio locking for responsive web layouts and avatars.",
      "Export optimized images with zero cloud transmission delays or daily file quotas.",
    ],
    toolIds: ["image-compressor", "image-resizer"],
  },
  {
    id: "pdf-tools",
    path: "/topics/pdf-tools",
    name: "PDF tools",
    summary: "Merge multiple documents, extract page ranges, or convert images to PDF securely in your browser.",
    overview:
      "Working with PDF files often involves handling confidential legal agreements, tax filings, medical reports, and receipts. Traditional PDF portals upload your documents to remote servers, creating privacy and data retention risks. GoEasyTools executes binary PDF manipulations directly in your browser using pdf-lib and WebAssembly.",
    keyUseCases: [
      "Combine multiple PDF documents into a single consolidated file in your preferred reading order.",
      "Extract individual pages or custom page ranges (e.g. 1-3, 5) into a standalone PDF document.",
      "Convert JPG and PNG photos into professional PDF documents with standard A4 or native sizing.",
    ],
    toolIds: ["merge-pdf", "split-pdf", "jpg-to-pdf", "rotate-pdf", "organize-pdf", "crop-pdf", "add-page-numbers", "watermark-pdf", "unlock-pdf", "pdf-to-jpg", "compress-pdf", "edit-pdf", "pdf-forms", "sign-pdf"],
  },
  {
    id: "converters",
    path: "/topics/converters",
    name: "Converters",
    summary: "Convert length, mass, temperature, area, volume, and speed using exact scientific constants.",
    overview:
      "Unit conversions require exact scientific precision. Whether converting cooking recipes, engineering specifications, or travel distances between Metric and Imperial systems, our converter applies exact international standards and displays the underlying formulas.",
    keyUseCases: [
      "Convert length measurements between inches, feet, yards, miles, centimeters, meters, and kilometers.",
      "Convert mass and weight between ounces, pounds, grams, and kilograms using exact avoirdupois factors.",
      "Convert temperatures between Celsius, Fahrenheit, and Kelvin with thermodynamic precision.",
    ],
    toolIds: ["unit-converter"],
  },
  {
    id: "date-and-time",
    path: "/topics/date-and-time",
    name: "Date and time",
    summary: "Calendar day arithmetic, business day counts, and chronological age calculations.",
    overview:
      "Date arithmetic can be deceptively complex due to varying month lengths, leap years, and weekend boundaries. GoEasyTools performs calendar calculations using standard ISO 8601 calendar dates (YYYY-MM-DD), ensuring daylight saving time shifts never distort your day counts.",
    keyUseCases: [
      "Calculate elapsed calendar days and Monday-through-Friday business days between any two dates.",
      "Add or subtract days from a starting date to determine contract deadlines and milestone dates.",
      "Compute chronological age in exact years, months, and days, including next-birthday countdowns.",
    ],
    toolIds: ["age-calculator", "date-calculator"],
  },
  {
    id: "finance",
    path: "/topics/finance",
    name: "Finance",
    summary: "GST tax breakdowns and monthly loan EMI payment estimates with principal-interest schedules.",
    overview:
      "Planning loans and calculating taxes requires clear, transparent financial modeling. GoEasyTools provides transparent mathematical estimators for loans and tax calculations without harvesting your phone number, selling financial leads, or requiring bank logins.",
    keyUseCases: [
      "Calculate inclusive (reverse) and exclusive GST with 50/50 CGST/SGST splits and inter-state IGST.",
      "Estimate monthly loan EMIs using reducing-balance formulas with total interest and payment schedules.",
      "Model loan scenarios up to 360 months (30 years) across varying interest rates.",
    ],
    toolIds: ["gst-calculator", "emi-calculator", "vat-calculator-uk", "gst-calculator-australia", "france-tva-calculator", "belgium-tva-calculator"],
  },
];

export function groupForTool(id: string): BrowseGroup | undefined {
  return browseGroups.find((group) => group.toolIds.includes(id));
}

export function toolsInGroup(group: BrowseGroup): ToolDefinition[] {
  return group.toolIds.flatMap((id) => {
    const tool = tools.find((item) => item.id === id);
    return tool ? [tool] : [];
  });
}

export function searchTools(query: string): ToolDefinition[] {
  const needle = query.trim().toLocaleLowerCase("en");
  if (needle.length === 0) return [];
  return tools.filter((tool) => {
    const group = groupForTool(tool.id);
    const haystack = [tool.name, tool.shortDescription, group?.name ?? ""].join(" ").toLocaleLowerCase("en");
    return haystack.includes(needle);
  });
}
