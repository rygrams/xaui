import { describe, it, expect } from 'vitest'
import type {
  ConditionalViewProps,
  ConditionalViewAnimation,
} from '../../../../components/view/conditional/conditional-view.type'

describe('ConditionalView Types', () => {
  it('exports ConditionalViewProps type', () => {
    const props: ConditionalViewProps = {
      isVisible: true,
      children: 'Content',
      animation: 'fade',
      disableAnimation: false,
    }

    expect(props).toBeDefined()
    expect(props.isVisible).toBe(true)
    expect(props.animation).toBe('fade')
  })

  it('accepts all animations', () => {
    const animations: Array<ConditionalViewProps['animation']> = [
      'fade',
      'scale',
    ]

    animations.forEach((animation) => {
      const props: ConditionalViewProps = {
        isVisible: true,
        children: 'Content',
        animation,
      }

      expect(props.animation).toBe(animation)
    })
  })

  it('exports ConditionalViewAnimation type', () => {
    const animations: Array<ConditionalViewAnimation> = [
      'fade',
      'scale',
    ]

    expect(animations).toHaveLength(2)
  })
})
