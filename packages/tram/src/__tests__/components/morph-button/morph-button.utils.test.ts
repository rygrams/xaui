import { describe, expect, it } from 'vitest'
import { morphSpringFor } from '../../../components/morph-button/morph-button.utils'
import { spring } from '../../../motion/motion-tokens'

describe('morphSpringFor', () => {
  it('travels on the navigation spring by default', () => {
    expect(morphSpringFor(true)).toEqual(spring.navigation)
  })

  it('does not travel when the animation is off', () => {
    expect(morphSpringFor(false)).toBeUndefined()
  })

  it('merges a retuned knob over the navigation spring', () => {
    expect(morphSpringFor({ damping: 30 })).toEqual({
      ...spring.navigation,
      damping: 30,
    })
  })

  it('takes every knob the caller writes', () => {
    const tuned = { stiffness: 300, damping: 28, mass: 2 }
    expect(morphSpringFor(tuned)).toEqual(tuned)
  })
})
