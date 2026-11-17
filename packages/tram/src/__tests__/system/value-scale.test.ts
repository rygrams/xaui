import { describe, expect, it } from 'vitest'
import {
  fromStops,
  nearestStop,
  nudgeOf,
  placeAlong,
  placeOf,
  sameStops,
  snapToStep,
  stopFor,
  toStops,
  travelOn,
  valueAt,
  withStopAt,
} from '../../system/value-scale'

const percent = { min: 0, max: 100, step: 1 }
const tens = { min: 0, max: 100, step: 10 }
const continuous = { min: 0, max: 1, step: 0 }

describe('placeOf', () => {
  it('runs from 0 at the minimum to 1 at the maximum', () => {
    expect(placeOf(0, percent)).toBe(0)
    expect(placeOf(25, percent)).toBe(0.25)
    expect(placeOf(100, percent)).toBe(1)
    expect(placeOf(0, { min: -50, max: 50, step: 1 })).toBe(0.5)
  })

  it('holds a value outside the scale at its end', () => {
    expect(placeOf(-20, percent)).toBe(0)
    expect(placeOf(180, percent)).toBe(1)
  })

  it('is the start for a scale with no length', () => {
    expect(placeOf(5, { min: 5, max: 5, step: 1 })).toBe(0)
    expect(placeOf(5, { min: 10, max: 0, step: 1 })).toBe(0)
  })
})

describe('snapToStep', () => {
  it('lands on the nearest step', () => {
    expect(snapToStep(44, tens)).toBe(40)
    expect(snapToStep(45, tens)).toBe(50)
    expect(snapToStep(42.4, percent)).toBe(42)
  })

  it('counts its steps from the minimum', () => {
    const scale = { min: 0.05, max: 1, step: 0.1 }

    expect(snapToStep(0.05, scale)).toBe(0.05)
    expect(snapToStep(0.12, scale)).toBe(0.15)
    expect(snapToStep(7, { min: 5, max: 50, step: 10 })).toBe(5)
    expect(snapToStep(11, { min: 5, max: 50, step: 10 })).toBe(15)
  })

  it('leaves no floating-point dust', () => {
    const tenths = { min: 0, max: 10, step: 0.1 }

    expect(snapToStep(0.3, tenths)).toBe(0.3)
    expect(snapToStep(0.1 * 3, tenths)).toBe(0.3)
    expect(snapToStep(9.999, tenths)).toBe(10)
  })

  it('keeps the precision of a step written with an exponent', () => {
    const tiny = { min: 0, max: 0.000001, step: 0.0000001 }

    expect(snapToStep(0.0000005, tiny)).toBe(0.0000005)
    expect(snapToStep(0.00000034, tiny)).toBe(0.0000003)
    expect(snapToStep(1.26e-7, { min: 0, max: 1, step: 2.5e-8 })).toBe(1.25e-7)
  })

  it('keeps a large step whole', () => {
    expect(snapToStep(1.4e21, { min: 0, max: 5e21, step: 1e21 })).toBe(1e21)
  })

  it('never leaves the scale', () => {
    expect(snapToStep(-5, tens)).toBe(0)
    expect(snapToStep(250, tens)).toBe(100)
    // The last step would be 105: the maximum holds it.
    expect(snapToStep(99, { min: 0, max: 100, step: 15 })).toBe(100)
  })

  it('only bounds a continuous scale', () => {
    expect(snapToStep(0.4321, continuous)).toBe(0.4321)
    expect(snapToStep(3, continuous)).toBe(1)
  })
})

describe('valueAt', () => {
  it('is the value of a place, on a step', () => {
    expect(valueAt(0, percent)).toBe(0)
    expect(valueAt(0.5, percent)).toBe(50)
    expect(valueAt(0.44, tens)).toBe(40)
    expect(valueAt(0.5, { min: -50, max: 50, step: 1 })).toBe(0)
  })

  it('holds a place past either end', () => {
    expect(valueAt(-0.2, percent)).toBe(0)
    expect(valueAt(1.4, percent)).toBe(100)
  })

  it('is exact on a continuous scale', () => {
    expect(valueAt(0.4321, continuous)).toBe(0.4321)
  })
})

describe('travelOn', () => {
  it('is the track less the thumb', () => {
    expect(travelOn(300, 16)).toBe(284)
  })

  it('is nothing on a track shorter than the thumb, or not measured yet', () => {
    expect(travelOn(10, 16)).toBe(0)
    expect(travelOn(0, 16)).toBe(0)
  })
})

