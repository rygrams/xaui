import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useFabSizeStyles,
  useFabVariantStyles,
  useFabIconColor,
} from '../../../components/fab/fab.hook'

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
      md: 16,
      lg: 24,
      xl: 32,
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
      xl: 16,
      '2xl': 24,
    },
    borderWidth: {
      md: 2,
    },
    shadows: {
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
    },
  }),
}))

describe('fab hook styles', () => {
  describe('useFabSizeStyles', () => {
    it('returns correct size styles for sm', () => {
      const { result } = renderHook(() => useFabSizeStyles('sm'))

      expect(result.current.sizeStyles.width).toBe(40)
      expect(result.current.sizeStyles.height).toBe(40)
      expect(result.current.sizeStyles.borderRadius).toBe(12)
      expect(result.current.sizeStyles.iconSize).toBe(24)
    })

    it('returns correct size styles for md', () => {
      const { result } = renderHook(() => useFabSizeStyles('md'))

      expect(result.current.sizeStyles.width).toBe(56)
      expect(result.current.sizeStyles.height).toBe(56)
      expect(result.current.sizeStyles.borderRadius).toBe(16)
      expect(result.current.sizeStyles.iconSize).toBe(24)
    })

    it('returns correct size styles for lg', () => {
      const { result } = renderHook(() => useFabSizeStyles('lg'))

      expect(result.current.sizeStyles.width).toBe(96)
      expect(result.current.sizeStyles.height).toBe(96)
      expect(result.current.sizeStyles.borderRadius).toBe(24)
      expect(result.current.sizeStyles.iconSize).toBe(36)
    })

    it('returns correct extended size styles for md', () => {
      const { result } = renderHook(() => useFabSizeStyles('md'))

      expect(result.current.extendedSizeStyles.height).toBe(56)
      expect(result.current.extendedSizeStyles.borderRadius).toBe(16)
      expect(result.current.extendedSizeStyles.paddingHorizontal).toBe(24)
      expect(result.current.extendedSizeStyles.iconSize).toBe(24)
    })
  })

  describe('useFabVariantStyles', () => {
    it('returns correct styles for solid variant', () => {
      const { result } = renderHook(() => useFabVariantStyles('primary', 'solid'))

      expect(result.current.backgroundColor).toBe('#1976d2')
      expect(result.current.borderWidth).toBe(0)
    })

    it('returns correct styles for flat variant', () => {
      const { result } = renderHook(() => useFabVariantStyles('primary', 'flat'))

      expect(result.current.backgroundColor).toBe('#e3f2fd')
      expect(result.current.borderWidth).toBe(0)
    })

    it('returns correct styles for outlined variant', () => {
      const { result } = renderHook(() => useFabVariantStyles('primary', 'outlined'))

      expect(result.current.backgroundColor).toBe('transparent')
      expect(result.current.borderWidth).toBe(2)
    })

    it('returns correct styles for elevated variant', () => {
      const { result } = renderHook(() => useFabVariantStyles('primary', 'elevated'))

      expect(result.current.backgroundColor).toBe('#e3f2fd')
      expect(result.current.borderWidth).toBe(0)
    })
  })

  describe('useFabIconColor', () => {
    it('returns foreground color for solid variant', () => {
      const { result } = renderHook(() => useFabIconColor('primary', 'solid'))

      expect(result.current.iconColor).toBe('#ffffff')
    })

    it('returns main color for flat variant', () => {
      const { result } = renderHook(() => useFabIconColor('primary', 'flat'))

      expect(result.current.iconColor).toBe('#1976d2')
    })

    it('returns main color for outlined variant', () => {
      const { result } = renderHook(() => useFabIconColor('primary', 'outlined'))

      expect(result.current.iconColor).toBe('#1976d2')
    })

    it('returns main color for elevated variant', () => {
      const { result } = renderHook(() => useFabIconColor('primary', 'elevated'))

      expect(result.current.iconColor).toBe('#1976d2')
    })
  })
})
