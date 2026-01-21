'use client'

import { useContext, useEffect, useState } from 'react'
import { XUIThemeContext } from './theme-context'
import type { XUITheme } from '@xaui/core'

type ColorMode = 'light' | 'dark'

type MediaQueryListLike = {
  matches: boolean
  addEventListener?: (type: 'change', listener: () => void) => void
  removeEventListener?: (type: 'change', listener: () => void) => void
  addListener?: (listener: () => void) => void
  removeListener?: (listener: () => void) => void
}

type GlobalThisLike = typeof globalThis & {
  matchMedia?: (query: string) => MediaQueryListLike
}

const getWebColorMode = (): ColorMode => {
  if (typeof globalThis === 'undefined') return 'light'

  const globalScope = globalThis as GlobalThisLike
  if (!globalScope.matchMedia) {
    return 'light'
  }

  return globalScope.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useColorMode(): ColorMode {
  const [webScheme, setWebScheme] = useState<ColorMode>(() => getWebColorMode())

  useEffect(() => {
    if (typeof globalThis === 'undefined') return
    const globalScope = globalThis as GlobalThisLike
    if (!globalScope.matchMedia) return

    const media = globalScope.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      setWebScheme(media.matches ? 'dark' : 'light')
    }

    handleChange()

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener?.('change', handleChange)
    }

    const legacyMedia = media as {
      addListener?: (listener: () => void) => void
      removeListener?: (listener: () => void) => void
    }

    legacyMedia.addListener?.(handleChange)
    return () => legacyMedia.removeListener?.(handleChange)
  }, [])

  return webScheme
}

export function useXUITheme(): XUITheme {
  const theme = useContext(XUIThemeContext)

  if (!theme) {
    throw new Error('useXUITheme must be used within XUIProvider')
  }

  return theme
}

export function useXUIColors(): XUITheme['colors'] {
  const theme = useXUITheme()

  return theme.colors
}
