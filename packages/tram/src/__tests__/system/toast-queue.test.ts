import { describe, expect, it } from 'vitest'
import {
  enqueue,
  remove,
  startLeaving,
  startLeavingAll,
} from '../../system/toast-queue'

const a = { id: 'a', isLeaving: false }
const b = { id: 'b', isLeaving: false }

describe('enqueue', () => {
  it('adds the newest last and leaves the queue it was given alone', () => {
    const queue = [a]

    expect(enqueue(queue, b)).toEqual([a, b])
    expect(queue).toEqual([a])
  })
})

describe('startLeaving', () => {
  it('marks the one entry and keeps it in the queue', () => {
    expect(startLeaving([a, b], 'a')).toEqual([{ id: 'a', isLeaving: true }, b])
  })

  it('hands the same queue back for an unknown id', () => {
    const queue = [a, b]

    expect(startLeaving(queue, 'z')).toBe(queue)
  })

  it('hands the same queue back for an entry already leaving', () => {
    const queue = startLeaving([a, b], 'a')

    expect(startLeaving(queue, 'a')).toBe(queue)
  })
})

describe('startLeavingAll', () => {
  it('marks every entry', () => {
    expect(startLeavingAll([a, b]).every(entry => entry.isLeaving)).toBe(true)
  })

  it('hands the same queue back when all are leaving, or none is there', () => {
    const leaving = startLeavingAll([a, b])
    const empty: (typeof a)[] = []

    expect(startLeavingAll(leaving)).toBe(leaving)
    expect(startLeavingAll(empty)).toBe(empty)
  })
})

describe('remove', () => {
  it('drops the entry', () => {
    expect(remove([a, b], 'a')).toEqual([b])
  })

  it('hands the same queue back for an unknown id', () => {
    const queue = [a, b]

    expect(remove(queue, 'z')).toBe(queue)
  })
})
