import { describe, it, expect } from 'vitest'
import type { ColumnProps } from '../../../../components/view/layout-types'

describe('Column Types', () => {
  it('exports ColumnProps type', () => {
    const props: ColumnProps = {
      children: 'Column',
      mainAxisAlignment: 'start',
      crossAxisAlignment: 'center',
      spacing: 8,
      reverse: false,
    }

    expect(props).toBeDefined()
    expect(props.spacing).toBe(8)
  })

  it('accepts style props', () => {
    const props: ColumnProps = {
      children: 'Column',
      style: { flexDirection: 'column' },
    }

    expect(props.style).toBeDefined()
  })
})
