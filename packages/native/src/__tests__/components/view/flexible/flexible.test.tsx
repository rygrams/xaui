import { describe, it, expect } from 'vitest'
import type { FlexibleProps } from '../../../../components/view/layout-types'

describe('FlexibleProps types', () => {
  it('defaults to loose fit', () => {
    const props: FlexibleProps = {}
    expect(props.fit).toBeUndefined()
  })

  it('accepts tight fit', () => {
    const props: FlexibleProps = { fit: 'tight' }
    expect(props.fit).toBe('tight')
  })

  it('accepts flex factor', () => {
    const props: FlexibleProps = { flex: 2 }
    expect(props.flex).toBe(2)
  })

  it('accepts children', () => {
    const props: FlexibleProps = { children: 'content' }
    expect(props.children).toBe('content')
  })
})
