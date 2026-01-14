import React, { createContext, ReactNode } from 'react'
import { colors, ColorName, ColorShade, getColor } from '@xaui/colors'
import { defaultTheme, XUITheme } from './theme-config'
import { useColorScheme } from 'react-native'

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
  const colorScheme = useColorScheme()

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

export { colors, getColor }
export type { ColorName, ColorShade }
