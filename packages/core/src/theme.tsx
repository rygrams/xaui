import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react'
import { colors, ColorName, ColorShade, getColor } from '@xaui/colors'
import { themeColors, darkThemeColors } from './theme-colors'
import { ThemeAction, themeReducer } from './theme-reducer'

export interface ThemeColors {
  primary: string
  secondary: string
  success: string
  warning: string
  error: string
  info: string

  text: {
    primary: string
    secondary: string
    tertiary: string
    disabled: string
    inverse: string
  }

  background: {
    primary: string
    secondary: string
    tertiary: string
    inverse: string
  }

  border: {
    primary: string
    secondary: string
    focus: string
  }
}

export interface ThemeSpacing {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
}

export interface ThemeBorderRadius {
  none: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  full: number
}

export interface ThemeFontSizes {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  '4xl': number
}

export interface ThemeFontWeights {
  light: '300'
  normal: '400'
  medium: '500'
  semibold: '600'
  bold: '700'
  extrabold: '800'
}

export interface ThemeShadows {
  sm: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  md: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  lg: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  xl: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
}

export interface XUITheme {
  colors: ThemeColors
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  fontSizes: ThemeFontSizes
  fontWeights: ThemeFontWeights
  shadows: ThemeShadows
}

export const theme: XUITheme = {
  colors: themeColors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
}

export const darkTheme: XUITheme = {
  colors: darkThemeColors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
}

const defaultTheme = theme

export const XUIThemeContext = createContext<XUITheme | null>(null)
export const XUIThemeDispatchContext = createContext<Dispatch<ThemeAction> | null>(null)

export interface XUIProviderProps {
  children: ReactNode
  theme?: Partial<XUITheme>
}

export function XUIProvider({ children, theme: customTheme }: XUIProviderProps) {
  const initialTheme = React.useMemo(
    () => ({
      ...defaultTheme,
      ...customTheme,
    }),
    [customTheme]
  )

  const [theme, dispatch] = useReducer(themeReducer, initialTheme)

  return (
    <XUIThemeContext.Provider value={theme}>
      <XUIThemeDispatchContext.Provider value={dispatch}>
        {children}
      </XUIThemeDispatchContext.Provider>
    </XUIThemeContext.Provider>
  )
}

export function useXUITheme(): XUITheme {
  const context = useContext(XUIThemeContext)
  if (!context) {
    throw new Error('useXUITheme must be used within XUIProvider')
  }
  return context
}

export { colors, getColor }
export type { ColorName, ColorShade }
