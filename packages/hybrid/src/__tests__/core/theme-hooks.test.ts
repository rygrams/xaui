import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useXUITheme,
  useXUIColors,
  useXUIPalette,
  useBorderRadiusStyles,
} from '../../core/theme-hooks'

describe('useXUITheme', () => {
  it('returns default light theme by default', () => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    document.documentElement.dataset.colorScheme = ''

    const { result } = renderHook(() => useXUITheme())
    expect(result.current.mode).toBe('light')
  })

  it('returns dark theme when document data-color-scheme=dark', () => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    document.documentElement.dataset.colorScheme = 'dark'

    const { result } = renderHook(() => useXUITheme())
    expect(result.current.mode).toBe('dark')
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
    expect(result.current.primary.main).toBe('var(--xui-primary)')
    expect(result.current.warning.foreground).toBe('var(--xui-warning-fg)')
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
    expect(result.current.primary).toBe('var(--xui-primary)')
    expect(result.current.default).toBe('var(--xui-default)')
  })
})

describe('useBorderRadiusStyles', () => {
  it.each([
    ['none', 'var(--xui-radius-none)'],
    ['sm', 'var(--xui-radius-sm)'],
    ['md', 'var(--xui-radius-md)'],
    ['lg', 'var(--xui-radius-lg)'],
    ['full', 'var(--xui-radius-full)'],
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
