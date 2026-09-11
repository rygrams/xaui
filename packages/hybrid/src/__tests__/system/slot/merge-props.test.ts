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

  it('keeps Emotion and child classes while stacking styles', () => {
    expect(
      mergeProps(
        { className: 'xaui', style: { color: 'red' } },
        { className: 'child', style: { color: 'blue' } }
      )
    ).toMatchObject({
      className: 'xaui child',
      style: [{ color: 'red' }, { color: 'blue' }],
    })
  })
})
