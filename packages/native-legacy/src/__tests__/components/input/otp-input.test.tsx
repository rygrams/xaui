import { describe, it, expect } from 'vitest'
import type {
  OTPInputProps,
  OTPInputCustomAppearance,
} from '../../../components/input'

describe('OTPInput Types', () => {
  it('exports OTPInputProps type with default values', () => {
    const props: OTPInputProps = {}

    expect(props).toBeDefined()
    expect(props.length).toBeUndefined()
    expect(props.value).toBeUndefined()
  })

  it('accepts length prop', () => {
    const props: OTPInputProps = { length: 6 }
    expect(props.length).toBe(6)
  })

  it('accepts controlled value', () => {
    const props: OTPInputProps = {
      value: '1234',
      onValueChange: () => {},
    }

    expect(props.value).toBe('1234')
  })

  it('accepts uncontrolled defaultValue', () => {
    const props: OTPInputProps = { defaultValue: '12' }
    expect(props.defaultValue).toBe('12')
  })

  it('accepts onComplete callback', () => {
    const handler = (_value: string) => {}
    const props: OTPInputProps = { onComplete: handler }
    expect(props.onComplete).toBe(handler)
  })

  it('accepts all variant values', () => {
    const variants: OTPInputProps['variant'][] = [
      'flat',
      'faded',
      'bordered',
      'underlined',
    ]
    variants.forEach(variant => {
      const props: OTPInputProps = { variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all size values', () => {
    const sizes: OTPInputProps['size'][] = ['sm', 'md', 'lg']
    sizes.forEach(size => {
      const props: OTPInputProps = { size }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all theme color values', () => {
    const themeColors: OTPInputProps['themeColor'][] = [
      'default',
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
    ]
    themeColors.forEach(themeColor => {
      const props: OTPInputProps = { themeColor }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts all radius values', () => {
    const radii: OTPInputProps['radius'][] = ['none', 'sm', 'md', 'lg', 'full']
    radii.forEach(radius => {
      const props: OTPInputProps = { radius }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts isSecured prop', () => {
    const props: OTPInputProps = { isSecured: true }
    expect(props.isSecured).toBe(true)
  })

  it('accepts isDisabled prop', () => {
    const props: OTPInputProps = { isDisabled: true }
    expect(props.isDisabled).toBe(true)
  })

  it('accepts isInvalid with errorMessage', () => {
    const props: OTPInputProps = {
      isInvalid: true,
      errorMessage: 'Invalid code',
    }

    expect(props.isInvalid).toBe(true)
    expect(props.errorMessage).toBe('Invalid code')
  })

  it('accepts label and description', () => {
    const props: OTPInputProps = {
      label: 'Verification Code',
      description: 'Enter the 4-digit code',
    }

    expect(props.label).toBe('Verification Code')
    expect(props.description).toBe('Enter the 4-digit code')
  })

  it('accepts allowedKeys regex', () => {
    const props: OTPInputProps = { allowedKeys: /^[a-zA-Z0-9]$/ }
    expect(props.allowedKeys).toBeDefined()
    expect(props.allowedKeys!.test('a')).toBe(true)
    expect(props.allowedKeys!.test('1')).toBe(true)
    expect(props.allowedKeys!.test('!')).toBe(false)
  })

  it('exports OTPInputCustomAppearance type', () => {
    const appearance: OTPInputCustomAppearance = {
      container: { padding: 10 },
      segmentContainer: { gap: 12 },
      segment: { borderWidth: 2 },
      segmentText: { fontWeight: 'bold' },
      label: { fontSize: 16 },
      helperText: { fontStyle: 'italic' },
    }

    expect(appearance).toBeDefined()
    expect(appearance.segment).toBeDefined()
  })

  it('accepts fullWidth prop', () => {
    const props: OTPInputProps = { fullWidth: true }
    expect(props.fullWidth).toBe(true)
  })
})
