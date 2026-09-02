import { describe, it, expect } from 'vitest'
import type { SwitchProps } from '../../../components/switch'

describe('Switch Types', () => {
  it('exports SwitchProps type', () => {
    const props: SwitchProps = {
      label: 'Test',
      themeColor: 'primary',
      variant: 'inside',
      size: 'md',
      radius: 'full',
      fullWidth: false,
      isSelected: false,
      isDisabled: false,
    }

    expect(props).toBeDefined()
    expect(props.label).toBe('Test')
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

    colors.forEach(color => {
      const props: SwitchProps = {
        label: 'Test',
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<SwitchProps['variant']> = ['inside', 'overlap']

    variants.forEach(variant => {
      const props: SwitchProps = {
        label: 'Test',
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<SwitchProps['size']> = ['sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: SwitchProps = {
        label: 'Test',
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<SwitchProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach(radius => {
      const props: SwitchProps = {
        label: 'Test',
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts all label alignments', () => {
    const alignments: Array<SwitchProps['labelAlignment']> = [
      'left',
      'right',
      'justify-left',
      'justify-right',
    ]

    alignments.forEach(labelAlignment => {
      const props: SwitchProps = {
        label: 'Test',
        labelAlignment,
      }
      expect(props.labelAlignment).toBe(labelAlignment)
    })
  })

  it('accepts boolean props', () => {
    const props: SwitchProps = {
      label: 'Test',
      fullWidth: true,
      isSelected: true,
      isDisabled: true,
    }

    expect(props.fullWidth).toBe(true)
    expect(props.isSelected).toBe(true)
    expect(props.isDisabled).toBe(true)
  })

  it('accepts onValueChange handler', () => {
    const props: SwitchProps = {
      label: 'Test',
      onValueChange: () => {},
    }

    expect(props.onValueChange).toBeDefined()
  })
})
