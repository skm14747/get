export type GuideSection = {
  heading: string;
  content: string;
};

export type GuideFAQ = {
  question: string;
  answer: string;
};

export type GuideEntry = {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: GuideSection[];
  faqs: GuideFAQ[];
};

export const guideEntries: readonly GuideEntry[] = [
  /* ── Text Tools ── */
  {
    slug: "text-tools",
    title: "Free Online Text Tools — Word Counting, Case Conversion & Text Cleanup Guide",
    metaDescription:
      "Learn how to count words, convert text casing, compare documents, and clean up duplicate lines with free browser-based text tools. No sign-up or uploads required.",
    intro: `Whether you are polishing a college essay, drafting a tweet that must land under 280 characters, or renaming variables across a codebase, text manipulation is one of the most common tasks in both writing and software development. The challenge is that many popular text utilities require pasting sensitive content into cloud-hosted services, raising concerns about data retention, logging, and third-party access.

Browser-based text tools solve this problem by executing every operation entirely in your device's memory. The text you type or paste never leaves your browser tab — there is no HTTP request carrying your content to a remote server. This means confidential contracts, medical notes, and private journal entries stay private by design, not by policy.

Beyond privacy, client-side text tools are also faster. There is no network round-trip, no server queue, and no daily usage cap. The result appears as you type, which makes iterative editing — adjusting word count, toggling casing, or comparing two drafts — feel instantaneous.`,
    sections: [
      {
        heading: "How word and character counting works",
        content:
          "Word counting sounds trivial, but edge cases abound. Hyphens, em dashes, URLs, email addresses, and CJK characters all affect what counts as a 'word.' A good counter segments text using Unicode-aware boundaries (UAX #29), treats each CJK ideograph as a separate word-equivalent, and separately reports characters with and without spaces. When you need to hit a strict limit — a 160-character SMS, a 155-character meta description, or a 280-character tweet — the character counter should update in real time and visually flag the moment you exceed the threshold.",
      },
      {
        heading: "Case conversion beyond uppercase and lowercase",
        content:
          "Most people know UPPERCASE and lowercase, but developers regularly need camelCase (for JavaScript variables), PascalCase (for React components and C# classes), snake_case (for Python and Ruby identifiers), and kebab-case (for CSS classes and URL slugs). A reliable case converter handles Unicode accents (café → CAFÉ), Turkish dotless-i rules, and multi-word inputs. Sentence case capitalizes only the first letter after a period, while Title Case capitalizes every word except short prepositions — though style guides disagree on exactly which words to skip.",
      },
      {
        heading: "Comparing two texts effectively",
        content:
          "Diff checking highlights what was added, removed, or changed between two versions of a document. The most common algorithm, Myers diff, finds the shortest edit script between two sequences of lines. For prose editing, a word-level diff is often more useful than line-level because a single changed word does not force the entire line to show as replaced. When reviewing legal contracts or academic revisions, side-by-side diff with color-coded additions (green) and deletions (red) helps you catch every modification without reading both documents end-to-end.",
      },
      {
        heading: "Cleaning up duplicate lines and whitespace",
        content:
          "Messy text data — exported CSV columns, log files, clipboard pastes from spreadsheets — often contains duplicate lines, trailing spaces, and inconsistent blank lines. A text cleaner that deduplicates lines, trims whitespace, and optionally sorts alphabetically can save minutes of manual editing. The key workflow tip: always deduplicate before sorting, because sorting first may scatter near-duplicate lines (differing only by trailing whitespace) far apart, making them harder to spot.",
      },
    ],
    faqs: [
      {
        question: "Is my text uploaded to a server when I use these tools?",
        answer:
          "No. All text processing runs entirely in your browser using JavaScript. Your content never leaves your device — there is no server request, no cloud storage, and no logging.",
      },
      {
        question: "How accurate is the word count for non-English text?",
        answer:
          "The counter uses Unicode segmentation (UAX #29), which correctly handles accented characters, CJK ideographs, and scripts like Devanagari. Each CJK character is counted as one word-equivalent.",
      },
      {
        question: "Can I convert between camelCase and snake_case?",
        answer:
          "Yes. The case converter supports camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, lowercase, Title Case, and Sentence case. Paste any text and select the target casing.",
      },
    ],
  },

  /* ── Calculators ── */
  {
    slug: "calculators",
    title: "Online Percentage, Discount & Unit Calculators — Free Math Tools Guide",
    metaDescription:
      "Learn how to calculate percentages, discounts, unit conversions, and date differences with free online calculators that show step-by-step formulas.",
    intro: `Everyday math — calculating a tip, figuring out how much you save during a 30%-off sale, or converting kilograms to pounds for a recipe — should not require opening a spreadsheet or searching for a half-remembered formula. Online calculators make these computations instant, but the best ones go further: they show you the formula alongside the result so you can verify the logic and learn the underlying mathematics.

Transparency matters because calculators are often used for financial decisions. If a discount calculator tells you a price but hides the formula, you cannot confirm whether it applied the discount to the pre-tax or post-tax amount. Similarly, a percentage change calculator should clearly state whether it computed (new − old) ÷ old × 100 (directional change) or |a − b| ÷ ((a + b) / 2) × 100 (symmetric percentage difference), because those are fundamentally different operations.

GoEasyTools calculators display the exact formula used for every result, handle edge cases like division by zero gracefully, and support international number formatting. All computation happens client-side, so there is no latency and no data collection — your financial figures stay on your device.`,
    sections: [
      {
        heading: "Understanding percentage calculations",
        content:
          "There are several distinct percentage operations people conflate. 'What is 15% of 200?' is a simple multiplication (200 × 0.15 = 30). 'What percentage is 30 of 200?' is a division (30 ÷ 200 × 100 = 15%). 'Percentage change from 200 to 230' is directional ((230 − 200) ÷ 200 × 100 = 15%). And 'percentage difference between 200 and 230' is symmetric (|230 − 200| ÷ ((200 + 230) / 2) × 100 ≈ 13.95%). Knowing which operation you need prevents the most common errors in business reports and academic work.",
      },
      {
        heading: "How discount stacking actually works",
        content:
          "A 20% discount followed by a 10% discount is not the same as a 30% discount. The first discount reduces the price to 80% of the original; the second reduces that result to 90% of the already-reduced price. So the effective multiplier is 0.80 × 0.90 = 0.72, meaning a 28% total discount — not 30%. This catches many shoppers off guard. A good discount calculator lets you enter both discounts sequentially and shows the intermediate price, the final price, and the actual effective discount percentage.",
      },
      {
        heading: "Unit conversion precision and common pitfalls",
        content:
          "Unit converters should use exact conversion factors from international standards. One inch is exactly 25.4 mm (by definition since 1959). One pound is exactly 0.45359237 kg. Temperature conversion between Celsius and Fahrenheit uses F = C × 9/5 + 32, with Kelvin offset at 273.15. Common mistakes include confusing fluid ounces (volume) with ounces (weight), or using the approximate 2.2 multiplier for kg-to-pounds instead of the precise 2.20462 factor. For scientific and engineering work, always verify which conversion factor your tool applies.",
      },
      {
        heading: "Date arithmetic and business day counting",
        content:
          "Counting days between two dates is trickier than subtracting numbers because of varying month lengths (28–31 days), leap years (every 4 years, except centuries, except 400-year marks), and the question of whether to count the start date, end date, or both. Business day calculations add another layer by excluding Saturdays and Sundays. The standard approach counts Monday-through-Friday days using ISO 8601 dates (YYYY-MM-DD), which avoids ambiguity with MM/DD/YYYY vs DD/MM/YYYY formats.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between percentage change and percentage difference?",
        answer:
          "Percentage change is directional — it measures how much a value increased or decreased relative to the original. Percentage difference is symmetric — it measures the gap between two values relative to their average, regardless of which came first.",
      },
      {
        question: "Why is a 20% + 10% discount not equal to 30% off?",
        answer:
          "Because the second discount applies to the already-reduced price, not the original. 20% off $100 gives $80; 10% off $80 gives $72. That is a 28% total discount, not 30%.",
      },
      {
        question: "Do the calculators work offline?",
        answer:
          "Once the page has loaded, all calculations run entirely in your browser with no server calls. If your browser has cached the page, the calculators will continue to work without an internet connection.",
      },
    ],
  },

  /* ── Developer Tools ── */
  {
    slug: "developer-tools",
    title: "Free Online Developer Tools — JSON, Base64, Regex, QR Code & More",
    metaDescription:
      "Explore browser-based developer utilities: JSON formatting, Base64 encoding, regex testing, QR code generation, JWT decoding, color conversion, and CSS generators.",
    intro: `Developers constantly context-switch between writing code and running quick utility tasks — formatting a JSON API response to read it, encoding a token in Base64, testing a regex pattern against sample data, or generating a QR code for a demo. These micro-tasks interrupt flow if they require installing CLI tools, opening a separate app, or pasting sensitive payloads into unknown websites.

Client-side developer tools eliminate that friction. Because parsing, encoding, and rendering happen in the browser's JavaScript runtime, there is no risk of leaking API keys, JWT tokens, database connection strings, or other secrets to third-party servers. The tools load once and work instantly, with no rate limits, no accounts, and no tracking.

GoEasyTools provides over 20 developer utilities spanning data formatting (JSON, SQL, CSV), encoding (Base64, URL), security (password generation, JWT inspection), visual design (color conversion, gradients, contrast checking), and code generation (TypeScript interfaces, Python models, cron expressions). Every tool is designed for keyboard-driven workflows with copy-to-clipboard shortcuts and real-time output.`,
    sections: [
      {
        heading: "JSON formatting and validation",
        content:
          "Pretty-printing JSON makes deeply nested API responses readable by adding indentation and line breaks. But formatting alone is not enough — a good JSON tool should also validate the input, pinpointing the exact line and column of syntax errors like trailing commas, unquoted keys, or mismatched brackets. Minification does the reverse: it strips whitespace to produce the smallest possible payload, which is useful when pasting JSON into configuration files, environment variables, or URL query parameters where size matters.",
      },
      {
        heading: "Encoding, decoding, and token inspection",
        content:
          "Base64 encoding converts binary or UTF-8 text into an ASCII-safe string, which is essential for embedding data in JSON, HTML data-URIs, and email attachments (MIME). URL encoding (percent-encoding) escapes special characters so they can appear safely in query strings and path segments. JWT decoding lets you inspect the header (algorithm, key ID) and payload (claims, expiration, issuer) of a JSON Web Token without verifying the signature — useful for debugging authentication flows and checking whether a token has expired.",
      },
      {
        heading: "Regular expressions and cron schedules",
        content:
          "Regex testing with live match highlighting and capture group extraction dramatically speeds up pattern development. The key features to look for are flag toggles (global, case-insensitive, multiline, dotAll), a substitution preview, and a quick-reference sidebar for syntax. Cron expression generators serve a similar 'build and verify' purpose: you visually configure a schedule (e.g., every weekday at 9:30 AM), see the 5-part cron string, read its plain-English translation, and check the next five execution dates — all before committing it to your CI/CD pipeline.",
      },
      {
        heading: "Visual design tools for developers",
        content:
          "Color converters (HEX ↔ RGB ↔ HSL), contrast checkers (WCAG 2.1 AA/AAA), gradient generators, and box-shadow builders bridge the gap between design and code. A contrast checker is particularly important for accessibility compliance: it calculates the luminance ratio between foreground and background colors and tells you whether the combination passes for normal text (4.5:1), large text (3:1), and UI components (3:1). CSS generators output copy-ready code, so you can experiment visually and paste the result directly into your stylesheet.",
      },
    ],
    faqs: [
      {
        question: "Is it safe to paste API keys and tokens into these tools?",
        answer:
          "Yes. All processing runs in your browser's JavaScript runtime. No data is sent to any server — there are no network requests, no logging, and no analytics on tool input. Your secrets stay on your device.",
      },
      {
        question: "What JSON errors can the formatter detect?",
        answer:
          "The formatter detects trailing commas, missing commas, unquoted property names, single-quoted strings, mismatched brackets and braces, and invalid escape sequences. It reports the exact line and column of each error.",
      },
      {
        question: "Can I generate TypeScript types from a JSON API response?",
        answer:
          "Yes. Paste any JSON payload into the JSON-to-TypeScript tool and it will infer interfaces with proper types for strings, numbers, booleans, arrays, nested objects, and nullable fields.",
      },
      {
        question: "How does the password generator ensure randomness?",
        answer:
          "It uses the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure pseudorandom numbers sourced from the operating system's entropy pool — the same quality used for TLS key generation.",
      },
    ],
  },

  /* ── Image Tools ── */
  {
    slug: "image-tools",
    title: "Free Online Image Tools — Compress, Resize & Crop Images in Browser",
    metaDescription:
      "Learn how to compress, resize, and crop JPG, PNG, and WebP images entirely in your browser. No uploads, no quality loss, and no daily limits.",
    intro: `Images account for the majority of page weight on most websites. A single unoptimized photo can be several megabytes, dramatically slowing page loads and hurting both user experience and search engine rankings. Image optimization — compressing, resizing, and cropping — is therefore a critical step in every web development, content creation, and social media workflow.

The traditional approach involves cloud-based tools that upload your images to a remote server, process them, and return the result. This works, but it introduces privacy risks (your photos on someone else's server), speed limitations (upload time depends on your connection), and usage caps (free tiers typically limit daily conversions). Browser-based image tools avoid all three problems by processing images directly in your device's memory using the HTML5 Canvas API.

When you compress an image in the browser, the tool draws it onto an invisible canvas element, then re-encodes it as JPEG, PNG, or WebP at your chosen quality level. The file never leaves your computer. This means family photos, ID documents, medical images, and other sensitive visuals remain completely private.`,
    sections: [
      {
        heading: "How image compression works in the browser",
        content:
          "JPEG compression works by converting the image from RGB to YCbCr color space, applying a Discrete Cosine Transform to 8×8 pixel blocks, and quantizing the resulting coefficients — higher quantization means smaller files but more visible artifacts. PNG compression is lossless: it applies DEFLATE encoding to the filtered pixel data, so quality is preserved but file size reduction is more modest. WebP supports both lossy and lossless modes and typically achieves 25-35% smaller files than JPEG at equivalent quality. When compressing, always compare the before-and-after file sizes and visually inspect the output at 100% zoom to catch quality degradation.",
      },
      {
        heading: "Resizing images for different platforms",
        content:
          "Different platforms require different image dimensions: Instagram posts are 1080×1080, LinkedIn banners are 1584×396, YouTube thumbnails are 1280×720, and website favicons are 32×32 or 16×16. When resizing, maintaining the aspect ratio prevents distortion — if you change the width, the height should adjust proportionally, and vice versa. For downscaling, the browser's canvas uses bilinear interpolation by default, which produces smooth results for photos. For pixel art or screenshots, nearest-neighbor interpolation preserves sharp edges.",
      },
      {
        heading: "Cropping with aspect ratios",
        content:
          "Cropping removes unwanted areas from an image while focusing on the subject. Aspect ratio presets (1:1 for profile pictures, 16:9 for video thumbnails, 4:3 for standard photos) ensure the crop fits the target platform. A good cropper shows a grid overlay (rule of thirds) to help compose the shot, allows dragging and resizing the crop area, and displays the resulting pixel dimensions in real time. For batch workflows, applying a consistent aspect ratio across multiple images ensures visual uniformity in galleries and social media feeds.",
      },
      {
        heading: "Choosing the right format",
        content:
          "JPEG is best for photographs with millions of colors and smooth gradients. PNG is ideal for graphics with sharp edges, text, transparency, or flat colors — logos, icons, and screenshots. WebP handles both use cases and produces smaller files, but older browsers may not support it. As a rule of thumb: use JPEG for photos, PNG for graphics and anything requiring transparency, and WebP when you control the viewing environment (your own website with a fallback). Always check the output file size and visual quality before publishing.",
      },
    ],
    faqs: [
      {
        question: "Will compressing an image reduce its quality?",
        answer:
          "JPEG and lossy WebP compression trade some quality for smaller file sizes. At moderate quality settings (70-85%), the difference is usually imperceptible. PNG compression is lossless — the image is identical, just stored more efficiently.",
      },
      {
        question: "What is the maximum image size I can process?",
        answer:
          "The limit depends on your device's available memory. Modern browsers can typically handle images up to 50-100 megapixels. Very large images (100+ MP) may cause the browser tab to run out of memory on devices with limited RAM.",
      },
      {
        question: "Can I compress multiple images at once?",
        answer:
          "The image compressor processes one image at a time for maximum control over quality settings. For batch workflows, you can process images sequentially — each one is instant since there is no upload delay.",
      },
    ],
  },

  /* ── PDF Tools ── */
  {
    slug: "pdf-tools",
    title: "Free Online PDF Tools — Merge, Split, Edit & Sign PDFs in Browser",
    metaDescription:
      "Learn how to merge, split, compress, edit, sign, and convert PDF files entirely in your browser. No uploads required — your documents stay private.",
    intro: `PDF files are the backbone of document exchange — contracts, invoices, tax forms, medical records, academic papers, and legal filings all rely on the Portable Document Format. Working with PDFs often requires combining multiple files, extracting specific pages, adding signatures, or reducing file size for email attachments. Unfortunately, most online PDF tools require uploading your documents to a remote server, which is a significant privacy and compliance concern for sensitive materials.

Browser-based PDF processing eliminates the upload entirely. Using libraries like pdf-lib (for manipulation) and pdf.js (for rendering), all operations — merging, splitting, rotating, cropping, watermarking, compressing, and signing — execute directly in your browser's JavaScript runtime. Your documents stay on your device throughout the entire process.

GoEasyTools offers a comprehensive suite of 17 PDF tools covering every common workflow, plus a unique PDF Pipeline that lets you chain multiple operations (rotate → crop → watermark → compress) in a single session with full undo/redo history.`,
    sections: [
      {
        heading: "Merging and splitting PDF documents",
        content:
          "Merging combines multiple PDF files into a single document in your chosen order — essential for assembling application packages, combining scanned receipts, or creating consolidated reports. The key consideration is page ordering: a good merge tool lets you drag files into the desired sequence before combining. Splitting does the reverse: it extracts specific pages or page ranges (e.g., '1-3, 7, 10-12') into a new standalone PDF. This is useful for extracting a signature page from a contract, isolating a chapter from a textbook, or removing sensitive pages before sharing a document.",
      },
      {
        heading: "Editing and annotating PDFs",
        content:
          "PDF editing in the browser covers adding text annotations, stamping page numbers, applying watermarks, and placing visual signatures. Text annotations let you place custom text at exact coordinates with font size and color control — useful for filling in non-interactive forms. Page numbers can be stamped in six positions (top/bottom × left/center/right). Watermarks add semi-transparent text diagonally or horizontally across every page, which is standard for marking documents as 'DRAFT', 'CONFIDENTIAL', or 'SAMPLE'. For electronic signatures, you can draw freehand, type your name in a cursive font, or upload a signature image.",
      },
      {
        heading: "Compressing PDFs for email and storage",
        content:
          "PDF file size is often dominated by embedded images, fonts, and unoptimized object streams. Browser-based compression works by re-saving the PDF with optimized object-stream encoding, which can reduce file size by 10-50% depending on the original document's structure. Documents with large embedded photos benefit the most; already-optimized PDFs may see minimal reduction. For the best results, combine compression with image quality reduction if the PDF contains photographs. Always compare the compressed output's visual quality against the original before sending.",
      },
      {
        heading: "Converting between PDF and image formats",
        content:
          "PDF-to-image conversion renders each page as a JPEG or PNG at a configurable resolution — useful for embedding PDF content in presentations, sharing individual pages on social media, or creating image previews. The reverse direction, image-to-PDF, places photos on standard A4 pages or uses the image's native dimensions, which is ideal for digitizing printed documents or creating photo portfolios. Multi-page conversions (PDF to multiple images, or multiple images to one PDF) are supported, with ZIP downloads for batch image exports.",
      },
    ],
    faqs: [
      {
        question: "Are my PDF files uploaded to any server?",
        answer:
          "No. All PDF processing runs in your browser using the pdf-lib JavaScript library. Your files are read into browser memory, processed locally, and downloaded directly to your device. No data is transmitted over the network.",
      },
      {
        question: "Can I merge password-protected PDFs?",
        answer:
          "If a PDF requires a password to open, you will need to enter that password first. The Unlock PDF tool can remove owner-level restrictions (like print-disabled) from PDFs that have an empty or owner-only password.",
      },
      {
        question: "What is the PDF Pipeline tool?",
        answer:
          "PDF Pipeline lets you upload a PDF once and then apply multiple operations in sequence — rotate, crop, add watermarks, compress, delete pages, and more — with full undo/redo history. It eliminates the need to download and re-upload between each step.",
      },
      {
        question: "Is the electronic signature legally binding?",
        answer:
          "The signature tool places a visual image of your signature on the PDF. Legal validity depends on your jurisdiction and the requirements of the recipient. For most informal and many business purposes, a visual signature on a PDF is accepted.",
      },
    ],
  },

  /* ── Converters ── */
  {
    slug: "converters",
    title: "Free Unit Converter — Length, Weight, Temperature, Volume & Speed",
    metaDescription:
      "Convert between metric and imperial units for length, mass, temperature, area, volume, and speed. Exact scientific constants and step-by-step formulas shown.",
    intro: `Unit conversion is one of those tasks that seems simple until you encounter the edge cases. Converting inches to centimeters is straightforward (multiply by 2.54), but what about converting fluid ounces to milliliters, where the US fluid ounce (29.5735 mL) differs from the Imperial fluid ounce (28.4131 mL)? Or converting Fahrenheit to Celsius, where the formula is not a simple multiplier but requires both multiplication and subtraction?

A reliable unit converter needs to use exact scientific constants as defined by international metrology standards. It should clearly display the formula applied, support bidirectional conversion (meters to feet and feet to meters), and handle decimal precision appropriate to the measurement context — cooking conversions may need one decimal place, while engineering specifications may need six.

GoEasyTools covers six measurement categories — length, mass, temperature, area, volume, and speed — using internationally standardized conversion factors. Every result shows the underlying formula, so you can verify the math and understand the relationship between units.`,
    sections: [
      {
        heading: "Length and distance conversions",
        content:
          "The metric system (millimeters, centimeters, meters, kilometers) and the imperial system (inches, feet, yards, miles) coexist worldwide. The exact definition since 1959: one inch equals 25.4 millimeters, one foot equals 0.3048 meters, one yard equals 0.9144 meters, and one mile equals 1.609344 kilometers. For everyday use, the approximation '1 inch ≈ 2.5 cm' works for quick estimates, but engineering, construction, and scientific applications require the exact factor. Nautical miles (1,852 meters) are a separate unit used in maritime and aviation contexts.",
      },
      {
        heading: "Mass and weight conversions",
        content:
          "Mass (measured in grams and kilograms) and weight (a force that depends on gravity) are scientifically distinct, but in everyday usage the terms are interchangeable. The avoirdupois system used in the US and UK defines one pound as exactly 0.45359237 kilograms and one ounce as 1/16 of a pound (28.349523125 grams). Troy ounces (31.1035 grams), used for precious metals, are heavier than avoirdupois ounces — a frequent source of confusion. For cooking, metric measurements (grams) are more precise than volume-based imperial measures (cups), which is why professional recipes use weight.",
      },
      {
        heading: "Temperature scale relationships",
        content:
          "Three temperature scales are in common use: Celsius (water freezes at 0°, boils at 100°), Fahrenheit (freezes at 32°, boils at 212°), and Kelvin (absolute zero at 0 K, water freezes at 273.15 K). The Celsius-to-Fahrenheit formula (F = C × 9/5 + 32) involves both multiplication and an offset, which makes mental math harder than pure-ratio conversions. Some useful reference points: 37°C = 98.6°F (body temperature), 100°F ≈ 37.8°C, −40° is the same in both Celsius and Fahrenheit, and room temperature is about 20-22°C (68-72°F).",
      },
    ],
    faqs: [
      {
        question: "What conversion factors does the tool use?",
        answer:
          "The converter uses exact international standard factors: 1 inch = 25.4 mm, 1 pound = 0.45359237 kg, 1 calorie = 4.184 joules, etc. The specific formula is displayed alongside every result.",
      },
      {
        question: "Can I convert between metric and imperial cooking measurements?",
        answer:
          "Yes. You can convert between grams, ounces, pounds, and kilograms for weight, and between milliliters, liters, cups, and fluid ounces for volume. Use weight-based conversions for the most accurate cooking results.",
      },
      {
        question: "Why does the tool show so many decimal places?",
        answer:
          "Full precision is shown by default for scientific and engineering accuracy. For everyday use, you can safely round to 1-2 decimal places. The displayed formula lets you verify the exact conversion applied.",
      },
    ],
  },

  /* ── Date and Time ── */
  {
    slug: "date-and-time",
    title: "Date & Time Calculators — Days Between Dates, Age & Business Days",
    metaDescription:
      "Calculate days between dates, business days, chronological age, and future deadlines. ISO 8601 calendar math with leap year handling.",
    intro: `Date and time calculations underpin project planning, contract management, age verification, and personal milestones. Yet calendar math is surprisingly error-prone because months have different lengths (28, 29, 30, or 31 days), leap years add an extra day every four years (with century exceptions), and the distinction between calendar days and business days matters enormously for deadlines and billing.

Consider a simple question: how many days between January 31 and March 1? In a non-leap year, that is 29 days (all of February). In a leap year, it is 30. If the question asks for business days, weekends must be excluded, potentially reducing the count by 8-9 days. And if the contract specifies 'within 30 business days,' the actual calendar span could be 6 weeks or more depending on when weekends fall.

GoEasyTools date calculators use ISO 8601 date formatting (YYYY-MM-DD), which eliminates ambiguity between American MM/DD/YYYY and European DD/MM/YYYY conventions. All calculations account for leap years, and business day counts exclude Saturdays and Sundays by default.`,
    sections: [
      {
        heading: "Counting days between two dates",
        content:
          "The 'days between' calculation counts the number of midnights between a start date and an end date. This is an inclusive-of-end or exclusive-of-end question that varies by context. Most date calculators count the number of days you would cross off on a calendar — if you start on Monday the 1st and end on Wednesday the 3rd, that is 2 days (crossing midnight twice). For rental agreements and hotel stays, this 'nights' count is standard. For event duration ('the festival runs from the 1st to the 3rd'), the inclusive count of 3 days may be more appropriate.",
      },
      {
        heading: "Business day calculations",
        content:
          "Business days (Monday through Friday) are the standard for legal deadlines, shipping estimates, payment terms (Net 30 business days), and project timelines. Counting business days between two dates requires iterating through the calendar and skipping Saturdays and Sundays. Adding business days to a start date (e.g., '15 business days from today') is common for delivery estimates. Note that public holidays are not automatically excluded because they vary by country and region — if holiday exclusion is critical, you should manually adjust the result.",
      },
      {
        heading: "Age calculation and leap year handling",
        content:
          "Chronological age in years, months, and days is calculated by comparing a birth date to a target date. The tricky part is February 29: a person born on Feb 29 in a leap year has their birthday on Feb 28 (or March 1, depending on jurisdiction) in non-leap years. The standard calculation goes: subtract the birth year from the current year, then adjust backwards by one year if the birthday has not yet occurred this year. The months and remaining days are computed similarly, borrowing from the previous month when needed (similar to subtraction with regrouping).",
      },
    ],
    faqs: [
      {
        question: "Does the business day calculator account for holidays?",
        answer:
          "The calculator counts Monday-through-Friday days, excluding weekends. Public holidays vary by country and are not automatically excluded. You can manually adjust the result for known holidays.",
      },
      {
        question: "How is age calculated for someone born on February 29?",
        answer:
          "In non-leap years, the calculator treats the birthday as February 28 for age computation. The person turns one year older on February 28 in non-leap years and February 29 in leap years.",
      },
      {
        question: "What date format does the calculator use?",
        answer:
          "The calculator uses ISO 8601 format (YYYY-MM-DD) internally, which eliminates ambiguity between American (MM/DD) and European (DD/MM) conventions. The display format is localized for readability.",
      },
    ],
  },

  /* ── Finance ── */
  {
    slug: "finance",
    title: "Free Financial Calculators — GST, VAT, EMI & Loan Payment Tools",
    metaDescription:
      "Calculate GST, VAT, loan EMI payments, and tax breakdowns with transparent formulas. Supports India GST, UK VAT, Australian GST, French TVA, and Belgian TVA.",
    intro: `Financial calculations — tax breakdowns, loan repayment schedules, and discount computations — directly affect purchasing decisions, budget planning, and business accounting. Yet many online financial calculators are designed primarily as lead-generation tools: they require your phone number or email before showing results, or they display results without explaining the underlying formula, making it impossible to verify correctness.

Transparent financial calculators show every step: the formula used, the intermediate values, and the final result. When calculating GST (Goods and Services Tax), you should see the net amount, the tax rate applied, the CGST and SGST breakdown (for intra-state transactions in India) or the IGST amount (for inter-state), and the gross total. For loan EMI (Equated Monthly Installment) calculations, the formula, monthly payment, total interest paid, and a full amortization schedule should all be visible.

GoEasyTools financial calculators cover Indian GST with CGST/SGST/IGST splits, UK VAT at 20% and 5% rates, Australian GST at 10%, French TVA at four official rates, Belgian TVA at three rates, and loan EMI with reducing-balance amortization up to 30 years.`,
    sections: [
      {
        heading: "GST calculation: inclusive vs. exclusive",
        content:
          "There are two fundamental GST operations. Exclusive (forward) calculation adds GST to a net price: if the net price is ₹1,000 and the GST rate is 18%, the tax is ₹180 and the gross price is ₹1,180. Inclusive (reverse) calculation extracts GST from a gross price: given ₹1,180 inclusive of 18% GST, the net price is ₹1,180 ÷ 1.18 = ₹1,000 and the GST is ₹180. The reverse calculation is essential for businesses that receive invoices with tax-inclusive prices and need to record the net amount and tax separately in their accounting systems.",
      },
      {
        heading: "Understanding EMI and amortization",
        content:
          "EMI (Equated Monthly Installment) is calculated using the reducing-balance formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the number of months. Each monthly payment comprises both interest and principal repayment. In the early months, most of the EMI goes toward interest; as the outstanding principal decreases, a larger share goes toward principal repayment. An amortization schedule shows this month-by-month breakdown, which is valuable for understanding the total cost of a loan and planning prepayments.",
      },
      {
        heading: "International VAT and TVA systems",
        content:
          "VAT (Value Added Tax) operates similarly to GST but under different names and rates across countries. The UK applies a standard rate of 20% and a reduced rate of 5%. Australia uses a flat 10% GST with a 'one-eleventh rule' for reverse calculations (GST = gross ÷ 11). France applies TVA at 20% (standard), 10% (intermediate), 5.5% (reduced), and 2.1% (super-reduced). Belgium applies BTW/TVA at 21%, 12%, and 6%. Using the correct country-specific rate and understanding whether a price is tax-inclusive or tax-exclusive prevents costly accounting errors.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between CGST, SGST, and IGST?",
        answer:
          "In India, intra-state transactions split GST equally between Central GST (CGST) and State GST (SGST). Inter-state transactions apply Integrated GST (IGST) at the full rate. The total tax amount is the same either way.",
      },
      {
        question: "How accurate is the EMI calculator?",
        answer:
          "The calculator uses the standard reducing-balance EMI formula used by banks. The result may differ slightly from your bank's figure due to rounding conventions, processing fees, and the exact day-count method used for interest accrual.",
      },
      {
        question: "Can I calculate VAT for countries not listed?",
        answer:
          "The dedicated tools cover India, UK, Australia, France, and Belgium. For other countries, you can use the percentage calculator with the applicable VAT rate to compute the same forward and reverse calculations.",
      },
    ],
  },

  /* ── Audio Tools ── */
  {
    slug: "audio-tools",
    title: "Free Online Audio & Media Tools — Trim, Speed Change & Video to GIF",
    metaDescription:
      "Trim audio files, change playback speed, and convert video to GIF in your browser. Supports MP3, WAV, AAC, OGG, MP4, and WebM with zero server uploads.",
    intro: `Audio and video editing traditionally requires heavyweight desktop software like Audacity, Adobe Premiere, or Final Cut Pro. But for quick, focused tasks — trimming a voice memo to extract a key quote, speeding up a podcast to save listening time, or converting a short video clip into an animated GIF for social media — these full-featured editors are overkill. You end up waiting for the application to launch, navigating complex multi-track timelines, and exporting through codec settings you do not need.

Browser-based media tools handle these targeted operations with minimal friction. The Web Audio API provides access to audio decoding, waveform visualization, and real-time playback manipulation directly in the browser. For video-to-GIF conversion, the HTML5 Canvas API captures individual video frames and assembles them into an animated GIF with configurable frame rate and resolution.

The critical advantage, as with all GoEasyTools, is privacy. Voice recordings, personal videos, interview audio, and meeting recordings never leave your device. There is no upload, no cloud processing, and no file stored on anyone else's server.`,
    sections: [
      {
        heading: "Trimming audio with waveform precision",
        content:
          "Audio trimming involves selecting a start point and end point within a recording and exporting only that segment. Visual waveform display is essential for precision — the amplitude peaks and valleys let you identify speech segments, silence gaps, and musical transitions at a glance. The best trimming workflow involves: (1) loading the file and viewing the full waveform, (2) clicking or dragging to set the start and end markers, (3) previewing the selection with real-time playback, and (4) exporting the trimmed segment. For podcasts and interviews, trimming is commonly used to extract soundbites, remove dead air at the beginning and end, or isolate a specific answer.",
      },
      {
        heading: "Changing audio playback speed",
        content:
          "Speed adjustment modifies the tempo of an audio recording without changing its pitch (time-stretching) or with proportional pitch change (resampling). Time-stretching is preferred for speech because it keeps voices sounding natural even at 1.5x or 2x speed. Common use cases include speeding up lecture recordings for faster review, slowing down language learning audio to catch pronunciation details, and adjusting podcast playback to fit available commute time. The Web Audio API's playbackRate property handles basic speed changes, while more advanced algorithms (like WSOLA) provide better quality at extreme speeds.",
      },
      {
        heading: "Converting video clips to animated GIFs",
        content:
          "Animated GIFs remain popular for sharing short, looping video clips on social media, messaging apps, and documentation. The conversion process extracts individual frames from the video at a specified frame rate (typically 10-15 fps for GIFs), optionally resizes them, and encodes them into the GIF format. Key settings to control are: duration (trim the video to the desired segment first), frame rate (higher = smoother but larger file), and resolution (lower = smaller file size). GIF files can be very large compared to video — a 5-second 720p GIF at 15fps can easily exceed 10 MB — so reducing resolution to 480p or 320p is often necessary for practical sharing.",
      },
    ],
    faqs: [
      {
        question: "What audio formats are supported?",
        answer:
          "The tools support MP3, WAV, AAC, and OGG formats. These are decoded using the browser's built-in Web Audio API, which supports any format your browser can play natively.",
      },
      {
        question: "Will changing the speed affect the audio pitch?",
        answer:
          "The speed changer adjusts tempo while preserving the original pitch, so voices sound natural even at 2x speed. This uses time-stretching rather than simple resampling.",
      },
      {
        question: "How can I reduce the file size of a generated GIF?",
        answer:
          "Lower the resolution (e.g., 480p instead of 720p), reduce the frame rate (10 fps instead of 15), and trim the video to the shortest necessary duration. These three factors have the biggest impact on GIF file size.",
      },
    ],
  },
] as const;

export function getGuideEntry(slug: string): GuideEntry | undefined {
  return guideEntries.find((entry) => entry.slug === slug);
}

export function allGuideSlugs(): string[] {
  return guideEntries.map((entry) => entry.slug);
}
