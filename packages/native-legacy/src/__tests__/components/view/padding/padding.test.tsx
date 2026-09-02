import { describe, it, expect } from 'vitest'
import type { PaddingProps } from '../../../../components/view/padding/padding.type'

describe('PaddingProps types', () => {
  it('accepts number padding', () => {
    const props: PaddingProps = { children: 'content', padding: 16 }
    expect(props.padding).toBe(16)
  })

  it('accepts object padding with all sides', () => {
    const props: PaddingProps = {
      children: 'content',
      padding: { top: 8, bottom: 8, left: 16, right: 16 },
    }
    expect(props.padding).toEqual({ top: 8, bottom: 8, left: 16, right: 16 })
  })

  it('accepts horizontal/vertical shorthand', () => {
    const props: PaddingProps = {
      children: 'content',
      padding: { horizontal: 16, vertical: 8 },
    }
    expect(props.padding).toEqual({ horizontal: 16, vertical: 8 })
  })

  it('accepts style override', () => {
    const props: PaddingProps = {
      children: 'content',
      padding: 8,
      style: { backgroundColor: 'red' },
    }
    expect(props.style).toEqual({ backgroundColor: 'red' })
  })

  it('accepts children as optional', () => {
    const props: PaddingProps = { padding: 8 }
    expect(props.children).toBeUndefined()
  })
})
