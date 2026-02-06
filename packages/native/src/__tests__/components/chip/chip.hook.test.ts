import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  useChipSizeStyles,
  useChipDotSize,
  useChipCloseSize,
  useChipRadiusStyles,
  useChipVariantStyles,
} from '../../../components/chip/chip.hook'

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: { main: '#1976d2', foreground: '#ffffff', background: '#e3f2fd' },
      secondary: { main: '#9c27b0', foreground: '#ffffff', background: '#f3e5f5' },
      danger: { main: '#d32f2f', foreground: '#ffffff', background: '#ffebee' },
      warning: { main: '#f57c00', foreground: '#000000', background: '#fff3e0' },
      success: { main: '#388e3c', foreground: '#ffffff', background: '#e8f5e9' },
      default: { main: '#ffffff', foreground: '#111827', background: '#f5f5f5' },
    },
    spacing: { xs: 4, sm: 8, md: 16 },
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      full: 9999,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1,
        elevation: 1,
      },
    },
  }),
}))

describe('useChipSizeStyles', () => {
  it('should return sm size styles', () => {
    const { result } = renderHook(() => useChipSizeStyles('sm'))
    expect(result.current.height).toBe(24)
    expect(result.current.fontSize).toBe(12)
  })

  it('should return md size styles', () => {
    const { result } = renderHook(() => useChipSizeStyles('md'))
    expect(result.current.height).toBe(32)
    expect(result.current.fontSize).toBe(14)
  })

  it('should return lg size styles', () => {
    const { result } = renderHook(() => useChipSizeStyles('lg'))
    expect(result.current.height).toBe(40)
    expect(result.current.fontSize).toBe(16)
  })
})

describe('useChipDotSize', () => {
  it('should return correct dot size for each size', () => {
    const { result: sm } = renderHook(() => useChipDotSize('sm'))
    const { result: md } = renderHook(() => useChipDotSize('md'))
    const { result: lg } = renderHook(() => useChipDotSize('lg'))
    expect(sm.current).toBe(6)
    expect(md.current).toBe(8)
    expect(lg.current).toBe(10)
  })
})

describe('useChipCloseSize', () => {
  it('should return correct close size for each size', () => {
    const { result: sm } = renderHook(() => useChipCloseSize('sm'))
    const { result: md } = renderHook(() => useChipCloseSize('md'))
    const { result: lg } = renderHook(() => useChipCloseSize('lg'))
    expect(sm.current).toBe(12)
    expect(md.current).toBe(14)
    expect(lg.current).toBe(16)
  })
})

describe('useChipRadiusStyles', () => {
  it('should return full radius as half height', () => {
    const { result } = renderHook(() => useChipRadiusStyles('full', 32))
    expect(result.current.borderRadius).toBe(16)
  })

  it('should return theme radius for named values', () => {
    const { result } = renderHook(() => useChipRadiusStyles('md', 32))
    expect(result.current.borderRadius).toBe(8)
  })

  it('should return 0 for none', () => {
    const { result } = renderHook(() => useChipRadiusStyles('none', 32))
    expect(result.current.borderRadius).toBe(0)
  })
})

describe('useChipVariantStyles', () => {
  it('should return solid variant styles', () => {
    const { result } = renderHook(() => useChipVariantStyles('primary', 'solid'))
    expect(result.current.backgroundColor).toBe('#1976d2')
    expect(result.current.color).toBe('#ffffff')
  })

  it('should return bordered variant styles', () => {
    const { result } = renderHook(() =>
      useChipVariantStyles('primary', 'bordered'),
    )
    expect(result.current.backgroundColor).toBe('transparent')
    expect(result.current.borderWidth).toBe(2)
    expect(result.current.borderColor).toBe('#1976d2')
  })

  it('should return light variant styles', () => {
    const { result } = renderHook(() =>
      useChipVariantStyles('primary', 'light'),
    )
    expect(result.current.backgroundColor).toBe('transparent')
    expect(result.current.color).toBe('#1976d2')
  })

  it('should return flat variant styles', () => {
    const { result } = renderHook(() =>
      useChipVariantStyles('primary', 'flat'),
    )
    expect(result.current.backgroundColor).toBe('#e3f2fd')
    expect(result.current.color).toBe('#1976d2')
  })

  it('should return shadow variant styles', () => {
    const { result } = renderHook(() =>
      useChipVariantStyles('primary', 'shadow'),
    )
    expect(result.current.backgroundColor).toBe('#1976d2')
    expect(result.current.shadow).toBeDefined()
  })

  it('should return dot variant styles', () => {
    const { result } = renderHook(() =>
      useChipVariantStyles('primary', 'dot'),
    )
    expect(result.current.dotColor).toBe('#1976d2')
    expect(result.current.backgroundColor).toBe('#e3f2fd')
  })
})
