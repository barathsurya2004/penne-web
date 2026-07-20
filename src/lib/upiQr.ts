export interface ParsedUpiQr {
  name: string;
  upi: string;
  amount?: string;
  note?: string;
  mc?: string;
  tr?: string;
  extraParams?: Record<string, string>;
}

/** Parses a scanned QR payload as a UPI payment link (the format GPay, PhonePe, Paytm etc. all emit),
 * e.g. "upi://pay?pa=merchant@okhdfcbank&pn=Chai%20Point&cu=INR". Returns null for anything else so
 * the scanner can reject non-payment QR codes instead of treating them as valid merchants. */
export function parseUpiQr(raw: string): ParsedUpiQr | null {
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
  const am = (params.get('am') || '').trim();
  const tn = (params.get('tn') || '').trim();
  const mc = (params.get('mc') || '').trim();
  const tr = (params.get('tr') || '').trim();

  const extraParams: Record<string, string> = {};
  params.forEach((value, key) => {
    if (!['pa', 'pn', 'am', 'tn', 'cu', 'mc', 'tr'].includes(key.toLowerCase())) {
      extraParams[key] = value;
    }
  });

  return {
    name: pn || pa.split('@')[0],
    upi: pa,
    amount: am && !isNaN(Number(am)) && Number(am) > 0 ? am : undefined,
    note: tn || undefined,
    mc: mc || undefined,
    tr: tr || undefined,
    extraParams: Object.keys(extraParams).length > 0 ? extraParams : undefined,
  };
}
