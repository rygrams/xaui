import { describe, expect, it } from 'vitest'
import { cascade } from '../../motion/motion-tokens'
import { createCascadeTurns } from '../../system/cascade-turns'

describe('createCascadeTurns', () => {
  it('hands out turns in the order they are asked for', () => {
    const turns = createCascadeTurns()

    expect(turns.turnOf('header')).toBe(0)
    expect(turns.turnOf('wifi')).toBe(1)
    expect(turns.turnOf('bluetooth')).toBe(2)
  })

  it('keeps the turn of a name asked twice', () => {
    const turns = createCascadeTurns()
    turns.turnOf('header')
    turns.turnOf('wifi')

    expect(turns.turnOf('header')).toBe(0)
    expect(turns.turnOf('bluetooth')).toBe(2)
  })

  it('shares one turn past the most', () => {
    const turns = createCascadeTurns()
    const keys = Array.from(
      { length: cascade.most + 4 },
      (_, index) => `row-${index}`
    )
    const given = keys.map(key => turns.turnOf(key))

    expect(given.slice(0, cascade.most + 1)).toEqual(
      Array.from({ length: cascade.most + 1 }, (_, index) => index)
    )
    expect(given.slice(cascade.most)).toEqual([
      cascade.most,
      cascade.most,
      cascade.most,
      cascade.most,
    ])
  })

  it('keeps two lists apart', () => {
    const first = createCascadeTurns()
    const second = createCascadeTurns()
    first.turnOf('a')

    expect(second.turnOf('b')).toBe(0)
  })
})
