import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useButtonStyles } from '../../../components/button/button.hook'

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: { main: '#1976d2', background: '#e3f2fd', foreground: '#ffffff' },
      secondary: { main: '#9c27b0', background: '#f3e5f5', foreground: '#ffffff' },
      tertiary: { main: '#00796b', background: '#e0f2f1', foreground: '#ffffff' },
      danger: { main: '#d32f2f', background: '#ffebee', foreground: '#ffffff' },
      warning: { main: '#f57c00', background: '#fff3e0', foreground: '#ffffff' },
      success: { main: '#388e3c', background: '#e8f5e9', foreground: '#ffffff' },
      default: { main: '#616161', background: '#f5f5f5', foreground: '#ffffff' },
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

describe('useButtonStyles', () => {
  it('returns correct size styles for md size', () => {
    const { result } = renderHook(() =>
      useButtonStyles('primary', 'solid', 'md', 'md')
    )

    expect(result.current.sizeStyles.minHeight).toBe(40)
    expect(result.current.sizeStyles.fontSize).toBe(16)
  })

  it('returns correct size styles for lg size', () => {
    const { result } = renderHook(() =>
      useButtonStyles('primary', 'solid', 'lg', 'md')
    )

    expect(result.current.sizeStyles.minHeight).toBe(48)
    expect(result.current.sizeStyles.fontSize).toBe(18)
  })

  it('returns correct variant styles for solid variant', () => {
    const { result } = renderHook(() =>
      useButtonStyles('primary', 'solid', 'md', 'md')
    )

    expect(result.current.variantStyles.backgroundColor).toBe('#1976d2')
    expect(result.current.variantStyles.borderWidth).toBe(0)
  })

  it('returns correct variant styles for outlined variant', () => {
    const { result } = renderHook(() =>
      useButtonStyles('primary', 'outlined', 'md', 'md')
    )

    expect(result.current.variantStyles.backgroundColor).toBe('transparent')
    expect(result.current.variantStyles.borderWidth).toBe(1)
    expect(result.current.variantStyles.borderColor).toBe('#1976d2')
  })

  it('returns correct text color for solid variant', () => {
    const { result } = renderHook(() =>
      useButtonStyles('primary', 'solid', 'md', 'md')
    )

    expect(result.current.textColor).toBe('#ffffff')
  })

  it('returns correct text color for outlined variant', () => {
    const { result } = renderHook(() =>
      useButtonStyles('primary', 'outlined', 'md', 'md')
    )

    expect(result.current.textColor).toBe('#1976d2')
  })

  it('returns correct radius styles', () => {
    const { result } = renderHook(() =>
      useButtonStyles('primary', 'solid', 'md', 'lg')
    )

    expect(result.current.radiusStyles.borderRadius).toBe(12)
  })

  it('returns correct spinner size for md size', () => {
    const { result } = renderHook(() =>
      useButtonStyles('primary', 'solid', 'md', 'md')
    )

    expect(result.current.spinnerSize).toBe(18)
  })
})
