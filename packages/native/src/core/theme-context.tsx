import React, { createContext, ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { defaultTheme, XUITheme } from '@xaui/core/theme'
import { colors } from '@xaui/core/palette'
import { PortalHost } from './portal'

export const XUIThemeContext = createContext<XUITheme | null>(null)

export type DeepPartial<T> = {
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
  const colorScheme = useColorScheme() ?? 'light'

  const theme = React.useMemo(() => {
    if (!darkTheme && !lightTheme) return defaultTheme

    const activeTheme = colorScheme === 'dark' && darkTheme ? darkTheme : lightTheme
    const mode = colorScheme === 'dark' ? 'dark' : 'light'

    if (!activeTheme) return defaultTheme

    return {
      ...defaultTheme,
      ...activeTheme,
      mode,
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
      palette: colors,
    } as XUITheme
  }, [lightTheme, darkTheme, colorScheme])

  return (
    <XUIThemeContext.Provider value={theme}>
      <PortalHost>{children}</PortalHost>
    </XUIThemeContext.Provider>
  )
}
