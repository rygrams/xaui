import { describe, expect, it } from 'vitest'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { tramAccents } from '../../theme/tram-tokens'

const RAW = '#7c3aed'

describe('flatPaint', () => {
  it("is nothing when no paint is named: the theme's accent", () => {
    expect(flatPaint({})).toBeUndefined()
  })

  it('resolves a named accent to its true colour', () => {
    expect(flatPaint({ accent: 'lime' })).toBe(tramAccents.lime)
  })

  it('lets a raw colour win over a named accent', () => {
    expect(flatPaint({ accent: 'lime', color: RAW })).toBe(RAW)
  })
})

describe('inkOn', () => {
  it('is black on the three light accents and white on the others', () => {
    expect(inkOn(tramAccents.lime, 'grey')).toBe('#000000')
    expect(inkOn(tramAccents.amber, 'grey')).toBe('#000000')
    expect(inkOn(tramAccents.yellow, 'grey')).toBe('#000000')
    expect(inkOn(tramAccents.cobalt, 'grey')).toBe('#FFFFFF')
  })

  it('takes the fallback for a colour it cannot measure', () => {
    expect(inkOn('rgb(10, 20, 30)', 'grey')).toBe('grey')
    expect(inkOn('tomato', 'grey')).toBe('grey')
  })
})
