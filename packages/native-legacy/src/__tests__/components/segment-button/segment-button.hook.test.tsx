import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { withOpacity } from '@xaui/core'
import {
  useSegmentSizeStyles,
  useSegmentVariantStyles,
} from '../../../components/segment-button/segment-button.hook'

vi.mock('@xaui/core', async importActual => {
  const actual = await importActual<typeof import('@xaui/core')>()
  return {
    ...actual,
    withPaletteNumber: (color: string) => color,
    getSafeThemeColor: (color: string) => color,
  }
})

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
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
      xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
      },
    },
  }),
}))

describe('useSegmentSizeStyles', () => {
  it('returns correct size styles for xs', () => {
    const { result } = renderHook(() => useSegmentSizeStyles('xs'))

    expect(result.current.minHeight).toBe(38)
    expect(result.current.fontSize).toBe(12)
    expect(result.current.iconSize).toBe(14)
  })

  it('returns correct size styles for sm', () => {
    const { result } = renderHook(() => useSegmentSizeStyles('sm'))

    expect(result.current.minHeight).toBe(42)
    expect(result.current.fontSize).toBe(14)
    expect(result.current.iconSize).toBe(16)
  })

  it('returns correct size styles for md', () => {
    const { result } = renderHook(() => useSegmentSizeStyles('md'))

    expect(result.current.minHeight).toBe(46)
    expect(result.current.fontSize).toBe(16)
    expect(result.current.iconSize).toBe(18)
  })

  it('returns correct size styles for lg', () => {
    const { result } = renderHook(() => useSegmentSizeStyles('lg'))

    expect(result.current.minHeight).toBe(50)
    expect(result.current.fontSize).toBe(18)
    expect(result.current.iconSize).toBe(20)
  })
})

describe('useSegmentVariantStyles', () => {
  it('returns correct styles for outlined variant', () => {
    const { result } = renderHook(() =>
      useSegmentVariantStyles('primary', 'outlined')
    )

    expect(result.current.containerBackground).toBe('transparent')
    expect(result.current.containerBorderWidth).toBe(2)
    expect(result.current.containerBorderColor).toBe('#1976d2')
    expect(result.current.selectedBackground).toBe('#1976d2')
    expect(result.current.unselectedBackground).toBe('transparent')
    expect(result.current.selectedTextColor).toBe('#ffffff')
    expect(result.current.unselectedTextColor).toBe('#1976d2')
  })

  it('returns correct styles for flat variant', () => {
    const { result } = renderHook(() => useSegmentVariantStyles('primary', 'flat'))

    expect(result.current.containerBackground).toBe('#e3f2fd')
    expect(result.current.containerBorderWidth).toBe(0)
    expect(result.current.selectedBackground).toBe('#1976d233')
    expect(result.current.selectedTextColor).toBe('#1976d2')
    expect(result.current.unselectedTextColor).toBe('#1976d2')
  })

  it('returns correct styles for light variant', () => {
    const { result } = renderHook(() => useSegmentVariantStyles('primary', 'light'))

    expect(result.current.containerBackground).toBe('transparent')
    expect(result.current.containerBorderWidth).toBe(0)
    expect(result.current.selectedBackground).toBe('#1976d2')
    expect(result.current.selectedTextColor).toBe('#ffffff')
  })

  it('returns correct styles for faded variant', () => {
    const { result } = renderHook(() => useSegmentVariantStyles('primary', 'faded'))

    expect(result.current.containerBackground).toBe(withOpacity('#e3f2fd', 0.58))
    expect(result.current.containerBorderWidth).toBe(2)
    expect(result.current.containerBorderColor).toBe('#1976d290')
    expect(result.current.selectedBackground).toBe('#1976d233')
    expect(result.current.selectedTextColor).toBe('#1976d2')
    expect(result.current.unselectedTextColor).toBe('#1976d2')
  })

  it('applies elevation shadow to flat variant', () => {
    const { result } = renderHook(() =>
      useSegmentVariantStyles('primary', 'flat', 2)
    )

    expect(result.current.containerShadow).toBeDefined()
    expect(result.current.containerShadow).toHaveProperty('elevation', 5)
  })

  it('does not apply elevation to outlined variant', () => {
    const { result } = renderHook(() =>
      useSegmentVariantStyles('primary', 'outlined', 2)
    )

    expect(result.current.containerShadow).toBeUndefined()
  })

  it('does not apply elevation to light variant', () => {
    const { result } = renderHook(() =>
      useSegmentVariantStyles('primary', 'light', 3)
    )

    expect(result.current.containerShadow).toBeUndefined()
  })

  it('returns no shadow when elevation is 0', () => {
    const { result } = renderHook(() =>
      useSegmentVariantStyles('primary', 'flat', 0)
    )

    expect(result.current.containerShadow).toBeUndefined()
  })

  it('uses correct colors for secondary theme color', () => {
    const { result } = renderHook(() =>
      useSegmentVariantStyles('secondary', 'outlined')
    )

    expect(result.current.containerBorderColor).toBe('#9c27b0')
    expect(result.current.selectedBackground).toBe('#9c27b0')
    expect(result.current.unselectedTextColor).toBe('#9c27b0')
  })
})
