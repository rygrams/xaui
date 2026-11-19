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

export type TramTypeStep = {
  fontSize: number
  weight: TramFontWeight
  /**
   * The ceiling on the system's text-size multiplier. Sizes follow the user's setting;
   * a role that is already giant only has so much screen to grow into.
   */
  maxFontScale?: number
}

export const tramType: Record<TramTypeRole, TramTypeStep> = {
  caption: { fontSize: 13, weight: 'regular' },
  body: { fontSize: 16, weight: 'regular' },
  subtitle: { fontSize: 19, weight: 'regular' },
  title: { fontSize: 25, weight: 'semilight' },
  section: { fontSize: 32, weight: 'light' },
  pivot: { fontSize: 42, weight: 'light' },
  page: { fontSize: 64, weight: 'light' },
  hero: { fontSize: 120, weight: 'light', maxFontScale: 1.25 },
}

/**
 * What is written on a photo: white, and a name on a band of black so it reads on any
 * picture. The same in dark and light — a photo is not the theme's.
 */
export const tramPicture = { ink: '#FFFFFF', band: 'rgba(0, 0, 0, 0.6)' } as const

/**
 * Metro's subtle grey — `PhoneSubtleColor`, the same `#999999` on black and on white: the
 * detail under a list's title, the time of a mail. Greyer than `muted`. Read on a ground
 * it goes through `accentInk`, so on white it darkens to the first grey at 4.5:1.
 */
export const tramSubtle = '#999999'

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
