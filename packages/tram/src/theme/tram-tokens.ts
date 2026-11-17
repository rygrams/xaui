/**
 * What `XAUITheme` has no slot for. Hand-written data: the values are the "Tram" column
 * of `.project-specs/TRAM-DESIGN.md`.
 */

/** The twenty Windows Phone 8 accents. */
export const tramAccents = {
  lime: '#A4C400',
  green: '#60A917',
  emerald: '#008A00',
  teal: '#00ABA9',
  cyan: '#1BA1E2',
  cobalt: '#0050EF',
  indigo: '#6A00FF',
  violet: '#AA00FF',
  pink: '#F472D0',
  magenta: '#D80073',
  crimson: '#A20025',
  red: '#E51400',
  orange: '#FA6800',
  amber: '#F0A30A',
  yellow: '#E3C800',
  brown: '#825A2C',
  olive: '#6D8764',
  steel: '#647687',
  mauve: '#76608A',
  taupe: '#87794E',
} as const

export type TramAccentName = keyof typeof tramAccents

/**
 * A weight is a name here, not a number: Selawik's SemiLight sits at 350, which RN's
 * `fontWeight` cannot say, so `Typography` resolves the name to a face.
 */
export type TramFontWeight = 'light' | 'semilight' | 'regular'

export type TramTypeRole =
  | 'caption'
  | 'body'
  | 'subtitle'
  | 'title'
  | 'section'
  | 'pivot'
  | 'page'
  | 'hero'

export const tramType: Record<
  TramTypeRole,
  { fontSize: number; weight: TramFontWeight }
> = {
  caption: { fontSize: 13, weight: 'regular' },
  body: { fontSize: 16, weight: 'regular' },
  subtitle: { fontSize: 19, weight: 'regular' },
  title: { fontSize: 25, weight: 'semilight' },
  section: { fontSize: 32, weight: 'light' },
  pivot: { fontSize: 42, weight: 'light' },
  page: { fontSize: 64, weight: 'light' },
  hero: { fontSize: 120, weight: 'light' },
}

export const tramTileColumns = { phone: 4, tablet: 6, foldable: 8 } as const

/**
 * The three sizes a Tram control comes in — the scale of the Metro switch and radio. No
 * `xs`: under 40 a control stops being something a finger finds.
 */
export type TramSize = 'sm' | 'md' | 'lg'

/** The smallest side of anything pressable — reached with `hitSlop` when drawn smaller. */
export const TRAM_TOUCH_TARGET = 48

/** The one corner Tram allows. Circles are the only shape that goes past it. */
export const TRAM_RADIUS = 2
