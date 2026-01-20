import React, { createContext, ReactNode } from 'react'
import { defaultTheme, XUITheme } from './theme-config'
import { useColorMode } from './theme-hook'

export const XUIThemeContext = createContext<XUITheme | null>(null)

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export interface XUIProviderProps {
  children: ReactNode
  theme?: DeepPartial<XUITheme>
  darkTheme?: DeepPartial<XUITheme>
}

export function XUIProvider({
  children,
  theme: lightTheme,
  darkTheme,
}: XUIProviderProps) {
  const colorScheme = useColorMode()

  const theme = React.useMemo(() => {
    if (!darkTheme && !lightTheme) return defaultTheme

    const activeTheme = colorScheme === 'dark' && darkTheme ? darkTheme : lightTheme
    if (!activeTheme) return defaultTheme

    return {
      ...defaultTheme,
      ...activeTheme,
      colors: {
        ...defaultTheme.colors,
        ...activeTheme.colors,
      },
      fontFamilies: {
        ...defaultTheme.fontFamilies,
        ...activeTheme.fontFamilies,
      },
      fontSizes: {
        ...defaultTheme.fontSizes,
        ...activeTheme.fontSizes,
      },
    } as XUITheme
  }, [lightTheme, darkTheme, colorScheme])

  return <XUIThemeContext.Provider value={theme}>{children}</XUIThemeContext.Provider>
}
