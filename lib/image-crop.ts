export type AspectRatio = "free" | "1:1" | "16:9" | "4:3" | "3:2";

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const CROP_PRESETS: { label: string; aspect: AspectRatio; ratioVal?: number }[] = [
  { label: "Freeform", aspect: "free" },
  { label: "1:1 Square", aspect: "1:1", ratioVal: 1 },
  { label: "16:9 Widescreen", aspect: "16:9", ratioVal: 16 / 9 },
  { label: "4:3 Standard", aspect: "4:3", ratioVal: 4 / 3 },
  { label: "3:2 Photo", aspect: "3:2", ratioVal: 3 / 2 },
];

export function getInitialCropArea(
  imgWidth: number,
  imgHeight: number,
  aspect: AspectRatio = "free"
): CropArea {
  if (imgWidth <= 0 || imgHeight <= 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  if (aspect === "free") {
    // 80% centered box
    const w = Math.round(imgWidth * 0.8);
    const h = Math.round(imgHeight * 0.8);
    const x = Math.round((imgWidth - w) / 2);
    const y = Math.round((imgHeight - h) / 2);
    return { x, y, width: w, height: h };
  }

  let ratioVal = 1;
  if (aspect === "16:9") ratioVal = 16 / 9;
  if (aspect === "4:3") ratioVal = 4 / 3;
  if (aspect === "3:2") ratioVal = 3 / 2;

  let w = imgWidth * 0.8;
  let h = w / ratioVal;

  if (h > imgHeight * 0.8) {
    h = imgHeight * 0.8;
    w = h * ratioVal;
  }

  const finalW = Math.round(w);
  const finalH = Math.round(h);
  const finalX = Math.round((imgWidth - finalW) / 2);
  const finalY = Math.round((imgHeight - finalH) / 2);

  return { x: finalX, y: finalY, width: finalW, height: finalH };
}

export function clampCropArea(crop: CropArea, imgWidth: number, imgHeight: number): CropArea {
  const w = Math.max(10, Math.min(imgWidth, Math.round(crop.width)));
  const h = Math.max(10, Math.min(imgHeight, Math.round(crop.height)));
  const x = Math.max(0, Math.min(imgWidth - w, Math.round(crop.x)));
  const y = Math.max(0, Math.min(imgHeight - h, Math.round(crop.y)));

  return { x, y, width: w, height: h };
}
