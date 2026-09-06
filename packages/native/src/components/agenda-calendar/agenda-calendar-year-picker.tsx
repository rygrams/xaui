import { forwardRef, useMemo, useRef, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import type {
  LayoutChangeEvent,
  ScrollView as ScrollViewType,
  TextStyle,
  ViewStyle,
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarYearPickerProps } from './agenda-calendar.type'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

/** The fourth of seven — whichever year owns the middle day owns the week. */
const MIDDLE = 3

/** One fade on the way in, so the row of years and the row of days trade without a jump. */
const OPEN_MS = 160

/**
 * The years the strip can be aimed at, in a row where the days were.
 *
 * The caller renders it **instead of** the weekdays and the week while `view` is `'year'`.
 * It is a sideways scroll, not a grid — the strip's idiom — and it opens centred on the
 * year the week is in. Pressing a year steps on to that year's months, legacy's walk.
 *
 * A year whose every day is out of bounds is dead rather than merely disappointing.
 */
export const AgendaCalendarYearPicker = forwardRef<
  ScrollViewType,
  AgendaCalendarYearPickerProps
>(function AgendaCalendarYearPicker(
  { firstYear, lastYear, style, onLayout, contentContainerStyle, ...props },
  ref
) {
  const {
    pickerStyle,
    pickerItemStyle,
    pickerItemSelectedStyle,
    pickerItemLabelStyle,
    pickerItemLabelSelectedStyle,
    days,
    yearRange,
    canGoByYears,
    goToYear,
  } = useAgendaCalendar()
  const [styleProps, rest] = useStyleProps(props)
  const theme = useXAUITheme()

  const first = firstYear ?? yearRange.first
  const last = lastYear ?? yearRange.last
  const shownYear = days[MIDDLE].getFullYear()

  const years = useMemo(
    () => Array.from({ length: last - first + 1 }, (_, index) => first + index),
    [first, last]
  )

  const scroller = useRef<ScrollViewType | null>(null)
  const refs = useMergedRef(scroller, ref)

  // The selected pill's offset in the row, captured on its layout, and the row's own
  // width once it lays out — enough to bring the current year to the middle, once.
  const selectedX = useRef(0)
  const [isPlaced, setIsPlaced] = useState(false)

  const centre = (viewportWidth: number) => {
    if (isPlaced || viewportWidth === 0) return
    scroller.current?.scrollTo({
      x: Math.max(0, selectedX.current - viewportWidth / 2),
      animated: false,
    })
    setIsPlaced(true)
  }

  const place = (event: LayoutChangeEvent) => {
    onLayout?.(event)
    centre(event.nativeEvent.layout.width)
  }

  return (
    <AnimatedScrollView
      ref={refs}
      {...rest}
      horizontal
      style={[pickerStyle, styleProps, style]}
      contentContainerStyle={[
        { alignItems: 'center', gap: theme.spacing(2) },
        contentContainerStyle,
      ]}
      showsHorizontalScrollIndicator={false}
      onLayout={place}
      entering={FadeIn.duration(OPEN_MS)}
    >
      {years.map(year => {
        const disabled = !canGoByYears(year - shownYear)
        const isSelected = year === shownYear

        return (
          <PressableFeedback
            key={year}
            isDisabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`${year}`}
            accessibilityState={{ selected: isSelected, disabled }}
            style={[
              pickerItemStyle,
              isSelected && (pickerItemSelectedStyle as ViewStyle),
            ]}
            onLayout={
              isSelected
                ? event => {
                    selectedX.current = event.nativeEvent.layout.x
                  }
                : undefined
            }
            onPress={() => goToYear(year)}
          >
            <Text
              style={[
                pickerItemLabelStyle,
                isSelected && (pickerItemLabelSelectedStyle as TextStyle),
              ]}
            >
              {year}
            </Text>
          </PressableFeedback>
        )
      })}
    </AnimatedScrollView>
  )
})

AgendaCalendarYearPicker.displayName = 'XAUI.AgendaCalendar.YearPicker'
