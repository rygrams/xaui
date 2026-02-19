import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useXUITheme,
  useXUIColors,
  useXUIPalette,
  useBorderRadiusStyles,
} from '../../core/theme-hooks'
import { defaultDarkTheme, defaultTheme } from '@xaui/core/theme'

describe('useXUITheme', () => {
  it('returns default light theme by default', () => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    document.documentElement.dataset.colorScheme = ''

    const { result } = renderHook(() => useXUITheme())
    expect(result.current).toBe(defaultTheme)
  })

  it('returns dark theme when document data-color-scheme=dark', () => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    document.documentElement.dataset.colorScheme = 'dark'

    const { result } = renderHook(() => useXUITheme())
    expect(result.current).toBe(defaultDarkTheme)
  })
})

describe('useXUIColors', () => {
  it('returns the colors from the theme', () => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    document.documentElement.dataset.colorScheme = ''
    const { result } = renderHook(() => useXUIColors())
    expect(result.current).toBe(defaultTheme.colors)
  })
})

describe('useXUIPalette', () => {
  it('returns the palette from the theme', () => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    document.documentElement.dataset.colorScheme = ''
    const { result } = renderHook(() => useXUIPalette())
    expect(result.current).toBe(defaultTheme.palette)
  })
})

describe('useBorderRadiusStyles', () => {
  it.each([
    ['none', '0px'],
    ['sm', '4px'],
    ['md', '8px'],
    ['lg', '12px'],
    ['full', '9999px'],
  ] as const)('returns correct borderRadius for radius=%s', (radius, expected) => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    document.documentElement.dataset.colorScheme = ''
    const { result } = renderHook(() => useBorderRadiusStyles(radius))
    expect(result.current).toEqual({ borderRadius: expected })
  })
})

describe('useColorMode', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    document.documentElement.dataset.colorScheme = ''
  })

  it('returns light when matchMedia is not available', async () => {
    const { useColorMode } = await import('../../core/theme-hooks')
    Object.defineProperty(globalThis, 'matchMedia', { value: undefined, configurable: true })
    const { result } = renderHook(() => useColorMode())
    expect(result.current).toBe('light')
  })
})
