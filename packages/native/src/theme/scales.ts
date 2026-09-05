import { Platform } from 'react-native'
import type {
  ColorMode,
  FontSizeKey,
  Size,
  XAUIRadius,
  XAUIShadow,
  XAUITheme,
} from './theme.type'

export const SPACING_UNIT = 4
export const RADIUS_BASE = 12

/** One value redraws every corner in the library. */
export function buildRadius(base: number): XAUIRadius {
  return {
    xs: base * 0.25,
    sm: base * 0.5,
    md: base * 0.75,
    lg: base,
    xl: base * 1.5,
    '2xl': base * 2,
    '3xl': base * 3,
    '4xl': base * 4,
    /**
     * HeroUI's value, reached from the other side of the scale: their `--radius-field` is
     * an alias of their `--radius-xl`, and their base is 8 where ours is 12 — so their
     * field corner is 12 points and, at our default base, so is this.
     *
     * It coincides with `lg` today and is still its own key, because that is what lets a
     * theme round its fields without rounding its cards. It was `base * 1.75`, which put a
     * 48-tall field at 87% of its geometric maximum — a gélule rather than a rounded box.
     */
    field: base,
    full: 9999,
  }
}

export const controlHeights: Record<Size, number> = {
  xs: 32,
  sm: 40,
  md: 48,
  lg: 56,
}

export const fontSizes: Record<FontSizeKey, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
}

export const lineHeights: Record<FontSizeKey, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 40,
}

export const fontWeights: XAUITheme['fontWeights'] = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}

export const fontFamilies: XAUITheme['fontFamilies'] = {
  body: 'System',
  heading: 'System',
  // `'monospace'` is an Android family name, not a generic one: iOS does not resolve it and
  // silently falls back to the system face, so code set with it is not monospaced there.
  // Menlo is the face iOS ships, and it is what HeroUI Native selects for the same reason.
  mono: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
}

export const borderWidth: XAUITheme['borderWidth'] = { default: 1, field: 1 }

export const opacity: XAUITheme['opacity'] = { disabled: 0.5 }

const noShadow: XAUIShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
}

/**
 * Three roles, not an sm→xl scale — which is what lets dark mode drop the surface shadow
 * entirely instead of shipping a scale that reads as dirt on a dark background.
 */
export function buildShadows(mode: ColorMode): XAUITheme['shadows'] {
  if (mode === 'dark') {
    return {
      surface: noShadow,
      overlay: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 24,
        elevation: 16,
      },
      field: noShadow,
    }
  }
  return {
    surface: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
      elevation: 2,
    },
    overlay: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 24,
      elevation: 16,
    },
    field: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
  }
}
