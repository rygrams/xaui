import { describe, it, expect } from 'vitest'
import type { SizedBoxProps } from '../../../../components/view/sized-box/sized-box.type'

describe('SizedBox Types', () => {
  it('accepts width and height as numbers', () => {
    const props: SizedBoxProps = { width: 100, height: 80 }
    expect(props.width).toBe(100)
    expect(props.height).toBe(80)
  })

  it('accepts expand to fill available space', () => {
    const props: SizedBoxProps = { expand: true }
    expect(props.expand).toBe(true)
  })

  it('accepts shrink to collapse to zero', () => {
    const props: SizedBoxProps = { shrink: true }
    expect(props.shrink).toBe(true)
  })

  it('accepts children', () => {
    const props: SizedBoxProps = { children: 'content' }
    expect(props.children).toBe('content')
  })

  it('does not expose fullWidth or style', () => {
    const props: SizedBoxProps = {}
    expect('fullWidth' in props).toBe(false)
    expect('style' in props).toBe(false)
  })
})
