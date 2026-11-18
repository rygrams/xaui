import { describe, expect, it } from 'vitest'
import {
  dragOffset,
  layerShift,
  releaseTarget,
  sectionStops,
  titleTravel,
  trackTravel,
} from '../../../components/panorama/panorama.track'

const THRESHOLD = { distance: 80, velocity: 500 }

describe('trackTravel', () => {
  it('is the track less the screen', () => {
    expect(trackTravel(1200, 400)).toBe(800)
  })

  it('is nothing for a track that fits', () => {
    expect(trackTravel(300, 400)).toBe(0)
  })
})

describe('sectionStops', () => {
  it('rests on each section start', () => {
    expect(sectionStops([0, 350, 700], 1000)).toEqual([0, 350, 700])
  })

  it('pulls the last sections back so the track end meets the screen', () => {
    expect(sectionStops([0, 352, 704, 1056], 1008)).toEqual([0, 352, 704, 1008])
  })
})

describe('releaseTarget', () => {
  it('stays on a short, slow release', () => {
    expect(releaseTarget(1, 4, { distance: 40, velocity: 100 }, THRESHOLD)).toBe(1)
  })

  it('moves on when dragged far enough', () => {
    expect(releaseTarget(1, 4, { distance: 120, velocity: 0 }, THRESHOLD)).toBe(2)
    expect(releaseTarget(1, 4, { distance: -120, velocity: 0 }, THRESHOLD)).toBe(0)
  })

  it('moves on a short fling', () => {
    expect(releaseTarget(1, 4, { distance: 20, velocity: 900 }, THRESHOLD)).toBe(2)
  })

  it('reads the fling before the distance', () => {
    expect(releaseTarget(1, 4, { distance: 200, velocity: -900 }, THRESHOLD)).toBe(0)
  })

  it('never goes past either end', () => {
    expect(releaseTarget(0, 4, { distance: -300, velocity: -900 }, THRESHOLD)).toBe(
      0
    )
    expect(releaseTarget(3, 4, { distance: 300, velocity: 900 }, THRESHOLD)).toBe(3)
  })
})

describe('dragOffset', () => {
  it('follows the finger inside the track', () => {
    expect(dragOffset(300, 800, 3)).toBe(300)
  })

  it('resists past either end', () => {
    expect(dragOffset(-90, 800, 3)).toBe(-30)
    expect(dragOffset(890, 800, 3)).toBe(830)
  })
})

describe('layerShift', () => {
  it('moves the same share of its own way', () => {
    expect(layerShift(400, 800, 200)).toBe(100)
  })

  it('holds at its ends while the track rubber-bands', () => {
    expect(layerShift(-40, 800, 200)).toBe(0)
    expect(layerShift(860, 800, 200)).toBe(200)
  })

  it('stays put when the track cannot move', () => {
    expect(layerShift(0, 0, 200)).toBe(0)
  })
})

describe('titleTravel', () => {
  it('brings the end of a long title in', () => {
    expect(titleTravel(1100, 400, 800, 0.4)).toBe(700)
  })

  it('keeps a short title drifting', () => {
    expect(titleTravel(300, 400, 800, 0.4)).toBe(320)
  })
})
