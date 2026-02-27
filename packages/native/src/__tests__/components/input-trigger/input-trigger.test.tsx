import { describe, it, expect } from 'vitest'
import type {
  InputTriggerProps,
  InputTriggerEvents,
  InputTriggerVariant,
  InputTriggerSize,
  InputTriggerLabelPlacement,
} from '../../../components/input-trigger'

describe('InputTrigger Types', () => {
  it('creates props with defaults', () => {
    const props: InputTriggerProps = {
      placeholder: 'Pick a value...',
      onPress: () => {},
    }

    expect(props.placeholder).toBe('Pick a value...')
  })

  it('accepts all optional props', () => {
    const props: InputTriggerProps = {
      value: 'Selected',
      placeholder: 'Pick a value...',
      label: 'Label',
      labelPlacement: 'outside',
      description: 'Helper text',
      errorMessage: 'Error text',
      startContent: null,
      endContent: null,
      themeColor: 'primary',
      variant: 'colored',
      size: 'md',
      radius: 'md',
      isDisabled: false,
      isInvalid: false,
      fullWidth: true,
      onPress: () => {},
    }

    expect(props.value).toBe('Selected')
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('colored')
    expect(props.size).toBe('md')
    expect(props.radius).toBe('md')
  })

  it('accepts all variants', () => {
    const variants: InputTriggerVariant[] = [
      'colored',
      'light',
      'bordered',
      'underlined',
    ]

    variants.forEach(variant => {
      const props: InputTriggerProps = { variant, onPress: () => {} }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: InputTriggerSize[] = ['sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: InputTriggerProps = { size, onPress: () => {} }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all label placements', () => {
    const placements: InputTriggerLabelPlacement[] = ['outside', 'inside']

    placements.forEach(labelPlacement => {
      const props: InputTriggerProps = { labelPlacement, onPress: () => {} }
      expect(props.labelPlacement).toBe(labelPlacement)
    })
  })

  it('accepts all theme colors', () => {
    const colors: Array<InputTriggerProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: InputTriggerProps = { themeColor, onPress: () => {} }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts state props', () => {
    const props: InputTriggerProps = {
      isDisabled: true,
      isInvalid: true,
      fullWidth: false,
      onPress: () => {},
    }

    expect(props.isDisabled).toBe(true)
    expect(props.isInvalid).toBe(true)
    expect(props.fullWidth).toBe(false)
  })

  it('exports events type', () => {
    const events: InputTriggerEvents = {
      onPress: () => {},
    }

    expect(events.onPress).toBeDefined()
  })
})
