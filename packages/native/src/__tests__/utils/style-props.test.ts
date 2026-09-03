import { describe, expect, it, vi } from 'vitest'
import { splitStyleProps } from '../../utils/style-props'

describe('splitStyleProps', () => {
  it('takes the style keys out and leaves everything else in', () => {
    const onPress = vi.fn()

    expect(splitStyleProps({ padding: 16, marginTop: 8, onPress, testID: 'a' })).toEqual([
      { padding: 16, marginTop: 8 },
      { onPress, testID: 'a' },
    ])
  })

  it('passes values through untouched, in React Native units', () => {
    // R14's whole contract: the prop carries the RN key's name, so `16` is 16 points and
    // not a step on the spacing scale. A split that multiplied here would be the most
    // expensive trap in the API — the kind only a ruler on the screen catches.
    const [styleProps] = splitStyleProps({ padding: 4, width: '100%', opacity: 0 })

    expect(styleProps).toEqual({ padding: 4, width: '100%', opacity: 0 })
  })

  it('leaves `style` itself alone — it is the last word, not a style prop', () => {
    const style = { transform: [{ scale: 1 }] }
    const [styleProps, rest] = splitStyleProps({ height: 40, style })

    expect(styleProps).toEqual({ height: 40 })
    expect(rest).toEqual({ style })
  })

  it('keeps a key written as `undefined` in the style half', () => {
    // Written is written. Dropping it would be a transformation, and `undefined` in a
    // style is already a no-op.
    const [styleProps, rest] = splitStyleProps({ padding: undefined, testID: 'a' })

    expect(styleProps).toHaveProperty('padding', undefined)
    expect(rest).toEqual({ testID: 'a' })
  })

  it('treats `color` as a style key, which is what a text slot needs', () => {
    // A root never gets here with one: it destructures R7's tint first, so the two
    // meanings of `color` never meet.
    expect(splitStyleProps({ color: '#111' })).toEqual([{ color: '#111' }, {}])
  })

  it('does not recognise the directional forms R13 bans', () => {
    // The type does not expose them, so this is only reachable by bypassing it. They
    // stay in the rest rather than being silently applied or silently dropped.
    // eslint-disable-next-line no-restricted-syntax -- R13's banned key is the subject
    const directional = { paddingLeft: 8 }
    const [styleProps, rest] = splitStyleProps({ ...directional, paddingStart: 8 })

    expect(styleProps).toEqual({ paddingStart: 8 })
    expect(rest).toEqual(directional)
  })

  it('returns two empty objects for empty props', () => {
    expect(splitStyleProps({})).toEqual([{}, {}])
  })
})
