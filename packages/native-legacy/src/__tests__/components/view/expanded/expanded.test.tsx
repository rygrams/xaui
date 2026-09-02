import { describe, it, expect } from 'vitest'
import type { ExpandedProps } from '../../../../components/view/expanded/expanded.type'

describe('ExpandedProps types', () => {
  it('defaults flex to 1', () => {
    const props: ExpandedProps = {}
    expect(props.flex).toBeUndefined()
  })

  it('accepts custom flex factor', () => {
    const props: ExpandedProps = { flex: 2 }
    expect(props.flex).toBe(2)
  })

  it('accepts children', () => {
    const props: ExpandedProps = { children: 'content' }
    expect(props.children).toBe('content')
  })
})
