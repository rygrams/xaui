import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMenuMeasurements } from '../../../components/menu/menu.hook'

describe('useMenuMeasurements', () => {
  it('returns triggerRef and menuRef', () => {
    const { result } = renderHook(() => useMenuMeasurements(false, 'bottom'))

    expect(result.current.triggerRef).toBeDefined()
    expect(result.current.menuRef).toBeDefined()
  })

  it('initializes with default values', () => {
    const { result } = renderHook(() => useMenuMeasurements(false, 'bottom'))

    expect(result.current.triggerLayout).toBeNull()
    expect(result.current.menuLayout).toEqual({ width: 0, height: 0 })
    expect(result.current.menuPosition).toEqual({ top: 0, left: 0 })
  })

  it('accepts bottom position', () => {
    const { result } = renderHook(() => useMenuMeasurements(false, 'bottom'))
    expect(result.current).toBeDefined()
  })

  it('accepts top position', () => {
    const { result } = renderHook(() => useMenuMeasurements(false, 'top'))
    expect(result.current).toBeDefined()
  })

  it('handles visible state changes', () => {
    const { result, rerender } = renderHook(
      ({ visible }) => useMenuMeasurements(visible, 'bottom'),
      { initialProps: { visible: false } }
    )

    expect(result.current.triggerLayout).toBeNull()

    rerender({ visible: true })

    expect(result.current).toBeDefined()
  })
})
