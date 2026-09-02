import { describe, it, expect } from 'vitest'
import type { GridProps } from '../../../../components/view/grid/grid.type'

describe('Grid Types', () => {
  it('exports GridProps type', () => {
    const props: GridProps = {
      children: 'Grid',
      columns: 3,
      spacing: 8,
      rowSpacing: 10,
      columnSpacing: 6,
    }

    expect(props).toBeDefined()
    expect(props.columns).toBe(3)
    expect(props.spacing).toBe(8)
  })

  it('accepts style props', () => {
    const props: GridProps = {
      children: 'Grid',
      style: { flexDirection: 'row' },
      itemStyle: { padding: 4 },
    }

    expect(props.style).toBeDefined()
    expect(props.itemStyle).toBeDefined()
  })
})
