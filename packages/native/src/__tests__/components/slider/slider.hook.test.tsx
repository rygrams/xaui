import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useSliderColorStyles,
  useSliderSizeStyles,
} from '../../../components/slider/slider.hook'

vi.mock('@xaui/core', () => ({
  withPaletteNumber: (color: string) => color,
  getSafeThemeColor: (color: string) => color,
}))

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: {
        main: '#1976d2',
        background: '#e3f2fd',
        foreground: '#ffffff',
      },
      secondary: {
        main: '#9c27b0',
        background: '#f3e5f5',
        foreground: '#ffffff',
      },
      default: {
        main: '#616161',
        background: '#f5f5f5',
        foreground: '#ffffff',
      },
      foreground: '#111111',
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
    },
  }),
}))

describe('useSliderSizeStyles', () => {
  it('returns xs styles', () => {
    const { result } = renderHook(() => useSliderSizeStyles('xs'))

    expect(result.current.trackThickness).toBe(4)
    expect(result.current.thumbSize).toBe(14)
  })

  it('returns lg styles', () => {
    const { result } = renderHook(() => useSliderSizeStyles('lg'))

    expect(result.current.trackThickness).toBe(10)
    expect(result.current.thumbSize).toBe(24)
  })
})

describe('useSliderColorStyles', () => {
  it('returns active color styles', () => {
    const { result } = renderHook(() => useSliderColorStyles('primary', false))

    expect(result.current.fillColor).toBe('#1976d2')
    expect(result.current.thumbColor).toBe('#1976d2')
  })

  it('returns disabled color styles', () => {
    const { result } = renderHook(() => useSliderColorStyles('primary', true))

    expect(result.current.fillColor).toContain('#616161')
    expect(result.current.trackColor).toContain('#616161')
  })
})
