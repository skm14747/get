import fs from "fs";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const appDir = path.join(rootDir, "app");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#brandGrad)"/>
  <text x="256" y="375" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="340" font-weight="900" fill="#ffffff" text-anchor="middle">G</text>
</svg>`;

// Write SVGs
fs.writeFileSync(path.join(publicDir, "icon.svg"), svg, "utf-8");
fs.writeFileSync(path.join(appDir, "icon.svg"), svg, "utf-8");
console.log("Wrote icon.svg to public/ and app/");

const svgBuffer = Buffer.from(svg);

async function generateAll() {
  // Generate master 512x512 PNG
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "icon-512.png"), p512);

  // 192x192 PNG (PWA / Android)
  const p192 = await sharp(p512).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "icon-192.png"), p192);

  // 180x180 PNG (Apple touch icon)
  const p180 = await sharp(p512).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), p180);

  // 48x48 PNG (Google Search Favicon standard)
  const p48 = await sharp(p512).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-48x48.png"), p48);

  // 32x32 PNG
  const p32 = await sharp(p512).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), p32);

  // 16x16 PNG
  const p16 = await sharp(p512).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), p16);

  // Generate multi-resolution ICO file containing 16x16, 32x32, 48x48
  const images = [
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + images.length * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO format
  header.writeUInt16LE(images.length, 4); // image count

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...images.map((img) => img.buffer)]);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(appDir, "favicon.ico"), icoBuffer);
  console.log("Wrote favicon.ico to public/ and app/ (sizes: 16, 32, 48)");

  console.log("All favicon and icon assets generated successfully!");
}

generateAll().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
