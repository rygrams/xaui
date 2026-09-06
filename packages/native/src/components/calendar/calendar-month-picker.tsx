import { forwardRef, useMemo } from 'react'
import { Text, View } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { monthNames } from '../../utils/dates'
import { useCalendar } from './calendar.context'
import type { CalendarMonthPickerProps } from './calendar.type'

const AnimatedView = Animated.createAnimatedComponent(View)

/** One drop on the way in, the year picker's own — the two swap without a seam. */
const OPEN_MS = 200

/**
 * The twelve months of the year on screen, laid in a grid.
 *
 * The mirror of `Calendar.YearPicker`: the caller renders it **instead of** the weekdays
 * and the grid while `view` is `'month'`, which is where the year picker steps once a year
 * is pressed. Pressing a month here lays the calendar on it and steps `view` back to
 * `'grid'` — the last leg of legacy's year → month → day walk.
 *
 * The month on screen wears the chosen day's disc. A month whose every day is out of bounds
 * is dead rather than merely inert, the same as a refused year.
 */
export const CalendarMonthPicker = forwardRef<View, CalendarMonthPickerProps>(
  function CalendarMonthPicker({ format = 'long', style, ...props }, ref) {
    const {
      monthPickerStyle,
      monthStyle,
      monthSelectedStyle,
      monthLabelStyle,
      monthLabelSelectedStyle,
      month,
      locale,
      canGoToMonth,
      goToMonthInYear,
      setView,
    } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)

    const names = useMemo(() => monthNames(locale, format), [locale, format])
    const shownMonth = month.getMonth()

    return (
      <AnimatedView
        ref={ref}
        {...rest}
        style={[monthPickerStyle, styleProps, style]}
        entering={FadeInDown.duration(OPEN_MS)}
      >
        {names.map((name, index) => {
          // The step is measured from the month on screen, so `canGoToMonth` answers the
          // same question here as it does for the chevrons.
          const disabled = !canGoToMonth(index - shownMonth)
          const isSelected = index === shownMonth

          return (
            <PressableFeedback
              key={name}
              isDisabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={name}
              accessibilityState={{ selected: isSelected, disabled }}
              style={[monthStyle, isSelected && (monthSelectedStyle as ViewStyle)]}
              onPress={() => {
                goToMonthInYear(index)
                setView('grid')
              }}
            >
              <Text
                numberOfLines={1}
                style={[
                  monthLabelStyle,
                  isSelected && (monthLabelSelectedStyle as TextStyle),
                ]}
              >
                {name}
              </Text>
            </PressableFeedback>
          )
        })}
      </AnimatedView>
    )
  }
)

CalendarMonthPicker.displayName = 'XAUI.Calendar.MonthPicker'
