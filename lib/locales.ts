import { messages, type MessageKey } from "@/locales/en";

export const INTENDED_LAUNCH_LOCALES = [
  "en",
  "es",
  "fr",
  "ar",
  "pt-BR",
  "de",
  "ja",
  "hi",
  "id",
  "it",
] as const;

export type LocaleCode = (typeof INTENDED_LAUNCH_LOCALES)[number];

export type TranslationReview = "source" | "unreviewed" | "native-approved";

export type LaunchLocale = {
  code: LocaleCode;
  htmlLang: string;
  direction: "ltr" | "rtl";
  numberLocale: string;
  urlStrategy: "unprefixed" | "prefix";
  published: boolean;
  translationReview: TranslationReview;
  /** Researched public slug per tool id. Empty until a cited terminology source exists. */
  toolSlugs: Partial<Record<string, string>>;
};

export const launchLocales: readonly LaunchLocale[] = [
  {
    code: "en",
    htmlLang: "en",
    direction: "ltr",
    numberLocale: "en-US",
    urlStrategy: "unprefixed",
    published: true,
    translationReview: "source",
    toolSlugs: {
      "word-counter": "word-counter",
      "percentage-calculator": "percentage-calculator",
      "discount-calculator": "discount-calculator",
      "case-converter": "case-converter",
      "json-formatter": "json-formatter",
      "character-counter": "character-counter",
      "age-calculator": "age-calculator",
      "qr-code-generator": "qr-code-generator",
      "password-generator": "password-generator",
      "image-compressor": "image-compressor",
      "image-resizer": "image-resizer",
      "merge-pdf": "merge-pdf",
      "split-pdf": "split-pdf",
      "jpg-to-pdf": "jpg-to-pdf",
      "rotate-pdf": "rotate-pdf",
      "organize-pdf": "organize-pdf",
      "crop-pdf": "crop-pdf",
      "unit-converter": "unit-converter",
      "date-calculator": "date-calculator",
      "gst-calculator": "gst-calculator",
      "emi-calculator": "emi-calculator",
      base64: "base64",
      "vat-calculator-uk": "vat-calculator-uk",
      "gst-calculator-australia": "gst-calculator-australia",
      "slug-generator": "slug-generator",
      "text-compare": "text-compare",
      "tokenizer": "tokenizer",
    },
  },
  {
    code: "es",
    htmlLang: "es",
    direction: "ltr",
    numberLocale: "es",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "contador-de-palabras",
      "percentage-calculator": "calculadora-de-porcentajes",
      "discount-calculator": "calculadora-de-descuentos",
      "case-converter": "convertidor-de-mayusculas",
      "json-formatter": "formateador-json",
      "character-counter": "contador-de-caracteres",
      "age-calculator": "calculadora-de-edad",
      "qr-code-generator": "generador-de-codigos-qr",
      "password-generator": "generador-de-contrasenas",
      "image-compressor": "compresor-de-imagenes",
      "image-resizer": "redimensionador-de-imagenes",
      "merge-pdf": "unir-pdf",
      "split-pdf": "dividir-pdf",
      "jpg-to-pdf": "jpg-a-pdf",
      "unit-converter": "convertidor-de-unidades",
      "date-calculator": "calculadora-de-fechas",
      "gst-calculator": "calculadora-gst",
      "emi-calculator": "calculadora-emi",
      base64: "base64",
      "rotate-pdf": "rotar-pdf",
      "organize-pdf": "organizar-pdf",
      "crop-pdf": "recortar-pdf",
      "vat-calculator-uk": "calculadora-iva-uk",
      "gst-calculator-australia": "calculadora-gst-australia",
      "slug-generator": "generador-de-slug",
      "text-compare": "comparador-de-texto",
      "tokenizer": "tokenizador",
    },
  },
  {
    code: "fr",
    htmlLang: "fr",
    direction: "ltr",
    numberLocale: "fr-FR",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "compteur-de-mots",
      "percentage-calculator": "calculateur-de-pourcentage",
      "discount-calculator": "calculateur-de-remise",
      "case-converter": "convertisseur-de-casse",
      "json-formatter": "formateur-json",
      "character-counter": "compteur-de-caracteres",
      "age-calculator": "calculateur-d-age",
      "qr-code-generator": "generateur-de-code-qr",
      "password-generator": "generateur-de-mot-de-passe",
      "image-compressor": "compresseur-d-images",
      "image-resizer": "redimensionneur-d-images",
      "merge-pdf": "fusionner-pdf",
      "split-pdf": "diviser-pdf",
      "jpg-to-pdf": "jpg-en-pdf",
      "unit-converter": "convertisseur-d-unites",
      "date-calculator": "calculateur-de-dates",
      "gst-calculator": "calculateur-gst",
      "emi-calculator": "calculateur-emi",
      base64: "base64",
      "rotate-pdf": "pivoter-pdf",
      "organize-pdf": "organiser-pdf",
      "crop-pdf": "rogner-pdf",
      "vat-calculator-uk": "calculateur-tva-uk",
      "gst-calculator-australia": "calculateur-gst-australie",
      "slug-generator": "generateur-de-slug",
      "text-compare": "comparateur-de-texte",
      "tokenizer": "tokeniseur",
    },
  },
  {
    code: "ar",
    htmlLang: "ar",
    direction: "rtl",
    numberLocale: "ar",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "عداد-الكلمات",
      "percentage-calculator": "حاسبة-النسبة-المئوية",
      "discount-calculator": "حاسبة-الخصم",
      "case-converter": "محول-الحالة",
      "json-formatter": "منسق-json",
      "character-counter": "عداد-الأحرف",
      "age-calculator": "حاسبة-العمر",
      "qr-code-generator": "مولد-رمز-qr",
      "password-generator": "مولد-كلمة-المرور",
      "image-compressor": "ضاغط-الصور",
      "image-resizer": "معدل-حجم-الصور",
      "merge-pdf": "دمج-pdf",
      "split-pdf": "تقسيم-pdf",
      "jpg-to-pdf": "jpg-الى-pdf",
      "unit-converter": "محول-الوحدات",
      "date-calculator": "حاسبة-التاريخ",
      "gst-calculator": "حاسبة-gst",
      "emi-calculator": "حاسبة-emi",
      base64: "base64",
      "rotate-pdf": "تدوير-pdf",
      "organize-pdf": "ترتيب-pdf",
      "crop-pdf": "اقتصاص-pdf",
      "vat-calculator-uk": "حاسبة-ضريبة-القيمة-المضافة-uk",
      "gst-calculator-australia": "حاسبة-gst-استراليا",
      "slug-generator": "مولد-slug",
      "text-compare": "مقارنة-النصوص",
      "tokenizer": "محلل-الرموز",
    },
  },
  {
    code: "pt-BR",
    htmlLang: "pt-BR",
    direction: "ltr",
    numberLocale: "pt-BR",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "contador-de-palavras",
      "percentage-calculator": "calculadora-de-porcentagem",
      "discount-calculator": "calculadora-de-desconto",
      "case-converter": "conversor-de-caixa",
      "json-formatter": "formatador-json",
      "character-counter": "contador-de-caracteres",
      "age-calculator": "calculadora-de-idade",
      "qr-code-generator": "gerador-de-codigo-qr",
      "password-generator": "gerador-de-senha",
      "image-compressor": "compressor-de-imagens",
      "image-resizer": "redimensionador-de-imagens",
      "merge-pdf": "unir-pdf",
      "split-pdf": "dividir-pdf",
      "jpg-to-pdf": "jpg-para-pdf",
      "unit-converter": "conversor-de-unidades",
      "date-calculator": "calculadora-de-datas",
      "gst-calculator": "calculadora-gst",
      "emi-calculator": "calculadora-emi",
      base64: "base64",
      "rotate-pdf": "girar-pdf",
      "organize-pdf": "organizar-pdf",
      "crop-pdf": "cortar-pdf",
      "vat-calculator-uk": "calculadora-iva-uk",
      "gst-calculator-australia": "calculadora-gst-australia",
      "slug-generator": "gerador-de-slug",
      "text-compare": "comparador-de-texto",
      "tokenizer": "tokenizador",
    },
  },
  {
    code: "de",
    htmlLang: "de",
    direction: "ltr",
    numberLocale: "de-DE",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "woerter-zaehler",
      "percentage-calculator": "prozentrechner",
      "discount-calculator": "rabattrechner",
      "case-converter": "gross-kleinschreibung",
      "json-formatter": "json-formatierer",
      "character-counter": "zeichenzaehler",
      "age-calculator": "altersrechner",
      "qr-code-generator": "qr-code-generator",
      "password-generator": "passwort-generator",
      "image-compressor": "bildkomprimierer",
      "image-resizer": "bildgroesse-aendern",
      "merge-pdf": "pdf-zusammenfuegen",
      "split-pdf": "pdf-teilen",
      "jpg-to-pdf": "jpg-zu-pdf",
      "unit-converter": "einheitenumrechner",
      "date-calculator": "datumsrechner",
      "gst-calculator": "gst-rechner",
      "emi-calculator": "emi-rechner",
      base64: "base64",
      "rotate-pdf": "pdf-drehen",
      "organize-pdf": "pdf-organisieren",
      "crop-pdf": "pdf-zuschneiden",
      "vat-calculator-uk": "mwst-rechner-uk",
      "gst-calculator-australia": "gst-rechner-australien",
      "slug-generator": "slug-generator",
      "text-compare": "textvergleich",
      "tokenizer": "tokenizer",
    },
  },
  {
    code: "ja",
    htmlLang: "ja",
    direction: "ltr",
    numberLocale: "ja-JP",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "文字数カウンター",
      "percentage-calculator": "パーセント計算",
      "discount-calculator": "割引計算",
      "case-converter": "大文字小文字変換",
      "json-formatter": "jsonフォーマッター",
      "character-counter": "文字数カウント",
      "age-calculator": "年齢計算",
      "qr-code-generator": "qrコード作成",
      "password-generator": "パスワード生成",
      "image-compressor": "画像圧縮",
      "image-resizer": "画像リサイズ",
      "merge-pdf": "pdf結合",
      "split-pdf": "pdf分割",
      "jpg-to-pdf": "jpgからpdf",
      "unit-converter": "単位変換",
      "date-calculator": "日付計算",
      "gst-calculator": "gst計算",
      "emi-calculator": "emi計算",
      base64: "base64",
      "rotate-pdf": "pdf回転",
      "organize-pdf": "pdfページ整理",
      "crop-pdf": "pdfトリミング",
      "vat-calculator-uk": "uk付加価値税計算",
      "gst-calculator-australia": "オーストラリアgst計算",
      "slug-generator": "スラッグ生成",
      "text-compare": "テキスト比較",
      "tokenizer": "トークナイザー",
    },
  },
  {
    code: "hi",
    htmlLang: "hi",
    direction: "ltr",
    numberLocale: "hi-IN",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "shabd-ganana",
      "percentage-calculator": "pratishat-calculator",
      "discount-calculator": "chhoot-calculator",
      "case-converter": "case-converter",
      "json-formatter": "json-formatter",
      "character-counter": "akshar-ganana",
      "age-calculator": "aayu-calculator",
      "qr-code-generator": "qr-code-generator",
      "password-generator": "password-generator",
      "image-compressor": "image-compressor",
      "image-resizer": "image-resizer",
      "merge-pdf": "pdf-jodna",
      "split-pdf": "pdf-vibhajit",
      "jpg-to-pdf": "jpg-se-pdf",
      "unit-converter": "ekai-parivartan",
      "date-calculator": "tarikh-calculator",
      "gst-calculator": "gst-calculator",
      "emi-calculator": "emi-calculator",
      base64: "base64",
      "rotate-pdf": "pdf-rotate",
      "organize-pdf": "pdf-organize",
      "crop-pdf": "pdf-crop",
      "vat-calculator-uk": "vat-calculator-uk",
      "gst-calculator-australia": "gst-calculator-australia",
      "slug-generator": "slug-generator",
      "text-compare": "text-compare",
      "tokenizer": "tokenizer",
    },
  },
  {
    code: "id",
    htmlLang: "id",
    direction: "ltr",
    numberLocale: "id-ID",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "penghitung-kata",
      "percentage-calculator": "kalkulator-persentase",
      "discount-calculator": "kalkulator-diskon",
      "case-converter": "pengubah-huruf",
      "json-formatter": "pemformat-json",
      "character-counter": "penghitung-karakter",
      "age-calculator": "kalkulator-usia",
      "qr-code-generator": "pembuat-kode-qr",
      "password-generator": "pembuat-kata-sandi",
      "image-compressor": "kompresor-gambar",
      "image-resizer": "pengubah-ukuran-gambar",
      "merge-pdf": "gabung-pdf",
      "split-pdf": "pisahkan-pdf",
      "jpg-to-pdf": "jpg-ke-pdf",
      "unit-converter": "konverter-satuan",
      "date-calculator": "kalkulator-tanggal",
      "gst-calculator": "kalkulator-gst",
      "emi-calculator": "kalkulator-emi",
      base64: "base64",
      "rotate-pdf": "putar-pdf",
      "organize-pdf": "atur-pdf",
      "crop-pdf": "potong-pdf",
      "vat-calculator-uk": "kalkulator-ppn-uk",
      "gst-calculator-australia": "kalkulator-gst-australia",
      "slug-generator": "pembuat-slug",
      "text-compare": "pembanding-teks",
      "tokenizer": "tokenizer",
    },
  },
  {
    code: "it",
    htmlLang: "it",
    direction: "ltr",
    numberLocale: "it-IT",
    urlStrategy: "prefix",
    published: true,
    translationReview: "unreviewed",
    toolSlugs: {
      "word-counter": "contatore-parole",
      "percentage-calculator": "calcolatore-percentuale",
      "discount-calculator": "calcolatore-sconto",
      "case-converter": "convertitore-maiuscole-minuscole",
      "json-formatter": "formattatore-json",
      "character-counter": "contatore-caratteri",
      "age-calculator": "calcolatore-eta",
      "qr-code-generator": "generatore-codice-qr",
      "password-generator": "generatore-password",
      "image-compressor": "compressore-immagini",
      "image-resizer": "ridimensionatore-immagini",
      "merge-pdf": "unisci-pdf",
      "split-pdf": "dividi-pdf",
      "jpg-to-pdf": "jpg-in-pdf",
      "unit-converter": "convertitore-unita",
      "date-calculator": "calcolatore-date",
      "gst-calculator": "calcolatore-gst",
      "emi-calculator": "calcolatore-emi",
      base64: "base64",
      "rotate-pdf": "ruota-pdf",
      "organize-pdf": "organizza-pdf",
      "crop-pdf": "ritaglia-pdf",
      "vat-calculator-uk": "calcolatore-iva-uk",
      "gst-calculator-australia": "calcolatore-gst-australia",
      "slug-generator": "generatore-slug",
      "text-compare": "confronto-testi",
      "tokenizer": "tokenizzatore",
    },
  },
];

