import { describe, expect, it, vi } from 'vitest'
import type { AccessibilityActionEvent } from 'react-native'
import { adjustableProps } from '../../../components/panorama/panorama.adjust'

const event = (actionName: string) =>
  ({ nativeEvent: { actionName } }) as AccessibilityActionEvent

describe('adjustableProps', () => {
  it('is an adjustable read as the section on screen', () => {
    const props = adjustableProps(
      { valueText: 'collection', onAction: () => {} },
      {}
    )

    expect(props.accessible).toBe(true)
    expect(props.accessibilityRole).toBe('adjustable')
    expect(props.accessibilityValue).toEqual({ text: 'collection' })
    expect(props['aria-valuetext']).toBe('collection')
    expect(props.accessibilityActions).toEqual([
      { name: 'increment' },
      { name: 'decrement' },
    ])
  })

  it("keeps the caller's actions and runs its handler after ours", () => {
    const calls: string[] = []
    const props = adjustableProps(
      { valueText: undefined, onAction: () => calls.push('ours') },
      {
        accessibilityActions: [{ name: 'activate' }],
        onAccessibilityAction: () => calls.push('theirs'),
      }
    )

    props.onAccessibilityAction(event('increment'))

    expect(props.accessibilityActions.map(action => action.name)).toEqual([
      'increment',
      'decrement',
      'activate',
    ])
    expect(calls).toEqual(['ours', 'theirs'])
  })

  it('works without a handler of the caller', () => {
    const onAction = vi.fn()
    adjustableProps({ valueText: 'x', onAction }, {}).onAccessibilityAction(
      event('decrement')
    )

    expect(onAction).toHaveBeenCalledOnce()
  })
})
