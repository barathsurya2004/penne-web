/** Parses a scanned QR payload as a UPI payment link (the format GPay, PhonePe, Paytm etc. all emit),
 * e.g. "upi://pay?pa=merchant@okhdfcbank&pn=Chai%20Point&cu=INR". Returns null for anything else so
 * the scanner can reject non-payment QR codes instead of treating them as valid merchants. */
export function parseUpiQr(raw: string): { name: string; upi: string } | null {
  const text = raw.trim();
  if (!/^upi:\/\/pay\b/i.test(text)) return null;
  const qIdx = text.indexOf('?');
  if (qIdx === -1) return null;

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(text.slice(qIdx + 1));
  } catch {
    return null;
  }

  const pa = (params.get('pa') || '').trim();
  if (!/^[\w.+-]+@[\w.-]+$/.test(pa)) return null;

  const pn = (params.get('pn') || '').trim();
  return { name: pn || pa.split('@')[0], upi: pa };
}
