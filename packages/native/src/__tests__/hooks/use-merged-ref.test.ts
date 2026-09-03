import { renderHook } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { usePrevious } from '../../hooks/use-previous'

describe('useMergedRef', () => {
  it('feeds every ref it was given', () => {
    const object = createRef<string>()
    const callback = vi.fn()

    const { result } = renderHook(() => useMergedRef<string>(object, callback))
    result.current('node')

    expect(object.current).toBe('node')
    expect(callback).toHaveBeenCalledWith('node')
  })

  it('keeps its identity while the refs hold', () => {
    const object = createRef<string>()
    const { result, rerender } = renderHook(() => useMergedRef<string>(object))
    const first = result.current

    rerender()

    // A new callback each render would make React detach and reattach every ref, and
    // pay for a node measurement every time.
    expect(result.current).toBe(first)
  })

  it('makes a new one when a ref changes', () => {
    const { result, rerender } = renderHook(
      ({ ref }: { ref: { current: string | null } }) => useMergedRef<string>(ref),
      { initialProps: { ref: createRef<string>() } }
    )
    const first = result.current

    rerender({ ref: createRef<string>() })

    expect(result.current).not.toBe(first)
  })
})

describe('usePrevious', () => {
  it('is undefined on the first render', () => {
    const { result } = renderHook(() => usePrevious('a'))

    expect(result.current).toBeUndefined()
  })

  it('lags one render behind', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => usePrevious(value),
      { initialProps: { value: 'a' } }
    )

    rerender({ value: 'b' })
    expect(result.current).toBe('a')

    rerender({ value: 'c' })
    expect(result.current).toBe('b')
  })

  it('tracks the previous render, not the previous distinct value', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => usePrevious(value),
      { initialProps: { value: 'a' } }
    )

    rerender({ value: 'b' })
    expect(result.current).toBe('a')

    // Rendered with 'b' twice, so the render before this one held 'b'. Anyone wanting
    // "the last value that differed" wants a different hook.
    rerender({ value: 'b' })
    expect(result.current).toBe('b')
  })
})
