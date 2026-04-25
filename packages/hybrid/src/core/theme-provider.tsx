'use client'

import React, { createContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { defaultDarkTheme, defaultTheme } from '@xaui/core/theme'
import type { XUITheme } from '@xaui/core/theme'
import { colors } from '@xaui/core/palette'

export const XUIThemeContext = createContext<XUITheme | null>(null)

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export interface XUIProviderProps {
  children: ReactNode
  theme?: DeepPartial<XUITheme>
}

type ColorMode = 'light' | 'dark'

function useSystemColorMode(): ColorMode {
  const [mode, setMode] = useState<ColorMode>(() => {
    if (typeof globalThis === 'undefined' || !globalThis.matchMedia) return 'light'
    return globalThis.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    if (typeof globalThis === 'undefined' || !globalThis.matchMedia) return
    const media = globalThis.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      setMode(media.matches ? 'dark' : 'light')
    }
    handleChange()
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }
    const legacy = media as {
      addListener?: (fn: () => void) => void
      removeListener?: (fn: () => void) => void
    }
    legacy.addListener?.(handleChange)
    return () => legacy.removeListener?.(handleChange)
  }, [])

  return mode
}

export function XUIProvider({ children, theme }: XUIProviderProps) {
  const systemMode = useSystemColorMode()
  const colorScheme = theme?.mode ?? systemMode

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.colorScheme = colorScheme
  }, [colorScheme])

  const appTheme = useMemo(() => {
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
  }, [colorScheme, theme])

  return (
    <XUIThemeContext.Provider value={appTheme}>{children}</XUIThemeContext.Provider>
  )
}
