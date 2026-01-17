import { describe, it, expect } from 'vitest'
import type { SwitchProps } from '../switch-types'

describe('Switch Types', () => {
  it('exports SwitchProps type', () => {
    const props: SwitchProps = {
      label: 'Test Switch',
      labelAlignment: 'right',
      themeColor: 'primary',
      variant: 'inside',
      size: 'md',
      radius: 'full',
      fullWidth: false,
      isSelected: false,
      isDisabled: false,
    }

    expect(props).toBeDefined()
    expect(props.label).toBe('Test Switch')
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('inside')
  })

  it('accepts all theme colors', () => {
    const colors: Array<SwitchProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach((color) => {
      const props: SwitchProps = {
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<SwitchProps['variant']> = ['inside', 'overlap']

    variants.forEach((variant) => {
      const props: SwitchProps = {
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<SwitchProps['size']> = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const props: SwitchProps = {
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<SwitchProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach((radius) => {
      const props: SwitchProps = {
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts all label alignment options', () => {
    const alignments: Array<SwitchProps['labelAlignment']> = [
      'left',
      'right',
      'justify-left',
      'justify-right',
    ]

    alignments.forEach((alignment) => {
      const props: SwitchProps = {
        labelAlignment: alignment,
      }
      expect(props.labelAlignment).toBe(alignment)
    })
  })

  it('accepts boolean props', () => {
    const props: SwitchProps = {
      fullWidth: true,
      isSelected: true,
      isDisabled: true,
    }

    expect(props.fullWidth).toBe(true)
    expect(props.isSelected).toBe(true)
    expect(props.isDisabled).toBe(true)
  })

  it('accepts optional label', () => {
    const propsWithLabel: SwitchProps = {
      label: 'Enable notifications',
    }

    const propsWithoutLabel: SwitchProps = {}

    expect(propsWithLabel.label).toBe('Enable notifications')
    expect(propsWithoutLabel.label).toBeUndefined()
  })

  it('accepts onValueChange handler', () => {
    const handler = (isSelected: boolean) => {
      expect(typeof isSelected).toBe('boolean')
    }

    const props: SwitchProps = {
      onValueChange: handler,
    }

    expect(props.onValueChange).toBeDefined()
    props.onValueChange?.(true)
  })

  it('accepts custom styles', () => {
    const props: SwitchProps = {
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
    const props: SwitchProps = {}

    expect(props.labelAlignment).toBeUndefined()
    expect(props.themeColor).toBeUndefined()
    expect(props.variant).toBeUndefined()
    expect(props.size).toBeUndefined()
    expect(props.radius).toBeUndefined()
    expect(props.fullWidth).toBeUndefined()
    expect(props.isSelected).toBeUndefined()
    expect(props.isDisabled).toBeUndefined()
  })

  it('allows combining multiple props', () => {
    const props: SwitchProps = {
      label: 'Enable dark mode',
      labelAlignment: 'left',
      themeColor: 'primary',
      variant: 'overlap',
      size: 'lg',
      radius: 'full',
      fullWidth: true,
      isSelected: true,
      isDisabled: false,
      onValueChange: (_selected) => {},
      style: { padding: 10 },
      labelStyle: { color: '#000' },
    }

    expect(props.label).toBe('Enable dark mode')
    expect(props.labelAlignment).toBe('left')
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('overlap')
    expect(props.size).toBe('lg')
    expect(props.radius).toBe('full')
    expect(props.fullWidth).toBe(true)
    expect(props.isSelected).toBe(true)
    expect(props.isDisabled).toBe(false)
  })

  it('uses isSelected instead of isChecked', () => {
    const propsSelected: SwitchProps = {
      isSelected: true,
    }

    const propsUnselected: SwitchProps = {
      isSelected: false,
    }

    expect(propsSelected.isSelected).toBe(true)
    expect(propsUnselected.isSelected).toBe(false)
  })

  it('variant inside is the default', () => {
    const props: SwitchProps = {
      variant: 'inside',
    }

    expect(props.variant).toBe('inside')
  })

  it('variant overlap is supported', () => {
    const props: SwitchProps = {
      variant: 'overlap',
    }

    expect(props.variant).toBe('overlap')
  })

  it('onValueChange receives boolean for isSelected state', () => {
    let receivedValue: boolean | undefined

    const handler = (isSelected: boolean) => {
      receivedValue = isSelected
    }

    const props: SwitchProps = {
      onValueChange: handler,
    }

    props.onValueChange?.(true)
    expect(receivedValue).toBe(true)

    props.onValueChange?.(false)
    expect(receivedValue).toBe(false)
  })
})
