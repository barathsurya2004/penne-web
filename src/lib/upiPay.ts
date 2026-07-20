/** Builds a deep link that hands off to a real UPI app to actually complete the payment.
 * Android UPI apps (GPay, PhonePe, Paytm...) all register the generic "upi://pay" intent and
 * the OS shows an app chooser. GPay's iOS app doesn't participate in that — it only listens on
 * its own "gpay://upi/pay" scheme — so iOS gets that scheme directly instead.
 *
 * IMPORTANT: URLSearchParams encodes "@" as "%40". The NPCI UPI deep-link spec requires "@" to
 * remain a literal character inside the "pa" (VPA) field. Several GPay / PhonePe versions mis-parse
 * "%40" and either reject the VPA or resolve the wrong handle — surfacing as a generic
 * "exceeded bank limit" or "transaction failed" error even for tiny amounts. We therefore build
 * the query string manually, keeping "@" raw in "pa" while still percent-encoding everything else. */
export function buildUpiPayLink(payee: { name: string; upi: string }, amount: number, note: string): string {
  // Keep the VPA intact — "@" must NOT be percent-encoded per NPCI spec.
  const pa = payee.upi.trim();

  // Sanitise payee name: strip non-ASCII characters that can confuse older UPI app parsers,
  // then percent-encode the remainder.
  const pn = encodeURIComponent(payee.name.replace(/[^\x20-\x7E]/g, '').trim() || pa.split('@')[0]);

  const am = encodeURIComponent(amount.toFixed(2));
  const parts = [`pa=${pa}`, `pn=${pn}`, `am=${am}`, `cu=INR`];

  const trimmedNote = note.trim();
  if (trimmedNote) parts.push(`tn=${encodeURIComponent(trimmedNote)}`);

  const isIOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.userAgent);
  const base = isIOS ? 'gpay://upi/pay' : 'upi://pay';
  return `${base}?${parts.join('&')}`;
}

/** Fire-and-forget: navigates to the deep link so an installed UPI app can pick it up.
 * On desktop / without a matching app installed this is a no-op the browser silently ignores. */
export function openUpiApp(link: string) {
  try {
    window.location.href = link;
  } catch {
    // unsupported scheme / blocked navigation — the in-app confirm step below still covers it
  }
}
