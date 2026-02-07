import { describe, it, expect } from 'vitest'
import type {
  FabMenuProps,
  FabMenuItemConfig,
} from '../../../components/fab-menu'

describe('FabMenu Types', () => {
  it('exports FabMenuProps type with required props', () => {
    const items: FabMenuItemConfig[] = [
      { key: 'edit', icon: 'edit-icon', label: 'Edit' },
      { key: 'share', icon: 'share-icon', label: 'Share' },
    ]

    const props: FabMenuProps = {
      icon: 'plus-icon',
      items,
      themeColor: 'primary',
      variant: 'solid',
      size: 'md',
    }

    expect(props).toBeDefined()
    expect(props.icon).toBe('plus-icon')
    expect(props.items).toHaveLength(2)
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

    colors.forEach(color => {
      const props: FabMenuProps = {
        icon: 'icon',
        items: [],
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

    variants.forEach(variant => {
      const props: FabMenuProps = {
        icon: 'icon',
        items: [],
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<FabMenuProps['size']> = ['sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: FabMenuProps = {
        icon: 'icon',
        items: [],
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts expanded icon', () => {
    const props: FabMenuProps = {
      icon: 'plus-icon',
      expandedIcon: 'close-icon',
      items: [],
    }

    expect(props.expandedIcon).toBe('close-icon')
  })

  it('accepts controlled expanded state', () => {
    const props: FabMenuProps = {
      icon: 'icon',
      items: [],
      isExpanded: true,
      onToggle: () => {},
    }

    expect(props.isExpanded).toBe(true)
    expect(props.onToggle).toBeDefined()
  })

  it('accepts showOverlay option', () => {
    const props: FabMenuProps = {
      icon: 'icon',
      items: [],
      showOverlay: false,
    }

    expect(props.showOverlay).toBe(false)
  })

  it('accepts menu items with all properties', () => {
    const item: FabMenuItemConfig = {
      key: 'create',
      icon: 'create-icon',
      label: 'Create New',
      onPress: () => {},
      isDisabled: false,
    }

    expect(item.key).toBe('create')
    expect(item.icon).toBe('create-icon')
    expect(item.label).toBe('Create New')
    expect(item.onPress).toBeDefined()
    expect(item.isDisabled).toBe(false)
  })

  it('accepts custom appearance', () => {
    const props: FabMenuProps = {
      icon: 'icon',
      items: [],
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
