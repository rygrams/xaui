import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { useColorMode, useXUITheme } from '../../theme/theme-hook'
import { XUIProvider } from '../../theme/theme-provider'

const mockUseColorScheme = vi.fn<() => 'light' | 'dark' | null | undefined>()

vi.mock('react-native', () => ({
  useColorScheme: () => mockUseColorScheme(),
}))

type MatchMediaListener = () => void
type MediaQueryListLike = {
  matches: boolean
  addEventListener?: (type: 'change', listener: MatchMediaListener) => void
  removeEventListener?: (type: 'change', listener: MatchMediaListener) => void
  addListener?: (listener: MatchMediaListener) => void
  removeListener?: (listener: MatchMediaListener) => void
}

const setMatchMedia = (media: MediaQueryListLike | undefined) => {
  const globalScope = globalThis as typeof globalThis & {
    matchMedia?: (query: string) => MediaQueryListLike
  }

  if (!media) {
    delete globalScope.matchMedia
    return
  }

  globalScope.matchMedia = vi.fn().mockReturnValue(media)
}

beforeEach(() => {
  mockUseColorScheme.mockReset()
  setMatchMedia(undefined)
})

afterEach(() => {
  setMatchMedia(undefined)
})

describe('useColorMode', () => {
  it('returns native color scheme when available', () => {
    mockUseColorScheme.mockReturnValue('dark')
    setMatchMedia({
      matches: false,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    })

    const { result } = renderHook(() => useColorMode())

    expect(result.current).toBe('dark')
  })

  it('defaults to light without native scheme or matchMedia', () => {
    mockUseColorScheme.mockReturnValue(null)
    setMatchMedia(undefined)

    const { result } = renderHook(() => useColorMode())

    expect(result.current).toBe('light')
  })

  it('uses matchMedia when native scheme is unavailable', () => {
    mockUseColorScheme.mockReturnValue(null)
    setMatchMedia({
      matches: true,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    })

    const { result } = renderHook(() => useColorMode())

    expect(result.current).toBe('dark')
  })

  it('updates when matchMedia changes', () => {
    mockUseColorScheme.mockReturnValue(null)

    let listener: MatchMediaListener | undefined
    const media: MediaQueryListLike = {
      matches: false,
      addEventListener: (_type, nextListener) => {
        listener = nextListener
      },
      removeEventListener: () => undefined,
    }

    setMatchMedia(media)

    const { result } = renderHook(() => useColorMode())

    expect(result.current).toBe('light')

    act(() => {
      media.matches = true
      listener?.()
    })

    expect(result.current).toBe('dark')
  })
})

describe('useXUITheme', () => {
  describe('error handling', () => {
    it('should throw error when used outside XUIProvider', () => {
      expect(() => {
        renderHook(() => useXUITheme())
      }).toThrow('useXUITheme must be used within XUIProvider')
    })
  })

  describe('color roles direct access', () => {
    it('should return primary color role with main, foreground, and background', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.colors.primary).toBeDefined()
      expect(typeof result.current.colors.primary.main).toBe('string')
      expect(typeof result.current.colors.primary.foreground).toBe('string')
      expect(typeof result.current.colors.primary.background).toBe('string')
    })

    it('should return secondary color role', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.colors.secondary).toBeDefined()
      expect(typeof result.current.colors.secondary.main).toBe('string')
      expect(typeof result.current.colors.secondary.foreground).toBe('string')
      expect(typeof result.current.colors.secondary.background).toBe('string')
    })

    it('should return semantic color roles', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.colors.success).toBeDefined()
      expect(result.current.colors.warning).toBeDefined()
      expect(result.current.colors.danger).toBeDefined()
      expect(result.current.colors.default).toBeDefined()

      expect(typeof result.current.colors.success.main).toBe('string')
      expect(typeof result.current.colors.warning.main).toBe('string')
      expect(typeof result.current.colors.danger.main).toBe('string')
      expect(typeof result.current.colors.default.main).toBe('string')
    })
  })

  describe('custom theme', () => {
    it('should use custom theme colors when provided', () => {
      const customTheme = {
        colors: {
          primary: {
            main: '#CUSTOM1',
            foreground: '#FFFFFF',
            background: '#CUSTOM1_SURFACE',
          },
          secondary: {
            main: '#CUSTOM2',
            foreground: '#FFFFFF',
            background: '#CUSTOM2_SURFACE',
          },
        },
      }

      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => (
          <XUIProvider theme={customTheme}>{children}</XUIProvider>
        ),
      })

      expect(result.current.colors.primary.main).toBe('#CUSTOM1')
      expect(result.current.colors.secondary.main).toBe('#CUSTOM2')
    })

    it('should use custom font families when provided', () => {
      const customTheme = {
        fontFamilies: {
          body: 'Roboto',
          heading: 'Montserrat',
          default: 'Fira Code',
        },
      }

      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => (
          <XUIProvider theme={customTheme}>{children}</XUIProvider>
        ),
      })

      expect(result.current.fontFamilies.body).toBe('Roboto')
      expect(result.current.fontFamilies.heading).toBe('Montserrat')
      expect(result.current.fontFamilies.default).toBe('Fira Code')
    })

    it('should partially override font families', () => {
      const customTheme = {
        fontFamilies: {
          heading: 'Playfair Display',
        },
      }

      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => (
          <XUIProvider theme={customTheme}>{children}</XUIProvider>
        ),
      })

      expect(result.current.fontFamilies.heading).toBe('Playfair Display')
      expect(result.current.fontFamilies.body).toBe('System')
      expect(result.current.fontFamilies.default).toBe('monospace')
    })
  })

  describe('theme properties access', () => {
    it('should expose spacing property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.spacing).toBeDefined()
      expect(result.current.spacing.xs).toBe(4)
      expect(result.current.spacing.sm).toBe(8)
      expect(result.current.spacing.md).toBe(16)
    })

    it('should expose borderRadius property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.borderRadius).toBeDefined()
      expect(result.current.borderRadius.sm).toBe(4)
      expect(result.current.borderRadius.md).toBe(8)
      expect(result.current.borderRadius.full).toBe(9999)
    })

    it('should expose fontSizes property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.fontSizes).toBeDefined()
      expect(result.current.fontSizes.xs).toBe(12)
      expect(result.current.fontSizes.sm).toBe(14)
      expect(result.current.fontSizes.md).toBe(16)
    })

    it('should expose fontWeights property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.fontWeights).toBeDefined()
      expect(result.current.fontWeights.light).toBe('300')
      expect(result.current.fontWeights.normal).toBe('400')
      expect(result.current.fontWeights.bold).toBe('700')
    })

    it('should expose fontFamilies property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.fontFamilies).toBeDefined()
      expect(result.current.fontFamilies.body).toBe('System')
      expect(result.current.fontFamilies.heading).toBe('System')
      expect(result.current.fontFamilies.default).toBe('monospace')
    })

    it('should expose shadows property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.shadows).toBeDefined()
      expect(result.current.shadows.sm).toBeDefined()
      expect(result.current.shadows.sm.elevation).toBe(1)
      expect(result.current.shadows.md.elevation).toBe(4)
    })
  })
})
