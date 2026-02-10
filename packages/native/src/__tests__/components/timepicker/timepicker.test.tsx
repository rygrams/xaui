import { describe, it, expect } from 'vitest'
import type {
  TimePickerProps,
  TimePickerDialogProps,
} from '../../../components/timepicker'

describe('TimePicker Types', () => {
  it('exports TimePickerProps type', () => {
    const props: TimePickerProps = {
      value: { hours: 12, minutes: 30 },
      onChange: () => {},
      is24Hour: true,
      themeColor: 'primary',
    }

    expect(props).toBeDefined()
    expect(props.value?.hours).toBe(12)
    expect(props.value?.minutes).toBe(30)
  })

  it('exports TimePickerDialogProps type', () => {
    const props: TimePickerDialogProps = {
      isOpen: true,
      onClose: () => {},
      value: { hours: 14, minutes: 45 },
      is24Hour: false,
    }

    expect(props).toBeDefined()
    expect(props.isOpen).toBe(true)
    expect(props.value?.hours).toBe(14)
  })

  it('accepts 24-hour format', () => {
    const props: TimePickerProps = {
      value: { hours: 23, minutes: 59 },
      is24Hour: true,
    }

    expect(props.is24Hour).toBe(true)
  })

  it('accepts 12-hour format', () => {
    const props: TimePickerProps = {
      value: { hours: 12, minutes: 0 },
      is24Hour: false,
    }

    expect(props.is24Hour).toBe(false)
  })
})
