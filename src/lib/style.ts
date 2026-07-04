import type { CSSProperties } from 'react';

const cache = new Map<string, CSSProperties>();

function toCamel(prop: string): string {
  if (prop.startsWith('--')) return prop;
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** Parses a CSS declaration-list string ("color:#fff;font-size:12px") into a React style object. */
export function css(input: string): CSSProperties {
  const cached = cache.get(input);
  if (cached) return cached;
  const out: Record<string, string> = {};
  for (const decl of input.split(';')) {
    const idx = decl.indexOf(':');
    if (idx === -1) continue;
    const prop = decl.slice(0, idx).trim();
    const value = decl.slice(idx + 1).trim();
    if (!prop || !value) continue;
    out[toCamel(prop)] = value;
  }
  cache.set(input, out as CSSProperties);
  return out as CSSProperties;
}
