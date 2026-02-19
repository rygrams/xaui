'use client'

import { useEffect, useMemo, useState } from 'react'
import { XUITheme, defaultDarkTheme, defaultTheme } from '@xaui/core/theme'
import { Radius } from '../types'

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

const getDocumentColorMode = (): ColorMode | null => {
  if (typeof document === 'undefined') return null
  const scheme = document.documentElement.dataset.colorScheme
  return scheme === 'dark' || scheme === 'light' ? scheme : null
}

const getWebColorMode = (): ColorMode => {
  if (typeof globalThis === 'undefined') return 'light'

  const globalScope = globalThis as GlobalThisLike
  if (!globalScope.matchMedia) return 'light'

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
  const systemScheme = useColorMode()
  const [documentScheme, setDocumentScheme] = useState<ColorMode | null>(() =>
    getDocumentColorMode()
  )

  useEffect(() => {
    if (typeof document === 'undefined') return
    const node = document.documentElement
    const update = () => setDocumentScheme(getDocumentColorMode())
    update()

    const observer = new MutationObserver(update)
    observer.observe(node, {
      attributes: true,
      attributeFilter: ['data-color-scheme'],
    })

    return () => observer.disconnect()
  }, [])

  const resolvedScheme = documentScheme ?? systemScheme
  return resolvedScheme === 'dark' ? defaultDarkTheme : defaultTheme
}

export function useXUIColors(): XUITheme['colors'] {
  const theme = useXUITheme()
  return theme.colors
}

export function useXUIPalette(): XUITheme['palette'] {
  const theme = useXUITheme()
  return useMemo(() => theme.palette, [theme])
}

export function useBorderRadiusStyles(radius: Radius): { borderRadius: string } {
  const theme = useXUITheme()

  return useMemo(() => {
    const radiusMap: Record<Radius, number> = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }

    return { borderRadius: `${radiusMap[radius]}px` }
  }, [radius, theme])
}
