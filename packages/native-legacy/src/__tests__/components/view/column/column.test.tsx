import { describe, it, expect } from 'vitest'
import type { ColumnProps } from '../../../../components/view/layout-types'

describe('ColumnProps types', () => {
  it('accepts mainAxisAlignment', () => {
    const props: ColumnProps = { mainAxisAlignment: 'center' }
    expect(props.mainAxisAlignment).toBe('center')
  })

  it('accepts mainAxisSize min', () => {
    const props: ColumnProps = { mainAxisSize: 'min' }
    expect(props.mainAxisSize).toBe('min')
  })

  it('accepts gap', () => {
    const props: ColumnProps = { gap: 16 }
    expect(props.gap).toBe(16)
  })

  it('accepts flex factor', () => {
    const props: ColumnProps = { flex: 1 }
    expect(props.flex).toBe(1)
  })
})
