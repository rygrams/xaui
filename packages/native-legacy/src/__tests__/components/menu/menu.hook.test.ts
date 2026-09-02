import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useMenuTriggerMeasurements,
  useMenuContentLayout,
  useMenuAnimation,
} from '../../../components/menu/menu.hook'

describe('useMenuTriggerMeasurements', () => {
  it('returns triggerRef', () => {
    const { result } = renderHook(() => useMenuTriggerMeasurements(false))
    expect(result.current.triggerRef).toBeDefined()
  })

  it('initializes triggerPosition as null', () => {
    const { result } = renderHook(() => useMenuTriggerMeasurements(false))
    expect(result.current.triggerPosition).toBeNull()
  })
})

describe('useMenuContentLayout', () => {
  it('returns initial contentSize as zero', () => {
    const { result } = renderHook(() => useMenuContentLayout(false))
    expect(result.current.contentSize).toEqual({ width: 0, height: 0 })
  })

  it('returns handleContentLayout function', () => {
    const { result } = renderHook(() => useMenuContentLayout(false))
    expect(typeof result.current.handleContentLayout).toBe('function')
  })
})

describe('useMenuAnimation', () => {
  it('returns opacity and scale animated values', () => {
    const { result } = renderHook(() => useMenuAnimation(false))
    expect(result.current.opacity).toBeDefined()
    expect(result.current.scale).toBeDefined()
  })

  it('handles visible state', () => {
    const { result, rerender } = renderHook(
      ({ visible }) => useMenuAnimation(visible),
      { initialProps: { visible: false } }
    )

    expect(result.current.opacity).toBeDefined()
    expect(result.current.scale).toBeDefined()

    rerender({ visible: true })

    expect(result.current.opacity).toBeDefined()
    expect(result.current.scale).toBeDefined()
  })
})
