import { describe, it, expect } from 'vitest'
import type {
  MenuBoxProps,
  MenuBoxItemProps,
  MenuBoxItemCustomAppearance,
} from '../../../components/menubox'

describe('MenuBox Types', () => {
  it('exports MenuBoxProps type', () => {
    const props: MenuBoxProps = {
      children: null,
      size: 'md',
      radius: 'lg',
      themeColor: 'primary',
    }

    expect(props).toBeDefined()
    expect(props.size).toBe('md')
    expect(props.radius).toBe('lg')
    expect(props.themeColor).toBe('primary')
  })

  it('accepts all sizes', () => {
    const sizes: Array<MenuBoxProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: MenuBoxProps = {
        children: null,
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius values', () => {
    const radii: Array<MenuBoxProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach(radius => {
      const props: MenuBoxProps = {
        children: null,
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts all theme colors', () => {
    const colors: Array<MenuBoxProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: MenuBoxProps = {
        children: null,
        themeColor,
      }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts backgroundColor prop', () => {
    const props: MenuBoxProps = {
      children: null,
      backgroundColor: '#f5f5f5',
    }
    expect(props.backgroundColor).toBe('#f5f5f5')
  })

  it('accepts style prop', () => {
    const props: MenuBoxProps = {
      children: null,
      style: { margin: 10 },
    }
    expect(props.style).toEqual({ margin: 10 })
  })

  it('accepts spacing prop', () => {
    const spacings: Array<MenuBoxProps['spacing']> = [0, 4, 8, 12, 16]

    spacings.forEach(spacing => {
      const props: MenuBoxProps = {
        children: null,
        spacing,
      }
      expect(props.spacing).toBe(spacing)
    })
  })
})

describe('MenuBoxItem Types', () => {
  it('exports MenuBoxItemProps type', () => {
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: 'Test Item',
      description: 'Description',
      isDisabled: false,
    }

    expect(props).toBeDefined()
    expect(props.itemKey).toBe('1')
    expect(props.title).toBe('Test Item')
    expect(props.description).toBe('Description')
  })

  it('accepts itemKey prop', () => {
    const props: MenuBoxItemProps = {
      itemKey: 'unique-key',
      title: 'Item',
    }
    expect(props.itemKey).toBe('unique-key')
  })

  it('accepts string title', () => {
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: 'Menu Item',
    }
    expect(props.title).toBe('Menu Item')
  })

  it('accepts ReactNode title', () => {
    const customTitle = 'Custom'
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: customTitle,
    }
    expect(props.title).toBe(customTitle)
  })

  it('accepts string description', () => {
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: 'Item',
      description: 'Item description',
    }
    expect(props.description).toBe('Item description')
  })

  it('accepts ReactNode description', () => {
    const customDesc = 'Custom Description'
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: 'Item',
      description: customDesc,
    }
    expect(props.description).toBe(customDesc)
  })

  it('accepts startContent and endContent', () => {
    const startContent = 'S'
    const endContent = 'E'
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: 'Item',
      startContent,
      endContent,
    }
    expect(props.startContent).toBe(startContent)
    expect(props.endContent).toBe(endContent)
  })

  it('accepts isDisabled prop', () => {
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: 'Item',
      isDisabled: true,
    }
    expect(props.isDisabled).toBe(true)
  })

  it('accepts onPress callback', () => {
    const onPress = () => {}
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: 'Item',
      onPress,
    }
    expect(props.onPress).toBe(onPress)
  })

  it('accepts customAppearance styles', () => {
    const customAppearance: MenuBoxItemCustomAppearance = {
      container: { backgroundColor: 'red' },
      content: { padding: 10 },
      title: { fontSize: 18 },
      description: { fontSize: 12 },
    }
    const props: MenuBoxItemProps = {
      itemKey: '1',
      title: 'Item',
      customAppearance,
    }
    expect(props.customAppearance).toBe(customAppearance)
  })
})
