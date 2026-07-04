import type { BudgetIconKey } from '../types';

export function icon(paths: string | string[], sz?: number, col?: string) {
  const list = Array.isArray(paths) ? paths : [paths];
  return (
    <svg width={sz || 22} height={sz || 22} viewBox="0 0 24 24" fill="none">
      {list.map((d, i) => (
        <path key={i} d={d} stroke={col || '#141414'} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

export const budgetGlyphs: Record<BudgetIconKey, string[]> = {
  food: ['M6 3v7a3 3 0 006 0V3M9 3v18M18 3c-1.5 1-2.5 3-2.5 6s1 5 2.5 5v7'],
  shop: ['M6 8h12l-1 12a1 1 0 01-1 1H8a1 1 0 01-1-1L6 8z', 'M9 8V6a3 3 0 016 0v2'],
  transit: [
    'M6 4h12a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z',
    'M4 12h16M8 20l1-3M16 20l-1-3',
    'M8.5 13.5v0M15.5 13.5v0',
  ],
  bills: ['M6 3h12v18l-3-2-3 2-3-2-3 2V3z', 'M9 8h6M9 12h6'],
  fun: ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M8 14a5 5 0 008 0', 'M9 9v0M15 9v0'],
  health: ['M12 21s-7-4.35-9.5-8.5C1 9 3 5.5 6.5 5.5c2 0 3.5 1.5 3.5 1.5S11.5 5.5 13.5 5.5C17 5.5 19 9 17.5 12.5 15 16.65 12 21 12 21z'],
  home: ['M4 11l8-6 8 6', 'M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9'],
  misc: ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M12 8v4l3 2'],
};

export function budgetIcon(k: BudgetIconKey, sz?: number, col?: string) {
  return icon(budgetGlyphs[k] || budgetGlyphs.misc, sz || 20, col || '#141414');
}

export const onboardArts = [
  <svg width={200} height={190} viewBox="0 0 200 190" fill="none">
    <rect x={46} y={40} width={108} height={108} rx={14} stroke="#141414" strokeWidth={2} />
    <rect x={66} y={60} width={24} height={24} rx={3} stroke="#141414" strokeWidth={2} />
    <rect x={110} y={60} width={24} height={24} rx={3} stroke="#141414" strokeWidth={2} />
    <rect x={66} y={104} width={24} height={24} rx={3} stroke="#141414" strokeWidth={2} />
    <path d="M110 104h10v10M134 104v24M110 128h24" stroke="#C9455B" strokeWidth={2} strokeLinecap="round" />
    <path d="M30 24v-8h8M170 24v-8h-8M30 166v8h8M170 166v8h-8" stroke="#141414" strokeWidth={2} strokeLinecap="round" />
  </svg>,
  <svg width={200} height={190} viewBox="0 0 200 190" fill="none">
    <circle cx={100} cy={94} r={60} stroke="#141414" strokeWidth={2} />
    <path
      d="M100 60v68M84 76a16 12 0 0116-8c9 0 16 4 16 10s-7 8-16 8-16 4-16 10 7 10 16 10a16 12 0 0016-8"
      stroke="#141414"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path d="M148 52l10-10M158 52l-10-10" stroke="#C9455B" strokeWidth={2} strokeLinecap="round" />
  </svg>,
  <svg width={200} height={190} viewBox="0 0 200 190" fill="none">
    <rect x={40} y={54} width={120} height={80} rx={12} stroke="#141414" strokeWidth={2} />
    <path d="M40 78h120" stroke="#141414" strokeWidth={2} />
    <circle cx={132} cy={108} r={12} stroke="#141414" strokeWidth={2} />
    <path d="M126 108l4 4 8-8" stroke="#C9455B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M56 108h34" stroke="#141414" strokeWidth={2} strokeLinecap="round" />
  </svg>,
];