const REQUIRED_MESSAGE_KEYS = Object.keys(messages) as MessageKey[];

export function getLocale(code: string): LaunchLocale | undefined {
  return launchLocales.find((locale) => locale.code === code);
}

export function publishedLocales(): LaunchLocale[] {
  return launchLocales.filter((locale) => locale.published);
}

export function missingTranslationKeys(catalog: Partial<Record<MessageKey, string>>): MessageKey[] {
  return REQUIRED_MESSAGE_KEYS.filter((key) => {
    const value = catalog[key];
    return typeof value !== "string" || value.trim() === "";
  });
}

export function documentLanguage(code: string): { lang: string; dir: "ltr" | "rtl" } | null {
  const locale = getLocale(code);
  if (!locale) return null;
  return { lang: locale.htmlLang, dir: locale.direction };
}

const TOOL_IDS = [
  "word-counter",
  "percentage-calculator",
  "discount-calculator",
  "case-converter",
  "json-formatter",
  "character-counter",
  "age-calculator",
  "qr-code-generator",
  "password-generator",
  "image-compressor",
  "image-resizer",
  "merge-pdf",
  "split-pdf",
  "jpg-to-pdf",
  "rotate-pdf",
  "organize-pdf",
  "crop-pdf",
  "unit-converter",
  "date-calculator",
  "gst-calculator",
  "emi-calculator",
  "base64",
  "vat-calculator-uk",
  "gst-calculator-australia",
  "slug-generator",
  "text-compare",
  "tokenizer",
] as const;

export function publicationBlockers(code: string): string[] {
  const locale = getLocale(code);
  if (!locale) return ["unknown locale"];
  const blockers: string[] = [];
  if (locale.translationReview !== "source" && locale.translationReview !== "native-approved") {
    blockers.push("translations are not native-reviewed");
  }
  if (locale.urlStrategy === "prefix") {
    blockers.push("document language is still the English root layout");
    const missingSlugs = TOOL_IDS.filter((id) => !locale.toolSlugs[id]);
    if (missingSlugs.length > 0) blockers.push("localized slugs are not researched");
    if (missingTranslationKeys({}).length > 0 && locale.code !== "en") {
      blockers.push("locale catalog is missing");
    }
  }
  if (locale.code === "ja") {
    blockers.push("word counting still splits on whitespace, which is not Japanese word segmentation");
  }
  if (locale.code === "ar") {
    blockers.push("Arabic-Indic versus Western numerals are undecided");
    blockers.push("RTL layout has not been checked with Arabic text on the live templates");
  }
  return blockers;
}

export function canPublish(code: string): boolean {
  const locale = getLocale(code);
  return Boolean(locale?.published) && publicationBlockers(code).length === 0;
}
