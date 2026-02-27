import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useSizesStyles,
  useTextStyles,
  useVariantSizesStyles,
} from '../../../components/button/button.hook'
import { useBorderRadiusStyles } from '../../../core/theme-hooks'
import { XUIThemeContext } from '../../../core/theme-context'
import { defaultTheme } from '@xaui/core/theme'

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: {
        main: '#1976d2',
        background: '#e3f2fd',
        foreground: '#ffffff',
        accent: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
        background: '#f3e5f5',
        foreground: '#ffffff',
        accent: '#9c27b0',
      },
      tertiary: {
        main: '#00796b',
        background: '#e0f2f1',
        foreground: '#ffffff',
        accent: '#00796b',
      },
      danger: {
        main: '#d32f2f',
        background: '#ffebee',
        foreground: '#ffffff',
        accent: '#d32f2f',
      },
      warning: {
        main: '#f57c00',
        background: '#fff3e0',
        foreground: '#ffffff',
        accent: '#f57c00',
      },
      success: {
        main: '#388e3c',
        background: '#e8f5e9',
        foreground: '#ffffff',
        accent: '#388e3c',
      },
      default: {
        main: '#616161',
        background: '#f5f5f5',
        foreground: '#ffffff',
        accent: '#616161',
      },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
    },
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      full: 9999,
    },
    borderWidth: {
      md: 1,
    },
    componentSizes: {
      xs: 38,
      sm: 42,
      md: 46,
      lg: 50,
    },
    shadows: {
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    },
  }),
}))

describe('button hook styles', () => {
  it('returns correct size styles for md size', () => {
    const { result } = renderHook(() => useSizesStyles('md'))

    expect(result.current.sizeStyles.minHeight).toBe(46)
    expect(result.current.sizeStyles.fontSize).toBe(16)
  })

  it('returns correct size styles for lg size', () => {
    const { result } = renderHook(() => useSizesStyles('lg'))

    expect(result.current.sizeStyles.minHeight).toBe(50)
    expect(result.current.sizeStyles.fontSize).toBe(18)
  })

  it('returns correct variant styles for solid variant', () => {
    const { result } = renderHook(() => useVariantSizesStyles('primary', 'solid'))

    expect(result.current.backgroundColor).toBe('#1976d2')
    expect(result.current.borderWidth).toBe(0)
  })

  it('returns correct variant styles for bordered variant', () => {
    const { result } = renderHook(() => useVariantSizesStyles('primary', 'bordered'))

    expect(result.current.backgroundColor).toBe('transparent')
    expect(result.current.borderWidth).toBe(1)
    if ('borderColor' in result.current) {
      expect(result.current.borderColor).toBe('#1976d2')
    }
  })

  it('returns correct text color for solid variant', () => {
    const { result } = renderHook(() => useTextStyles('primary', 'solid'))

    expect(result.current.textColor).toBe('#ffffff')
  })

  it('returns correct text color for bordered variant', () => {
    const { result } = renderHook(() => useTextStyles('primary', 'bordered'))

    expect(result.current.textColor).toBe('#1976d2')
  })

  it('returns correct radius styles', () => {
    const { result } = renderHook(() => useBorderRadiusStyles('lg'), {
      wrapper: ({ children }) => (
        <XUIThemeContext.Provider value={defaultTheme}>
          {children}
        </XUIThemeContext.Provider>
      ),
    })

    expect(result.current.borderRadius).toBe(12)
  })

  it('returns correct spinner size for md size', () => {
    const { result } = renderHook(() => useSizesStyles('md'))

    expect(result.current.spinnerSize).toBe(18)
  })
})
