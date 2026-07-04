import jsQR from 'jsqr';

/** Decodes a QR code out of a user-picked image file (e.g. a screenshot of someone's UPI QR
 * from the gallery), the same way the live camera scanner does but on a single still frame. */
export async function decodeQrFromImageFile(file: File): Promise<string | null> {
  if (typeof createImageBitmap !== 'function') return null;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return null;
  }

  const maxDim = 1000;
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(bitmap, 0, 0, w, h);
  const frame = ctx.getImageData(0, 0, w, h);
  const code = jsQR(frame.data, w, h, { inversionAttempts: 'attemptBoth' });
  return code?.data ?? null;
}
