import { describe, it, expect } from 'vitest'
import type { RadioProps, RadioGroupProps } from '../../../components/radio'

describe('Radio Types', () => {
  it('exports RadioProps type', () => {
    const props: RadioProps = {
      label: 'Option',
      value: 'option-a',
      themeColor: 'primary',
      variant: 'filled',
      size: 'md',
      radius: 'full',
      fullWidth: false,
      isChecked: false,
      defaultChecked: false,
      isDisabled: false,
    }

    expect(props).toBeDefined()
    expect(props.label).toBe('Option')
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('filled')
  })

  it('accepts all variants', () => {
    const variants: Array<RadioProps['variant']> = ['filled', 'light']

    variants.forEach(variant => {
      const props: RadioProps = { variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<RadioProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: RadioProps = { size }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all label alignments', () => {
    const alignments: Array<RadioProps['labelAlignment']> = [
      'left',
      'right',
      'justify-left',
      'justify-right',
    ]

    alignments.forEach(labelAlignment => {
      const props: RadioProps = { labelAlignment }
      expect(props.labelAlignment).toBe(labelAlignment)
    })
  })

  it('exports RadioGroupProps type', () => {
    const props: RadioGroupProps = {
      children: null,
      value: 'a',
      defaultValue: 'b',
      onValueChange: () => {},
      orientation: 'vertical',
    }

    expect(props).toBeDefined()
    expect(props.value).toBe('a')
    expect(props.orientation).toBe('vertical')
  })

  it('accepts group orientation values', () => {
    const orientations: Array<RadioGroupProps['orientation']> = [
      'vertical',
      'horizontal',
    ]

    orientations.forEach(orientation => {
      const props: RadioGroupProps = {
        children: null,
        orientation,
      }

      expect(props.orientation).toBe(orientation)
    })
  })
})
