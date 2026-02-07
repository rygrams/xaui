import { describe, it, expect } from 'vitest'
import type { FabProps, FabVariant, FabSize } from '../../../components/fab'

describe('Fab Types', () => {
  it('exports FabProps type with required icon', () => {
    const props: FabProps = {
      icon: 'icon-element',
      themeColor: 'primary',
      variant: 'solid',
      size: 'md',
    }

    expect(props).toBeDefined()
    expect(props.icon).toBe('icon-element')
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('solid')
    expect(props.size).toBe('md')
  })

  it('accepts all theme colors', () => {
    const colors: Array<FabProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(color => {
      const props: FabProps = {
        icon: 'icon',
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: FabVariant[] = ['solid', 'flat', 'outlined']

    variants.forEach(variant => {
      const props: FabProps = {
        icon: 'icon',
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: FabSize[] = ['sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: FabProps = {
        icon: 'icon',
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts radius prop', () => {
    const props: FabProps = {
      icon: 'icon',
      radius: 'lg',
    }

    expect(props.radius).toBe('lg')
  })

  it('accepts label for extended FAB', () => {
    const props: FabProps = {
      icon: 'icon',
      label: 'Create',
    }

    expect(props.label).toBe('Create')
  })

  it('accepts boolean props', () => {
    const props: FabProps = {
      icon: 'icon',
      isDisabled: true,
      isLoading: true,
    }

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

    const props: FabProps = {
      icon: 'icon',
      ...handlers,
    }

    expect(props.onPress).toBeDefined()
    expect(props.onLongPress).toBeDefined()
    expect(props.onPressIn).toBeDefined()
    expect(props.onPressOut).toBeDefined()
  })

  it('accepts custom appearance', () => {
    const props: FabProps = {
      icon: 'icon',
      customAppearance: {
        container: { margin: 10 },
        fab: { borderWidth: 2 },
      },
    }

    expect(props.customAppearance?.container).toEqual({ margin: 10 })
    expect(props.customAppearance?.fab).toEqual({ borderWidth: 2 })
  })
})
