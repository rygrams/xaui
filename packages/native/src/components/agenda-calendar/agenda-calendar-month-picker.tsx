import { forwardRef, useMemo } from 'react'
import { ScrollView, Text } from 'react-native'
import type {
  ScrollView as ScrollViewType,
  TextStyle,
  ViewStyle,
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { monthNames } from '../../utils/dates'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarMonthPickerProps } from './agenda-calendar.type'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

/** The fourth of seven — whichever month owns the middle day owns the week. */
const MIDDLE = 3

/** One fade on the way in, so the row of months and the row of days trade without a jump. */
const OPEN_MS = 160

/**
 * The twelve months of the year on screen, in a row where the days were.
 *
 * The caller renders it **instead of** the weekdays and the week while `view` is `'month'`
 * — the strip's own idiom, a sideways scroll rather than the `Calendar`'s grid. The year
 * picker steps here; pressing a month lays the strip on the week that holds it and steps
 * back to `'week'`.
 *
 * The month the week sits in wears the chosen day's disc colour. A month whose every day is
 * out of bounds is dead rather than merely inert.
 */
export const AgendaCalendarMonthPicker = forwardRef<
  ScrollViewType,
  AgendaCalendarMonthPickerProps
>(function AgendaCalendarMonthPicker(
  { format = 'short', style, contentContainerStyle, ...props },
  ref
) {
  const {
    pickerStyle,
    pickerItemStyle,
    pickerItemSelectedStyle,
    pickerItemLabelStyle,
    pickerItemLabelSelectedStyle,
    days,
    locale,
    canGoByMonths,
    goToMonthInYear,
  } = useAgendaCalendar()
  const [styleProps, rest] = useStyleProps(props)
  const theme = useXAUITheme()

  const names = useMemo(() => monthNames(locale, format), [locale, format])
  const shownMonth = days[MIDDLE].getMonth()

  return (
    <AnimatedScrollView
      ref={ref}
      {...rest}
      horizontal
      style={[pickerStyle, styleProps, style]}
      contentContainerStyle={[
        { alignItems: 'center', gap: theme.spacing(2) },
        contentContainerStyle,
      ]}
      showsHorizontalScrollIndicator={false}
      entering={FadeIn.duration(OPEN_MS)}
    >
      {names.map((name, index) => {
        // Measured from the month on screen, so `canGoByMonths` answers here what it
        // answers for the chevrons.
        const disabled = !canGoByMonths(index - shownMonth)
        const isSelected = index === shownMonth

        return (
          <PressableFeedback
            key={name}
            isDisabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={name}
            accessibilityState={{ selected: isSelected, disabled }}
            style={[
              pickerItemStyle,
              isSelected && (pickerItemSelectedStyle as ViewStyle),
            ]}
            onPress={() => goToMonthInYear(index)}
          >
            <Text
              numberOfLines={1}
              style={[
                pickerItemLabelStyle,
                isSelected && (pickerItemLabelSelectedStyle as TextStyle),
              ]}
            >
              {name}
            </Text>
          </PressableFeedback>
        )
      })}
    </AnimatedScrollView>
  )
})

AgendaCalendarMonthPicker.displayName = 'XAUI.AgendaCalendar.MonthPicker'
