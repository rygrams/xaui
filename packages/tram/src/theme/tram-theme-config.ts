import type { ColorMode, XAUIThemeConfig } from '@xaui/native/theme'
import { accentInk, accentSoftInk } from './accent-ink'
import { onAccent } from './on-accent'
import { TRAM_RADIUS, tramAccents } from './tram-tokens'
import type { TramAccentName } from './tram-tokens'

type ModeColors = NonNullable<NonNullable<XAUIThemeConfig['colors']>[ColorMode]>

export type TramThemeOptions = XAUIThemeConfig & {
  /**
   * One of the twenty named accents, or any `#RRGGBB`. The text drawn on it is computed.
   *
   * @default 'cyan'
   */
  accent?: TramAccentName | (string & {})
}

const NO_SHADOW = {
  shadowOpacity: 0,
  shadowRadius: 0,
  shadowOffset: { width: 0, height: 0 },
  elevation: 0,
}

const intents = {
  success: tramAccents.green,
  successForeground: onAccent(tramAccents.green),
  warning: tramAccents.amber,
  warningForeground: onAccent(tramAccents.amber),
  danger: tramAccents.red,
  dangerForeground: onAccent(tramAccents.red),
}

/** True black and true white: what everything else is drawn, and measured, on. */
const BACKGROUND: Record<ColorMode, string> = { dark: '#000000', light: '#FFFFFF' }

/**
 * Secondary text is the design's translucent ink, flattened on its ground — 64% white on
 * black, 60% black on white — because the colour engine mixes opaque values.
 */
const ground: Record<ColorMode, ModeColors> = {
  dark: {
    background: BACKGROUND.dark,
    foreground: '#FFFFFF',
    muted: '#A3A3A3',
    surface: '#0F0F0F',
    surfaceForeground: '#FFFFFF',
    default: '#1F1F1F',
    defaultForeground: '#FFFFFF',
    overlay: '#1F1F1F',
    overlayForeground: '#FFFFFF',
    border: '#FFFFFF',
    fieldBackground: '#000000',
    fieldForeground: '#FFFFFF',
    fieldPlaceholder: '#A3A3A3',
    fieldBorder: '#FFFFFF',
    ...intents,
  },
  light: {
    background: BACKGROUND.light,
    foreground: '#000000',
    muted: '#666666',
    surface: '#F2F2F2',
    surfaceForeground: '#000000',
    default: '#DDDDDD',
    defaultForeground: '#000000',
    overlay: '#DDDDDD',
    overlayForeground: '#000000',
    border: '#000000',
    fieldBackground: '#FFFFFF',
    fieldForeground: '#000000',
    fieldPlaceholder: '#666666',
    fieldBorder: '#000000',
    ...intents,
  },
}

// `in` would also answer yes to `toString` and return a function for a colour.
function isAccentName(accent: string): accent is TramAccentName {
  return Object.prototype.hasOwnProperty.call(tramAccents, accent)
}

function resolveAccent(accent: string): string {
  return isAccentName(accent) ? tramAccents[accent] : accent
}

/**
 * Where the accent is read rather than filled — a link, a focus ring, the label of a soft
 * box — it is the mode's ink, computed against the ground the caller ends up with.
 */
function inkOn(mode: ColorMode, fill: string, config: XAUIThemeConfig): ModeColors {
  const background = config.colors?.[mode]?.background ?? BACKGROUND[mode]
  const ink = accentInk(fill, background)

  return {
    focus: ink,
    link: ink,
    accentSoftForeground: accentSoftInk(fill, background),
  }
}

/**
 * The `createTheme` input that draws Tram: true black, a 3-point border, a 2-point corner,
 * no shadow anywhere. Everything the caller passes wins over it.
 */
export function buildTramThemeConfig(
  options: TramThemeOptions = {}
): XAUIThemeConfig {
  const { accent = 'cyan', ...config } = options
  const fill = resolveAccent(accent)
  const tint = { accent: fill, accentForeground: onAccent(fill) }

  return {
    ...config,
    colors: {
      dark: {
        ...ground.dark,
        ...tint,
        ...inkOn('dark', fill, config),
        ...config.colors?.dark,
      },
      light: {
        ...ground.light,
        ...tint,
        ...inkOn('light', fill, config),
        ...config.colors?.light,
      },
    },
    radius: config.radius ?? TRAM_RADIUS,
    borderWidth: { default: 3, field: 3, ...config.borderWidth },
    fontFamilies: { body: 'Selawik', heading: 'Selawik', ...config.fontFamilies },
    shadows: {
      surface: { ...NO_SHADOW, ...config.shadows?.surface },
      overlay: { ...NO_SHADOW, ...config.shadows?.overlay },
      field: { ...NO_SHADOW, ...config.shadows?.field },
    },
  }
}
