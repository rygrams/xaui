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
  body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: 'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace',
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

export function buildShadows(mode: ColorMode): XAUITheme['shadows'] {
  if (mode === 'dark') {
    return {
      surface: noShadow,
      overlay: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
        elevation: 8,
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
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
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
