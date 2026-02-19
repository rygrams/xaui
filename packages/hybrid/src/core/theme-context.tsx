'use client'

import React, { createContext, ReactNode, useEffect } from 'react'
import { useColorMode } from './theme-hooks'
import { defaultTheme, XUITheme } from '@xaui/core/theme'

export const XUIThemeContext = createContext<XUITheme | null>(null)

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export interface XUIProviderProps {
  children: ReactNode
  theme?: DeepPartial<XUITheme>
  darkTheme?: DeepPartial<XUITheme>
  colorScheme?: 'light' | 'dark'
}

export function XUIProvider({
  children,
  theme: lightTheme,
  darkTheme,
  colorScheme: forcedScheme,
}: XUIProviderProps) {
  const systemScheme = useColorMode()
  const colorScheme = forcedScheme ?? systemScheme

  useEffect(() => {
    if (forcedScheme) return
    if (typeof document === 'undefined') return
    document.documentElement.dataset.colorScheme = colorScheme
  }, [colorScheme, forcedScheme])

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
