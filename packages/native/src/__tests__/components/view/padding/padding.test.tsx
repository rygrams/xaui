import { describe, it, expect } from 'vitest'
import type { PaddingProps } from '../../../../components/view/padding/padding.type'

describe('Padding Types', () => {
  it('exports PaddingProps type', () => {
    const props: PaddingProps = {
      children: 'Padding',
      all: 12,
      horizontal: 8,
      vertical: 4,
      top: 2,
      right: 6,
      bottom: 10,
      left: 14,
    }

    expect(props).toBeDefined()
    expect(props.all).toBe(12)
  })

  it('accepts style props', () => {
    const props: PaddingProps = {
      children: 'Padding',
      style: { padding: 12 },
    }

    expect(props.style).toBeDefined()
  })
})
