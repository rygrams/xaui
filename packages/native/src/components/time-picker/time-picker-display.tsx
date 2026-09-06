import { forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTimePicker } from './time-picker.context'
import type { DayPeriod } from '../../utils/time-mask'
import type { TimePickerViewProps } from './time-picker.type'

const PERIODS: DayPeriod[] = ['am', 'pm']
const LABELS: Record<DayPeriod, string> = { am: 'AM', pm: 'PM' }

/**
 * The two big numbers above the dial, and the period beside them.
 *
 * **Pressing a number switches the ring.** That is the whole navigation of a clock face:
 * hours, then minutes, and back to the hours if the reader changes their mind. Which of the
 * two is lit says which ring is on screen — without it a reader who reopened the sheet on the
 * minutes would think the hours had been forgotten.
 *
 * The period is two halves of one control rather than a toggle, unlike `TimeField.Period`:
 * there is room here, and a reader choosing a time from nothing should see both options
 * rather than press one to find the other.
 */
export const TimePickerDisplay = forwardRef<View, TimePickerViewProps>(
  function TimePickerDisplay({ children, style, ...props }, ref) {
    const {
      displayStyle,
      unitStyle,
      unitSelectedStyle,
      colonStyle,
      periodsStyle,
      periodStyle,
      periodSelectedStyle,
      markLabelStyle,
      markLabelSelectedStyle,
      hours,
      minutes,
      period,
      hourCycle,
      unit,
      setUnit,
      onPeriodChange,
      isDisabled,
    } = useTimePicker()
    const [styleProps, rest] = useStyleProps(props)

    const pad = (value: number) => String(value).padStart(2, '0')

    return (
      <View ref={ref} {...rest} style={[displayStyle, styleProps, style]}>
        {children ?? (
          <>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{
                selected: unit === 'hour',
                disabled: isDisabled,
              }}
              disabled={isDisabled}
              onPress={() => setUnit('hour')}
            >
              <Text style={unit === 'hour' ? unitSelectedStyle : unitStyle}>
                {pad(hours)}
              </Text>
            </Pressable>

            <Text style={colonStyle}>:</Text>

            <Pressable
              accessibilityRole="button"
              accessibilityState={{
                selected: unit === 'minute',
                disabled: isDisabled,
              }}
              disabled={isDisabled}
              onPress={() => setUnit('minute')}
            >
              <Text style={unit === 'minute' ? unitSelectedStyle : unitStyle}>
                {pad(minutes)}
              </Text>
            </Pressable>

            {hourCycle === 12 ? (
              <View style={periodsStyle}>
                {PERIODS.map(half => (
                  <Pressable
                    key={half}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: half === period,
                      disabled: isDisabled,
                    }}
                    accessibilityValue={{ text: LABELS[half] }}
                    disabled={isDisabled}
                    style={half === period ? periodSelectedStyle : periodStyle}
                    onPress={() => onPeriodChange(half)}
                  >
                    <Text
                      style={
                        half === period ? markLabelSelectedStyle : markLabelStyle
                      }
                    >
                      {LABELS[half]}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </>
        )}
      </View>
    )
  }
)

TimePickerDisplay.displayName = 'XAUI.TimePicker.Display'
