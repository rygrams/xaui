import { describe, expect, it } from 'vitest'
import { dockAlign, dockEdge } from '../../system/float-place'

describe('dockAlign', () => {
  it('lays the start and the end with flex alignment, which follows the direction', () => {
    expect(dockAlign('bottom-start')).toBe('flex-start')
    expect(dockAlign('bottom-end')).toBe('flex-end')
  })

  it('centres in the middle of the bar', () => {
    expect(dockAlign('bottom-center')).toBe('center')
  })
})

describe('dockEdge', () => {
  it('docks `top` on the top edge', () => {
    expect(dockEdge('top')).toBe('top')
  })

  it('docks `bottom` and every place along it on the bottom edge', () => {
    expect(dockEdge('bottom')).toBe('bottom')
    expect(dockEdge('bottom-start')).toBe('bottom')
    expect(dockEdge('bottom-center')).toBe('bottom')
    expect(dockEdge('bottom-end')).toBe('bottom')
  })
})
