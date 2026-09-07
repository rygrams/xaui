import { forwardRef } from 'react'
import type { View } from 'react-native'
import { useXAUITheme } from '../../theme/theme-hooks'
import { Tabs } from '../tabs'
import { useDateTimePicker } from './date-time-picker.context'
import type {
  DateTimePickerStep,
  DateTimePickerViewProps,
} from './date-time-picker.type'

const STEPS: DateTimePickerStep[] = ['date', 'time']

/**
 * The two steps, as a `Tabs`.
 *
 * **A tab bar and not a stepper**, because either half can be changed at any time: a reader
 * who set the day, then the time, then wants the day again should press "date" rather than
 * start over. Choosing a day still moves to the clock on its own, so the common path is one
 * gesture and the tabs are the way back.
 *
 * Each tab reads the half it stands for once there is one — the date under "date", the time
 * under "time" — so the sheet says what has been decided without a header of its own.
 *
 * The labels are the caller's: the words are a language's, and this library does not pick one.
 *
 * **The pair sits in the middle, and holds the month off.** A `Tabs.List` hugs its content
 * from the leading edge, which is right for a page — a tab bar starts where the text under it
 * starts. In a sheet there is no text to line up with and the month below is centred by its
 * own grid, so a left-hung pill reads as a pill that slipped. The margin is the same reason
 * the other way round: the sheet's gap spaces things that are the same width, and two
 * hundred-point tabs above a three-hundred-point month need the seam said louder than that.
 */
export const DateTimePickerSteps = forwardRef<
  View,
  DateTimePickerViewProps & {
    labels?: Record<DateTimePickerStep, string>
  }
>(function DateTimePickerSteps({ labels, style, ...props }, ref) {
  const { step, setStep, dateText, timeText, isDisabled } = useDateTimePicker()
  const theme = useXAUITheme()

  const shown: Record<DateTimePickerStep, string | undefined> = {
    date: dateText,
    time: timeText,
  }

  return (
    <Tabs
      ref={ref}
      value={step}
      onValueChange={next => setStep(next as DateTimePickerStep)}
      isDisabled={isDisabled}
      {...props}
      style={[{ marginBottom: theme.spacing(2) }, style]}
    >
      <Tabs.List style={{ alignSelf: 'center' }}>
        <Tabs.Indicator />
        {STEPS.map(name => (
          <Tabs.Trigger key={name} value={name}>
            {shown[name] ?? labels?.[name] ?? name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  )
})

DateTimePickerSteps.displayName = 'XAUI.DateTimePicker.Steps'
