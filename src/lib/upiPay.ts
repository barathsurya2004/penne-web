/** Builds a deep link that hands off to a real UPI app to actually complete the payment.
 * Android UPI apps (GPay, PhonePe, Paytm...) all register the generic "upi://pay" intent and
 * the OS shows an app chooser. GPay's iOS app doesn't participate in that — it only listens on
 * its own "gpay://upi/pay" scheme — so iOS gets that scheme directly instead. */
export function buildUpiPayLink(payee: { name: string; upi: string }, amount: number, note: string): string {
  const params = new URLSearchParams({
    pa: payee.upi,
    pn: payee.name,
    am: amount.toFixed(2),
    cu: 'INR',
  });
  if (note.trim()) params.set('tn', note.trim());

  const isIOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.userAgent);
  const base = isIOS ? 'gpay://upi/pay' : 'upi://pay';
  return `${base}?${params.toString()}`;
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
