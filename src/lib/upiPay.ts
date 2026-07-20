/** Standard NPCI P2P UPI Deep Link Builder.
 * Uses universal "upi://pay" scheme registered across all UPI apps (GPay, PhonePe, Paytm, BHIM, CRED).
 * Generates clean spec-compliant URI parameters with raw "@" in "pa" field per NPCI spec. */
export function buildUpiPayLink(
  payee: { name: string; upi: string; mc?: string; tr?: string; extraParams?: Record<string, string> },
  amount: number,
  note: string,
): string {
  const pa = payee.upi.trim();
  const pn = encodeURIComponent(payee.name.replace(/[^\x20-\x7E]/g, '').trim() || pa.split('@')[0]);
  const am = encodeURIComponent(amount.toFixed(2));

  const parts = [`pa=${pa}`, `pn=${pn}`, `am=${am}`, `cu=INR`];

  const trimmedNote = note.trim();
  if (trimmedNote) parts.push(`tn=${encodeURIComponent(trimmedNote)}`);
  if (payee.mc) parts.push(`mc=${encodeURIComponent(payee.mc)}`);
  if (payee.tr) parts.push(`tr=${encodeURIComponent(payee.tr)}`);

  if (payee.extraParams) {
    for (const [k, v] of Object.entries(payee.extraParams)) {
      if (k !== 'mc' && k !== 'tr') {
        parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
      }
    }
  }

  return `upi://pay?${parts.join('&')}`;
}

/** Triggers OS intent/app chooser for standard P2P UPI handoff. */
export function openUpiApp(link: string) {
  try {
    window.location.href = link;
  } catch {
    // unsupported scheme / blocked navigation — in-app confirm flow handles fallback
  }
}
