import { describe, it, expect } from 'vitest'
import type { DatePickerDialogProps } from '../../../components/dialogs/datepicker-dialog/datepicker-dialog.type'

const onClearValue = () => {}

describe('DatePickerDialog Types', () => {
  it('exports DatePickerDialogProps type', () => {
    const props: DatePickerDialogProps = {
      visible: true,
      selectedDate: new Date(2024, 5, 15),
      locale: 'en',
      firstDayOfWeek: 0,
      onDateSelect: () => {},
      onClearValue,
      onClose: () => {},
    }

    expect(props).toBeDefined()
    expect(props.visible).toBe(true)
    expect(props.locale).toBe('en')
  })

  it('accepts null selectedDate', () => {
    const props: DatePickerDialogProps = {
      visible: true,
      selectedDate: null,
      locale: 'en',
      firstDayOfWeek: 0,
      onDateSelect: () => {},
      onClearValue,
      onClose: () => {},
    }

    expect(props.selectedDate).toBeNull()
  })

  it('accepts optional themeColor prop', () => {
    const props: DatePickerDialogProps = {
      visible: true,
      selectedDate: null,
      locale: 'en',
      firstDayOfWeek: 0,
      themeColor: 'primary',
      onDateSelect: () => {},
      onClearValue,
      onClose: () => {},
    }

    expect(props.themeColor).toBe('primary')
  })

  it('accepts minDate and maxDate props', () => {
    const min = new Date(2020, 0, 1)
    const max = new Date(2030, 11, 31)
    const props: DatePickerDialogProps = {
      visible: true,
      selectedDate: null,
      locale: 'en',
      firstDayOfWeek: 0,
      minDate: min,
      maxDate: max,
      onDateSelect: () => {},
      onClearValue,
      onClose: () => {},
    }

    expect(props.minDate).toBe(min)
    expect(props.maxDate).toBe(max)
  })

  it('accepts style prop', () => {
    const props: DatePickerDialogProps = {
      visible: true,
      selectedDate: null,
      locale: 'en',
      firstDayOfWeek: 0,
      style: { backgroundColor: 'white' },
      onDateSelect: () => {},
      onClearValue,
      onClose: () => {},
    }

    expect(props.style).toEqual({ backgroundColor: 'white' })
  })

  it('accepts callback props', () => {
    const onDateSelect = () => {}
    const onClose = () => {}

    const props: DatePickerDialogProps = {
      visible: true,
      selectedDate: null,
      locale: 'en',
      firstDayOfWeek: 0,
      onDateSelect,
      onClearValue,
      onClose,
    }

    expect(props.onDateSelect).toBe(onDateSelect)
    expect(props.onClose).toBe(onClose)
  })

  it('accepts visible false', () => {
    const props: DatePickerDialogProps = {
      visible: false,
      selectedDate: null,
      locale: 'en',
      firstDayOfWeek: 0,
      onDateSelect: () => {},
      onClearValue,
      onClose: () => {},
    }

    expect(props.visible).toBe(false)
  })

  it('accepts firstDayOfWeek as Monday', () => {
    const props: DatePickerDialogProps = {
      visible: true,
      selectedDate: null,
      locale: 'fr',
      firstDayOfWeek: 1,
      onDateSelect: () => {},
      onClearValue,
      onClose: () => {},
    }

    expect(props.firstDayOfWeek).toBe(1)
  })

  it('accepts custom labels', () => {
    const props: DatePickerDialogProps = {
      visible: true,
      selectedDate: null,
      locale: 'fr',
      firstDayOfWeek: 1,
      todayLabel: "Aujourd'hui",
      confirmLabel: 'Confirmer',
      onDateSelect: () => {},
      onClearValue,
      onClose: () => {},
    }

    expect(props.todayLabel).toBe("Aujourd'hui")
    expect(props.confirmLabel).toBe('Confirmer')
  })
})
