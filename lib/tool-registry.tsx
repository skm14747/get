import type { ReactNode } from "react";
import { AgeCalculatorGuide } from "@/components/age-calculator-guide";
import { AgeTool } from "@/components/age-tool";
import { AudioSpeedGuide } from "@/components/audio-speed-guide";
import { AudioSpeedTool } from "@/components/audio-speed-tool";
import { AudioTrimmerGuide } from "@/components/audio-trimmer-guide";
import { AudioTrimmerTool } from "@/components/audio-trimmer-tool";
import { AustraliaGstGuide } from "@/components/australia-gst-guide";
import { AustraliaGstTool } from "@/components/australia-gst-tool";
import { BarcodeGuide } from "@/components/barcode-guide";
import { BarcodeTool } from "@/components/barcode-tool";
import { Base64Guide } from "@/components/base64-guide";
import { Base64Tool } from "@/components/base64-tool";
import { BelgiumTvaGuide } from "@/components/belgium-tva-guide";
import { BelgiumTvaTool } from "@/components/belgium-tva-tool";
import { BorderRadiusGuide } from "@/components/border-radius-guide";
import { BorderRadiusTool } from "@/components/border-radius-tool";
import { BoxShadowGuide } from "@/components/box-shadow-guide";
import { BoxShadowTool } from "@/components/box-shadow-tool";
import { CaseConverterTool } from "@/components/case-converter-tool";
import { CaseGuide } from "@/components/case-guide";
import { CharacterCounterGuide } from "@/components/character-counter-guide";
import { CharacterTool } from "@/components/character-tool";
import { ColorGuide } from "@/components/color-guide";
import { ColorTool } from "@/components/color-tool";
import { ContrastGuide } from "@/components/contrast-guide";
import { ContrastTool } from "@/components/contrast-tool";
import { CronGuide } from "@/components/cron-guide";
import { CronTool } from "@/components/cron-tool";
import { CsvJsonGuide } from "@/components/csv-json-guide";
import { CsvJsonTool } from "@/components/csv-json-tool";
import { DateCalculatorGuide } from "@/components/date-calculator-guide";
import { DateTool } from "@/components/date-tool";
import { DiscountCalculatorTool } from "@/components/discount-calculator-tool";
import { DiscountGuide } from "@/components/discount-guide";
import { EmiCalculatorGuide } from "@/components/emi-calculator-guide";
import { EmiTool } from "@/components/emi-tool";
import { FranceTvaGuide } from "@/components/france-tva-guide";
import { FranceTvaTool } from "@/components/france-tva-tool";
import { GradientGuide } from "@/components/gradient-guide";
import { GradientTool } from "@/components/gradient-tool";
import { GstCalculatorGuide } from "@/components/gst-calculator-guide";
import { GstTool } from "@/components/gst-tool";
import { ImageCompressorGuide } from "@/components/image-compressor-guide";
import { ImageCropperGuide } from "@/components/image-cropper-guide";
import { ImageCropperTool } from "@/components/image-cropper-tool";
import { ImageResizerGuide } from "@/components/image-resizer-guide";
import { ImageTool } from "@/components/image-tool";
import { JpgToPdfGuide } from "@/components/jpg-to-pdf-guide";
import { JsonFormatterGuide } from "@/components/json-formatter-guide";
import { JsonToPythonGuide } from "@/components/json-to-python-guide";
import { JsonToPythonTool } from "@/components/json-to-python-tool";
import { JsonToTsGuide } from "@/components/json-to-ts-guide";
import { JsonToTsTool } from "@/components/json-to-ts-tool";
import { JsonTool } from "@/components/json-tool";
import { JwtGuide } from "@/components/jwt-guide";
import { JwtTool } from "@/components/jwt-tool";
import { MergePdfGuide } from "@/components/merge-pdf-guide";
import { PaletteGuide } from "@/components/palette-guide";
import { PaletteTool } from "@/components/palette-tool";
import { PasswordGeneratorGuide } from "@/components/password-generator-guide";
import { PasswordTool } from "@/components/password-tool";
import { PdfEditTool } from "@/components/pdf-edit-tool";
import { PdfFormTool } from "@/components/pdf-form-tool";
import { PdfPipelineTool } from "@/components/pdf-pipeline-tool";
import { PdfSignTool } from "@/components/pdf-sign-tool";
import { PdfTool } from "@/components/pdf-tool";
import { PercentageCalculatorTool } from "@/components/percentage-calculator-tool";
import { PercentageGuide } from "@/components/percentage-guide";
import { QrCodeGeneratorGuide } from "@/components/qr-code-generator-guide";
import { QrTool } from "@/components/qr-tool";
import { RegexGuide } from "@/components/regex-guide";
import { RegexTool } from "@/components/regex-tool";
import { SlugGuide } from "@/components/slug-guide";
import { SlugTool } from "@/components/slug-tool";
import { SplitPdfGuide } from "@/components/split-pdf-guide";
import { SqlGuide } from "@/components/sql-guide";
import { SqlTool } from "@/components/sql-tool";
import { TextCleanerGuide } from "@/components/text-cleaner-guide";
import { TextCleanerTool } from "@/components/text-cleaner-tool";
import { TextDiffGuide } from "@/components/text-diff-guide";
import { TextDiffTool } from "@/components/text-diff-tool";
import { UkVatGuide } from "@/components/uk-vat-guide";
import { UkVatTool } from "@/components/uk-vat-tool";
import { UnitConverterGuide } from "@/components/unit-converter-guide";
import { UnitTool } from "@/components/unit-tool";
import { UnixTimestampGuide } from "@/components/unix-timestamp-guide";
import { UnixTimestampTool } from "@/components/unix-timestamp-tool";
import { UrlGuide } from "@/components/url-guide";
import { UrlTool } from "@/components/url-tool";
import { VideoGifGuide } from "@/components/video-gif-guide";
import { VideoGifTool } from "@/components/video-gif-tool";
import { WordCounterGuide } from "@/components/word-counter-guide";
import { WordCounterTool } from "@/components/word-counter-tool";
import type { ToolDefinition } from "@/lib/tools";

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
    guide: () => <JsonFormatterGuide />,
  },
  "character-counter": {
    render: () => <CharacterTool />,
    guide: () => <CharacterCounterGuide />,
  },
  "age-calculator": {
    render: () => <AgeTool />,
    guide: () => <AgeCalculatorGuide />,
  },
  "qr-code-generator": {
    render: () => <QrTool />,
    guide: () => <QrCodeGeneratorGuide />,
  },
  "password-generator": {
    render: () => <PasswordTool />,
    guide: () => <PasswordGeneratorGuide />,
  },
  "image-compressor": {
    render: () => <ImageTool mode="compress" />,
    guide: () => <ImageCompressorGuide />,
  },
  "image-resizer": {
    render: () => <ImageTool mode="resize" />,
    guide: () => <ImageResizerGuide />,
  },
  "merge-pdf": {
    render: () => <PdfTool mode="merge" />,
    guide: () => <MergePdfGuide />,
  },
  "split-pdf": {
    render: () => <PdfTool mode="split" />,
    guide: () => <SplitPdfGuide />,
  },
  "jpg-to-pdf": {
    render: () => <PdfTool mode="images" />,
    guide: () => <JpgToPdfGuide />,
  },
  "rotate-pdf": {
    render: () => <PdfTool mode="rotate" />,
    guide: () => <MergePdfGuide />,
  },
  "organize-pdf": {
    render: () => <PdfTool mode="organize" />,
    guide: () => <SplitPdfGuide />,
  },
  "crop-pdf": {
    render: () => <PdfTool mode="crop" />,
    guide: () => <SplitPdfGuide />,
  },
  "add-page-numbers": {
    render: () => <PdfTool mode="pagenumber" />,
    guide: () => <MergePdfGuide />,
  },
  "watermark-pdf": {
    render: () => <PdfTool mode="watermark" />,
    guide: () => <MergePdfGuide />,
  },
  "unlock-pdf": {
    render: () => <PdfTool mode="unlock" />,
    guide: () => <MergePdfGuide />,
  },
  "pdf-to-jpg": {
    render: () => <PdfTool mode="pdf2jpg" />,
    guide: () => <JpgToPdfGuide />,
  },
  "compress-pdf": {
    render: () => <PdfTool mode="compress" />,
    guide: () => <MergePdfGuide />,
  },
  "edit-pdf": {
    render: () => <PdfEditTool />,
    guide: () => <MergePdfGuide />,
  },
  "pdf-forms": {
    render: () => <PdfFormTool />,
    guide: () => <MergePdfGuide />,
  },
  "sign-pdf": {
    render: () => <PdfSignTool />,
    guide: () => <MergePdfGuide />,
  },
  "delete-pdf-pages": {
    render: () => <PdfTool mode="delete" />,
    guide: () => <SplitPdfGuide />,
  },
  "extract-pdf-pages": {
    render: () => <PdfTool mode="extract" />,
    guide: () => <SplitPdfGuide />,
  },
  "pdf-pipeline": {
    render: () => <PdfPipelineTool />,
    guide: () => <MergePdfGuide />,
  },
  "unit-converter": {
    render: () => <UnitTool />,
    guide: () => <UnitConverterGuide />,
  },
  "date-calculator": {
    render: () => <DateTool />,
    guide: () => <DateCalculatorGuide />,
  },
  "gst-calculator": {
    render: () => <GstTool />,
    guide: () => <GstCalculatorGuide />,
  },
  "emi-calculator": {
    render: () => <EmiTool />,
    guide: () => <EmiCalculatorGuide />,
  },
  base64: {
    render: () => <Base64Tool />,
    guide: () => <Base64Guide />,
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
  "france-tva-calculator": {
    render: () => <FranceTvaTool />,
    guide: () => <FranceTvaGuide />,
  },
  "belgium-tva-calculator": {
    render: () => <BelgiumTvaTool />,
    guide: () => <BelgiumTvaGuide />,
  },
  "remove-duplicate-lines": {
    render: () => <TextCleanerTool />,
    guide: () => <TextCleanerGuide />,
  },
  "color-converter": {
    render: () => <ColorTool />,
    guide: () => <ColorGuide />,
  },
  "unix-timestamp-converter": {
    render: () => <UnixTimestampTool />,
    guide: () => <UnixTimestampGuide />,
  },
  "jwt-decoder": {
    render: () => <JwtTool />,
    guide: () => <JwtGuide />,
  },
  "url-encoder": {
    render: () => <UrlTool />,
    guide: () => <UrlGuide />,
  },
  "json-to-typescript": {
    render: () => <JsonToTsTool />,
    guide: () => <JsonToTsGuide />,
  },
  "json-to-python": {
    render: () => <JsonToPythonTool />,
    guide: () => <JsonToPythonGuide />,
  },
  "csv-to-json": {
    render: () => <CsvJsonTool />,
    guide: () => <CsvJsonGuide />,
  },
  "contrast-checker": {
    render: () => <ContrastTool />,
    guide: () => <ContrastGuide />,
  },
  "gradient-generator": {
    render: () => <GradientTool />,
    guide: () => <GradientGuide />,
  },
  "color-palette-generator": {
    render: () => <PaletteTool />,
    guide: () => <PaletteGuide />,
  },
  "css-box-shadow-generator": {
    render: () => <BoxShadowTool />,
    guide: () => <BoxShadowGuide />,
  },
  "css-border-radius-generator": {
    render: () => <BorderRadiusTool />,
    guide: () => <BorderRadiusGuide />,
  },
  "regex-tester": {
    render: () => <RegexTool />,
    guide: () => <RegexGuide />,
  },
  "cron-generator": {
    render: () => <CronTool />,
    guide: () => <CronGuide />,
  },
  "sql-formatter": {
    render: () => <SqlTool />,
    guide: () => <SqlGuide />,
  },
  "barcode-generator": {
    render: () => <BarcodeTool />,
    guide: () => <BarcodeGuide />,
  },
  "image-cropper": {
    render: () => <ImageCropperTool />,
    guide: () => <ImageCropperGuide />,
  },
  "audio-trimmer": {
    render: () => <AudioTrimmerTool />,
    guide: () => <AudioTrimmerGuide />,
  },
  "audio-speed-changer": {
    render: () => <AudioSpeedTool />,
    guide: () => <AudioSpeedGuide />,
  },
  "video-to-gif": {
    render: () => <VideoGifTool />,
    guide: () => <VideoGifGuide />,
  },
};

export function getToolEntry(toolId: string): ToolEntry | undefined {
  return registry[toolId];
}
