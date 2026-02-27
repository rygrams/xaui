import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useTabsSizeStyles,
  useTabsVariantStyles,
} from '../../../components/tabs/tabs.hook'

vi.mock('@xaui/core', () => ({
  withPaletteNumber: (color: string) => color,
  getSafeThemeColor: (color: string) => color,
}))

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: {
        main: '#1976d2',
        container: '#e3f2fd',
        onMain: '#ffffff',
        onContainer: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
        container: '#f3e5f5',
        onMain: '#ffffff',
        onContainer: '#9c27b0',
      },
      default: {
        main: '#616161',
        container: '#f5f5f5',
        onMain: '#ffffff',
        onContainer: '#616161',
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
    borderWidth: {
      sm: 1,
      md: 2,
    },
    componentSizes: {
      xs: 38,
      sm: 42,
      md: 46,
      lg: 50,
    },
  }),
}))

describe('useTabsSizeStyles', () => {
  it('returns correct styles for xs', () => {
    const { result } = renderHook(() => useTabsSizeStyles('xs'))

    expect(result.current.minHeight).toBe(38)
    expect(result.current.fontSize).toBe(12)
  })

  it('returns correct styles for md', () => {
    const { result } = renderHook(() => useTabsSizeStyles('md'))

    expect(result.current.minHeight).toBe(46)
    expect(result.current.fontSize).toBe(16)
  })
})

describe('useTabsVariantStyles', () => {
  it('returns correct styles for solid variant', () => {
    const { result } = renderHook(() => useTabsVariantStyles('primary', 'solid'))

    expect(result.current.listBackgroundColor).toBe('#e3f2fd')
    expect(result.current.cursorColor).toBe('#1976d2')
    expect(result.current.selectedTextColor).toBe('#ffffff')
  })

  it('returns correct styles for underlined variant', () => {
    const { result } = renderHook(() =>
      useTabsVariantStyles('primary', 'underlined')
    )

    expect(result.current.listBackgroundColor).toBe('transparent')
    expect(result.current.cursorHeight).toBe(2)
    expect(result.current.listBorderColor).toBe('#1976d245')
  })

  it('uses selected color palette', () => {
    const { result } = renderHook(() =>
      useTabsVariantStyles('secondary', 'bordered')
    )

    expect(result.current.listBorderColor).toBe('#9c27b030')
    expect(result.current.cursorColor).toBe('#9c27b0')
    expect(result.current.textColor).toBe('#9c27b0')
  })
})
