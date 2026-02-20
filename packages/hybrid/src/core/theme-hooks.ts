'use client'

import { useEffect, useMemo, useState } from 'react'
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

type CSSVarString = `var(--${string})`

type CSSColorScheme = {
  main: CSSVarString
  foreground: CSSVarString
  background: CSSVarString
}

export type HybridXUITheme = {
  mode: ColorMode
  palette: Record<string, CSSVarString>
  colors: {
    primary: CSSColorScheme
    secondary: CSSColorScheme
    tertiary: CSSColorScheme
    danger: CSSColorScheme
    warning: CSSColorScheme
    success: CSSColorScheme
    default: CSSColorScheme
    background: CSSVarString
    foreground: CSSVarString
  }
  borderRadius: Record<Radius, CSSVarString>
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

export function useXUITheme(): HybridXUITheme {
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

  return useMemo(
    () => ({
      mode: resolvedScheme,
      palette: {
        primary: 'var(--xui-primary)',
        secondary: 'var(--xui-secondary)',
        tertiary: 'var(--xui-tertiary)',
        danger: 'var(--xui-danger)',
        warning: 'var(--xui-warning)',
        success: 'var(--xui-success)',
        default: 'var(--xui-default)',
      },
      colors: {
        primary: {
          main: 'var(--xui-primary)',
          foreground: 'var(--xui-primary-fg)',
          background: 'var(--xui-primary-bg)',
        },
        secondary: {
          main: 'var(--xui-secondary)',
          foreground: 'var(--xui-secondary-fg)',
          background: 'var(--xui-secondary-bg)',
        },
        tertiary: {
          main: 'var(--xui-tertiary)',
          foreground: 'var(--xui-tertiary-fg)',
          background: 'var(--xui-tertiary-bg)',
        },
        danger: {
          main: 'var(--xui-danger)',
          foreground: 'var(--xui-danger-fg)',
          background: 'var(--xui-danger-bg)',
        },
        warning: {
          main: 'var(--xui-warning)',
          foreground: 'var(--xui-warning-fg)',
          background: 'var(--xui-warning-bg)',
        },
        success: {
          main: 'var(--xui-success)',
          foreground: 'var(--xui-success-fg)',
          background: 'var(--xui-success-bg)',
        },
        default: {
          main: 'var(--xui-default)',
          foreground: 'var(--xui-default-fg)',
          background: 'var(--xui-default-bg)',
        },
        background: 'var(--xui-background)',
        foreground: 'var(--xui-foreground)',
      },
      borderRadius: {
        none: 'var(--xui-radius-none)',
        sm: 'var(--xui-radius-sm)',
        md: 'var(--xui-radius-md)',
        lg: 'var(--xui-radius-lg)',
        full: 'var(--xui-radius-full)',
      },
    }),
    [resolvedScheme]
  )
}

export function useXUIColors(): HybridXUITheme['colors'] {
  const theme = useXUITheme()
  return theme.colors
}

export function useXUIPalette(): HybridXUITheme['palette'] {
  const theme = useXUITheme()
  return useMemo(() => theme.palette, [theme])
}

export function useBorderRadiusStyles(radius: Radius): { borderRadius: string } {
  return useMemo(
    () => ({
      borderRadius: `var(--xui-radius-${radius})`,
    }),
    [radius]
  )
}
