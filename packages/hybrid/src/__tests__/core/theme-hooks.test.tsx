import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { XUIProvider } from '../../core/theme-provider'
import {
  useXUITheme,
  useXUIColors,
  useXUIPalette,
  useBorderRadiusStyles,
  useColorMode,
} from '../../core/theme-hooks'

const wrapper = ({ children }: { children: ReactNode }) => (
  <XUIProvider>{children}</XUIProvider>
)

const darkWrapper = ({ children }: { children: ReactNode }) => (
  <XUIProvider theme={{ mode: 'dark' }}>{children}</XUIProvider>
)

describe('useXUITheme', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
  })

  it('returns default light theme when no custom theme', () => {
    const { result } = renderHook(() => useXUITheme(), { wrapper })
    expect(result.current.mode).toBe('light')
  })

  it('returns dark theme when mode is dark', () => {
    const { result } = renderHook(() => useXUITheme(), { wrapper: darkWrapper })
    expect(result.current.mode).toBe('dark')
  })

  it('throws when used outside XUIProvider', () => {
    expect(() => renderHook(() => useXUITheme())).toThrow(
      'useXUITheme must be used within XUIProvider'
    )
  })
})

describe('useXUIColors', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
  })

  it('returns the colors from the theme', () => {
    const { result } = renderHook(() => useXUIColors(), { wrapper })
    expect(result.current.primary.main).toBeDefined()
    expect(result.current.warning.onMain).toBeDefined()
    expect(result.current.background).toBeDefined()
    expect(result.current.foreground).toBeDefined()
  })
})

describe('useXUIPalette', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
  })

  it('returns the palette from the theme', () => {
    const { result } = renderHook(() => useXUIPalette(), { wrapper })
    expect(result.current.purple).toBeDefined()
    expect(result.current.purple[500]).toBeDefined()
  })
})

describe('useBorderRadiusStyles', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
  })

  it.each([
    ['none', 0],
    ['sm', 4],
    ['md', 8],
    ['lg', 12],
    ['full', 9999],
  ] as const)('returns correct borderRadius for radius=%s', (radius, expected) => {
    const { result } = renderHook(() => useBorderRadiusStyles(radius), { wrapper })
    expect(result.current).toEqual({ borderRadius: expected })
  })
})

describe('useColorMode', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns light when matchMedia reports light', () => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    const { result } = renderHook(() => useColorMode(), { wrapper })
    expect(result.current).toBe('light')
  })

  it('returns light when matchMedia is not available', () => {
    Object.defineProperty(globalThis, 'matchMedia', {
      configurable: true,
      value: undefined,
    })
    const { result } = renderHook(() => useColorMode(), { wrapper })
    expect(result.current).toBe('light')
  })
})
