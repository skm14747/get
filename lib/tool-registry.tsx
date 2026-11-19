import type { ReactNode } from "react";
import { AgeTool } from "@/components/age-tool";
import { Base64Tool } from "@/components/base64-tool";
import { CaseConverterTool } from "@/components/case-converter-tool";
import { CaseGuide } from "@/components/case-guide";
import { CharacterTool } from "@/components/character-tool";
import { DateTool } from "@/components/date-tool";
import { DiscountCalculatorTool } from "@/components/discount-calculator-tool";
import { DiscountGuide } from "@/components/discount-guide";
import { EmiTool } from "@/components/emi-tool";
import { GstTool } from "@/components/gst-tool";
import { ImageTool } from "@/components/image-tool";
import { JsonTool } from "@/components/json-tool";
import { PasswordTool } from "@/components/password-tool";
import { PdfTool } from "@/components/pdf-tool";
import { PercentageCalculatorTool } from "@/components/percentage-calculator-tool";
import { PercentageGuide } from "@/components/percentage-guide";
import { QrTool } from "@/components/qr-tool";
import { UnitTool } from "@/components/unit-tool";
import { WordCounterGuide } from "@/components/word-counter-guide";
import { WordCounterTool } from "@/components/word-counter-tool";
import { AustraliaGstTool } from "@/components/australia-gst-tool";
import { AustraliaGstGuide } from "@/components/australia-gst-guide";
import { UkVatTool } from "@/components/uk-vat-tool";
import { UkVatGuide } from "@/components/uk-vat-guide";
import { SlugTool } from "@/components/slug-tool";
import { SlugGuide } from "@/components/slug-guide";
import { TextDiffTool } from "@/components/text-diff-tool";
import { TextDiffGuide } from "@/components/text-diff-guide";
import type { ToolDefinition } from "@/lib/tools";

type InlineGuideProps = { tool?: ToolDefinition; heading: string; body: string };

function InlineGuide({ heading, body }: InlineGuideProps) {
  return (
    <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <p>{body}</p>
      <h2 className="text-xl font-semibold">Privacy</h2>
      <p>Processing stays in this browser. The page does not put the contents in the address or in measurement events.</p>
    </div>
  );
}

type ToolEntry = {
  render: () => ReactNode;
  guide: (tool: ToolDefinition) => ReactNode;
};

