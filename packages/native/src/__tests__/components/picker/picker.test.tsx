import { describe, it, expect } from 'vitest'
import type { PickerProps, PickerEvents, PickerOption } from '../../../components/picker'

describe('Picker Types', () => {
  it('creates props with required fields', () => {
    const options: PickerOption[] = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]

    const props: PickerProps = {
      options,
      onValueChange: () => {},
    }

    expect(props.options).toHaveLength(2)
  })

  it('accepts all optional props', () => {
    const props: PickerProps = {
      options: [{ label: 'A', value: 'a' }],
      value: 'a',
      placeholder: 'Select...',
      label: 'Label',
      labelPlacement: 'outside',
      description: 'Helper',
      errorMessage: 'Error',
      sheetTitle: 'Pick one',
      themeColor: 'primary',
      variant: 'flat',
      size: 'md',
      radius: 'md',
      isOpened: false,
      isDisabled: false,
      isInvalid: false,
      fullWidth: true,
      onValueChange: () => {},
    }

    expect(props.value).toBe('a')
    expect(props.placeholder).toBe('Select...')
    expect(props.sheetTitle).toBe('Pick one')
  })

  it('accepts disabled options', () => {
    const options: PickerOption[] = [
      { label: 'Enabled', value: '1' },
      { label: 'Disabled', value: '2', disabled: true },
    ]

    const props: PickerProps = {
      options,
      onValueChange: () => {},
    }

    expect(props.options[1].disabled).toBe(true)
  })

  it('accepts all theme colors', () => {
    const colors: Array<PickerProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: PickerProps = {
        options: [],
        themeColor,
        onValueChange: () => {},
      }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts state props', () => {
    const props: PickerProps = {
      options: [],
      isDisabled: true,
      isInvalid: true,
      isOpened: true,
      onValueChange: () => {},
    }

    expect(props.isDisabled).toBe(true)
    expect(props.isInvalid).toBe(true)
    expect(props.isOpened).toBe(true)
  })

  it('exports events type', () => {
    const events: PickerEvents = {
      onValueChange: () => {},
      onOpenChange: () => {},
      onClose: () => {},
    }

    expect(events.onValueChange).toBeDefined()
    expect(events.onOpenChange).toBeDefined()
    expect(events.onClose).toBeDefined()
  })
})
