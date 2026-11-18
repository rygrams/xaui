import { describe, expect, it } from 'vitest'
import { hingeFor, pagePose } from '../../../components/page/page.pose'
import { pageSlide, turnstile } from '../../../motion/motion-tokens'

const ltr = { isRtl: false }
const rtl = { isRtl: true }

describe('pagePose', () => {
  it.each(['turnstile', 'slide', 'fade', 'none'] as const)(
    'leaves a %s page in place at rest',
    transition => {
      const pose = pagePose(0, { transition, ...ltr })

      expect(pose.opacity).toBe(1)
      expect(pose.rotateY).toBeCloseTo(0)
      expect(pose.translateX).toBeCloseTo(0)
    }
  )

  it('turns a turnstile away on its start edge, and out of sight', () => {
    expect(pagePose(1, { transition: 'turnstile', ...ltr })).toEqual({
      opacity: 0,
      rotateY: turnstile.degrees,
      translateX: 0,
    })
  })

  it('brings a turnstile in from the other side', () => {
    const pose = pagePose(-1, { transition: 'turnstile', ...ltr })

    expect(pose.rotateY).toBe(-turnstile.degrees)
    expect(pose.opacity).toBe(0)
  })

  it('is half-way at half a turn', () => {
    const pose = pagePose(0.5, { transition: 'turnstile', ...ltr })

    expect(pose.rotateY).toBe(turnstile.degrees / 2)
    expect(pose.opacity).toBe(0.5)
  })

  it('brings a slide in from the end side', () => {
    const pose = pagePose(-1, { transition: 'slide', ...ltr })

    expect(pose.translateX).toBe(pageSlide.distance)
    expect(pose.rotateY).toBe(0)
  })

  it('mirrors in a right-to-left layout', () => {
    expect(pagePose(1, { transition: 'turnstile', ...rtl }).rotateY).toBe(
      -turnstile.degrees
    )
    expect(pagePose(-1, { transition: 'slide', ...rtl }).translateX).toBe(
      -pageSlide.distance
    )
  })

  it('only fades a fade', () => {
    expect(pagePose(1, { transition: 'fade', ...ltr })).toEqual({
      opacity: 0,
      rotateY: 0,
      translateX: 0,
    })
  })

  it('never hides a page that has no transition', () => {
    expect(pagePose(1, { transition: 'none', ...ltr }).opacity).toBe(1)
  })

  it('holds a turn past its end, as a spring overshoots', () => {
    expect(pagePose(1.2, { transition: 'turnstile', ...ltr })).toEqual(
      pagePose(1, { transition: 'turnstile', ...ltr })
    )
  })
})

describe('hingeFor', () => {
  it('hinges on the start edge, half-way down', () => {
    expect(hingeFor(false)).toEqual([0, '50%', 0])
    expect(hingeFor(true)).toEqual(['100%', '50%', 0])
  })
})
