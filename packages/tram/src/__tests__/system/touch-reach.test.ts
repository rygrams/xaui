import { describe, expect, it } from 'vitest'
import { touchReach } from '../../system/touch-reach'

describe('touchReach', () => {
  it('is half of what the control lacks to reach 48', () => {
    expect(touchReach(26)).toBe(11)
    expect(touchReach(34)).toBe(7)
  })

  it('is nothing for a control that is already 48 or more', () => {
    expect(touchReach(48)).toBe(0)
    expect(touchReach(56)).toBe(0)
  })
})
