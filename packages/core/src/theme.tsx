import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react'
import { colors, ColorName, ColorShade, getColor } from '@xaui/colors'
import { ThemeAction, themeReducer } from './theme-reducer'
import { defaultTheme, XUITheme } from './theme-config'

export const XUIThemeContext = createContext<XUITheme | null>(null)
export const XUIThemeDispatchContext = createContext<Dispatch<ThemeAction> | null>(null)

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export interface XUIProviderProps {
  children: ReactNode
  theme?: DeepPartial<XUITheme>
}

export function XUIProvider({ children, theme: customTheme }: XUIProviderProps) {
  const initialTheme = React.useMemo(() => {
    if (!customTheme) return defaultTheme

    return {
      ...defaultTheme,
      ...customTheme,
      colors: {
        ...defaultTheme.colors,
        ...customTheme.colors,
      },
      fontFamilies: {
        ...defaultTheme.fontFamilies,
        ...customTheme.fontFamilies,
      },
      fontSizes: {
        ...defaultTheme.fontSizes,
        ...customTheme.fontSizes,
      },
    } as XUITheme
  }, [customTheme])

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
