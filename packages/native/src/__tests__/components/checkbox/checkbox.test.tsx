import { describe, it, expect } from 'vitest'
import type { CheckboxProps } from '../../../components/checkbox'

describe('Checkbox Types', () => {
  it('exports CheckboxProps type', () => {
    const props: CheckboxProps = {
      label: 'Test',
      themeColor: 'primary',
      variant: 'filled',
      size: 'md',
      radius: 'sm',
      fullWidth: false,
      isChecked: false,
      isIndeterminate: false,
      isDisabled: false,
    }

    expect(props).toBeDefined()
    expect(props.label).toBe('Test')
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('filled')
  })

  it('accepts all theme colors', () => {
    const colors: Array<CheckboxProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach((color) => {
      const props: CheckboxProps = {
        label: 'Test',
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<CheckboxProps['variant']> = ['filled', 'light']

    variants.forEach((variant) => {
      const props: CheckboxProps = {
        label: 'Test',
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<CheckboxProps['size']> = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const props: CheckboxProps = {
        label: 'Test',
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<CheckboxProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach((radius) => {
      const props: CheckboxProps = {
        label: 'Test',
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts all label alignments', () => {
    const alignments: Array<CheckboxProps['labelAlignment']> = [
      'left',
      'right',
      'justify-left',
      'justify-right',
    ]

    alignments.forEach((labelAlignment) => {
      const props: CheckboxProps = {
        label: 'Test',
        labelAlignment,
      }
      expect(props.labelAlignment).toBe(labelAlignment)
    })
  })

  it('accepts boolean props', () => {
    const props: CheckboxProps = {
      label: 'Test',
      fullWidth: true,
      isChecked: true,
      isIndeterminate: true,
      isDisabled: true,
    }

    expect(props.fullWidth).toBe(true)
    expect(props.isChecked).toBe(true)
    expect(props.isIndeterminate).toBe(true)
    expect(props.isDisabled).toBe(true)
  })

  it('accepts onValueChange handler', () => {
    const props: CheckboxProps = {
      label: 'Test',
      onValueChange: () => {},
    }

    expect(props.onValueChange).toBeDefined()
  })
})
