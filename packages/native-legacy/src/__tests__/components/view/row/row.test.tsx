import { describe, it, expect } from 'vitest'
import type { RowProps } from '../../../../components/view/layout-types'

describe('RowProps types', () => {
  it('accepts mainAxisAlignment', () => {
    const props: RowProps = { mainAxisAlignment: 'spaceBetween' }
    expect(props.mainAxisAlignment).toBe('spaceBetween')
  })

  it('accepts crossAxisAlignment', () => {
    const props: RowProps = { crossAxisAlignment: 'stretch' }
    expect(props.crossAxisAlignment).toBe('stretch')
  })

  it('accepts mainAxisSize', () => {
    const props: RowProps = { mainAxisSize: 'min' }
    expect(props.mainAxisSize).toBe('min')
  })

  it('accepts wrap, gap, reversed', () => {
    const props: RowProps = { wrap: true, gap: 8, reversed: true }
    expect(props.wrap).toBe(true)
    expect(props.gap).toBe(8)
    expect(props.reversed).toBe(true)
  })

  it('accepts flex factor', () => {
    const props: RowProps = { flex: 2 }
    expect(props.flex).toBe(2)
  })
})
