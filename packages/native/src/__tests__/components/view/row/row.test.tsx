import { describe, it, expect } from 'vitest'
import type { RowProps } from '../../../../components/view/layout-types'

describe('Row Types', () => {
  it('exports RowProps type', () => {
    const props: RowProps = {
      children: 'Row',
      mainAxisAlignment: 'start',
      crossAxisAlignment: 'center',
      spacing: 8,
      reverse: false,
    }

    expect(props).toBeDefined()
    expect(props.spacing).toBe(8)
  })

  it('accepts style props', () => {
    const props: RowProps = {
      children: 'Row',
      style: { flexDirection: 'row' },
    }

    expect(props.style).toBeDefined()
  })
})
