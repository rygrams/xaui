import { describe, expect, it } from 'vitest'
import {
  boxFromField,
  cellInsets,
  sizeAtHeight,
} from '../../../components/field-group/field-group.utils'

const FIELD = {
  borderWidth: 2,
  borderRadius: 2,
  backgroundColor: '#000000',
  borderColor: '#FFFFFF',
  minHeight: 48,
  paddingHorizontal: 12,
  fontSize: 19,
  color: '#FFFFFF',
}

describe('boxFromField', () => {
  it('takes the line, the corner, the ground and the height for the box', () => {
    expect(boxFromField(FIELD).box).toEqual({
      borderWidth: 2,
      borderRadius: 2,
      backgroundColor: '#000000',
      minHeight: 48,
    })
  })

  it('leaves the type and the line colour to the field', () => {
    const { box } = boxFromField(FIELD)

    expect(box).not.toHaveProperty('fontSize')
    expect(box).not.toHaveProperty('color')
    expect(box).not.toHaveProperty('borderColor')
  })

  it('stands the field in the height inside the line', () => {
    expect(boxFromField(FIELD).innerHeight).toBe(44)
  })

  it('reads the field padding as the inset', () => {
    expect(boxFromField(FIELD).inset).toBe(12)
  })

  it('reads nothing it was not given as zero, and never goes under it', () => {
    expect(boxFromField({})).toMatchObject({ innerHeight: 0, inset: 0 })
    expect(boxFromField({ minHeight: 2, borderWidth: 2 }).innerHeight).toBe(0)
  })
})

describe('cellInsets', () => {
  it('stands a decorative mark off the end only, leaning on the text', () => {
    const insets = cellInsets(12)

    expect(insets.prefix.decorative).toEqual({ paddingStart: 12 })
    expect(insets.suffix.decorative).toEqual({ paddingEnd: 12 })
  })

  it('pads a control on both sides, a key of its own', () => {
    const insets = cellInsets(10)

    expect(insets.prefix.control).toEqual({ paddingStart: 10, paddingEnd: 10 })
    expect(insets.suffix.control).toEqual({ paddingStart: 10, paddingEnd: 10 })
  })

  it('writes start and end, never left and right', () => {
    const keys = Object.values(cellInsets(8)).flatMap(side =>
      Object.values(side).flatMap(style => Object.keys(style))
    )

    expect(keys.some(key => /left|right/i.test(key))).toBe(false)
  })
})

describe('sizeAtHeight', () => {
  const HEIGHTS = { sm: 40, md: 48, lg: 56 }

  it('names the size a box of the height was drawn at', () => {
    expect(sizeAtHeight(40, HEIGHTS)).toBe('sm')
    expect(sizeAtHeight(48, HEIGHTS)).toBe('md')
    expect(sizeAtHeight(56, HEIGHTS)).toBe('lg')
  })

  it('takes the nearest when the height is inside the line', () => {
    expect(sizeAtHeight(36, HEIGHTS)).toBe('sm')
    expect(sizeAtHeight(44, HEIGHTS)).toBe('sm')
    expect(sizeAtHeight(52, HEIGHTS)).toBe('md')
  })
})
