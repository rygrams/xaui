import { describe, it, expect } from 'vitest'
import type { CenterProps } from '../../../../components/view/center/center.type'

describe('CenterProps types', () => {
  it('accepts children as optional', () => {
    const props: CenterProps = {}
    expect(props.children).toBeUndefined()
  })

  it('accepts children', () => {
    const props: CenterProps = { children: 'content' }
    expect(props.children).toBe('content')
  })

  it('accepts style override', () => {
    const props: CenterProps = { style: { backgroundColor: 'blue' } }
    expect(props.style).toEqual({ backgroundColor: 'blue' })
  })
})
