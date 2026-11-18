import { describe, expect, it } from 'vitest'
import { dockAlign } from '../../system/float-place'

describe('dockAlign', () => {
  it('lays the start and the end with flex alignment, which follows the direction', () => {
    expect(dockAlign('bottom-start')).toBe('flex-start')
    expect(dockAlign('bottom-end')).toBe('flex-end')
  })

  it('centres in the middle of the bar', () => {
    expect(dockAlign('bottom-center')).toBe('center')
  })
})
