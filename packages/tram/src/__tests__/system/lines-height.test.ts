import { describe, expect, it } from 'vitest'
import { linesHeight } from '../../system/lines-height'

const box = { lineHeight: 26, chrome: 24 }

describe('linesHeight', () => {
  it('is the lines, plus what the box adds around them', () => {
    expect(linesHeight(3, box)).toBe(102)
    expect(linesHeight(8, box)).toBe(232)
  })

  it('never goes under one line', () => {
    expect(linesHeight(0, box)).toBe(50)
    expect(linesHeight(-2, box)).toBe(50)
  })
})
