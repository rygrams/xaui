import { describe, expect, it } from 'vitest'
import {
  angleAtPoint,
  clockAngle,
  clockPoint,
  distanceFrom,
  valueAtAngle,
} from '../../utils/clock'

const CENTER = { x: 100, y: 100 }

describe('clockAngle', () => {
  it('starts at twelve o’clock', () => {
    expect(clockAngle(0, 12)).toBe(0)
    expect(clockAngle(12, 12)).toBe(0)
  })

  it('goes clockwise', () => {
    expect(clockAngle(3, 12)).toBe(90)
    expect(clockAngle(6, 12)).toBe(180)
    expect(clockAngle(9, 12)).toBe(270)
  })

  it('divides the minutes into sixty', () => {
    expect(clockAngle(15, 60)).toBe(90)
    expect(clockAngle(30, 60)).toBe(180)
  })

  it('wraps in both directions', () => {
    expect(clockAngle(13, 12)).toBe(30)
    expect(clockAngle(-1, 12)).toBe(330)
  })
})

describe('valueAtAngle', () => {
  it('is the inverse of clockAngle', () => {
    for (const hour of [0, 3, 7, 11]) {
      expect(valueAtAngle(clockAngle(hour, 12), 12)).toBe(hour)
    }
  })

  it('rounds to the nearest mark rather than down', () => {
    // A finger halfway between two marks belongs to the one it is nearer.
    expect(valueAtAngle(44, 12)).toBe(1)
    expect(valueAtAngle(46, 12)).toBe(2)
  })

  it('wraps the last mark round to the first', () => {
    expect(valueAtAngle(359, 12)).toBe(0)
  })
})

describe('clockPoint', () => {
  it('puts twelve above the centre, not below', () => {
    // Screen coordinates grow downwards, which is the sign this exists to get right.
    expect(clockPoint(CENTER, 50, 0)).toEqual({ x: 100, y: 50 })
  })

  it('puts three to the right and nine to the left', () => {
    const three = clockPoint(CENTER, 50, 90)
    const nine = clockPoint(CENTER, 50, 270)

    expect(Math.round(three.x)).toBe(150)
    expect(Math.round(three.y)).toBe(100)
    expect(Math.round(nine.x)).toBe(50)
  })
})

describe('angleAtPoint', () => {
  it('reads back the angle a point was placed at', () => {
    for (const angle of [0, 30, 90, 210, 330]) {
      const point = clockPoint(CENTER, 60, angle)
      expect(Math.round(angleAtPoint(CENTER, point))).toBe(angle)
    }
  })

  it('measures clockwise from twelve, not from three', () => {
    // `atan2`'s own convention is the one this converts away from.
    expect(Math.round(angleAtPoint(CENTER, { x: 100, y: 40 }))).toBe(0)
    expect(Math.round(angleAtPoint(CENTER, { x: 160, y: 100 }))).toBe(90)
  })

  it('is the same value at the centre rather than a crash', () => {
    expect(Number.isFinite(angleAtPoint(CENTER, CENTER))).toBe(true)
  })
})

describe('distanceFrom', () => {
  it('is how far out the touch landed', () => {
    expect(distanceFrom(CENTER, { x: 130, y: 140 })).toBe(50)
    expect(distanceFrom(CENTER, CENTER)).toBe(0)
  })
})
