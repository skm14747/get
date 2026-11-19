export type FaqItem = { question: string; answer: string };

const faqs: Record<string, FaqItem[]> = {
  "word-counter": [
    {
      question: "What counts as a word?",
      answer: "A word is a run of characters separated by whitespace. A Japanese sentence with no spaces counts as one word. That is not dictionary segmentation.",
    },
    {
      question: "How is reading time estimated?",
      answer: "The estimate uses 200 words per minute. It is a planning figure, not a measured reading speed.",
    },
  ],
  "percentage-calculator": [
    {
      question: "Why does a zero whole fail?",
      answer: "A share of zero, and a change from zero, would divide by zero. The page says the percentage is undefined instead of showing an infinite value.",
    },
    {
      question: "Is percentage difference the same as percentage change?",
      answer: "No. Difference uses the average of the absolute values and has no direction. Change compares the new number with the original.",
    },
  ],
  "discount-calculator": [
    {
      question: "Are two discounts added together?",
      answer: "No. The second percentage comes off the price after the first discount. Twenty percent and then ten percent is not thirty percent.",
    },
    {
      question: "Which currencies can the result use?",
      answer: "USD, EUR, GBP, INR, BRL, and SAR. Amounts use hundredths, so yen is not listed.",
    },
  ],
  "case-converter": [
    {
      question: "Will this change Arabic or Hindi text?",
      answer: "No. Text with no case distinction stays as it was, and the page says so.",
    },
    {
      question: "Does title case keep acronyms?",
      answer: "No. Title case capitalizes the first letter and lowercases the rest, so HTML becomes Html.",
    },
  ],
  "json-formatter": [
    {
      question: "Does the formatter run the JSON?",
      answer: "No. It uses JSON.parse and JSON.stringify. The text is not evaluated as JavaScript.",
    },
    {
      question: "How large can the input be?",
      answer: "More than 1,000,000 characters is refused so a huge paste does not lock the tab.",
    },
  ],
  "character-counter": [
    {
      question: "When does the limit apply?",
      answer: "Only after you enter a number. An empty limit is a plain count, not a failed post.",
    },
    {
      question: "Is 280 a platform rule?",
      answer: "No. It is an example you can type. Platforms change their limits, and this page does not check them.",
    },
  ],
  "age-calculator": [
    {
      question: "What happens to a February 29 birthday?",
      answer: "In a year without February 29, the anniversary is February 28. The page states that next to the result.",
    },
    {
      question: "Which time zone is used?",
      answer: "The dates are calendar dates, not clock times, so a time zone does not move the day.",
    },
  ],
  "qr-code-generator": [
    {
      question: "Which links are accepted?",
      answer: "Only http and https URLs. Other schemes are rejected.",
    },
    {
      question: "Has the Wi-Fi code been tested on phones?",
      answer: "No. The image uses the common WIFI: payload. This page does not claim a scanner test.",
    },
  ],
  "password-generator": [
    {
      question: "Where does the randomness come from?",
      answer: "The browser’s crypto.getRandomValues. The password is not sent to a server or written into the address.",
    },
    {
      question: "Why are some characters missing?",
      answer: "The sets omit 0, O, 1, l, and I so the password is easier to read. You can see the sets under the result.",
    },
  ],
  "image-compressor": [
    {
      question: "Why might a PNG not get smaller?",
      answer: "The PNG export from the canvas is lossless. The quality control applies to JPEG and WebP.",
    },
    {
      question: "What is the size limit?",
      answer: "15 MB for one image. Larger files are refused before drawing.",
    },
  ],
  "image-resizer": [
    {
      question: "Does a larger size add detail?",
      answer: "No. The canvas draws the pixels that are already in the file.",
    },
    {
      question: "What does the aspect lock do?",
      answer: "Changing width or height updates the other side from the original ratio.",
    },
  ],
  "merge-pdf": [
    {
      question: "Are the files uploaded?",
      answer: "No. pdf-lib copies the pages in this browser. Encrypted files are refused rather than unlocked.",
    },
    {
      question: "How many files can be combined?",
      answer: "At least two, and at most ten. Each file must be 20 MB or smaller.",
    },
  ],
  "split-pdf": [
    {
      question: "How do I write a range?",
      answer: "Use page numbers such as 1-3,5. Ranges are inclusive. A number past the last page is rejected.",
    },
    {
      question: "Do I get one file or many?",
      answer: "One PDF, with the selected pages in the order you wrote.",
    },
  ],
  "jpg-to-pdf": [
    {
      question: "Which images can be placed on a page?",
      answer: "JPG and PNG. WebP is refused because this embedder does not accept it.",
    },
    {
      question: "What does Match the image mean?",
      answer: "The page uses the image’s pixel size. A4 scales the image to fit an A4 page.",
    },
  ],
  "rotate-pdf": [
    {
      question: "Can I rotate individual pages or the entire document?",
      answer: "You can rotate all pages simultaneously by 90, 180, or 270 degrees clockwise, or select specific pages to orient correctly.",
    },
    {
      question: "Are rotated PDF files uploaded to a server?",
      answer: "No. Page rotation modifies the PDF viewport rotation parameter locally in your browser using pdf-lib without uploading file contents.",
    },
  ],
  "organize-pdf": [
    {
      question: "How do I rearrange or delete pages?",
      answer: "Drag and drop page cards to reorder them into your preferred sequence, or click the delete button on any page card to remove unwanted pages.",
    },
    {
      question: "Will organizing a PDF degrade document or image quality?",
      answer: "No. Page reordering and deletion preserves the original embedded raster images, text streams, and vector objects losslessly.",
    },
  ],
  "crop-pdf": [
    {
      question: "How does PDF cropping work in the browser?",
      answer: "Cropping adjusts the internal PDF CropBox boundaries by trimming points from the top, bottom, left, or right margins without re-encoding.",
    },
    {
      question: "Can I undo or revert a crop?",
      answer: "Yes. Before downloading, you can reset margins to zero or re-adjust the point values in real time.",
    },
  ],
  "unit-converter": [
    {
      question: "Are the factors exact?",
      answer: "The page uses defined factors such as 1 inch = 0.0254 m. Temperature uses the Celsius formulas, not a multiplier.",
    },
    {
      question: "How are results rounded on screen?",
      answer: "The display keeps up to six decimal places. The underlying value is the direct conversion.",
    },
  ],
  "date-calculator": [
    {
      question: "Does the day count include both dates?",
      answer: "No. It is the number of midnights between them. January 31 to February 1 is one day.",
    },
    {
      question: "Which holidays are excluded?",
      answer: "None. Business days are Monday through Friday only, and the page says there is no holiday calendar.",
    },
  ],
  "gst-calculator": [
    {
      question: "Does this look up the current GST rate?",
      answer: "No. You enter the rate. The page is not tax advice and does not store a legal schedule.",
    },
    {
      question: "How is an odd paisa split?",
      answer: "CGST and SGST split the rounded tax. The extra hundredth stays on CGST.",
    },
  ],
  "emi-calculator": [
    {
      question: "Which formula is used?",
      answer: "The reducing-balance payment P × r × (1+r)^n / ((1+r)^n − 1), with r as the annual rate divided by 12 and by 100. A zero rate divides the principal by the months.",
    },
    {
      question: "Is this a loan offer?",
      answer: "No. Fees, the lender’s rounding, and the actual contract can differ. Tenure above 360 months is refused.",
    },
  ],
  base64: [
    {
      question: "Is Base64 encryption?",
      answer: "No. Anyone can decode it. It only changes how UTF-8 bytes are written.",
    },
    {
      question: "What does an invalid decode mean?",
      answer: "The text is not standard Base64, or the bytes are not UTF-8. The input stays in the box.",
    },
  ],
  "vat-calculator-uk": [
    {
      question: "What is the standard UK VAT rate?",
      answer: "The standard rate is 20%, which has been in effect since 4 January 2011. Reduced 5% applies to domestic energy, and zero 0% applies to most groceries, books, and children's clothing.",
    },
    {
      question: "How do I calculate reverse VAT from a gross amount?",
      answer: "To find the net price before 20% VAT, divide the gross amount by 1.20. The difference between the gross price and net price is the VAT amount.",
    },
  ],
  "gst-calculator-australia": [
    {
      question: "What is the ATO one-eleventh rule?",
      answer: "Under Australian Taxation Office rules, the GST component in a tax-inclusive retail price is calculated by dividing the total price by 11. The remaining 10/11 is the net taxable amount.",
    },
    {
      question: "Are all products subject to GST in Australia?",
      answer: "No. While most goods and services incur 10% GST, certain essential supplies such as basic food, some medical services, and education courses are GST-free.",
    },
  ],
  "slug-generator": [
    {
      question: "How does the tool handle accents and diacritics?",
      answer: "It uses Unicode Normalization Form KD (NFKD) to decompose combined characters, converting letters like é, ñ, and ü into their standard Latin equivalents e, n, and u.",
    },
    {
      question: "Can non-Latin characters be used in URL slugs?",
      answer: "Yes. The generator preserves Unicode letters and numbers across scripts such as Arabic, Cyrillic, and Devanagari while stripping punctuation and spaces.",
    },
  ],
  "add-page-numbers": [
    {
      question: "Can I choose where page numbers appear?",
      answer: "Yes. You can place numbers in six positions: top-left, top-center, top-right, bottom-left, bottom-center, or bottom-right. You can also set the starting number and font size.",
    },
    {
      question: "Is the numbering applied to every page?",
      answer: "Yes. Numbers are stamped sequentially on every page in the document. The first page gets the start number you choose, and each subsequent page increments by one.",
    },
  ],
  "watermark-pdf": [
    {
      question: "Can I control how visible the watermark is?",
      answer: "Yes. You can set the opacity from 0.01 (nearly invisible) to 1.0 (fully opaque), choose the font size, and toggle diagonal or horizontal placement.",
    },
    {
      question: "Does this watermark every page?",
      answer: "Yes. The text watermark is centered on every page in the PDF. It uses a grey colour by default so it does not obscure the original content.",
    },
  ],
  "unlock-pdf": [
    {
      question: "What types of PDF encryption can this tool remove?",
      answer: "This tool works best on PDFs with owner-only restrictions or empty passwords. It loads the document with encryption bypassed and re-saves all pages into a new unrestricted PDF. Strongly encrypted files that block page extraction will fail.",
    },
    {
      question: "Is the password I enter stored or transmitted?",
      answer: "No. The password field is processed entirely in your browser. No credentials or file content leave your device.",
    },
  ],
  "edit-pdf": [
    {
      question: "Can I add text to a specific position on the page?",
      answer: "Yes. Enter the X and Y coordinates in PDF points (72 points = 1 inch). X measures from the left edge and Y measures from the bottom edge. You can also set font size and colour.",
    },
    {
      question: "Can I add multiple text annotations?",
      answer: "Yes. Click the add button to create additional annotations. Each one can target a different page and position. All annotations are applied in a single save.",
    },
  ],
  "pdf-forms": [
    {
      question: "What types of form fields are supported?",
      answer: "The tool auto-detects text fields, checkboxes, dropdowns, and radio buttons (AcroForm fields). Signature and button fields are shown but cannot be filled. XFA forms are not supported.",
    },
    {
      question: "What does flattening do?",
      answer: "Flattening converts interactive form fields into static page content. The values become part of the page drawing and can no longer be edited. This is useful for final documents.",
    },
  ],
  "pdf-pipeline": [
    {
      question: "How many operations can I chain?",
      answer: "There is no limit on the number of operations. Each step creates a new version. The only constraint is your browser memory since all versions are stored locally.",
    },
    {
      question: "Can I go back to an earlier version after applying several operations?",
      answer: "Yes. Click any version in the timeline to jump to it. You can also use the Undo and Redo buttons. Applying a new operation from an earlier version replaces later versions, like branching in version control.",
    },
  ],
  "delete-pdf-pages": [
    {
      question: "What happens if I try to delete all pages?",
      answer: "The tool refuses the operation. At least one page must remain in the output document. If you need an empty PDF, create a new one instead.",
    },
    {
      question: "Is the original file modified?",
      answer: "No. The remaining pages are copied into a brand-new PDF document. Your original file is never changed.",
    },
  ],
  "extract-pdf-pages": [
    {
      question: "How is this different from Split PDF?",
      answer: "Extract PDF Pages creates a new document containing only the pages you specify. Split PDF does the same thing but is named for a different search intent. Both use the same underlying page-extraction logic.",
    },
    {
      question: "Can I extract pages in a different order?",
      answer: "Yes. Enter page numbers in any order (e.g. 5, 1-3) and the extracted pages will appear in the order you specify.",
    },
  ],
  "sign-pdf": [
    {
      question: "Is this a legally binding digital signature?",
      answer: "This tool places a visual signature image on the PDF page. It does not use cryptographic digital signatures (PKI/X.509 certificates). Whether a visual signature is legally sufficient depends on your jurisdiction and the document type.",
    },
    {
      question: "What signature methods are available?",
      answer: "Three methods: draw freehand with your mouse or touchscreen, type your name and it renders in a cursive font, or upload an existing signature image (PNG or JPG). All methods produce an image that is embedded on the PDF page.",
    },
  ],
  "pdf-to-jpg": [
    {
      question: "What resolution are the output images?",
      answer: "At the default 2× scale the output is approximately 144 dpi, which is suitable for screens and most prints. You can increase the scale to 3× or 4× for higher resolution.",
    },
    {
      question: "How are multi-page PDFs handled?",
      answer: "Each page becomes a separate JPEG file. Multi-page PDFs download as a ZIP archive; single-page PDFs download as a standalone .jpg file.",
    },
  ],
  "compress-pdf": [
    {
      question: "How much can this tool reduce file size?",
      answer: "Typical savings are 5–20% on unoptimized PDFs. Files already saved with object streams may see little or no reduction. The tool uses lossless re-saving, so text and image quality are preserved.",
    },
    {
      question: "Does compression remove any content?",
      answer: "No. The tool copies all pages into a new document with object-stream compression. No images are downsampled and no text is removed.",
    },
  ],
  "text-compare": [
    {
      question: "Is my text uploaded to a server for diffing?",
      answer: "No. The comparison runs entirely client-side in your browser using an in-memory diff algorithm. Your text, contracts, and code are never transmitted across the network.",
    },
    {
      question: "What is the difference between line diff and word diff?",
      answer: "Line diff compares text line-by-line, which is ideal for code files and scripts. Word diff splits on whitespace to highlight specific inline phrase adjustments.",
    },
  ],
  "france-tva-calculator": [
    {
      question: "Quels sont les taux officiels de TVA en France ?",
      answer: "Les taux fixés par la DGFIP sont : 20% (taux normal), 10% (restauration, transports), 5.5% (produits alimentaires, livres), et 2.1% (médicaments remboursables, presse).",
    },
    {
      question: "Comment calculer la TVA inversée (TTC vers HT) ?",
      answer: "Pour trouver le montant HT depuis un montant TTC à 20%, divisez par 1.20 (HT = TTC / 1.20). La TVA correspond à la différence entre TTC et HT.",
    },
  ],
  "belgium-tva-calculator": [
    {
      question: "Quels sont les taux de TVA applicables en Belgique ?",
      answer: "Les taux officiels du SPF Finances sont : 21% (taux standard), 6% (produits de première nécessité, livres, rénovations) et 12% (restauration, logement social).",
    },
    {
      question: "Quelle est la différence entre la TVA belge et la TVA française ?",
      answer: "La Belgique applique un taux standard de 21% (contre 20% en France) et un taux réduit principal de 6% (contre 5.5% en France). Les règles de déductibilité sont spécifiques à chaque pays.",
    },
  ],
  "remove-duplicate-lines": [
    {
      question: "How does the duplicate line remover handle case sensitivity?",
      answer: "By default, comparison is case-sensitive, meaning 'Apple' and 'apple' are kept. You can uncheck Case Sensitive to treat variations in capitalization as identical lines.",
    },
    {
      question: "Is my text data stored or sent to a server?",
      answer: "No. Deduplication, whitespace trimming, and alphabetical sorting run 100% in client-side browser memory. No data is stored, cached, or transmitted.",
    },
  ],
  "color-converter": [
    {
      question: "Which color models are supported by this converter?",
      answer: "It supports HEX (3-digit #fff and 6-digit #ffffff), RGB (values 0-255), and HSL (hue 0-360 degrees, saturation and lightness 0-100%).",
    },
    {
      question: "Can I copy CSS formatted color values?",
      answer: "Yes. The tool outputs formatted CSS strings for rgb(r, g, b) and hsl(h, s%, l%) that can be copied directly into stylesheets.",
    },
  ],
  "unix-timestamp-converter": [
    {
      question: "What is the difference between Unix seconds and milliseconds?",
      answer: "Standard Unix timestamps count seconds (10 digits, e.g. 1774000000). JavaScript and modern APIs often use milliseconds (13 digits). The tool auto-detects both formats.",
    },
    {
      question: "How does the tool format local time zones?",
      answer: "It uses your browser's native IANA timezone database to display local date and time alongside standard UTC (Coordinated Universal Time).",
    },
  ],
  "jwt-decoder": [
    {
      question: "Does decoding a JWT verify its cryptographic signature?",
      answer: "No. Decoding inspects the Base64URL-encoded header and payload data. Signature verification requires checking against your backend private key or HMAC secret.",
    },
    {
      question: "Is it safe to paste confidential production JWTs into this tool?",
      answer: "Yes. Processing executes 100% inside your local browser memory using TextDecoder. No bearer tokens or authentication credentials are ever transmitted across the network.",
    },
  ],
  "url-encoder": [
    {
      question: "What is the difference between encoding a URL component and a full URL?",
      answer: "Component encoding escapes structural symbols like slash, question mark, and ampersand. Full URL encoding leaves protocol and query delimiters intact so the link still functions.",
    },
    {
      question: "Should spaces be encoded as %20 or + in URLs?",
      answer: "Standard RFC 3986 uses %20 for path and general URI encoding. The plus symbol is commonly used in application/x-www-form-urlencoded query strings. Both are supported.",
    },
  ],
  "json-to-typescript": [
    {
      question: "How does the tool handle nested objects and arrays?",
      answer: "Nested objects are recursively extracted into separate named child interfaces. Array items are inspected to infer element types or create multi-type union arrays.",
    },
    {
      question: "Can I choose between TypeScript interfaces and type aliases?",
      answer: "Yes. Toggle the Format selector between interface and type alias to generate standard interface declarations or type assignment blocks.",
    },
  ],
  "json-to-python": [
    {
      question: "Which Python versions and frameworks are supported?",
      answer: "Generated code is compatible with Python 3.8+ for dataclasses and TypedDict, and Pydantic v2 (FastAPI standard) with Field aliases for camelCase keys.",
    },
    {
      question: "How does the tool handle camelCase keys in Python?",
      answer: "When snake_case is enabled, camelCase keys like userId are converted to user_id, and Pydantic Field(alias='userId') is generated automatically.",
    },
  ],
  "csv-to-json": [
    {
      question: "How does the converter handle commas inside text cells?",
      answer: "Following the RFC 4180 specification, cells containing commas are enclosed in quotes. Literal quotation marks inside fields are escaped by doubling them.",
    },
    {
      question: "Can I convert tab-delimited (TSV) or semicolon-delimited files?",
      answer: "Yes. The delimiter dropdown supports auto-detection or explicit selection of comma, tab (TSV), semicolon, or pipe delimiters.",
    },
  ],
  "contrast-checker": [
    {
      question: "What is the minimum contrast ratio required by law under WCAG AA?",
      answer: "WCAG 2.1 Level AA requires a minimum ratio of 4.5:1 for body copy and regular text, and 3.0:1 for large text (18pt+ or 14pt bold) and active UI component borders.",
    },
    {
      question: "What is the difference between WCAG AA and AAA ratings?",
      answer: "Level AA is the standard legal baseline for accessibility. Level AAA is an enhanced standard requiring 7.0:1 contrast for regular text, ensuring high legibility for low-vision readers.",
    },
  ],
  "gradient-generator": [
    {
      question: "How do I use the generated gradient in Tailwind CSS?",
      answer: "Use Tailwind arbitrary value syntax by replacing spaces with underscores, for example bg-[linear-gradient(135deg,#f97316_0%,#ec4899_100%)].",
    },
    {
      question: "How many color stops can I add to a gradient?",
      answer: "The tool supports up to 6 custom color stops with individual percentage position controls from 0% to 100% along the gradient axis.",
    },
  ],
  "color-palette-generator": [
    {
      question: "How do I lock a color while generating new palettes?",
      answer: "Click the padlock icon at the top of any swatch to lock it. Pressing Spacebar or clicking Generate will keep your locked colors while randomizing the rest.",
    },
    {
      question: "Which color harmony modes are available?",
      answer: "The generator supports Analogous (adjacent colors), Monochromatic (single hue shades), Triadic (120-degree wheel triangle), and Complementary (opposite hue) schemes.",
    },
  ],
  "css-box-shadow-generator": [
    {
      question: "What is the difference between blur radius and spread radius?",
      answer: "Blur radius controls the softness and diffusion of the shadow edge. Spread radius expands or contracts the shadow perimeter in all directions before blur is applied.",
    },
    {
      question: "How do I create multi-layer shadows for realistic elevation?",
      answer: "Click '+ Add Layer' to composite multiple shadows. Stacking a sharp, dark contact shadow with a soft, diffused ambient shadow creates realistic lighting depth.",
    },
  ],
  "css-border-radius-generator": [
    {
      question: "How does the 8-value border-radius slash syntax work?",
      answer: "Values before the slash define horizontal radii, and values after define vertical radii. Combining different percentage values produces organic, asymmetrical liquid blob shapes.",
    },
    {
      question: "Is 8-point border-radius supported in all modern browsers?",
      answer: "Yes. Elliptical border-radius is part of W3C CSS Backgrounds Level 3 and is natively supported across all modern browsers without JavaScript polyfills.",
    },
  ],
  "regex-tester": [
    {
      question: "Which JavaScript regex flavor is supported?",
      answer: "The tester uses the standard ECMAScript (JavaScript) RegExp engine, supporting lookahead/lookbehind, named capture groups, and flags like g, i, m, s, and u.",
    },
    {
      question: "How does the tool protect against catastrophic backtracking?",
      answer: "The evaluator includes zero-length loop guards and limits total global match iterations, preventing browser freeze from runaway nested quantifier expressions.",
    },
  ],
  "cron-generator": [
    {
      question: "Which cron format does this tool support?",
      answer: "The tool supports the standard Unix/Linux 5-field cron syntax: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6).",
    },
    {
      question: "How are the upcoming execution dates calculated?",
      answer: "Next run dates are computed by evaluating your cron schedule against your local system clock and timezone, projecting the next 5 exact execution times.",
    },
  ],
  "sql-formatter": [
    {
      question: "Which SQL database dialects are supported?",
      answer: "The formatter adheres to standard ANSI SQL syntax and formats queries for PostgreSQL, MySQL, SQLite, MariaDB, SQL Server, Snowflake, and BigQuery.",
    },
    {
      question: "Does the formatter support SQL query minification?",
      answer: "Yes. Click 'Minify' to strip comments and excess whitespace, compressing your query into a single compact line suitable for production code.",
    },
  ],
  "barcode-generator": [
    {
      question: "Which barcode format should I choose for general logistics or shipping?",
      answer: "Code 128 is the industry standard for logistics, inventory, and packaging because it encodes any ASCII character with high density and error checking.",
    },
    {
      question: "How does the tool calculate EAN-13 check digits?",
      answer: "EAN-13 uses standard modulo-10 weighting. You can enter 12 digits and the generator calculates the 13th check digit automatically.",
    },
  ],
  "image-cropper": [
    {
      question: "Does cropping an image decrease its resolution or quality?",
      answer: "No. Cropping extracts a coordinate slice at 100% native resolution using hardware-accelerated HTML5 Canvas, preserving crisp pixel clarity.",
    },
    {
      question: "Which image file formats can be cropped and downloaded?",
      answer: "The tool supports JPG, PNG, and WebP files up to 15 MB. Cropped images download in the original source format with zero server uploads.",
    },
  ],
  "audio-trimmer": [
    {
      question: "Which audio formats can I upload and trim?",
      answer: "The trimmer supports MP3, WAV, OGG, AAC, and M4A audio files up to 50 MB, decoded in browser memory using the Web Audio API.",
    },
    {
      question: "What format does the trimmed audio file download in?",
      answer: "The trimmed segment is encoded directly to standard 16-bit PCM stereo/mono WAV, preserving pristine lossless acoustic quality.",
    },
  ],
};

export function faqsFor(id: string): FaqItem[] {
  return faqs[id] ?? [];
}
