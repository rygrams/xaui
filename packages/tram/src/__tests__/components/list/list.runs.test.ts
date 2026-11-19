import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { textOf, textRuns } from '../../../components/list/list.runs'

const glyph = createElement('glyph')

describe('textRuns', () => {
  it('joins the text between two elements into one run', () => {
    expect(textRuns([3, ' articles'])).toEqual(['3 articles'])
  })

  it('keeps the elements where they are, between the runs', () => {
    const runs = textRuns([glyph, 'archiver', ' tout'])

    expect(runs).toHaveLength(2)
    expect(runs[1]).toBe('archiver tout')
  })

  it('drops what React renders as nothing', () => {
    expect(textRuns([null, false, 'heure', undefined])).toEqual(['heure'])
  })
})

describe('textOf', () => {
  it('is the words of a slot, its glyph left out', () => {
    expect(textOf([glyph, 'supprimer'])).toBe('supprimer')
  })

  it('is empty for a glyph alone', () => {
    expect(textOf(glyph)).toBe('')
  })
})
