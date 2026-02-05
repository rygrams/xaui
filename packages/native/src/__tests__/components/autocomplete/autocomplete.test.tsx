import { describe, it, expect } from 'vitest'
import type {
  AutocompleteItemProps,
  AutocompleteProps,
} from '../../../components/autocomplete'

describe('Autocomplete Types', () => {
  it('exports AutocompleteProps type', () => {
    const props: AutocompleteProps = {
      children: null,
      variant: 'flat',
      themeColor: 'primary',
      size: 'md',
      radius: 'md',
      placeholder: 'Search...',
      labelPlacement: 'outside',
      fullWidth: true,
      isDisabled: false,
      isInvalid: false,
      _isRequired: false,
      isReadOnly: false,
      isClearable: true,
      allowsCustomValue: false,
      forceSelection: true,
      allowsEmptyCollection: true,
      disableLocalFilter: false,
      disableAnimation: false,
      menuTrigger: 'focus',
    }

    expect(props).toBeDefined()
    expect(props.variant).toBe('flat')
    expect(props.themeColor).toBe('primary')
    expect(props.disableLocalFilter).toBe(false)
  })

  it('accepts all variants', () => {
    const variants: Array<AutocompleteProps['variant']> = [
      'outlined',
      'flat',
      'light',
      'faded',
      'underlined',
    ]

    variants.forEach(variant => {
      const props: AutocompleteProps = {
        children: null,
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<AutocompleteProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: AutocompleteProps = {
        children: null,
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<AutocompleteProps['radius']> = [
      'none',
      'sm',
      'md',
      'lg',
      'full',
    ]

    radii.forEach(radius => {
      const props: AutocompleteProps = {
        children: null,
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts label placements', () => {
    const placements: Array<AutocompleteProps['labelPlacement']> = [
      'inside',
      'outside',
      'outside-left',
      'outside-top',
    ]

    placements.forEach(labelPlacement => {
      const props: AutocompleteProps = {
        children: null,
        labelPlacement,
      }
      expect(props.labelPlacement).toBe(labelPlacement)
    })
  })

  it('accepts menu trigger options', () => {
    const triggers: Array<AutocompleteProps['menuTrigger']> = [
      'focus',
      'input',
      'manual',
    ]

    triggers.forEach(menuTrigger => {
      const props: AutocompleteProps = {
        children: null,
        menuTrigger,
      }
      expect(props.menuTrigger).toBe(menuTrigger)
    })
  })

  it('accepts controlled inputValue prop', () => {
    const props: AutocompleteProps = {
      children: null,
      inputValue: 'test',
      onInputChange: value => {
        expect(value).toBeDefined()
      },
    }

    expect(props.inputValue).toBe('test')
  })

  it('accepts AutocompleteItemProps type', () => {
    const item: AutocompleteItemProps = {
      label: 'Item',
      value: 'item',
      description: 'Description',
      isDisabled: false,
      isSelected: true,
      isReadOnly: false,
    }

    expect(item).toBeDefined()
    expect(item.label).toBe('Item')
    expect(item.value).toBe('item')
  })

  it('supports isClearable prop', () => {
    const props: AutocompleteProps = {
      children: null,
      isClearable: true,
      onClear: () => {
        expect(true).toBe(true)
      },
    }

    expect(props.isClearable).toBe(true)
  })

  it('supports allowsCustomValue prop', () => {
    const props: AutocompleteProps = {
      children: null,
      allowsCustomValue: true,
    }

    expect(props.allowsCustomValue).toBe(true)
  })

  it('supports disableLocalFilter prop', () => {
    const props: AutocompleteProps = {
      children: null,
      disableLocalFilter: true,
    }

    expect(props.disableLocalFilter).toBe(true)
  })

  it('supports disableAnimation prop', () => {
    const props: AutocompleteProps = {
      children: null,
      disableAnimation: true,
    }

    expect(props.disableAnimation).toBe(true)
  })
})
