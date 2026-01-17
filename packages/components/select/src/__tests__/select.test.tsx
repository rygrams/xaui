import { describe, it, expect } from 'vitest'
import type { SelectItemProps, SelectProps } from '../select-types'

describe('Select Types', () => {
  it('accepts Select props', () => {
    const props: SelectProps = {
      children: 'Test',
      selectionMode: 'multiple',
      selectedKeys: ['a'],
      disabledKeys: ['b'],
      defaultSelectedKeys: ['c'],
      variant: 'outlined',
      themeColor: 'primary',
      size: 'sm',
      radius: 'lg',
      placeholder: 'Pick',
      labelPlacement: 'inside',
      label: 'Label',
      hint: 'Hint',
      errorMessage: 'Error',
      startContent: 'Start',
      endContent: 'End',
      selectorIcon: 'Icon',
      maxListboxHeight: 240,
      fullWidth: false,
      isOpened: false,
      isDisabled: false,
      isInvalid: false,
      onClose: () => {},
      onOpenChange: () => {},
      onSelectionChange: () => {},
      onClear: () => {},
    }

    expect(props.children).toBe('Test')
    expect(props.selectionMode).toBe('multiple')
    expect(props.variant).toBe('outlined')
  })

  it('accepts all variants', () => {
    const variants: Array<SelectProps['variant']> = [
      'flat',
      'outlined',
      'faded',
      'underlined',
      'light',
    ]

    variants.forEach((variant) => {
      const props: SelectProps = {
        children: 'Test',
        variant,
      }

      expect(props.variant).toBe(variant)
    })
  })
})

describe('SelectItem Types', () => {
  it('accepts SelectItem props', () => {
    const props: SelectItemProps = {
      title: 'Item',
      description: 'Description',
      startContent: 'Start',
      endContent: 'End',
      selectedIcon: 'Selected',
      isDisabled: false,
      isSelected: true,
      isReadOnly: false,
      onSelected: () => {},
    }

    expect(props.title).toBe('Item')
    expect(props.isSelected).toBe(true)
  })
})
