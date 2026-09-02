import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { mergeProps } from '../../../system/slot/merge-props'

describe('mergeProps', () => {
  it('lets the child win on an ordinary prop, and keeps ours where it set none', () => {
    expect(
      mergeProps(
        { accessibilityRole: 'button', testID: 'ours' },
        { testID: 'theirs' }
      )
    ).toEqual({ accessibilityRole: 'button', testID: 'theirs' })
  })

  it('composes event handlers instead of replacing one with the other', () => {
    const calls: string[] = []
    const ours = vi.fn(() => calls.push('ours'))
    const theirs = vi.fn(() => calls.push('theirs'))

    const merged = mergeProps({ onPress: ours }, { onPress: theirs })
    ;(merged.onPress as () => void)()

    expect(ours).toHaveBeenCalledOnce()
    expect(theirs).toHaveBeenCalledOnce()
    // Ours first: the press state that drives our styles settles before the child's
    // navigation runs.
    expect(calls).toEqual(['ours', 'theirs'])
  })

  it('passes the arguments through to both handlers', () => {
    const ours = vi.fn()
    const theirs = vi.fn()

    const merged = mergeProps({ onPress: ours }, { onPress: theirs })
    ;(merged.onPress as (event: string) => void)('event')

    expect(ours).toHaveBeenCalledWith('event')
    expect(theirs).toHaveBeenCalledWith('event')
  })

  it('keeps whichever handler exists when only one side has one', () => {
    const ours = vi.fn()

    expect(mergeProps({ onPress: ours }, {}).onPress).toBe(ours)
    expect(mergeProps({ onPress: ours }, { onPress: undefined }).onPress).toBe(ours)
    expect(mergeProps({}, { onPress: ours }).onPress).toBe(ours)
  })

  it('stacks styles with the child on top', () => {
    const merged = mergeProps({ style: { padding: 4 } }, { style: { padding: 8 } })

    expect(merged.style).toEqual([{ padding: 4 }, { padding: 8 }])
  })

  it('keeps a style function callable, so a Pressable state style survives', () => {
    const ours = vi.fn(({ pressed }: { pressed: boolean }) => ({
      opacity: pressed ? 1 : 0,
    }))

    const merged = mergeProps({ style: ours }, { style: { padding: 8 } })
    const style = merged.style as (state: { pressed: boolean }) => unknown

    expect(typeof merged.style).toBe('function')
    expect(style({ pressed: true })).toEqual([{ opacity: 1 }, { padding: 8 }])
    expect(ours).toHaveBeenCalledWith({ pressed: true })
  })

  it('calls both style functions when both sides are dynamic', () => {
    const merged = mergeProps(
      {
        style: ({ pressed }: { pressed: boolean }) => ({ opacity: pressed ? 1 : 0 }),
      },
      {
        style: ({ pressed }: { pressed: boolean }) => ({ padding: pressed ? 8 : 4 }),
      }
    )
    const style = merged.style as (state: { pressed: boolean }) => unknown

    expect(style({ pressed: false })).toEqual([{ opacity: 0 }, { padding: 4 }])
  })

  it('merges refs rather than dropping one — React 19 passes ref as a prop', () => {
    const ours = createRef<string>()
    const theirs = createRef<string>()

    const merged = mergeProps({ ref: ours }, { ref: theirs })
    ;(merged.ref as (value: string) => void)('node')

    expect(ours.current).toBe('node')
    expect(theirs.current).toBe('node')
  })

  it('leaves ours untouched', () => {
    const ours = { testID: 'ours' }

    mergeProps(ours, { testID: 'theirs' })

    expect(ours).toEqual({ testID: 'ours' })
  })
})
