import { describe, it, expect } from 'vitest'
import type { ButtonProps } from '../../../components/button'

describe('Button Types', () => {
  it('exports ButtonProps type', () => {
    const props: ButtonProps = {
      children: 'Test',
      themeColor: 'primary',
      variant: 'solid',
      size: 'md',
      radius: 'md',
      fullWidth: false,
      isDisabled: false,
      isLoading: false,
    }

    expect(props).toBeDefined()
    expect(props.children).toBe('Test')
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('solid')
  })

  it('accepts all theme colors', () => {
    const colors: Array<ButtonProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(color => {
      const props: ButtonProps = {
        children: 'Test',
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<ButtonProps['variant']> = [
      'solid',
      'outlined',
      'flat',
      'light',
      'faded',
    ]

    variants.forEach(variant => {
      const props: ButtonProps = {
        children: 'Test',
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<ButtonProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: ButtonProps = {
        children: 'Test',
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<ButtonProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach(radius => {
      const props: ButtonProps = {
        children: 'Test',
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts spinner placement options', () => {
    const placements: Array<ButtonProps['spinnerPlacement']> = ['start', 'end']

    placements.forEach(placement => {
      const props: ButtonProps = {
        children: 'Test',
        spinnerPlacement: placement,
      }
      expect(props.spinnerPlacement).toBe(placement)
    })
  })

  it('accepts boolean props', () => {
    const props: ButtonProps = {
      children: 'Test',
      fullWidth: true,
      isDisabled: true,
      isLoading: true,
    }

    expect(props.fullWidth).toBe(true)
    expect(props.isDisabled).toBe(true)
    expect(props.isLoading).toBe(true)
  })

  it('accepts event handlers', () => {
    const handlers = {
      onPress: () => {},
      onLongPress: () => {},
      onPressIn: () => {},
      onPressOut: () => {},
    }

    const props: ButtonProps = {
      children: 'Test',
      ...handlers,
    }

    expect(props.onPress).toBeDefined()
    expect(props.onLongPress).toBeDefined()
    expect(props.onPressIn).toBeDefined()
    expect(props.onPressOut).toBeDefined()
  })

  it('accepts start and end content', () => {
    const props: ButtonProps = {
      children: 'Test',
      startContent: 'Start',
      endContent: 'End',
    }

    expect(props.startContent).toBe('Start')
    expect(props.endContent).toBe('End')
  })
})
