import { describe, expect, it } from 'vitest'
import {
  JUMP_LIST_ALPHABET,
  arrivalRank,
  columnsFor,
  groupByInitial,
  initialOf,
  jumpLayoutFor,
  leavingRank,
  leavingTime,
  rowsOf,
} from '../../../components/jump-list/jump-list.sections'
import { cascade, duration } from '../../../motion/motion-tokens'

const name = (contact: { name: string }) => contact.name
const contacts = (...names: string[]) => names.map(each => ({ name: each }))

describe('initialOf', () => {
  it('drops the accents and lowers the case', () => {
    expect(initialOf('Élodie')).toBe('e')
    expect(initialOf('Ïsa')).toBe('i')
    expect(initialOf('zoé')).toBe('z')
  })

  it('ignores the spaces before a name', () => {
    expect(initialOf('  Aïcha')).toBe('a')
  })

  it('keeps a character outside the basic plane whole', () => {
    expect(initialOf('𝒜lpha')).toBe('𝒜')
  })

  it('is empty for an empty name', () => {
    expect(initialOf('')).toBe('')
  })
})

describe('groupByInitial', () => {
  it('gives every letter of the alphabet its section, an empty one included', () => {
    const sections = groupByInitial(contacts('Adama'), name)

    expect(sections.map(section => section.key)).toEqual(JUMP_LIST_ALPHABET)
    expect(sections.find(section => section.key === 'q')?.data).toEqual([])
  })

  it('files a name under its initial, accents dropped', () => {
    const sections = groupByInitial(contacts('Élodie', 'Emmanuel'), name)
    const e = sections.find(section => section.key === 'e')

    expect(e?.data.map(name)).toEqual(['Élodie', 'Emmanuel'])
  })

  it('sorts a group by name, in the locale given', () => {
    const sections = groupByInitial(contacts('Moussa', 'Mariam', 'Mathieu'), name, {
      locale: 'fr',
    })
    const m = sections.find(section => section.key === 'm')

    expect(m?.data.map(name)).toEqual(['Mariam', 'Mathieu', 'Moussa'])
  })

  it('files whatever is not a key under #', () => {
    const sections = groupByInitial(contacts('4 Saisons', '+33 standard'), name)

    expect(sections[0]).toEqual({
      key: '#',
      data: contacts('+33 standard', '4 Saisons'),
    })
  })

  it('adds # first to keys that lack it, only when it holds something', () => {
    const keys = ['a', 'b']

    expect(
      groupByInitial(contacts('Adama'), name, { keys }).map(s => s.key)
    ).toEqual(keys)
    expect(
      groupByInitial(contacts('Adama', '4 Saisons'), name, { keys }).map(s => s.key)
    ).toEqual(['#', 'a', 'b'])
  })

  it('matches keys written in capitals', () => {
    const sections = groupByInitial(contacts('adama'), name, { keys: ['#', 'A'] })

    expect(sections[1]).toEqual({ key: 'A', data: contacts('adama') })
  })

  it('does not change the rows it was given', () => {
    const rows = contacts('Bakary', 'Adama')
    groupByInitial(rows, name)

    expect(rows.map(name)).toEqual(['Bakary', 'Adama'])
  })
})

describe('jumpLayoutFor', () => {
  it('lays an alphabet out as a grid', () => {
    expect(jumpLayoutFor(JUMP_LIST_ALPHABET)).toBe('grid')
  })

  it('lays words out as a list', () => {
    expect(jumpLayoutFor(["aujourd'hui", 'hier'])).toBe('list')
  })

  it('counts a character outside the basic plane as one', () => {
    expect(jumpLayoutFor(['𝒜', 'b'])).toBe('grid')
  })
})

describe('columnsFor', () => {
  it('is four squares across for a grid, one bar for a list', () => {
    expect(columnsFor('grid')).toBe(4)
    expect(columnsFor('list')).toBe(1)
  })
})

describe('rowsOf', () => {
  it('cuts the keys into rows, the last one filled out', () => {
    expect(rowsOf(['a', 'b', 'c', 'd', 'e'], 4)).toEqual([
      ['a', 'b', 'c', 'd'],
      ['e', null, null, null],
    ])
  })

  it('has no row for no key', () => {
    expect(rowsOf([], 4)).toEqual([])
  })

  it('takes at least one column', () => {
    expect(rowsOf(['a', 'b'], 0)).toEqual([['a'], ['b']])
  })
})

describe('arrivalRank', () => {
  it('is the row, a row arriving together', () => {
    expect(arrivalRank(0, 4)).toBe(0)
    expect(arrivalRank(3, 4)).toBe(0)
    expect(arrivalRank(4, 4)).toBe(1)
  })

  it('stops at the cascade’s last turn', () => {
    expect(arrivalRank(400, 4)).toBe(cascade.most)
  })
})

describe('leavingRank', () => {
  const grid = { columns: 4, count: 27 }

  it('leaves row after row', () => {
    expect(leavingRank(0, { ...grid, picked: -1 })).toBe(0)
    expect(leavingRank(9, { ...grid, picked: -1 })).toBe(2)
  })

  it('sends the key pressed after every other', () => {
    const last = arrivalRank(26, 4)

    expect(leavingRank(5, { ...grid, picked: 5 })).toBe(last + 1)
  })
})

describe('leavingTime', () => {
  it('lasts until the last key has turned away', () => {
    const lastRank = arrivalRank(26, 4) + 1

    expect(leavingTime({ columns: 4, count: 27, picked: 3 })).toBe(
      lastRank * cascade.stagger + duration.turnstile
    )
  })

  it('is one turn for a single row closed without a choice', () => {
    expect(leavingTime({ columns: 4, count: 3, picked: -1 })).toBe(
      duration.turnstile
    )
  })
})
