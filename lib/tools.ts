export type ToolCategory = "text" | "calculator" | "image" | "pdf" | "developer" | "media";

export type ToolDefinition = {
  id: string;
  path: string;
  name: string;
  title: string;
  h1?: string;
  shortDescription: string;
  metaDescription: string;
  category: ToolCategory;
  related: string[];
  primaryQuery: string;
  evidence: string;
  operations: string[];
};

export const tools = [
  {
    id: "word-counter",
    path: "/word-counter",
    name: "Word counter",
    title: "Word Counter — Count Words, Characters & Reading Time",
    h1: "Word Counter & Character Count",
    shortDescription: "Count words, characters, sentences, paragraphs, and estimated reading time.",
    metaDescription:
      "Free online word counter: count words, characters with or without spaces, sentences, paragraphs, and reading time in your browser with zero data uploads.",
    category: "text",
    related: ["character-counter", "case-converter"],
    primaryQuery: "word counter",
    evidence:
      "Google Trends, United States, web search, past 12 months, exact term, collected 2026-10-24. On that chart the average index was 64 beside percentage calculator at 74. Monthly search volume was not measured. A US results page the same day was led by wordcounter.net.",
    operations: ["count"],
  },
  {
    id: "percentage-calculator",
    path: "/percentage-calculator",
    name: "Percentage calculator",
    title: "Percentage Calculator — Change, Difference & Share",
    h1: "Percentage Calculator (Change, Difference & Share)",
    shortDescription: "Find a percentage, a share of a total, a change, or a directionless difference.",
    metaDescription:
      "Calculate percentage of a number, percentage increase or decrease, and directionless percentage difference. Step-by-step mathematical formulas displayed.",
    category: "calculator",
    related: ["discount-calculator", "gst-calculator"],
    primaryQuery: "percentage calculator",
    evidence:
      "Google Trends, United States, web search, past 12 months, exact term, collected 2026-10-24. The average index was 74 on the chart used as the US anchor. Monthly search volume was not measured. The US results page showed Google’s own calculator above organic results.",
    operations: ["percent-of", "what-percent", "change", "increase", "decrease", "difference", "reverse-increase", "reverse-discount"],
  },
  {
    id: "discount-calculator",
    path: "/discount-calculator",
    name: "Discount calculator",
    title: "Discount Calculator — Sale Price & Double Discounts",
    h1: "Discount Calculator — Sale Price & Savings",
    shortDescription: "Take a percent or an amount off a price, with an optional second discount.",
    metaDescription:
      "Calculate sale price and savings from single or sequential double discounts across USD, EUR, GBP, and INR. Free, instant, and client-side.",
    category: "calculator",
    related: ["percentage-calculator", "gst-calculator"],
    primaryQuery: "discount calculator",
    evidence:
      "Google Trends, United States, web search, past 12 months, exact term, collected 2026-10-24. The average index was 13 on a chart where percentage calculator averaged 74. Monthly search volume and the results page were not measured.",
    operations: ["percent", "amount", "additional-percent"],
  },
  {
    id: "case-converter",
    path: "/case-converter",
    name: "Case converter",
    title: "Case Converter — Uppercase, Lowercase, Title & Code Cases",
    h1: "Case Converter — UPPERCASE, lowercase, camelCase",
    shortDescription: "Convert text to upper, lower, title, sentence, camel, Pascal, snake, or kebab case.",
    metaDescription:
      "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case instantly in your browser.",
    category: "text",
    related: ["word-counter", "character-counter"],
    primaryQuery: "case converter",
    evidence:
      "Google Trends, United States, web search, past 12 months, exact term, collected 2026-10-24. The average index was 10 on a chart where percentage calculator averaged 74. Monthly search volume and the results page were not measured.",
    operations: ["upper", "lower", "title", "sentence", "camel", "pascal", "snake", "kebab"],
  },
  tool("json-formatter", "/json-formatter", "JSON formatter", "Pretty-print, minify, and validate JSON in the browser.", "Pretty-print, minify, and validate JSON online with syntax error diagnostics. 100% in-browser processing guarantees private API payloads never leave your device.", "developer", ["base64"], "json formatter", ["pretty", "minify", "validate"], "JSON Formatter & Validator — Pretty-Print & Minify", "JSON Formatter & Validator Online"),
  tool("character-counter", "/character-counter", "Character counter", "Count characters against an optional limit.", "Check character count with and without spaces against custom platform limits (Twitter/X, SMS, meta tags). Real-time remaining character counter.", "text", ["word-counter", "case-converter"], "character counter", ["count", "limit"], "Character Counter — Count Characters With & Without Spaces", "Character Counter (With & Without Spaces)"),
  tool("age-calculator", "/age-calculator", "Age calculator", "Find an age in years, months, and days.", "Calculate chronological age from date of birth to any target date in exact years, months, and days. Includes next birthday countdown and leap year handling.", "calculator", ["date-calculator", "unit-converter"], "age calculator", ["age", "next-birthday"], "Age Calculator — Exact Age in Years, Months & Days", "Age Calculator (Years, Months & Days)"),
  tool("qr-code-generator", "/qr-code-generator", "QR code generator", "Make a QR code for a URL, text, or Wi-Fi network.", "Create permanent static QR codes for links, plain text, and Wi-Fi networks in your browser. Free PNG download that never expires, with no tracking.", "developer", ["base64", "password-generator"], "qr code generator", ["url", "text", "wifi"], "QR Code Generator — Free Static QR Codes (No Sign-Up)", "QR Code Generator for URLs, Text & Wi-Fi"),
  tool("password-generator", "/password-generator", "Password generator", "Create a password with the browser’s secure random generator.", "Generate strong, cryptographically secure random passwords using browser Web Crypto. Filter ambiguous characters with zero server transmission.", "developer", ["qr-code-generator", "base64"], "password generator", ["generate"], "Password Generator — Secure Random Passwords in Browser", "Secure Password Generator"),
  tool("image-compressor", "/image-compressor", "Image compressor", "Re-encode a JPG, PNG, or WebP and compare file sizes.", "Compress JPG, PNG, and WebP images locally via HTML5 canvas. Lossless PNG compression and adjustable quality without uploading photos to a server.", "image", ["image-resizer"], "image compressor", ["compress"], "Image Compressor — Compress JPG, PNG & WebP in Browser", "Compress Images Online (JPG, PNG, WebP)"),
  tool("image-resizer", "/image-resizer", "Image resizer", "Resize an image and keep or change the aspect ratio.", "Resize image width and height in pixels while maintaining aspect ratio. Free in-browser image resizing with zero upload delay and instant preview.", "image", ["image-compressor"], "image resizer", ["resize"], "Image Resizer — Resize Dimensions & Keep Aspect Ratio", "Resize Images Online (Maintain Aspect Ratio)"),
  tool("merge-pdf", "/merge-pdf", "Merge PDF", "Combine PDF files in the browser.", "Combine multiple PDF files into one in custom order using client-side pdf-lib. Confidential documents are never uploaded to any cloud server.", "pdf", ["split-pdf", "jpg-to-pdf"], "merge pdf", ["merge"], "Merge PDF — Combine PDF Files in Your Browser", "Merge PDF Files Online Free"),
  tool("split-pdf", "/split-pdf", "Split PDF", "Extract pages or ranges from a PDF.", "Extract individual pages or custom page ranges (e.g., 1-3, 5) from PDF files directly in your browser. Fast, free, and completely private.", "pdf", ["merge-pdf"], "split pdf", ["split"], "Split PDF — Extract Pages & Custom Ranges in Browser"),
  tool("jpg-to-pdf", "/jpg-to-pdf", "JPG to PDF", "Place images on PDF pages and download the file.", "Convert JPG and PNG images to PDF documents. Support for standard A4 formatting or native image sizing, processed locally on your device.", "pdf", ["merge-pdf"], "jpg to pdf", ["convert"], "JPG to PDF — Convert Images to PDF in Browser"),
  tool("rotate-pdf", "/rotate-pdf", "Rotate PDF", "Rotate all or selected pages by 90°, 180°, or 270°.", "Rotate PDF pages clockwise by 90, 180, or 270 degrees in your browser. No upload needed — the file stays on your device.", "pdf", ["organize-pdf", "merge-pdf"], "rotate pdf", ["rotate"], "Rotate PDF — Turn PDF Pages 90°, 180° or 270° in Browser"),
  tool("organize-pdf", "/organize-pdf", "Organize PDF", "Reorder or remove pages from a PDF.", "Rearrange PDF pages in any order and remove unwanted pages entirely in the browser. Drag-style reorder with pdf-lib, no server upload.", "pdf", ["rotate-pdf", "split-pdf"], "organize pdf", ["organize"], "Organize PDF — Reorder & Remove Pages in Browser"),
  tool("crop-pdf", "/crop-pdf", "Crop PDF", "Trim page margins on all or selected pages.", "Crop PDF pages by setting top, right, bottom, and left margins in points. Adjusts the CropBox in-browser with pdf-lib, no upload required.", "pdf", ["rotate-pdf", "split-pdf"], "crop pdf", ["crop"], "Crop PDF — Trim Page Margins in Browser"),
  tool("add-page-numbers", "/add-page-numbers", "Add page numbers", "Stamp page numbers on every page of a PDF.", "Add sequential page numbers in six positions (top/bottom × left/center/right) with adjustable font size. Processed locally with pdf-lib.", "pdf", ["watermark-pdf", "merge-pdf"], "add page numbers pdf", ["pagenumber"], "Add Page Numbers to PDF — Stamp Numbers in Browser"),
  tool("watermark-pdf", "/watermark-pdf", "Watermark PDF", "Stamp text across every page of a PDF.", "Add a semi-transparent text watermark on every PDF page. Choose font size, opacity, and diagonal or horizontal placement. No upload required.", "pdf", ["add-page-numbers", "rotate-pdf"], "watermark pdf", ["watermark"], "Watermark PDF — Add Text Overlay in Browser"),
  tool("unlock-pdf", "/unlock-pdf", "Unlock PDF", "Remove encryption restrictions from a PDF.", "Attempt to strip PDF encryption by re-saving the document without restrictions. Works for PDFs with empty or owner-only passwords. No upload required.", "pdf", ["merge-pdf", "rotate-pdf"], "unlock pdf", ["unlock"], "Unlock PDF — Remove PDF Restrictions in Browser"),
  tool("pdf-to-jpg", "/pdf-to-jpg", "PDF to JPG", "Convert each PDF page to a JPEG image.", "Render every PDF page as a high-quality JPEG. Adjustable quality and scale. Multi-page PDFs download as a ZIP. Processed in your browser with pdf.js.", "pdf", ["jpg-to-pdf", "merge-pdf"], "pdf to jpg", ["pdf2jpg"], "PDF to JPG — Convert PDF Pages to Images in Browser"),
  tool("compress-pdf", "/compress-pdf", "Compress PDF", "Reduce the file size of a PDF.", "Re-save a PDF with object-stream compression to reduce file size. Works best on unoptimized documents. No upload — processed locally with pdf-lib.", "pdf", ["merge-pdf", "unlock-pdf"], "compress pdf", ["compress"], "Compress PDF — Reduce PDF File Size in Browser"),
  tool("edit-pdf", "/edit-pdf", "Edit PDF", "Add text annotations to PDF pages.", "Place custom text on any page at exact coordinates with font size and color control. Multiple annotations per document. Processed in-browser with pdf-lib.", "pdf", ["watermark-pdf", "add-page-numbers"], "edit pdf", ["edit", "annotate"], "Edit PDF — Add Text Annotations to PDF Pages in Browser"),
  tool("pdf-forms", "/pdf-forms", "PDF Forms", "Fill interactive PDF form fields in browser.", "Load a PDF form, auto-detect text fields, checkboxes, dropdowns, and radio buttons, fill values, and optionally flatten. No upload required.", "pdf", ["edit-pdf", "merge-pdf"], "fill pdf form", ["forms", "fill"], "PDF Forms — Fill & Flatten PDF Forms in Browser"),
  tool("sign-pdf", "/sign-pdf", "Sign PDF", "Draw, type, or upload a signature and place it on a PDF page.", "Add a visual signature to any PDF page. Draw freehand, type your name in cursive, or upload a signature image. Position and size are adjustable. No upload required.", "pdf", ["edit-pdf", "pdf-forms"], "sign pdf", ["sign", "signature"], "Sign PDF — Add Signature to PDF in Browser"),
  tool("delete-pdf-pages", "/delete-pdf-pages", "Delete PDF Pages", "Remove specific pages from a PDF.", "Select pages to remove from a PDF document. Remaining pages are re-saved into a clean file. No upload — processed locally with pdf-lib.", "pdf", ["split-pdf", "organize-pdf"], "delete pdf pages", ["delete-pages"], "Delete PDF Pages — Remove Pages from PDF in Browser"),
  tool("extract-pdf-pages", "/extract-pdf-pages", "Extract PDF Pages", "Extract specific pages into a new PDF.", "Pull selected pages or ranges from a PDF into a new standalone document. Choose pages like 1-3, 5. No upload — processed in browser.", "pdf", ["split-pdf", "merge-pdf"], "extract pdf pages", ["extract-pages"], "Extract PDF Pages — Pull Pages from PDF in Browser"),
  tool("pdf-pipeline", "/pdf-pipeline", "PDF Pipeline", "Chain unlimited PDF operations with undo/redo.", "Upload once, then rotate, crop, watermark, compress, delete pages and more in sequence. Full version history with undo and redo. No uploads.", "pdf", ["merge-pdf", "edit-pdf"], "pdf pipeline", ["pipeline", "chain", "workflow"], "PDF Pipeline — Chain PDF Tools with Undo/Redo in Browser"),
  tool("unit-converter", "/unit-converter", "Unit converter", "Convert length, mass, temperature, area, volume, and speed.", "Convert metric and imperial units across length, mass, temperature, area, volume, and speed with exact scientific constants and formulas shown.", "calculator", ["percentage-calculator", "date-calculator"], "unit converter", ["convert"], "Unit Converter — Length, Weight, Temperature & Volume"),
  tool("date-calculator", "/date-calculator", "Date calculator", "Count days between dates or add days.", "Calculate exact calendar days, midnights, and Monday-Friday business days between dates, or add days to calculate future and past target dates.", "calculator", ["age-calculator"], "date calculator", ["between", "add", "business"], "Date Calculator — Days Between Dates & Business Days"),
  tool("gst-calculator", "/gst-calculator", "GST calculator", "Add or remove a GST rate you enter.", "Calculate GST amount, reverse GST, and gross totals from any tax rate. Displays breakdown for Central GST (CGST), State GST (SGST), and IGST.", "calculator", ["percentage-calculator"], "gst calculator", ["add", "remove"], "GST Calculator — Add or Remove GST with CGST/SGST Split"),
  tool("emi-calculator", "/emi-calculator", "EMI calculator", "Estimate a monthly loan payment.", "Calculate equated monthly installments (EMI) using reducing-balance formulas for home, car, or personal loans with principal and interest breakdowns.", "calculator", ["percentage-calculator"], "emi calculator", ["payment"], "EMI Calculator — Estimate Monthly Loan Payments"),
  tool("base64", "/base64", "Base64 encoder", "Encode and decode UTF-8 text as Base64.", "Encode and decode UTF-8 text to standard Base64 in the browser. Safe for sensitive tokens and credentials with zero server logging.", "developer", ["json-formatter"], "base64 encode", ["encode", "decode"], "Base64 Encoder & Decoder — Text to Base64 in Browser"),
  tool(
    "vat-calculator-uk",
    "/vat-calculator-uk",
    "UK VAT calculator",
    "Add or remove UK VAT at standard 20%, reduced 5%, or zero rates.",
    "Calculate UK VAT online: add or remove VAT at the 20% standard rate or 5% reduced rate. Step-by-step net, tax, and gross breakdown with official HMRC rates.",
    "calculator",
    ["percentage-calculator", "discount-calculator", "gst-calculator-australia"],
    "vat calculator uk",
    ["add", "remove", "reverse"],
    "UK VAT Calculator — Add or Remove 20% & 5% VAT (HMRC Rates)"
  ),
  tool(
    "gst-calculator-australia",
    "/gst-calculator-australia",
    "Australia GST calculator",
    "Add 10% GST or calculate reverse GST using the ATO one-eleventh rule.",
    "Calculate Australian GST: add 10% GST to net amounts or calculate reverse GST using the ATO one-eleventh rule. Fast, private, and client-side.",
    "calculator",
    ["percentage-calculator", "gst-calculator", "vat-calculator-uk"],
    "gst calculator australia",
    ["add", "remove", "reverse"],
    "Australia GST Calculator — Add or Remove 10% GST (ATO Rule)"
  ),
  tool(
    "slug-generator",
    "/slug-generator",
    "Slug generator",
    "Generate URL-friendly slugs from text, accents, and multilingual scripts.",
    "Generate clean, SEO-friendly URL slugs from text. Supports accents, diacritics, French, Spanish, and multilingual Unicode scripts with custom delimiters.",
    "developer",
    ["case-converter", "character-counter", "base64"],
    "slug generator",
    ["generate", "strip-accents", "delimiter"],
    "Slug Generator — URL-Friendly Text & Unicode Slugs Online"
  ),
  tool(
    "text-compare",
    "/text-compare",
    "Text diff checker",
    "Compare two texts side-by-side to highlight additions and deletions.",
    "Compare two text documents side-by-side to highlight additions, deletions, and inline changes. 100% private in-browser text diff with zero server uploads.",
    "text",
    ["word-counter", "character-counter", "case-converter"],
    "text diff checker",
    ["compare", "lines", "words"],
    "Text Diff Checker — Compare Text Differences in Browser"
  ),
  tool(
    "france-tva-calculator",
    "/france-tva-calculator",
    "France TVA calculator",
    "Calculer la TVA française aux taux officiel 20%, 10%, 5.5% et 2.1%.",
    "Calculate French TVA online: add or remove VAT at official DGFIP rates (20%, 10%, 5.5%, 2.1%). Accurate HT and TTC breakdowns with reverse TVA calculation.",
    "calculator",
    ["belgium-tva-calculator", "vat-calculator-uk", "percentage-calculator"],
    "calcul tva france",
    ["add", "remove", "reverse"],
    "France TVA Calculator — Calculer TVA 20%, 10% & 5.5% (DGFIP)"
  ),
  tool(
    "belgium-tva-calculator",
    "/belgium-tva-calculator",
    "Belgium TVA calculator",
    "Calculer la TVA belge (BTW) aux taux officiel 21%, 12% et 6%.",
    "Calculate Belgian TVA (BTW): add or deduct VAT at official SPF Finances rates (21%, 12%, 6%). Step-by-step HT and TTC calculations in your browser.",
    "calculator",
    ["france-tva-calculator", "vat-calculator-uk", "discount-calculator"],
    "calcul tva belgique",
    ["add", "remove", "reverse"],
    "Belgium TVA Calculator — Calculer TVA 21%, 12% & 6% (SPF)"
  ),
  tool(
    "remove-duplicate-lines",
    "/remove-duplicate-lines",
    "Text cleaner & duplicate remover",
    "Remove duplicate lines, trim whitespace, and sort text in browser.",
    "Remove duplicate lines, trim whitespace, remove blank lines, and sort lists alphabetically. 100% private in-browser text cleaning with zero server uploads.",
    "text",
    ["word-counter", "case-converter", "text-compare"],
    "remove duplicate lines",
    ["deduplicate", "sort", "trim"],
    "Remove Duplicate Lines — Text Cleaner & Line Sorter Online"
  ),
  tool(
    "color-converter",
    "/color-converter",
    "Color converter",
    "Convert color codes between HEX, RGB, and HSL with live color preview.",
    "Convert color codes between HEX, RGB, and HSL formats with live color preview. Copy CSS color strings instantly with zero latency in your browser.",
    "developer",
    ["base64", "json-formatter", "slug-generator"],
    "hex to rgb",
    ["hex", "rgb", "hsl"],
    "Color Converter — HEX to RGB & HSL Color Code Converter"
  ),
  tool(
    "unix-timestamp-converter",
    "/unix-timestamp-converter",
    "Unix timestamp converter",
    "Convert Unix epoch timestamps to UTC and local date-time strings.",
    "Convert Unix epoch timestamps to human-readable UTC and local dates, or convert dates to Unix seconds and milliseconds. Fast, client-side, and private.",
    "developer",
    ["date-calculator", "age-calculator", "json-formatter"],
    "unix timestamp converter",
    ["timestamp-to-date", "date-to-timestamp"],
    "Unix Timestamp Converter — Epoch to Date & DateTime in Browser"
  ),
  tool(
    "jwt-decoder",
    "/jwt-decoder",
    "JWT decoder",
    "Decode and inspect JSON Web Tokens (JWT) in your browser.",
    "Decode JSON Web Tokens (JWT) online. Inspect headers, claims, payload data, and expiration dates. 100% in-browser processing guarantees token privacy.",
    "developer",
    ["base64", "json-formatter"],
    "jwt decoder",
    ["decode", "claims", "expiry"],
    "JWT Decoder — Decode & Inspect JSON Web Tokens"
  ),
  tool(
    "url-encoder",
    "/url-encoder",
    "URL encoder",
    "Encode and decode URL components, full URLs, and query strings.",
    "Encode and decode URL components and full URLs online. Convert special characters into percent-encoding or parse query parameters. 100% private in browser.",
    "developer",
    ["base64", "slug-generator"],
    "url encoder",
    ["encode", "decode", "params"],
    "URL Encoder & Decoder — Encode & Decode URLs Online"
  ),
  tool(
    "json-to-typescript",
    "/json-to-typescript",
    "JSON to TypeScript",
    "Generate TypeScript interfaces and types from JSON in your browser.",
    "Convert JSON to TypeScript interfaces and type definitions online. Infers types from nested objects and arrays. 100% private in-browser generation.",
    "developer",
    ["json-formatter", "base64"],
    "json to typescript",
    ["infer", "interface", "type"],
    "JSON to TypeScript — Convert JSON to TS Interfaces Online"
  ),
  tool(
    "json-to-python",
    "/json-to-python",
    "JSON to Python",
    "Convert JSON to Python Pydantic models, dataclasses, or TypedDict.",
    "Convert JSON to Python Pydantic models, standard dataclasses, or TypedDict classes online. Automatic snake_case field mapping. 100% private in browser.",
    "developer",
    ["json-to-typescript", "json-formatter"],
    "json to python",
    ["pydantic", "dataclass", "typeddict"],
    "JSON to Python — Convert JSON to Pydantic & Dataclasses"
  ),
  tool(
    "csv-to-json",
    "/csv-to-json",
    "CSV to JSON converter",
    "Convert CSV spreadsheets to JSON arrays and JSON to CSV in your browser.",
    "Convert CSV spreadsheets to JSON arrays and JSON to CSV online. Supports RFC 4180 quotes, auto delimiter detection, and data type parsing. 100% private.",
    "developer",
    ["json-formatter", "json-to-typescript"],
    "csv to json",
    ["csv2json", "json2csv"],
    "CSV to JSON Converter — Convert CSV to JSON Online"
  ),
  tool(
    "contrast-checker",
    "/contrast-checker",
    "Contrast checker",
    "Check text contrast ratios against WCAG 2.1 AA and AAA standards.",
    "Check color contrast ratios against WCAG 2.1 AA and AAA accessibility standards. Real-time preview for normal text, large text, and UI controls in browser.",
    "developer",
    ["color-converter", "slug-generator"],
    "contrast checker",
    ["contrast", "wcag", "luminance"],
    "Contrast Checker — WCAG 2.1 Color Accessibility Checker"
  ),
  tool(
    "gradient-generator",
    "/gradient-generator",
    "CSS gradient generator",
    "Create linear and radial CSS gradients with live preview and code export.",
    "Create linear and radial CSS gradients online. Adjust angles, add color stops, and preview transitions in real time. Copy pure CSS or Tailwind classes.",
    "developer",
    ["color-converter", "contrast-checker"],
    "css gradient generator",
    ["linear", "radial", "stops"],
    "CSS Gradient Generator — Linear & Radial CSS Gradients"
  ),
  tool(
    "color-palette-generator",
    "/color-palette-generator",
    "Color palette generator",
    "Generate harmonious 5-color palettes with hex codes, pin locks, and CSS export.",
    "Generate harmonious 5-color palettes online. Supports complementary, analogous, and triadic schemes with pin locks and CSS variables export. 100% private.",
    "developer",
    ["color-converter", "contrast-checker"],
    "color palette generator",
    ["generate", "lock", "export"],
    "Color Palette Generator — Create & Export Harmonious Palettes"
  ),
  tool(
    "css-box-shadow-generator",
    "/css-box-shadow-generator",
    "CSS box shadow generator",
    "Create multi-layer CSS box shadows with live preview, blur, spread, and inset.",
    "Generate multi-layer CSS box shadows online with live card preview. Adjust offsets, blur, spread, opacity, and inset. Copy clean CSS or Tailwind classes.",
    "developer",
    ["gradient-generator", "contrast-checker"],
    "css box shadow generator",
    ["shadow", "inset", "layers"],
    "CSS Box Shadow Generator — Multi-Layer CSS Drop Shadows"
  ),
  tool(
    "css-border-radius-generator",
    "/css-border-radius-generator",
    "CSS border radius generator",
    "Create 8-point organic shapes, blobs, and rounded corners with live CSS export.",
    "Generate 8-point CSS border-radius organic shapes, liquid blobs, and rounded corners online. Live visual canvas preview. Copy pure CSS or Tailwind classes.",
    "developer",
    ["css-box-shadow-generator", "gradient-generator"],
    "css border radius generator",
    ["radius", "blob", "elliptical"],
    "CSS Border Radius Generator — 8-Point Organic Shapes & Blobs"
  ),
  tool(
    "regex-tester",
    "/regex-tester",
    "Regex tester",
    "Test regular expressions in real time with match highlighting and capture groups.",
    "Test regular expressions online with live match highlighting, flag toggles, capture group tables, and presets. 100% private in-browser regex tester.",
    "developer",
    ["json-formatter", "url-encoder"],
    "regex tester",
    ["test", "flags", "groups"],
    "Regex Tester — Test Regular Expressions Online with Highlighting"
  ),
  tool(
    "cron-generator",
    "/cron-generator",
    "Cron expression generator",
    "Generate and explain cron schedules with human-readable translations and run dates.",
    "Generate and translate 5-part cron expressions online. Visual schedule builder with plain English translations and upcoming execution runs. 100% private.",
    "developer",
    ["unix-timestamp-converter", "json-formatter"],
    "cron generator",
    ["generate", "explain", "schedule"],
    "Cron Generator — Cron Expression Generator & Explainer Online"
  ),
  tool(
    "sql-formatter",
    "/sql-formatter",
    "SQL formatter",
    "Format, beautify, and minify SQL queries with standard indentation.",
    "Format, beautify, and indent SQL queries online. Uppercase keywords, indent sub-clauses, and minify database queries. 100% private in-browser tool.",
    "developer",
    ["json-formatter", "csv-to-json"],
    "sql formatter",
    ["format", "minify", "indent"],
    "SQL Formatter — Format, Beautify & Minify SQL Online"
  ),
  tool(
    "barcode-generator",
    "/barcode-generator",
    "Barcode generator",
    "Create 1D barcodes for Code 128, EAN-13, UPC-A, and Code 39 with SVG and PNG download.",
    "Generate 1D barcodes online for Code 128, EAN-13, UPC-A, and Code 39. Download print-ready high-res PNG or vector SVG with zero tracking. 100% private.",
    "developer",
    ["qr-code-generator", "slug-generator"],
    "barcode generator",
    ["code128", "ean13", "upca", "code39"],
    "Barcode Generator — Free Code 128, EAN-13 & UPC-A Barcodes"
  ),
  tool(
    "image-cropper",
    "/image-cropper",
    "Image cropper",
    "Crop JPG, PNG, and WebP images with custom aspect ratios in your browser.",
    "Crop JPG, PNG, and WebP images online with custom aspect ratios (1:1, 16:9, 4:3). Live canvas grid preview. 100% private in-browser image cropping.",
    "image",
    ["image-resizer", "image-compressor"],
    "image cropper",
    ["crop", "aspect", "dimensions"],
    "Image Cropper — Crop JPG, PNG & WebP Images Online Free"
  ),
  tool(
    "audio-trimmer",
    "/audio-trimmer",
    "Audio trimmer",
    "Trim and cut MP3, WAV, and audio files with interactive waveform in browser.",
    "Trim and cut MP3, WAV, and audio files online with interactive waveform preview. Extract audio clips and ringtones. 100% private in-browser tool.",
    "media",
    ["image-cropper", "image-compressor"],
    "audio trimmer",
    ["trim", "cut", "waveform"],
    "Audio Trimmer — Cut & Trim MP3 & Audio Files Online Free"
  ),
  tool(
    "audio-speed-changer",
    "/audio-speed-changer",
    "Audio speed changer",
    "Speed up or slow down MP3, WAV, and audio files with duration estimation.",
    "Speed up or slow down audio files online from 0.25x to 3x. Real-time playback preview and duration comparison. 100% private in-browser audio speed changer.",
    "media",
    ["audio-trimmer", "image-compressor"],
    "audio speed changer",
    ["speed", "tempo", "duration"],
    "Audio Speed Changer — Speed Up or Slow Down Audio Online"
  ),
  tool(
    "video-to-gif",
    "/video-to-gif",
    "Video to GIF converter",
    "Convert MP4, WebM, and MOV video clips into animated GIF loops in browser.",
    "Convert MP4, WebM, and MOV videos into animated GIFs online. Custom timing trimmer, resolution, and frame rate controls. 100% private in-browser tool.",
    "media",
    ["image-compressor", "audio-trimmer"],
    "video to gif",
    ["gif", "convert", "frames"],
    "Video to GIF — Convert MP4 & WebM to Animated GIF Online"
  ),
  tool(
    "tokenizer",
    "/tokenizer",
    "Tokenizer",
    "Count tokens and visualize how GPT, Claude, Gemini, and Grok tokenize your text.",
    "Count tokens for GPT-4o, GPT-4, Claude, Gemini, and Grok. See color-coded token spans, most expensive words, and frequent tokens. OpenAI runs in-browser.",
    "developer",
    ["json-formatter", "character-counter", "word-counter"],
    "tokenizer",
    ["tokenize", "count"],
    "Tokenizer — Count & Visualize Tokens for GPT, Claude & Gemini"
  ),
] as const satisfies readonly ToolDefinition[];

function tool(
  id: string,
  path: string,
  name: string,
  shortDescription: string,
  metaDescription: string,
  category: ToolCategory,
  related: string[],
  primaryQuery: string,
  operations: string[],
  title?: string,
  h1?: string,
): ToolDefinition {
  return {
    id,
    path,
    name,
    title: title ?? name,
    h1: h1 ?? title ?? name,
    shortDescription,
    metaDescription,
    category,
    related,
    primaryQuery,
    evidence: "Not yet validated. No monthly search volume, keyword difficulty, CPC, or results page was collected for this query. Phase 2 evidence, where it exists, is limited to Trends indexes and is not volume.",
    operations,
  };
}

export type ToolId = (typeof tools)[number]["id"];

export function getTool(id: ToolId): ToolDefinition {
  const tool = tools.find((item) => item.id === id);
  if (!tool) throw new Error(`Unknown tool: ${id}`);
  return tool;
}

export function relatedTools(id: string): ToolDefinition[] {
  const tool = tools.find((item) => item.id === id);
  if (!tool) return [];
  return tool.related.flatMap((relatedId) => {
    const match = tools.find((item) => item.id === relatedId);
    return match ? [match] : [];
  });
}
