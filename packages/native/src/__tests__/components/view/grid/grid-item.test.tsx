import { describe, it, expect } from 'vitest'
import type { GridItemProps } from '../../../../components/view/grid/grid-item.type'

describe('GridItem Types', () => {
  it('exports GridItemProps type', () => {
    const props: GridItemProps = {
      children: 'Item',
      span: 2,
    }

    expect(props).toBeDefined()
    expect(props.span).toBe(2)
  })

  it('accepts style props', () => {
    const props: GridItemProps = {
      children: 'Item',
      style: { padding: 8 },
    }

    expect(props.style).toBeDefined()
  })
})
