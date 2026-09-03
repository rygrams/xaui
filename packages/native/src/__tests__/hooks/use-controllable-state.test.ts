import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useControllableState } from '../../hooks/use-controllable-state'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useControllableState — uncontrolled', () => {
  it('starts at the default and keeps what it is told', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 'a' }))

    expect(result.current[0]).toBe('a')

    act(() => result.current[1]('b'))

    expect(result.current[0]).toBe('b')
  })

  it('takes an updater, resolved against the current value', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 1 }))

    act(() => result.current[1](n => n + 1))
    act(() => result.current[1](n => n + 1))

    expect(result.current[0]).toBe(3)
  })

  it('reports every change', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'a', onChange })
    )

    act(() => result.current[1]('b'))

    expect(onChange).toHaveBeenCalledWith('b')
  })
})

describe('useControllableState — controlled', () => {
  it('returns the value it was given and never stores one of its own', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ value: 'a', defaultValue: 'z', onChange })
    )

    act(() => result.current[1]('b'))

    // Told, not changed: the caller decides whether the value actually moves.
    expect(result.current[0]).toBe('a')
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('follows the caller when the value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) =>
        useControllableState({ value, defaultValue: 'z' }),
      { initialProps: { value: 'a' } }
    )

    rerender({ value: 'b' })

    expect(result.current[0]).toBe('b')
  })
})

describe('useControllableState — the setter', () => {
  it('keeps its identity across renders, so a memo below survives', () => {
    const { result, rerender } = renderHook(() =>
      useControllableState({ defaultValue: 'a', onChange: () => {} })
    )
    const first = result.current[1]

    rerender()
    act(() => result.current[1]('b'))

    expect(result.current[1]).toBe(first)
  })

  it('says nothing when the value did not move', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'a', onChange })
    )

    act(() => result.current[1]('a'))

    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('useControllableState — switching modes', () => {
  it('warns when a component goes from uncontrolled to controlled', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { rerender } = renderHook(
      ({ value }: { value?: string }) =>
        useControllableState({ value, defaultValue: 'a' }),
      { initialProps: {} as { value?: string } }
    )

    rerender({ value: 'b' })

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('uncontrolled to controlled')
    )
  })

  it('warns the other way too', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { rerender } = renderHook(
      ({ value }: { value?: string }) =>
        useControllableState({ value, defaultValue: 'a' }),
      { initialProps: { value: 'b' } as { value?: string } }
    )

    rerender({})

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('controlled to uncontrolled')
    )
  })

  it('stays quiet while the mode holds', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { rerender } = renderHook(
      ({ value }: { value: string }) =>
        useControllableState({ value, defaultValue: 'a' }),
      { initialProps: { value: 'b' } }
    )

    rerender({ value: 'c' })
    rerender({ value: 'd' })

    expect(warn).not.toHaveBeenCalled()
  })
})
