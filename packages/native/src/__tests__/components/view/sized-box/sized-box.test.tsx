import { describe, it, expect } from 'vitest'
import type { SizedBoxProps } from '../../../../components/view/sized-box/sized-box.type'

describe('SizedBox Types', () => {
  it('exports SizedBoxProps type', () => {
    const props: SizedBoxProps = {
      children: 'SizedBox',
      width: '100%',
      height: 80,
      fullWidth: true,
    }

    expect(props).toBeDefined()
    expect(props.width).toBe('100%')
    expect(props.fullWidth).toBe(true)
  })

  it('accepts style props', () => {
    const props: SizedBoxProps = {
      children: 'SizedBox',
      style: { minHeight: 40 },
    }

    expect(props.style).toBeDefined()
  })
})
