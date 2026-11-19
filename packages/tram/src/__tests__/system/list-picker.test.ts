import { describe, expect, it } from 'vitest'
import { cascade } from '../../motion/motion-tokens'
import {
  INLINE_MOST,
  cascadeDelay,
  cascadeRank,
  foldedOffset,
  listPickerMode,
  unfoldedInner,
} from '../../system/list-picker'

describe('listPickerMode', () => {
  it('unfolds in place up to five choices', () => {
    expect(listPickerMode(0)).toBe('inline')
    expect(listPickerMode(INLINE_MOST)).toBe('inline')
  })

  it('takes the screen past five', () => {
    expect(listPickerMode(INLINE_MOST + 1)).toBe('fullscreen')
  })

  it('lets the caller force either one', () => {
    expect(listPickerMode(2, 'fullscreen')).toBe('fullscreen')
    expect(listPickerMode(40, 'inline')).toBe('inline')
  })
})

describe('cascadeRank', () => {
  it('sends the current choice first', () => {
    expect(cascadeRank(2, 2)).toBe(0)
  })

  it('follows with the others in the order they are listed', () => {
    expect([0, 1, 2, 3].map(index => cascadeRank(index, 2))).toEqual([1, 2, 0, 3])
  })

  it('is the list order when nothing is chosen', () => {
    expect([0, 1, 2].map(index => cascadeRank(index, -1))).toEqual([0, 1, 2])
  })

  it('sends a row the list does not know first', () => {
    expect(cascadeRank(-1, 2)).toBe(0)
  })

  it('makes the rows of a long list share the last turn', () => {
    expect(cascadeRank(30, 0)).toBe(cascade.most)
  })
})

describe('cascadeDelay', () => {
  it('is one stagger per turn', () => {
    expect(cascadeDelay(0)).toBe(0)
    expect(cascadeDelay(3)).toBe(3 * cascade.stagger)
  })

  it('starts after what came before the list', () => {
    expect(cascadeDelay(2, 350)).toBe(350 + 2 * cascade.stagger)
  })
})

describe('foldedOffset', () => {
  it('is nothing when no row is chosen', () => {
    expect(foldedOffset({ y: 0, height: 0 }, 44)).toBe(0)
  })

  it('lifts the list to the start of the chosen row', () => {
    expect(foldedOffset({ y: 96, height: 44 }, 44)).toBe(96)
  })

  it('centres a row taller than the field on the value', () => {
    expect(foldedOffset({ y: 48, height: 48 }, 36)).toBe(54)
  })
})

describe('unfoldedInner', () => {
  it('is the taller of the row and the list when the list takes the row', () => {
    expect(unfoldedInner(44, 220, false)).toBe(220)
    expect(unfoldedInner(44, 0, false)).toBe(44)
  })

  it('holds both when the list hangs under its row', () => {
    expect(unfoldedInner(44, 220, true)).toBe(264)
    expect(unfoldedInner(44, 0, true)).toBe(44)
  })
})
