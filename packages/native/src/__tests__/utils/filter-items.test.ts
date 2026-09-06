import { describe, expect, it } from 'vitest'
import { matchesQuery } from '../../utils/filter-items'

describe('matchesQuery', () => {
  it('keeps everything on an empty query', () => {
    expect(matchesQuery('California', '')).toBe(true)
    expect(matchesQuery('California', '   ')).toBe(true)
  })

  it('ignores case', () => {
    expect(matchesQuery('California', 'CALI')).toBe(true)
    expect(matchesQuery('CALIFORNIA', 'cali')).toBe(true)
  })

  it('folds diacritics both ways', () => {
    expect(matchesQuery('Genève', 'geneve')).toBe(true)
    expect(matchesQuery('Geneve', 'genève')).toBe(true)
    expect(matchesQuery('Côte d’Ivoire', 'cote')).toBe(true)
  })

  it('matches any word rather than the first', () => {
    // A prefix match would refuse this, and a long list is searched by the word someone
    // remembers rather than by the one that happens to come first.
    expect(matchesQuery('New York', 'york')).toBe(true)
  })

  it('refuses what is not there', () => {
    expect(matchesQuery('Texas', 'york')).toBe(false)
  })

  it('trims what was typed', () => {
    expect(matchesQuery('Texas', '  tex  ')).toBe(true)
  })
})
