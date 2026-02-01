import { describe, it, expect } from 'vitest'
import type { MasonryGridItemProps } from '../../../../components/view/masonry-grid/masonry-grid-item.type'

describe('MasonryGridItem Types', () => {
  it('exports MasonryGridItemProps type', () => {
    const props: MasonryGridItemProps = {
      children: 'Item',
    }

    expect(props).toBeDefined()
  })

  it('accepts style props', () => {
    const props: MasonryGridItemProps = {
      children: 'Item',
      style: { padding: 8 },
    }

    expect(props.style).toBeDefined()
  })
})
