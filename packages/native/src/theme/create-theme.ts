import { stableHash } from '../utils/stable-hash'
import { deriveColors } from './derive-colors'
import {
  RADIUS_BASE,
  SPACING_UNIT,
  borderWidth,
  buildRadius,
  buildShadows,
  controlHeights,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  opacity,
} from './scales'
import { sourceKeys, tokens } from './tokens.gen'
import type {
  ColorMode,
  XAUIColors,
  XAUISourceColors,
  XAUITheme,
  XAUIThemeConfig,
  XAUIThemeSet,
} from './theme.type'

/**
 * default → user source → deriveColors → explicit overrides of derived tokens.
 * The overrides land *after* derivation, which is what makes mixing the two safe.
 */
function resolveColors(mode: ColorMode, config: XAUIThemeConfig): XAUIColors {
  const defaults = tokens[mode] as unknown as XAUIColors
  const overrides = config.colors?.[mode]

  // Nothing overridden: the generated tokens are already both layers resolved, so no
  // colour maths runs at startup.
  if (!overrides || Object.keys(overrides).length === 0) return defaults

  const source = {} as XAUISourceColors
  for (const key of sourceKeys) {
    source[key] = overrides[key] ?? defaults[key]
  }

  return { ...defaults, ...source, ...deriveColors(source), ...overrides }
}

function resolveMode(mode: ColorMode, config: XAUIThemeConfig, id: string): XAUITheme {
  const unit = config.spacingUnit ?? SPACING_UNIT
  const shadows = buildShadows(mode)

  return {
    id,
    mode,
    colors: resolveColors(mode, config),
    spacing: steps => steps * unit,
    radius: { ...buildRadius(config.radius ?? RADIUS_BASE) },
    borderWidth: { ...borderWidth, ...config.borderWidth },
    fontSizes: { ...fontSizes, ...config.fontSizes },
    lineHeights: { ...lineHeights, ...config.lineHeights },
    fontWeights: { ...fontWeights, ...config.fontWeights },
    fontFamilies: { ...fontFamilies, ...config.fontFamilies },
    shadows: {
      surface: { ...shadows.surface, ...config.shadows?.surface },
      overlay: { ...shadows.overlay, ...config.shadows?.overlay },
      field: { ...shadows.field, ...config.shadows?.field },
    },
    opacity: { ...opacity, ...config.opacity },
    controlHeights: { ...controlHeights, ...config.controlHeights },
  }
}

/**
 * Build a theme once, at module level:
 *
 * ```ts
 * export const appTheme = createTheme({ colors: { light: { accent: '#3b82f6' } } })
 * ```
 *
 * Module level is not a style preference — it is what makes the memoization bug
 * impossible. A literal object passed to the provider changes identity on every parent
 * render and rebuilds every style in the app.
 */
export function createTheme(config: XAUIThemeConfig = {}): XAUIThemeSet {
  const id = stableHash(config)
  return {
    id,
    light: resolveMode('light', config, id),
    dark: resolveMode('dark', config, id),
  }
}

export const defaultTheme = createTheme()
