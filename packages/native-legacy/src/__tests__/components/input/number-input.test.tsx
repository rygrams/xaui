import { describe, it, expect } from 'vitest'
import type {
  NumberInputProps,
  NumberInputCustomAppearance,
} from '../../../components/input'

describe('NumberInput Types', () => {
  it('exports NumberInputProps type with default values', () => {
    const props: NumberInputProps = {}

    expect(props).toBeDefined()
    expect(props.value).toBeUndefined()
  })

  it('accepts numeric value', () => {
    const props: NumberInputProps = { value: 42 }
    expect(props.value).toBe(42)
  })

  it('accepts numeric defaultValue', () => {
    const props: NumberInputProps = { defaultValue: 10 }
    expect(props.defaultValue).toBe(10)
  })

  it('accepts onValueChange callback', () => {
    const handler = (_value: number | undefined) => {}
    const props: NumberInputProps = { onValueChange: handler }
    expect(props.onValueChange).toBe(handler)
  })

  it('accepts minValue and maxValue', () => {
    const props: NumberInputProps = { minValue: 0, maxValue: 100 }
    expect(props.minValue).toBe(0)
    expect(props.maxValue).toBe(100)
  })

  it('accepts step', () => {
    const props: NumberInputProps = { step: 5 }
    expect(props.step).toBe(5)
  })

  it('accepts decimal step', () => {
    const props: NumberInputProps = { step: 0.1 }
    expect(props.step).toBe(0.1)
  })

  it('accepts hideStepper', () => {
    const props: NumberInputProps = { hideStepper: true }
    expect(props.hideStepper).toBe(true)
  })

  it('accepts formatOptions', () => {
    const props: NumberInputProps = {
      formatOptions: {
        style: 'currency',
        currency: 'USD',
      },
    }

    expect(props.formatOptions).toBeDefined()
    expect(props.formatOptions!.style).toBe('currency')
  })

  it('accepts locale', () => {
    const props: NumberInputProps = { locale: 'de-DE' }
    expect(props.locale).toBe('de-DE')
  })

  it('accepts all variant values', () => {
    const variants: NumberInputProps['variant'][] = [
      'flat',
      'faded',
      'bordered',
      'underlined',
    ]
    variants.forEach(variant => {
      const props: NumberInputProps = { variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all size values', () => {
    const sizes: NumberInputProps['size'][] = ['sm', 'md', 'lg']
    sizes.forEach(size => {
      const props: NumberInputProps = { size }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all theme color values', () => {
    const themeColors: NumberInputProps['themeColor'][] = [
      'default',
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
    ]
    themeColors.forEach(themeColor => {
      const props: NumberInputProps = { themeColor }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts label and description', () => {
    const props: NumberInputProps = {
      label: 'Quantity',
      description: 'Enter a number between 1 and 100',
    }

    expect(props.label).toBe('Quantity')
    expect(props.description).toBe('Enter a number between 1 and 100')
  })

  it('accepts isInvalid with errorMessage', () => {
    const props: NumberInputProps = {
      isInvalid: true,
      errorMessage: 'Value out of range',
    }

    expect(props.isInvalid).toBe(true)
    expect(props.errorMessage).toBe('Value out of range')
  })

  it('accepts isDisabled and isReadOnly', () => {
    const props: NumberInputProps = {
      isDisabled: true,
      isReadOnly: false,
    }

    expect(props.isDisabled).toBe(true)
    expect(props.isReadOnly).toBe(false)
  })

  it('accepts isClearable', () => {
    const props: NumberInputProps = { isClearable: true }
    expect(props.isClearable).toBe(true)
  })

  it('exports NumberInputCustomAppearance type', () => {
    const appearance: NumberInputCustomAppearance = {
      container: { padding: 10 },
      inputWrapper: { borderWidth: 2 },
      stepperContainer: { gap: 8 },
      stepperButton: { borderRadius: 4 },
    }

    expect(appearance).toBeDefined()
    expect(appearance.stepperContainer).toBeDefined()
  })

  it('accepts percentage formatOptions', () => {
    const props: NumberInputProps = {
      formatOptions: {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    }

    expect(props.formatOptions!.style).toBe('percent')
  })
})
