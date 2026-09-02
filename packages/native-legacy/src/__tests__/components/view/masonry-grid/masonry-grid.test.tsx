import { describe, it, expect } from 'vitest'
import type { MasonryGridProps } from '../../../../components/view/masonry-grid/masonry-grid.type'

describe('MasonryGrid Types', () => {
  it('exports MasonryGridProps type', () => {
    const props: MasonryGridProps = {
      children: 'Masonry',
      columns: 3,
      spacing: 8,
      rowSpacing: 10,
      columnSpacing: 6,
    }

    expect(props).toBeDefined()
    expect(props.columns).toBe(3)
  })

  it('accepts style props', () => {
    const props: MasonryGridProps = {
      children: 'Masonry',
      style: { padding: 8 },
      columnStyle: { flexGrow: 1 },
    }

    expect(props.style).toBeDefined()
    expect(props.columnStyle).toBeDefined()
  })
})
