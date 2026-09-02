import { describe, it, expect } from 'vitest'
import type {
  ColorPickerProps,
  ColorPickerEvents,
  ColorGroup,
} from '../../../components/color-picker'
import { defaultColorGroups } from '../../../components/color-picker'

describe('ColorPicker Types', () => {
  it('creates props with no required fields', () => {
    const props: ColorPickerProps = {
      onColorChange: () => {},
    }

    expect(props).toBeDefined()
  })

  it('accepts all optional props', () => {
    const props: ColorPickerProps = {
      value: '#6366f1',
      placeholder: 'Pick a color...',
      label: 'Brand color',
      labelPlacement: 'outside',
      description: 'Helper text',
      errorMessage: 'Error',
      sheetTitle: 'Choose color',
      themeColor: 'primary',
      variant: 'flat',
      size: 'md',
      radius: 'md',
      isOpened: false,
      isDisabled: false,
      isInvalid: false,
      fullWidth: true,
      swatchSize: 28,
      onColorChange: () => {},
    }

    expect(props.value).toBe('#6366f1')
    expect(props.swatchSize).toBe(28)
    expect(props.sheetTitle).toBe('Choose color')
  })

  it('accepts custom color groups', () => {
    const customGroups: ColorGroup[] = [
      {
        name: 'Brand',
        colors: ['#6366f1', '#8b5cf6', '#ec4899'],
      },
    ]

    const props: ColorPickerProps = {
      colorGroups: customGroups,
      onColorChange: () => {},
    }

    expect(props.colorGroups).toHaveLength(1)
    expect(props.colorGroups?.[0].name).toBe('Brand')
    expect(props.colorGroups?.[0].colors).toHaveLength(3)
  })

  it('exports default color groups', () => {
    expect(defaultColorGroups).toBeDefined()
    expect(defaultColorGroups.length).toBeGreaterThan(0)

    defaultColorGroups.forEach(group => {
      expect(group.name).toBeTruthy()
      expect(group.colors.length).toBeGreaterThan(0)
    })
  })

  it('accepts all theme colors', () => {
    const colors: Array<ColorPickerProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: ColorPickerProps = { themeColor, onColorChange: () => {} }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts state props', () => {
    const props: ColorPickerProps = {
      isDisabled: true,
      isInvalid: true,
      isOpened: true,
      onColorChange: () => {},
    }

    expect(props.isDisabled).toBe(true)
    expect(props.isInvalid).toBe(true)
    expect(props.isOpened).toBe(true)
  })

  it('exports events type', () => {
    const events: ColorPickerEvents = {
      onColorChange: () => {},
      onOpenChange: () => {},
      onClose: () => {},
    }

    expect(events.onColorChange).toBeDefined()
    expect(events.onOpenChange).toBeDefined()
    expect(events.onClose).toBeDefined()
  })
})
