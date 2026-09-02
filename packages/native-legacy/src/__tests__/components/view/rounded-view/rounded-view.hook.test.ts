import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useRoundedViewStyle } from '../../../../components/view/rounded-view/rounded-view.hook'

describe('useRoundedViewStyle', () => {
  it('should apply all corners when all prop is provided', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ all: 16 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    })
  })

  it('should apply top corners when top prop is provided', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ top: 20 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    })
  })

  it('should apply bottom corners when bottom prop is provided', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ bottom: 12 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    })
  })

  it('should apply left corners when left prop is provided', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ left: 8 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 8,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 0,
    })
  })

  it('should apply right corners when right prop is provided', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ right: 24 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 0,
      borderTopRightRadius: 24,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 24,
    })
  })

  it('should apply specific corner when topLeft prop is provided', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ topLeft: 10 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 10,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    })
  })

  it('should prioritize specific corner over general props', () => {
    const { result } = renderHook(() =>
      useRoundedViewStyle({ all: 16, topLeft: 0, bottomRight: 32 })
    )

    expect(result.current).toEqual({
      borderTopLeftRadius: 0,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 32,
    })
  })

  it('should prioritize top over all for top corners', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ all: 16, top: 24 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    })
  })

  it('should prioritize left over all for left corners', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ all: 16, left: 8 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 8,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 16,
    })
  })

  it('should handle combination of top and bottom', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ top: 20, bottom: 10 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    })
  })

  it('should handle combination of left and right', () => {
    const { result } = renderHook(() => useRoundedViewStyle({ left: 8, right: 24 }))

    expect(result.current).toEqual({
      borderTopLeftRadius: 8,
      borderTopRightRadius: 24,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 24,
    })
  })

  it('should handle complex combination with priority', () => {
    const { result } = renderHook(() =>
      useRoundedViewStyle({
        all: 10,
        top: 20,
        left: 15,
        topLeft: 5,
        bottomRight: 30,
      })
    )

    expect(result.current).toEqual({
      borderTopLeftRadius: 5,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 30,
    })
  })

  it('should default to 0 when no props are provided', () => {
    const { result } = renderHook(() => useRoundedViewStyle({}))

    expect(result.current).toEqual({
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    })
  })
})
