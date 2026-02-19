import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useAlertContainerStyles,
  useAlertIconWrapperStyles,
  useAlertTextStyles,
} from '../../../components/alert/alert.hook'
import { withOpacity } from '@xaui/core'

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: { main: '#1976d2', background: '#e3f2fd', foreground: '#ffffff' },
      secondary: { main: '#9c27b0', background: '#f3e5f5', foreground: '#ffffff' },
      tertiary: { main: '#00796b', background: '#e0f2f1', foreground: '#ffffff' },
      danger: { main: '#d32f2f', background: '#ffebee', foreground: '#ffffff' },
      warning: { main: '#f57c00', background: '#fff3e0', foreground: '#ffffff' },
      success: { main: '#388e3c', background: '#e8f5e9', foreground: '#ffffff' },
      default: { main: '#ffffff', background: '#f5f5f5', foreground: '#212121' },
      background: '#ffffff',
      foreground: '#111111',
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
    borderWidth: { none: 0, xs: 0.5, sm: 1, md: 2, lg: 3, xl: 4 },
    fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36 },
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  }),
}))

describe('useAlertContainerStyles', () => {
  it('returns solid variant styles', () => {
    const { result } = renderHook(() => useAlertContainerStyles('primary', 'solid'))

    expect(result.current.backgroundColor).toBe('#1976d2')
    expect(result.current.borderStyle).toBeUndefined()
    expect(result.current.borderWidth).toBeUndefined()
  })

  it('returns flat variant styles', () => {
    const { result } = renderHook(() => useAlertContainerStyles('primary', 'flat'))

    expect(result.current.backgroundColor).toBe('#e3f2fd')
    expect(result.current.borderStyle).toBeUndefined()
  })

  it('returns bordered variant styles', () => {
    const { result } = renderHook(() => useAlertContainerStyles('warning', 'bordered'))

    expect(result.current.backgroundColor).toBe('transparent')
    expect(result.current.borderStyle).toBe('solid')
    expect(result.current.borderWidth).toBe(2)
    expect(result.current.borderColor).toBe(withOpacity('#f57c00', 0.75))
  })

  it('returns faded variant styles', () => {
    const { result } = renderHook(() => useAlertContainerStyles('success', 'faded'))

    expect(result.current.backgroundColor).toBe(withOpacity('#e8f5e9', 0.75))
    expect(result.current.borderStyle).toBe('solid')
    expect(result.current.borderWidth).toBe(2)
  })

  it('includes padding from theme spacing', () => {
    const { result } = renderHook(() => useAlertContainerStyles('primary', 'flat'))

    expect(result.current.padding).toBe('8px 16px')
  })
})

describe('useAlertIconWrapperStyles', () => {
  it('returns flat variant icon wrapper styles', () => {
    const { result } = renderHook(() => useAlertIconWrapperStyles('secondary', 'flat'))

    expect(result.current.backgroundColor).toBe(withOpacity('#9c27b0', 0.12))
    expect(result.current.borderStyle).toBeUndefined()
  })

  it('returns bordered variant icon wrapper styles', () => {
    const { result } = renderHook(() => useAlertIconWrapperStyles('primary', 'bordered'))

    expect(result.current.borderStyle).toBe('solid')
    expect(result.current.borderWidth).toBe(0.5)
  })

  it('returns solid variant icon wrapper background using foreground opacity', () => {
    const { result } = renderHook(() => useAlertIconWrapperStyles('primary', 'solid'))

    expect(result.current.backgroundColor).toBe(withOpacity('#ffffff', 0.16))
  })
})

describe('useAlertTextStyles', () => {
  it('returns solid variant text color from foreground', () => {
    const { result } = renderHook(() => useAlertTextStyles('primary', 'solid'))

    expect(result.current.titleStyles.color).toBe('#ffffff')
    expect(result.current.iconColor).toBe('#ffffff')
    expect(result.current.closeButtonColor).toBe('#ffffff')
  })

  it('uses foreground color for default theme in flat variant', () => {
    const { result } = renderHook(() => useAlertTextStyles('default', 'flat'))

    expect(result.current.titleStyles.color).toBe('#111111')
    expect(result.current.descriptionStyles.color).toBe(withOpacity('#111111', 0.75))
  })

  it('uses main color for non-default theme in flat variant', () => {
    const { result } = renderHook(() => useAlertTextStyles('danger', 'flat'))

    expect(result.current.titleStyles.color).toBe('#d32f2f')
  })

  it('includes font size and weight from theme', () => {
    const { result } = renderHook(() => useAlertTextStyles('primary', 'flat'))

    expect(result.current.titleStyles.fontSize).toBe(14)
    expect(result.current.titleStyles.fontWeight).toBe('600')
    expect(result.current.descriptionStyles.fontSize).toBe(12)
    expect(result.current.descriptionStyles.fontWeight).toBe('400')
  })
})
