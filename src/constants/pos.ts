// Kopag Brew POS design tokens — extracted from Figma.
export const Kopag = {
  espresso: '#3E2723',
  espressoDeep: '#2E1C19',
  latte: '#F5EBDD',
  caramel: '#C08552',
  caramelDark: '#AA6E41',
  success: '#388E3C',
  danger: '#D32F2F',
  muted: '#8D7B74',
  line: '#E8DCCF',
  card: '#FFFFFF',
  creamCard: '#FFF8F0',
  info: '#8D7B74',
} as const;

export const Pad = { xs: 4, sm: 8, md: 16, lg: 24 } as const;
export const Radius = { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 } as const;

export const TONE: Record<string, { bg: string; fg: string; soft: string }> = {
  low: { bg: '#D32F2F', fg: '#D32F2F', soft: '#FDECEC' },
  new: { bg: '#C08552', fg: '#C08552', soft: '#F9EFE3' },
  ok: { bg: '#388E3C', fg: '#388E3C', soft: '#E8F5E9' },
  info: { bg: '#8D7B74', fg: '#8D7B74', soft: '#EFEBE9' },
};

export const peso = (n: number) =>
  `₱${Math.round(n).toLocaleString('en-PH')}`;
