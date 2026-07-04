import type { FocusEvent } from 'react';

/** Scrolls a focused field into view once the on-screen keyboard finishes animating in,
 * so inputs near the top of a bottom sheet don't end up hidden behind the keyboard. */
export function scrollFieldIntoView(e: FocusEvent<HTMLElement>) {
  const el = e.currentTarget;
  setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 250);
}
