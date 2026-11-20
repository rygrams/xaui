import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { monthNames } from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { duration } from '../../motion/motion-tokens'
import { CalendarPick } from './calendar-pick'
import { useCalendar } from './calendar.context'
import type { CalendarMonthPickerProps } from './calendar.type'

/**
 * The twelve months of the year on screen, three to a row, rendered **instead of** the
 * weekdays and the grid while `view` is `'month'`. Pressing one lays the calendar on it
 * and goes back to the days.
 */
export const CalendarMonthPicker = forwardRef<View, CalendarMonthPickerProps>(
  function CalendarMonthPicker({ format = 'short', style, ...props }, ref) {
    const { pickerStyle, month, locale, canGoToMonth, goToMonthInYear, setView } =
      useCalendar()
    const [styleProps, rest] = useStyleProps(props)

    const names = useMemo(
      () => monthNames(locale, format).map(name => name.replace(/\.$/, '')),
      [locale, format]
    )
    const shown = month.getMonth()

    return (
      <Animated.View
        ref={ref}
        entering={FadeIn.duration(duration.base)}
        {...rest}
        style={[pickerStyle, styleProps, style]}
      >
        {names.map((name, index) => (
          <CalendarPick
            key={name}
            label={name}
            isSelected={index === shown}
            isDisabled={!canGoToMonth(index - shown)}
            onPress={() => {
              goToMonthInYear(index)
              setView('grid')
            }}
          />
        ))}
      </Animated.View>
    )
  }
)

CalendarMonthPicker.displayName = 'XAUI.Tram.Calendar.MonthPicker'
