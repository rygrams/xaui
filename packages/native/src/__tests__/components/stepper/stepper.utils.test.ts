import { describe, expect, it } from 'vitest'
import {
  isConnectorDone,
  isLeadDone,
  stepStatus,
} from '../../../components/stepper/stepper.utils'

describe('stepStatus', () => {
  it('reads the index from zero and the value from one', () => {
    // "Step 2 of 4": the first is behind, the second is where you are.
    expect(stepStatus(0, 2)).toBe('completed')
    expect(stepStatus(1, 2)).toBe('current')
    expect(stepStatus(2, 2)).toBe('upcoming')
  })

  it('has exactly one current step', () => {
    const statuses = [0, 1, 2, 3].map(index => stepStatus(index, 3))

    expect(statuses.filter(status => status === 'current')).toHaveLength(1)
  })

  it('leaves every step upcoming before the first one', () => {
    expect(stepStatus(0, 0)).toBe('upcoming')
  })

  it('completes every step past the last one', () => {
    expect(stepStatus(3, 9)).toBe('completed')
  })
})

describe('isConnectorDone', () => {
  it('travels the line leaving a step only once that step is behind you', () => {
    expect(isConnectorDone('completed')).toBe(true)
    expect(isConnectorDone('current')).toBe(false)
    expect(isConnectorDone('upcoming')).toBe(false)
  })
})

describe('isLeadDone', () => {
  it('travels the line arriving at a step you have reached', () => {
    expect(isLeadDone('completed')).toBe(true)
    expect(isLeadDone('current')).toBe(true)
    expect(isLeadDone('upcoming')).toBe(false)
  })

  it('meets the outgoing half of the step before it', () => {
    // The two halves either side of one boundary have to agree, or the rail breaks at
    // every step: step i's outgoing line and step i+1's incoming one are the same line.
    const value = 3
    const boundaries = [0, 1, 2, 3].map(index => ({
      out: isConnectorDone(stepStatus(index, value)),
      in: isLeadDone(stepStatus(index + 1, value)),
    }))

    for (const boundary of boundaries) expect(boundary.out).toBe(boundary.in)
  })
})
