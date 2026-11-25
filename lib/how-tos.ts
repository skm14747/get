export type HowToStep = { name: string; text: string };
export type HowToItem = { name: string; description: string; steps: HowToStep[] };

const howTos: Record<string, HowToItem> = {
  "word-counter": {
    name: "How to Count Words in Your Text",
    description: "Count words, characters, sentences, and estimate reading time for any text.",
    steps: [
      { name: "Paste or type your text", text: "Enter or paste the text you want to analyze into the input area." },
      { name: "View instant counts", text: "Word count, character count, sentence count, and paragraph count update in real time." },
      { name: "Check reading time", text: "The estimated reading time appears based on a 200-words-per-minute average." },
    ],
  },
  "json-formatter": {
    name: "How to Format JSON",
    description: "Pretty-print, minify, or validate JSON in your browser.",
    steps: [
      { name: "Paste your JSON", text: "Paste raw JSON into the input field." },
      { name: "Choose format or minify", text: "Select pretty-print with your preferred indent size, or minify to remove whitespace." },
      { name: "Copy the result", text: "Click the copy button to copy the formatted JSON to your clipboard." },
    ],
  },
  "merge-pdf": {
    name: "How to Merge PDF Files",
    description: "Combine multiple PDF files into one document in your browser.",
    steps: [
      { name: "Upload PDF files", text: "Drag and drop or click to select the PDF files you want to merge." },
      { name: "Arrange the order", text: "Drag files to reorder them in the sequence you want." },
      { name: "Download merged PDF", text: "Click merge and download the combined PDF file." },
    ],
  },
  "split-pdf": {
    name: "How to Split a PDF",
    description: "Extract specific pages or split a PDF into multiple files.",
    steps: [
      { name: "Upload your PDF", text: "Select or drag the PDF file you want to split." },
      { name: "Choose pages", text: "Enter the page numbers or ranges you want to extract." },
      { name: "Download split files", text: "Click split and download the extracted pages as a new PDF." },
    ],
  },
  "image-compressor": {
    name: "How to Compress Images",
    description: "Reduce image file size while preserving visual quality.",
    steps: [
      { name: "Upload your image", text: "Select or drag an image file (JPEG, PNG, or WebP)." },
      { name: "Adjust quality", text: "Use the quality slider to balance file size and visual fidelity." },
      { name: "Download compressed image", text: "Click download to save the smaller image file." },
    ],
  },
  "qr-code-generator": {
    name: "How to Generate a QR Code",
    description: "Create a QR code from any URL or text.",
    steps: [
      { name: "Enter your content", text: "Type or paste the URL, text, or data you want to encode." },
      { name: "Customize appearance", text: "Optionally adjust size, color, and error correction level." },
      { name: "Download QR code", text: "Click download to save the QR code as a PNG image." },
    ],
  },
  "password-generator": {
    name: "How to Generate a Secure Password",
    description: "Create a strong random password with customizable rules.",
    steps: [
      { name: "Set length and rules", text: "Choose the password length and toggle uppercase, lowercase, numbers, and symbols." },
      { name: "Generate password", text: "A random password is generated instantly matching your criteria." },
      { name: "Copy to clipboard", text: "Click the copy button to use the password." },
    ],
  },
  "percentage-calculator": {
    name: "How to Calculate Percentages",
    description: "Find percentage of a number, percentage change, or percentage difference.",
    steps: [
      { name: "Choose the calculation type", text: "Select from percentage of, percentage change, percentage difference, or reverse calculations." },
      { name: "Enter your numbers", text: "Type the values into the input fields." },
      { name: "Read the result", text: "The result appears instantly with the step-by-step formula shown below." },
    ],
  },
  "case-converter": {
    name: "How to Convert Text Case",
    description: "Transform text between UPPERCASE, lowercase, Title Case, and code cases.",
    steps: [
      { name: "Paste your text", text: "Enter or paste the text you want to convert." },
      { name: "Select the target case", text: "Choose from uppercase, lowercase, title, sentence, camelCase, PascalCase, snake_case, or kebab-case." },
      { name: "Copy the result", text: "The converted text appears instantly — click copy to use it." },
    ],
  },
  "base64": {
    name: "How to Encode or Decode Base64",
    description: "Convert text to Base64 encoding or decode Base64 back to text.",
    steps: [
      { name: "Paste your input", text: "Enter plain text to encode, or Base64 string to decode." },
      { name: "Choose encode or decode", text: "Select the direction of conversion." },
      { name: "Copy the output", text: "The result appears instantly — click copy to use it." },
    ],
  },
};

export function howToFor(toolId: string): HowToItem | null {
  return howTos[toolId] ?? null;
}
