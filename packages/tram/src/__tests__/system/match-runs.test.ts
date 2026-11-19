import { describe, expect, it } from 'vitest'
import { matchRuns } from '../../system/match-runs'

describe('matchRuns', () => {
  it('cuts the label around the query', () => {
    expect(matchRuns('Bamako', 'mak')).toEqual([
      { text: 'Ba', isHit: false },
      { text: 'mak', isHit: true },
      { text: 'o', isHit: false },
    ])
  })

  it('finds the query whatever its case and accents, and keeps the label’s own', () => {
    expect(matchRuns('Genève', 'NEV')).toEqual([
      { text: 'Ge', isHit: false },
      { text: 'nèv', isHit: true },
      { text: 'e', isHit: false },
    ])
    expect(matchRuns('Lome', 'lomé')).toEqual([{ text: 'Lome', isHit: true }])
  })

  it('marks the first match only', () => {
    expect(matchRuns('Ananas', 'an')).toEqual([
      { text: 'An', isHit: true },
      { text: 'anas', isHit: false },
    ])
  })

  it('is the label whole on an empty query or no match', () => {
    expect(matchRuns('Dakar', '')).toEqual([{ text: 'Dakar', isHit: false }])
    expect(matchRuns('Dakar', '   ')).toEqual([{ text: 'Dakar', isHit: false }])
    expect(matchRuns('Dakar', 'paris')).toEqual([{ text: 'Dakar', isHit: false }])
  })

  it('trims the query as the filter does', () => {
    expect(matchRuns('Rabat', ' bat ')).toEqual([
      { text: 'Ra', isHit: false },
      { text: 'bat', isHit: true },
    ])
  })

  it('counts a character outside the basic plane as one', () => {
    expect(matchRuns('🇫🇷 France', 'fr')).toEqual([
      { text: '🇫🇷 ', isHit: false },
      { text: 'Fr', isHit: true },
      { text: 'ance', isHit: false },
    ])
  })
})