const registry: Record<string, ToolEntry> = {
  "word-counter": {
    render: () => <WordCounterTool />,
    guide: () => <WordCounterGuide />,
  },
  "percentage-calculator": {
    render: () => <PercentageCalculatorTool />,
    guide: () => <PercentageGuide />,
  },
  "discount-calculator": {
    render: () => <DiscountCalculatorTool />,
    guide: () => <DiscountGuide />,
  },
  "case-converter": {
    render: () => <CaseConverterTool />,
    guide: () => <CaseGuide />,
  },
  "json-formatter": {
    render: () => <JsonTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="JSON.parse reads the text and JSON.stringify writes it. The text is not run as JavaScript. More than 1,000,000 characters is refused." />
    ),
  },
  "character-counter": {
    render: () => <CharacterTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Characters are Unicode code points, the same rule as the word counter. A limit of 280 with 10 characters leaves 270. The limit is a count, not a publisher's rule." />
    ),
  },
  "age-calculator": {
    render: () => <AgeTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Dates are calendar dates, not timestamps. Age is the last birthday counted in years, then the months and days after it. A February 29 birthday falls on February 28 in a non-leap year." />
    ),
  },
  "qr-code-generator": {
    render: () => <QrTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="URL codes accept only http and https. Wi-Fi codes use the WIFI: payload. The image is a PNG created in the browser. A contact card is not offered because the field set was not tested against phone scanners." />
    ),
  },
  "password-generator": {
    render: () => <PasswordTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Bytes come from crypto.getRandomValues. The generator avoids modulo bias and then shuffles. It omits ambiguous characters. Nothing in the generator sends the password to a server." />
    ),
  },
  "image-compressor": {
    render: () => <ImageTool mode="compress" />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="JPEG and WebP are re-encoded at the chosen quality, which can drop detail. PNG export from the canvas is lossless, so the quality control does not promise a smaller PNG. The file stays in the browser and is limited to 15 MB." />
    ),
  },
  "image-resizer": {
    render: () => <ImageTool mode="resize" />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="The image is drawn onto a canvas at the requested pixel size. Locking the aspect ratio updates the other side. Output uses the source family: JPEG, PNG, or WebP. This does not add pixels that were not in the file." />
    ),
  },
  "merge-pdf": {
    render: () => <PdfTool mode="merge" />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Pages are copied in the listed order with pdf-lib. Encrypted files are refused. Two files are required. Each file is limited to 20 MB and the batch to 10 files. The bytes are not uploaded." />
    ),
  },
  "split-pdf": {
    render: () => <PdfTool mode="split" />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Ranges such as 1-3,5 are inclusive page numbers. The result is one PDF containing those pages in that order. Encrypted files are refused." />
    ),
  },
  "jpg-to-pdf": {
    render: () => <PdfTool mode="images" />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="JPG and PNG images are embedded. WebP is refused here. A4 scales the image to fit. Match-the-image uses the image's pixel size as the page size." />
    ),
  },
  "unit-converter": {
    render: () => <UnitTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Length uses exact factors such as 1 inch = 0.0254 m and 1 mile = 1609.344 m. Celsius to Fahrenheit is (°C × 9/5) + 32. Kelvin is Celsius plus 273.15. Results are not a legal metrology certificate." />
    ),
  },
  "date-calculator": {
    render: () => <DateTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="The day count is the number of midnights between the dates, using UTC calendar dates so a timezone does not move the day. Business days count Monday through Friday after the start date through the end date. No public-holiday calendar is included." />
    ),
  },
  "gst-calculator": {
    render: () => <GstTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Tax is amount × rate / 100 when the amount is exclusive. An inclusive amount is divided by 1 + rate / 100. CGST and SGST split the rounded tax. When the tax cannot be split evenly, the extra hundredth stays on CGST. You must supply the rate. This is not tax advice." />
    ),
  },
  "emi-calculator": {
    render: () => <EmiTool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="The payment is P × r × (1+r)^n / ((1+r)^n − 1), where r is the annual rate divided by 12 and by 100, and n is the number of months. A zero rate divides the principal by the months. Tenure above 360 months is refused. This is not a loan offer." />
    ),
  },
  base64: {
    render: () => <Base64Tool />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Encoding uses UTF-8 bytes, then standard Base64. Decoding rejects characters outside the alphabet and rejects byte sequences that are not UTF-8. Base64 is not encryption." />
    ),
  },
  "rotate-pdf": {
    render: () => <PdfTool mode="rotate" />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Choose 90°, 180°, or 270° clockwise. The rotation is added to any existing page rotation. All pages are rotated. Encrypted files are refused. The file is limited to 20 MB." />
    ),
  },
  "organize-pdf": {
    render: () => <PdfTool mode="organize" />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Enter page numbers in any order to rearrange them. Use ranges like 3,1,2 to reorder or 1-3,5 to keep only certain pages. Encrypted files are refused. The file is limited to 20 MB." />
    ),
  },
  "crop-pdf": {
    render: () => <PdfTool mode="crop" />,
    guide: (tool) => (
      <InlineGuide tool={tool} heading="How it works" body="Set top, right, bottom, and left margins in points (72 points = 1 inch). The CropBox is adjusted on every page. Content outside the crop area is hidden but not removed. Encrypted files are refused." />
    ),
  },
  "vat-calculator-uk": {
    render: () => <UkVatTool />,
    guide: () => <UkVatGuide />,
  },
  "gst-calculator-australia": {
    render: () => <AustraliaGstTool />,
    guide: () => <AustraliaGstGuide />,
  },
  "slug-generator": {
    render: () => <SlugTool />,
    guide: () => <SlugGuide />,
  },
  "text-compare": {
    render: () => <TextDiffTool />,
    guide: () => <TextDiffGuide />,
  },
};

export function getToolEntry(toolId: string): ToolEntry | undefined {
  return registry[toolId];
}
