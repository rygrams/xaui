import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useDividerColor,
  useDividerSize,
} from '../../../components/divider/divider.hook'

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
  }),
}))

describe('divider hook styles', () => {
  it('returns theme color when no custom color is provided', () => {
    const { result } = renderHook(() => useDividerColor('primary', undefined))

    expect(result.current).toBe('#1976d2')
  })

  it('returns custom color when provided', () => {
    const customColor = '#FF0000'
    const { result } = renderHook(() => useDividerColor('primary', customColor))

    expect(result.current).toBe(customColor)
  })

  it('returns correct color for different theme colors', () => {
    const { result: primaryResult } = renderHook(() =>
      useDividerColor('primary', undefined)
    )
    const { result: dangerResult } = renderHook(() =>
      useDividerColor('danger', undefined)
    )
    const { result: successResult } = renderHook(() =>
      useDividerColor('success', undefined)
    )

    expect(primaryResult.current).toBe('#1976d2')
    expect(dangerResult.current).toBe('#d32f2f')
    expect(successResult.current).toBe('#388e3c')
  })

  it('returns correct size styles for horizontal orientation', () => {
    const { result } = renderHook(() => useDividerSize(2, 'horizontal'))

    expect(result.current.height).toBe(2)
    expect(result.current.width).toBeUndefined()
  })

  it('returns correct size styles for vertical orientation', () => {
    const { result } = renderHook(() => useDividerSize(3, 'vertical'))

    expect(result.current.width).toBe(3)
    expect(result.current.height).toBeUndefined()
  })

  it('returns correct size styles for different sizes', () => {
    const { result: size1 } = renderHook(() => useDividerSize(1, 'horizontal'))
    const { result: size5 } = renderHook(() => useDividerSize(5, 'horizontal'))

    expect(size1.current.height).toBe(1)
    expect(size5.current.height).toBe(5)
  })
})
