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
      'slide-up',
      'slide-down',
      'slide-left',
      'slide-right',
      'zoom-in',
      'zoom-out',
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

  it('exports ConditionalViewAnimation enum', () => {
    const animations: Array<ConditionalViewAnimation> = [
      'fade',
      'scale',
      'slide-up',
      'slide-down',
      'slide-left',
      'slide-right',
      'zoom-in',
      'zoom-out',
    ]

    expect(animations).toHaveLength(8)
  })
})
