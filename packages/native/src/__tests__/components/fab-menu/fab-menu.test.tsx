import { describe, it, expect } from 'vitest'
import type {
  FabMenuProps,
  FabMenuItemProps,
} from '../../../components/fab-menu'

describe('FabMenu Types', () => {
  it('exports FabMenuProps type with required props', () => {
    const props: FabMenuProps = {
      icon: 'plus-icon',
      children: null,
      themeColor: 'primary',
      variant: 'solid',
      size: 'md',
    }

    expect(props).toBeDefined()
    expect(props.icon).toBe('plus-icon')
    expect(props.children).toBeNull()
    expect(props.themeColor).toBe('primary')
  })

  it('accepts all theme colors', () => {
    const colors: Array<FabMenuProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach((color) => {
      const props: FabMenuProps = {
        icon: 'icon',
        children: null,
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<FabMenuProps['variant']> = [
      'solid',
      'flat',
      'outlined',
    ]

    variants.forEach((variant) => {
      const props: FabMenuProps = {
        icon: 'icon',
        children: null,
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<FabMenuProps['size']> = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const props: FabMenuProps = {
        icon: 'icon',
        children: null,
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts radius prop', () => {
    const props: FabMenuProps = {
      icon: 'icon',
      children: null,
      radius: 16,
    }

    expect(props.radius).toBe(16)
  })

  it('accepts label for extended FAB toggle', () => {
    const props: FabMenuProps = {
      icon: 'plus-icon',
      label: 'Create',
      children: null,
    }

    expect(props.label).toBe('Create')
  })

  it('accepts expanded icon', () => {
    const props: FabMenuProps = {
      icon: 'plus-icon',
      expandedIcon: 'close-icon',
      children: null,
    }

    expect(props.expandedIcon).toBe('close-icon')
  })

  it('accepts controlled expanded state', () => {
    const props: FabMenuProps = {
      icon: 'icon',
      children: null,
      isExpanded: true,
      onToggle: () => {},
    }

    expect(props.isExpanded).toBe(true)
    expect(props.onToggle).toBeDefined()
  })

  it('accepts showOverlay option', () => {
    const props: FabMenuProps = {
      icon: 'icon',
      children: null,
      showOverlay: false,
    }

    expect(props.showOverlay).toBe(false)
  })

  it('accepts custom appearance', () => {
    const props: FabMenuProps = {
      icon: 'icon',
      children: null,
      customAppearance: {
        container: { padding: 10 },
        fab: { borderWidth: 2 },
        menuItem: { margin: 4 },
        menuContainer: { gap: 8 },
        overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
      },
    }

    expect(props.customAppearance?.container).toEqual({ padding: 10 })
    expect(props.customAppearance?.fab).toEqual({ borderWidth: 2 })
    expect(props.customAppearance?.menuItem).toEqual({ margin: 4 })
    expect(props.customAppearance?.menuContainer).toEqual({ gap: 8 })
    expect(props.customAppearance?.overlay).toEqual({
      backgroundColor: 'rgba(0,0,0,0.5)',
    })
  })
})

describe('FabMenuItem Types', () => {
  it('exports FabMenuItemProps type with required props', () => {
    const props: FabMenuItemProps = {
      icon: 'camera-icon',
      label: 'Take Photo',
    }

    expect(props.icon).toBe('camera-icon')
    expect(props.label).toBe('Take Photo')
  })

  it('accepts themeColor prop', () => {
    const props: FabMenuItemProps = {
      icon: 'icon',
      label: 'Item',
      themeColor: 'secondary',
    }

    expect(props.themeColor).toBe('secondary')
  })

  it('accepts all theme colors for menu item', () => {
    const colors: Array<FabMenuItemProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach((color) => {
      const props: FabMenuItemProps = {
        icon: 'icon',
        label: 'Item',
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts onPress and isDisabled', () => {
    const props: FabMenuItemProps = {
      icon: 'icon',
      label: 'Item',
      onPress: () => {},
      isDisabled: true,
    }

    expect(props.onPress).toBeDefined()
    expect(props.isDisabled).toBe(true)
  })
})