describe('placeAlong', () => {
  it('puts the middle of the thumb under the touch', () => {
    expect(placeAlong(8, 300, 16)).toBe(0)
    expect(placeAlong(150, 300, 16)).toBe(0.5)
    expect(placeAlong(292, 300, 16)).toBe(1)
  })

  it('holds a touch on the last half thumb, or past the track, at the end', () => {
    expect(placeAlong(0, 300, 16)).toBe(0)
    expect(placeAlong(-40, 300, 16)).toBe(0)
    expect(placeAlong(300, 300, 16)).toBe(1)
    expect(placeAlong(420, 300, 16)).toBe(1)
  })

  it('is the start on a track with no travel', () => {
    expect(placeAlong(5, 0, 16)).toBe(0)
    expect(placeAlong(5, 16, 16)).toBe(0)
  })
})

describe('toStops and fromStops', () => {
  it('makes one stop of a number and two of a pair', () => {
    expect(toStops(42, percent)).toEqual([42])
    expect(toStops([20, 60], percent)).toEqual([20, 60])
  })

  it('puts every stop on a step', () => {
    expect(toStops(44, tens)).toEqual([40])
    expect(toStops([12, 250], tens)).toEqual([10, 100])
  })

  it('gives the caller their shape back', () => {
    expect(fromStops([42])).toBe(42)
    expect(fromStops([20, 60])).toEqual([20, 60])
  })
})

describe('stopFor', () => {
  it('moves a lone thumb anywhere on the scale', () => {
    expect(stopFor([40], 0, 73, percent)).toBe(73)
    expect(stopFor([40], 0, 140, percent)).toBe(100)
    expect(stopFor([40], 0, 44, tens)).toBe(40)
  })

  it('stops the lower thumb on the upper one', () => {
    expect(stopFor([20, 60], 0, 45, percent)).toBe(45)
    expect(stopFor([20, 60], 0, 80, percent)).toBe(60)
  })

  it('stops the upper thumb on the lower one', () => {
    expect(stopFor([20, 60], 1, 35, percent)).toBe(35)
    expect(stopFor([20, 60], 1, 5, percent)).toBe(20)
  })
})

describe('withStopAt', () => {
  it('moves one thumb and leaves the other', () => {
    expect(withStopAt([20, 60], 0, 30, percent)).toEqual([30, 60])
    expect(withStopAt([20, 60], 1, 90, percent)).toEqual([20, 90])
  })

  it('does not let them cross', () => {
    expect(withStopAt([20, 60], 0, 95, percent)).toEqual([60, 60])
    expect(withStopAt([20, 60], 1, 0, percent)).toEqual([20, 20])
  })

  it('returns new stops', () => {
    const stops = [20, 60]

    expect(withStopAt(stops, 0, 30, percent)).not.toBe(stops)
    expect(stops).toEqual([20, 60])
  })
})

describe('nearestStop', () => {
  it('is the only thumb of a plain slider', () => {
    expect(nearestStop([40], 95)).toBe(0)
  })

  it('is the nearer of two', () => {
    expect(nearestStop([20, 60], 25)).toBe(0)
    expect(nearestStop([20, 60], 55)).toBe(1)
    expect(nearestStop([20, 60], 0)).toBe(0)
    expect(nearestStop([20, 60], 100)).toBe(1)
  })

  it('picks, of two on one value, the one that can move toward the touch', () => {
    expect(nearestStop([50, 50], 80)).toBe(1)
    expect(nearestStop([50, 50], 20)).toBe(0)
    expect(nearestStop([0, 0], 30)).toBe(1)
    expect(nearestStop([100, 100], 70)).toBe(0)
  })

  it('gives a touch on the thumbs themselves to the lower', () => {
    expect(nearestStop([50, 50], 50)).toBe(0)
  })
})

describe('sameStops', () => {
  it('compares values, not arrays', () => {
    expect(sameStops([20, 60], [20, 60])).toBe(true)
    expect(sameStops([20, 60], [20, 61])).toBe(false)
    expect(sameStops([20], [20, 20])).toBe(false)
  })
})

describe('nudgeOf', () => {
  it('is one step', () => {
    expect(nudgeOf(tens)).toBe(10)
    expect(nudgeOf(percent)).toBe(1)
  })

  it('is a tenth of a continuous scale', () => {
    expect(nudgeOf(continuous)).toBe(0.1)
    expect(nudgeOf({ min: 0, max: 200, step: 0 })).toBe(20)
  })
})
