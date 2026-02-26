import { describe, it, expect } from 'vitest'
import type { CenterProps } from '../../../../components/view/center/center.type'

describe('Center Types', () => {
  it('exports CenterProps type', () => {
    const props: CenterProps = {
      children: 'Center',
      fullWidth: true,
    }

    expect(props).toBeDefined()
    expect(props.fullWidth).toBe(true)
  })

  it('accepts style props', () => {
    const props: CenterProps = {
      children: 'Center',
      style: { justifyContent: 'center' },
    }

    expect(props.style).toBeDefined()
  })
})
