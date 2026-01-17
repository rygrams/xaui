import { describe, it, expect } from 'vitest'
import type { CheckboxProps } from '../checkbox-types'

describe('Checkbox Types', () => {
  it('exports CheckboxProps type', () => {
    const props: CheckboxProps = {
      label: 'Test Checkbox',
      labelAlignment: 'right',
      themeColor: 'primary',
      variant: 'filled',
      size: 'md',
      radius: 'sm',
      fullWidth: false,
      isChecked: false,
      isDisabled: false,
    }

    expect(props).toBeDefined()
    expect(props.label).toBe('Test Checkbox')
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
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<CheckboxProps['variant']> = ['filled', 'light']

    variants.forEach((variant) => {
      const props: CheckboxProps = {
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<CheckboxProps['size']> = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const props: CheckboxProps = {
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<CheckboxProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach((radius) => {
      const props: CheckboxProps = {
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts all label alignment options', () => {
    const alignments: Array<CheckboxProps['labelAlignment']> = [
      'left',
      'right',
      'justify-left',
      'justify-right',
    ]

    alignments.forEach((alignment) => {
      const props: CheckboxProps = {
        labelAlignment: alignment,
      }
      expect(props.labelAlignment).toBe(alignment)
    })
  })

  it('accepts boolean props', () => {
    const props: CheckboxProps = {
      fullWidth: true,
      isChecked: true,
      isDisabled: true,
    }

    expect(props.fullWidth).toBe(true)
    expect(props.isChecked).toBe(true)
    expect(props.isDisabled).toBe(true)
  })

  it('accepts optional label', () => {
    const propsWithLabel: CheckboxProps = {
      label: 'Accept terms',
    }

    const propsWithoutLabel: CheckboxProps = {}

    expect(propsWithLabel.label).toBe('Accept terms')
    expect(propsWithoutLabel.label).toBeUndefined()
  })

  it('accepts onValueChange handler', () => {
    const handler = (isChecked: boolean) => {
      expect(typeof isChecked).toBe('boolean')
    }

    const props: CheckboxProps = {
      onValueChange: handler,
    }

    expect(props.onValueChange).toBeDefined()
    props.onValueChange?.(true)
  })

  it('accepts custom styles', () => {
    const props: CheckboxProps = {
      style: {
        marginTop: 10,
        marginBottom: 20,
      },
      labelStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    }

    expect(props.style).toBeDefined()
    expect(props.labelStyle).toBeDefined()
    expect(props.style?.marginTop).toBe(10)
    expect(props.labelStyle?.fontWeight).toBe('bold')
  })

  it('has correct default values', () => {
    const props: CheckboxProps = {}

    expect(props.labelAlignment).toBeUndefined()
    expect(props.themeColor).toBeUndefined()
    expect(props.variant).toBeUndefined()
    expect(props.size).toBeUndefined()
    expect(props.radius).toBeUndefined()
    expect(props.fullWidth).toBeUndefined()
    expect(props.isChecked).toBeUndefined()
    expect(props.isDisabled).toBeUndefined()
  })

  it('allows combining multiple props', () => {
    const props: CheckboxProps = {
      label: 'I agree to the terms',
      labelAlignment: 'left',
      themeColor: 'success',
      variant: 'light',
      size: 'lg',
      radius: 'full',
      fullWidth: true,
      isChecked: true,
      isDisabled: false,
      onValueChange: (checked) => {},
      style: { padding: 10 },
      labelStyle: { color: '#000' },
    }

    expect(props.label).toBe('I agree to the terms')
    expect(props.labelAlignment).toBe('left')
    expect(props.themeColor).toBe('success')
    expect(props.variant).toBe('light')
    expect(props.size).toBe('lg')
    expect(props.radius).toBe('full')
    expect(props.fullWidth).toBe(true)
    expect(props.isChecked).toBe(true)
    expect(props.isDisabled).toBe(false)
  })
})
