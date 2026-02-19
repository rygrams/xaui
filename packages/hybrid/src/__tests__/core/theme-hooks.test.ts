import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { XUIThemeContext } from '../../core/theme-context'
import {
  useXUITheme,
  useXUIColors,
  useXUIPalette,
  useBorderRadiusStyles,
} from '../../core/theme-hooks'
import { defaultTheme } from '@xaui/core/theme'

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(XUIThemeContext.Provider, { value: defaultTheme }, children)

describe('useXUITheme', () => {
  it('returns the theme from context', () => {
    const { result } = renderHook(() => useXUITheme(), { wrapper })
    expect(result.current).toBe(defaultTheme)
  })

  it('throws when used outside XUIProvider', () => {
    expect(() => renderHook(() => useXUITheme())).toThrow(
      'useXUITheme must be used within XUIProvider'
    )
  })
})

describe('useXUIColors', () => {
  it('returns the colors from the theme', () => {
    const { result } = renderHook(() => useXUIColors(), { wrapper })
    expect(result.current).toBe(defaultTheme.colors)
  })
})

describe('useXUIPalette', () => {
  it('returns the palette from the theme', () => {
    const { result } = renderHook(() => useXUIPalette(), { wrapper })
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
    const { result } = renderHook(() => useBorderRadiusStyles(radius), { wrapper })
    expect(result.current).toEqual({ borderRadius: expected })
  })
})

describe('useColorMode', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns light when matchMedia is not available', async () => {
    const { useColorMode } = await import('../../core/theme-hooks')
    Object.defineProperty(globalThis, 'matchMedia', { value: undefined, configurable: true })
    const { result } = renderHook(() => useColorMode())
    expect(result.current).toBe('light')
  })
})
