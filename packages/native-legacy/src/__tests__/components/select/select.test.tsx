import { describe, it, expect } from 'vitest'
import type { SelectItemProps, SelectProps } from '../../../components/select'

describe('Select Types', () => {
  it('exports SelectProps type', () => {
    const props: SelectProps = {
      children: null,
      selectionMode: 'single',
      variant: 'flat',
      themeColor: 'primary',
      size: 'md',
      radius: 'md',
      placeholder: 'Select',
      labelPlacement: 'outside',
      fullWidth: true,
      isDisabled: false,
      isInvalid: false,
    }

    expect(props).toBeDefined()
    expect(props.selectionMode).toBe('single')
    expect(props.variant).toBe('flat')
  })

  it('accepts all variants', () => {
    const variants: Array<SelectProps['variant']> = [
      'outlined',
      'flat',
      'light',
      'faded',
      'underlined',
    ]

    variants.forEach(variant => {
      const props: SelectProps = {
        children: null,
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<SelectProps['size']> = ['sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: SelectProps = {
        children: null,
        size,
      }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<SelectProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach(radius => {
      const props: SelectProps = {
        children: null,
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts label placements', () => {
    const placements: Array<SelectProps['labelPlacement']> = [
      'inside',
      'outside',
      'outside-left',
      'outside-top',
    ]

    placements.forEach(labelPlacement => {
      const props: SelectProps = {
        children: null,
        labelPlacement,
      }
      expect(props.labelPlacement).toBe(labelPlacement)
    })
  })

  it('accepts selection modes', () => {
    const modes: Array<SelectProps['selectionMode']> = ['single', 'multiple']

    modes.forEach(selectionMode => {
      const props: SelectProps = {
        children: null,
        selectionMode,
      }
      expect(props.selectionMode).toBe(selectionMode)
    })
  })

  it('accepts SelectItemProps type', () => {
    const item: SelectItemProps = {
      label: 'Item',
      value: 'item',
      description: 'Description',
      isDisabled: false,
      isSelected: true,
      isReadOnly: false,
    }

    expect(item).toBeDefined()
    expect(item.label).toBe('Item')
  })
})
