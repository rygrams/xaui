import { describe, expect, it } from 'vitest'
import {
  isStartAligned,
  maskRest,
  splitPlacement,
  textFace,
  textInset,
} from '../../../components/mask-field/mask-field.utils'

/**
 * The shapes as `resolveMask` writes them — read off Native's mask, not computed here: the
 * test runs in Node, where Native (and React Native with it) does not load.
 */
const DATE = { placeholder: 'DD/MM/YYYY', length: 10 }
const DATE_FR = { placeholder: 'JJ/MM/AAAA', length: 10 }
const CARD = { placeholder: '#### #### #### ####', length: 19 }
const PLATE = { placeholder: 'AA-###-AA', length: 9 }

describe('maskRest', () => {
  it('draws nothing in an empty box: the placeholder is the whole shape', () => {
    expect(maskRest('', DATE.placeholder, DATE.length)).toBe('')
  })

  it('draws the shape from where the typed text ends', () => {
    expect(maskRest('04', DATE.placeholder, DATE.length)).toBe('/MM/YYYY')
    expect(maskRest('04/1', DATE.placeholder, DATE.length)).toBe('M/YYYY')
    expect(maskRest('04/12/2', DATE.placeholder, DATE.length)).toBe('YYY')
  })

  it('draws nothing once the shape is full', () => {
    expect(maskRest('04/12/2026', DATE.placeholder, DATE.length)).toBe('')
  })

  it('takes labels of the caller when they are as wide as their parts', () => {
    expect(maskRest('04', DATE_FR.placeholder, DATE_FR.length)).toBe('/MM/AAAA')
  })

  it('steps aside for a shape not as wide as the mask', () => {
    expect(maskRest('04', 'jour/mois/année', DATE.length)).toBe('')
    expect(maskRest('04', 'ta date de naissance', DATE.length)).toBe('')
  })

  it('draws the card preset and a pattern the same way', () => {
    expect(maskRest('4242 42', CARD.placeholder, CARD.length)).toBe('## #### ####')
    expect(maskRest('AB-1', PLATE.placeholder, PLATE.length)).toBe('##-AA')
  })
})

describe('isStartAligned', () => {
  it('holds for the default and for auto', () => {
    expect(isStartAligned(undefined)).toBe(true)
    expect(isStartAligned({})).toBe(true)
    expect(isStartAligned({ textAlign: 'auto' })).toBe(true)
  })

  it('refuses any alignment that moves the text with each keystroke', () => {
    expect(isStartAligned({ textAlign: 'center' })).toBe(false)
    expect(isStartAligned({ textAlign: 'right' })).toBe(false)
  })
})

describe('splitPlacement', () => {
  it('sends the placement out and keeps the drawing in', () => {
    const { outer, inner } = splitPlacement({
      marginTop: 8,
      width: 200,
      alignSelf: 'flex-start',
      borderColor: '#000000',
      fontSize: 18,
      paddingHorizontal: 12,
    })
    expect(outer).toEqual({ marginTop: 8, width: 200, alignSelf: 'flex-start' })
    expect(inner).toEqual({
      borderColor: '#000000',
      fontSize: 18,
      paddingHorizontal: 12,
    })
  })

  it('drops undefined values and takes an absent style', () => {
    expect(splitPlacement({ width: undefined, fontSize: 16 })).toEqual({
      outer: {},
      inner: { fontSize: 16 },
    })
    expect(splitPlacement(undefined)).toEqual({ outer: {}, inner: {} })
  })
})

describe('textInset', () => {
  it('adds the line to the padding on each edge', () => {
    expect(
      textInset({ borderWidth: 2, paddingHorizontal: 12, paddingVertical: 0 })
    ).toEqual({ paddingStart: 14, paddingEnd: 14, paddingTop: 2, paddingBottom: 2 })
  })

  it('lets the specific key win over the general one', () => {
    const inset = textInset({
      borderWidth: 2,
      borderStartWidth: 4,
      padding: 6,
      paddingHorizontal: 10,
      paddingStart: 20,
    })
    expect(inset.paddingStart).toBe(24)
    expect(inset.paddingEnd).toBe(12)
    expect(inset.paddingTop).toBe(8)
  })

  it('ignores a percentage, which cannot be laid over another box', () => {
    expect(textInset({ paddingHorizontal: '5%' }).paddingStart).toBe(0)
  })

  it('is zero everywhere for no style', () => {
    expect(textInset(undefined)).toEqual({
      paddingStart: 0,
      paddingEnd: 0,
      paddingTop: 0,
      paddingBottom: 0,
    })
  })
})

describe('textFace', () => {
  it('keeps the type and leaves the line height out', () => {
    expect(
      textFace({
        fontFamily: 'Selawik',
        fontSize: 16,
        fontVariant: ['tabular-nums'],
        letterSpacing: 0.5,
        lineHeight: 24,
        color: '#ffffff',
        paddingHorizontal: 12,
      })
    ).toEqual({
      fontFamily: 'Selawik',
      fontSize: 16,
      fontVariant: ['tabular-nums'],
      letterSpacing: 0.5,
    })
  })
})
