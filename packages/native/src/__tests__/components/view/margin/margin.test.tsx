import { describe, it, expect } from 'vitest'
import type { MarginProps } from '../../../../components/view/margin/margin.type'

describe('MarginProps types', () => {
  it('accepts number margin', () => {
    const props: MarginProps = { children: 'content', margin: 16 }
    expect(props.margin).toBe(16)
  })

  it('accepts object margin with all sides', () => {
    const props: MarginProps = {
      children: 'content',
      margin: { top: 8, bottom: 8, left: 16, right: 16 },
    }
    expect(props.margin).toEqual({ top: 8, bottom: 8, left: 16, right: 16 })
  })

  it('accepts horizontal/vertical shorthand', () => {
    const props: MarginProps = {
      children: 'content',
      margin: { horizontal: 16, vertical: 8 },
    }
    expect(props.margin).toEqual({ horizontal: 16, vertical: 8 })
  })

  it('accepts style override', () => {
    const props: MarginProps = {
      children: 'content',
      margin: 8,
      style: { backgroundColor: 'blue' },
    }
    expect(props.style).toEqual({ backgroundColor: 'blue' })
  })

  it('accepts children as optional', () => {
    const props: MarginProps = { margin: 8 }
    expect(props.children).toBeUndefined()
  })
})
