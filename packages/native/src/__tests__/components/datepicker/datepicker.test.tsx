import { describe, it, expect } from 'vitest'
import type { DatePickerProps } from '../../../components/datepicker'

describe('DatePicker Types', () => {
  it('exports DatePickerProps type', () => {
    const props: DatePickerProps = {
      variant: 'flat',
      themeColor: 'primary',
      size: 'md',
      radius: 'md',
      placeholder: 'Select a date',
      labelPlacement: 'outside',
      fullWidth: true,
      isDisabled: false,
      isInvalid: false,
      isReadOnly: false,
      isClearable: true,
      disableAnimation: false,
    }

    expect(props).toBeDefined()
    expect(props.variant).toBe('flat')
    expect(props.themeColor).toBe('primary')
  })

  it('accepts all variants', () => {
    const variants: Array<DatePickerProps['variant']> = [
      'outlined',
      'flat',
      'light',
      'faded',
      'underlined',
    ]

    variants.forEach(variant => {
      const props: DatePickerProps = { variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all sizes', () => {
    const sizes: Array<DatePickerProps['size']> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const props: DatePickerProps = { size }
      expect(props.size).toBe(size)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<DatePickerProps['radius']> = [
      'none',
      'sm',
      'md',
      'lg',
      'full',
    ]

    radii.forEach(radius => {
      const props: DatePickerProps = { radius }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts label placements', () => {
    const placements: Array<DatePickerProps['labelPlacement']> = [
      'inside',
      'outside',
      'outside-left',
      'outside-top',
    ]

    placements.forEach(labelPlacement => {
      const props: DatePickerProps = { labelPlacement }
      expect(props.labelPlacement).toBe(labelPlacement)
    })
  })

  it('accepts Date value prop', () => {
    const date = new Date(2024, 5, 15)
    const props: DatePickerProps = {
      value: date,
      onChange: newDate => {
        expect(newDate).toBeDefined()
      },
    }

    expect(props.value).toBe(date)
  })

  it('accepts null value prop', () => {
    const props: DatePickerProps = {
      value: null,
    }

    expect(props.value).toBeNull()
  })

  it('accepts defaultValue prop', () => {
    const date = new Date(2024, 0, 1)
    const props: DatePickerProps = {
      defaultValue: date,
    }

    expect(props.defaultValue).toBe(date)
  })

  it('accepts locale prop', () => {
    const props: DatePickerProps = {
      locale: 'fr',
    }

    expect(props.locale).toBe('fr')
  })

  it('accepts minDate and maxDate props', () => {
    const min = new Date(2020, 0, 1)
    const max = new Date(2030, 11, 31)
    const props: DatePickerProps = {
      minDate: min,
      maxDate: max,
    }

    expect(props.minDate).toBe(min)
    expect(props.maxDate).toBe(max)
  })

  it('accepts firstDayOfWeek prop', () => {
    const props: DatePickerProps = {
      firstDayOfWeek: 1,
    }

    expect(props.firstDayOfWeek).toBe(1)
  })

  it('accepts customAppearance with style props', () => {
    const props: DatePickerProps = {
      customAppearance: {
        container: { backgroundColor: 'red' },
        text: { fontSize: 16 },
        trigger: { borderWidth: 2 },
        calendar: { padding: 10 },
      },
    }

    expect(props.customAppearance?.container).toEqual({
      backgroundColor: 'red',
    })
    expect(props.customAppearance?.text).toEqual({ fontSize: 16 })
    expect(props.customAppearance?.trigger).toEqual({ borderWidth: 2 })
    expect(props.customAppearance?.calendar).toEqual({ padding: 10 })
  })

  it('supports isClearable prop', () => {
    const props: DatePickerProps = {
      isClearable: true,
    }

    expect(props.isClearable).toBe(true)
  })

  it('supports callback props', () => {
    const onChange = () => {}
    const onOpen = () => {}
    const onClose = () => {}
    const onOpenChange = () => {}

    const props: DatePickerProps = {
      onChange,
      onOpen,
      onClose,
      onOpenChange,
    }

    expect(props.onChange).toBe(onChange)
    expect(props.onOpen).toBe(onOpen)
    expect(props.onClose).toBe(onClose)
    expect(props.onOpenChange).toBe(onOpenChange)
  })
})
