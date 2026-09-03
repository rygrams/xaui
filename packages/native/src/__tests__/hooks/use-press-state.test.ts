import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { GestureResponderEvent } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'

const event = {} as GestureResponderEvent

describe('usePressState', () => {
  it('follows the press', () => {
    const { result } = renderHook(() => usePressState())

    expect(result.current[0]).toBe(false)

    act(() => result.current[1].onPressIn(event))
    expect(result.current[0]).toBe(true)

    act(() => result.current[1].onPressOut(event))
    expect(result.current[0]).toBe(false)
  })

  it("composes the caller's handlers rather than replacing them", () => {
    const onPressIn = vi.fn()
    const onPressOut = vi.fn()
    const { result } = renderHook(() => usePressState({ onPressIn, onPressOut }))

    act(() => result.current[1].onPressIn(event))
    act(() => result.current[1].onPressOut(event))

    expect(onPressIn).toHaveBeenCalledWith(event)
    expect(onPressOut).toHaveBeenCalledWith(event)
    expect(result.current[0]).toBe(false)
  })

  it('keeps the handlers identical across renders, so a memo below survives', () => {
    const { result, rerender } = renderHook(() =>
      // A fresh arrow on every render, which is what a call site always passes.
      usePressState({ onPressIn: () => {} })
    )
    const first = result.current[1]

    rerender()
    act(() => result.current[1].onPressIn(event))
    rerender()

    expect(result.current[1]).toBe(first)
    expect(result.current[1].onPressIn).toBe(first.onPressIn)
  })

  it('calls the latest handler, not the one from the first render', () => {
    const first = vi.fn()
    const second = vi.fn()
    const { result, rerender } = renderHook(
      ({ onPressIn }: { onPressIn: () => void }) => usePressState({ onPressIn }),
      { initialProps: { onPressIn: first } }
    )

    rerender({ onPressIn: second })
    act(() => result.current[1].onPressIn(event))

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledOnce()
  })
})
