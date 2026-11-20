import { describe, expect, it } from 'vitest'
import { TRAM_PALETTE } from '../../../components/color-picker/color-picker.palette'
import {
  colorName,
  rowsOf,
  sameColor,
  swatchName,
} from '../../../components/color-picker/color-picker.utils'
import type { ColorGroup } from '../../../components/color-picker/color-picker.type'

const RAMPS: ColorGroup[] = [
  {
    name: 'violet',
    swatches: [
      { shade: '500', value: '#8b5cf6' },
      { shade: '600', value: '#7c3aed' },
    ],
  },
]

describe('sameColor', () => {
  it('reads one hex written three ways as one colour', () => {
    expect(sameColor('#ABC', '#aabbcc')).toBe(true)
    expect(sameColor('#1BA1E2', '#1ba1e2')).toBe(true)
  })

  it('tells two colours apart, and nothing chosen from anything', () => {
    expect(sameColor('#1BA1E2', '#0050EF')).toBe(false)
    expect(sameColor(undefined, '#0050EF')).toBe(false)
  })

  it('compares what is not hex as written', () => {
    expect(sameColor('rebeccapurple', 'rebeccapurple')).toBe(true)
    expect(sameColor('rgb(0,0,0)', '#000000')).toBe(false)
  })
})

describe('swatchName', () => {
  it("prefixes the group's name, and drops it when the group has none", () => {
    expect(swatchName(RAMPS[0], RAMPS[0].swatches[1])).toBe('violet 600')
    expect(swatchName({ swatches: [] }, { shade: 'cobalt', value: '#0050EF' })).toBe(
      'cobalt'
    )
  })
})

describe('colorName', () => {
  it('names an accent of the default palette by its own name', () => {
    expect(colorName(TRAM_PALETTE, '#1ba1e2')).toBe('cyan')
  })

  it('names a step of a named ramp', () => {
    expect(colorName(RAMPS, '#7C3AED')).toBe('violet 600')
  })

  it('writes a colour the palette does not hold as its hex, upper-cased', () => {
    expect(colorName(RAMPS, '#00ff00')).toBe('#00FF00')
  })
})

describe('TRAM_PALETTE', () => {
  it('is the twenty accents, in one nameless group', () => {
    expect(TRAM_PALETTE).toHaveLength(1)
    expect(TRAM_PALETTE[0].name).toBeUndefined()
    expect(TRAM_PALETTE[0].swatches).toHaveLength(20)
  })
})

describe('rowsOf', () => {
  it('cuts in rows of the size, the last one short', () => {
    expect(rowsOf([1, 2, 3, 4, 5, 6, 7], 5)).toEqual([
      [1, 2, 3, 4, 5],
      [6, 7],
    ])
    expect(rowsOf([], 5)).toEqual([])
  })

  it('refuses a row of nothing', () => {
    expect(() => rowsOf([1], 0)).toThrow(/at least one/)
  })
})
