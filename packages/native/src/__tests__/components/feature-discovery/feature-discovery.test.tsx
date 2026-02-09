import { describe, it, expect } from 'vitest'
import type { FeatureDiscoveryProps } from '../../../components/feature-discovery'

describe('FeatureDiscovery Types', () => {
  it('exports FeatureDiscoveryProps type', () => {
    const props: FeatureDiscoveryProps = {
      isVisible: true,
      targetRef: { current: null },
      title: 'Feature title',
      description: 'Feature description',
      actionText: 'Got it',
      themeColor: 'primary',
      dismissOnBackdropPress: true,
      spotlightPadding: 14,
      circleScale: 1.65,
    }

    expect(props).toBeDefined()
    expect(props.isVisible).toBe(true)
    expect(props.title).toBe('Feature title')
    expect(props.themeColor).toBe('primary')
  })

  it('accepts callbacks', () => {
    const props: FeatureDiscoveryProps = {
      isVisible: false,
      targetRef: { current: null },
      title: 'Title',
      onDismiss: () => {},
      onActionPress: () => {},
    }

    expect(props.onDismiss).toBeDefined()
    expect(props.onActionPress).toBeDefined()
  })
})
