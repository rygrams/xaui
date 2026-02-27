import React, { createContext, ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { defaultDarkTheme, defaultTheme, XUITheme } from '@xaui/core/theme'
import { colors } from '@xaui/core/palette'
import { PortalHost } from './portal'

export const XUIThemeContext = createContext<XUITheme | null>(null)

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export interface XUIProviderProps {
  children: ReactNode
  theme?: DeepPartial<XUITheme>
}

export function XUIProvider({ children, theme }: XUIProviderProps) {
  const colorScheme = useColorScheme() ?? 'light'

  const appTheme = React.useMemo(() => {
    const isDarkMode = colorScheme === 'dark'

    if (!theme) return isDarkMode ? defaultDarkTheme : defaultTheme

    return {
      ...defaultTheme,
      ...theme,
      mode: colorScheme,
      colors: {
        ...defaultTheme.colors,
        ...theme?.colors,
      },
      fontFamilies: {
        ...defaultTheme.fontFamilies,
        ...theme?.fontFamilies,
      },
      fontSizes: {
        ...defaultTheme.fontSizes,
        ...theme?.fontSizes,
      },
      componentSizes: {
        ...defaultTheme.componentSizes,
        ...theme?.componentSizes,
      },
      palette: colors,
    } as XUITheme
  }, [colorScheme])

  return (
    <XUIThemeContext.Provider value={appTheme}>
      <PortalHost>{children}</PortalHost>
    </XUIThemeContext.Provider>
  )
}
