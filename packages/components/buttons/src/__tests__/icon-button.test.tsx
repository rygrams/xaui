import { describe, it, expect } from 'vitest'
import type { IconButtonProps } from '../icon-button-types'
import React from 'react'

const TestIcon = React.createElement('div', { testID: 'test-icon' })

describe('IconButton Types', () => {
  it('exports IconButtonProps type', () => {
    const props: IconButtonProps = {
      icon: TestIcon,
      themeColor: 'primary',
      variant: 'light',
      size: 'md',
      radius: 'md',
      fullWidth: false,
      isDisabled: false,
      isLoading: false,
      enableRipple: false,
    }

    expect(props).toBeDefined()
    expect(props.icon).toBeDefined()
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('light')
  })

  it('accepts all theme colors', () => {
    const colors: Array<IconButtonProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach((color) => {
      const props: IconButtonProps = {
        icon: TestIcon,
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<IconButtonProps['variant']> = [
      'solid',
      'outlined',
      'flat',
      'light',
      'faded',
    ]

    variants.forEach((variant) => {
      const props: IconButtonProps = {
        icon: TestIcon,
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<IconButtonProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach((size) => {
      const props: IconButtonProps = {
        icon: TestIcon,
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<IconButtonProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach((radius) => {
      const props: IconButtonProps = {
        icon: TestIcon,
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('defaults to light variant', () => {
    const props: IconButtonProps = {
      icon: TestIcon,
    }

    expect(props.variant).toBeUndefined()
  })

  it('accepts boolean props', () => {
    const props: IconButtonProps = {
      icon: TestIcon,
      fullWidth: true,
      isDisabled: true,
      isLoading: true,
      enableRipple: true,
    }

    expect(props.fullWidth).toBe(true)
    expect(props.isDisabled).toBe(true)
    expect(props.isLoading).toBe(true)
    expect(props.enableRipple).toBe(true)
  })

  it('accepts event handlers', () => {
    const handlers = {
      onPress: () => {},
      onLongPress: () => {},
      onPressIn: () => {},
      onPressOut: () => {},
    }

    const props: IconButtonProps = {
      icon: TestIcon,
      ...handlers,
    }

    expect(props.onPress).toBeDefined()
    expect(props.onLongPress).toBeDefined()
    expect(props.onPressIn).toBeDefined()
    expect(props.onPressOut).toBeDefined()
  })

  it('requires icon prop', () => {
    const props: IconButtonProps = {
      icon: TestIcon,
    }

    expect(props.icon).toBeDefined()
  })
})
