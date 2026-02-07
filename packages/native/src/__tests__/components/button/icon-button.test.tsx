import { describe, it, expect } from 'vitest'
import type { IconButtonProps } from '../../../components/button/icon-button.type'

describe('IconButton Types', () => {
  it('exports IconButtonProps type', () => {
    const props: IconButtonProps = {
      icon: null,
      themeColor: 'primary',
      variant: 'solid',
      size: 'md',
      radius: 'md',
      isDisabled: false,
      isLoading: false,
    }

    expect(props).toBeDefined()
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('solid')
    expect(props.size).toBe('md')
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

    expect(colors).toHaveLength(7)
  })

  it('accepts all variants', () => {
    const variants: Array<IconButtonProps['variant']> = [
      'solid',
      'outlined',
      'flat',
      'light',
      'faded',
    ]

    expect(variants).toHaveLength(5)
  })

  it('accepts all sizes', () => {
    const sizes: Array<IconButtonProps['size']> = ['xs', 'sm', 'md', 'lg']

    expect(sizes).toHaveLength(4)
  })

  it('accepts all radius options', () => {
    const radiusOptions: Array<IconButtonProps['radius']> = [
      'none',
      'sm',
      'md',
      'lg',
      'full',
    ]

    expect(radiusOptions).toHaveLength(5)
  })

  it('accepts custom appearance', () => {
    const props: IconButtonProps = {
      icon: null,
      customAppearance: {
        container: { padding: 10 },
        button: { backgroundColor: 'red' },
      },
    }

    expect(props.customAppearance).toBeDefined()
    expect(props.customAppearance?.container).toBeDefined()
    expect(props.customAppearance?.button).toBeDefined()
  })

  it('accepts event handlers', () => {
    const onPress = () => {}
    const onLongPress = () => {}
    const onPressIn = () => {}
    const onPressOut = () => {}

    const props: IconButtonProps = {
      icon: null,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
    }

    expect(props.onPress).toBe(onPress)
    expect(props.onLongPress).toBe(onLongPress)
    expect(props.onPressIn).toBe(onPressIn)
    expect(props.onPressOut).toBe(onPressOut)
  })
})
