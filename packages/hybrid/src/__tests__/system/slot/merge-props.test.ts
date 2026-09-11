import { describe, expect, it, vi } from 'vitest'
import { mergeProps } from '../../../system/slot/merge-props'

describe('mergeProps', () => {
  it('composes handlers and lets child attributes remain most specific', () => {
    const componentHandler = vi.fn()
    const childHandler = vi.fn()
    const merged = mergeProps(
      { onClick: componentHandler, title: 'component' },
      { onClick: childHandler, title: 'child' }
    )

    ;(merged.onClick as () => void)()
    expect(componentHandler).toHaveBeenCalledBefore(childHandler)
    expect(merged.title).toBe('child')
  })

  it('keeps Emotion and child classes while flattening styles into one object', () => {
    expect(
      mergeProps(
        { className: 'xaui', style: { color: 'red', margin: 0 } },
        { className: 'child', style: { color: 'blue' } }
      )
    ).toMatchObject({
      className: 'xaui child',
      style: { color: 'blue', margin: 0 },
    })
  })

  it('keeps whichever side carries a style when the other has none', () => {
    expect(mergeProps({}, { style: { color: 'blue' } }).style).toEqual({
      color: 'blue',
    })
    expect(
      mergeProps({ style: { color: 'red' } }, { style: undefined }).style
    ).toEqual({ color: 'red' })
  })
})
