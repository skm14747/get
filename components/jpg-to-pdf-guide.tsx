export function JpgToPdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select or drop JPG or PNG images. Reorder your photos into sequence, choose whether to format pages to standard A4 paper dimensions or match native image dimensions, and download your consolidated PDF.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Page sizing and formatting modes</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Standard A4:</strong> Scales each image proportionately to fit within international A4 dimensions (595.28 × 841.89 points) with neat white margins, ideal for printing, assignments, and formal document submissions.</li>
          <li><strong>Match original image:</strong> Creates PDF pages with dimensions identical to each image native pixel width and height, avoiding any scaling margins or cropping.</li>
          <li><strong>Supported formats:</strong> Compatible with JPG/JPEG and PNG image files. WebP files are excluded because standard PDF embedding requires raw JPEG/PNG streams.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy: confidential document security</h2>
        <p className="mt-2">
          Photo conversions are executed in your browser tab using pdf-lib. Photos of identity cards, tax forms, receipts, and personal documents are never transmitted across the internet.
        </p>
      </section>
    </div>
  );
}
