import { describe, it, expect } from 'vitest'
import { BlurViewProps } from '../../../components/view'

describe('BlurView Types', () => {
  it('exports BlurViewProps type', () => {
    const props: BlurViewProps = {
      children: 'Blur content',
      unlockable: false,
      intensity: 0.4,
      overlayColor: 'rgba(0, 0, 0, 0.2)',
    }

    expect(props).toBeDefined()
    expect(props.intensity).toBe(0.4)
  })

  it('accepts style props', () => {
    const props: BlurViewProps = {
      children: 'Blur content',
      style: { borderRadius: 12 },
    }

    expect(props.style).toBeDefined()
  })
})
