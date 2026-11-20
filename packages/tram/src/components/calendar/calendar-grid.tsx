import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { monthGrid } from '@xaui/native/system'
import { useStyleProps } from '@xaui/native/system'
import { panel } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { CalendarDay } from './calendar-day'
import { useCalendar } from './calendar.context'
import type { CalendarGridProps } from './calendar.type'
import { pageDirection } from './calendar.utils'

/**
 * The six weeks of the month on screen — always six, so nothing under it moves between
 * months. A function child renders each day; with none, `Calendar.Day` does.
 *
 * **It pages up and down.** The next month rises from below and the one before drops in
 * from above, 32 points on `ease.metro` while it fades in; with motion reduced it only
 * fades. Interruptible: a second press retargets the same two values.
 */
export const CalendarGrid = forwardRef<View, CalendarGridProps>(
  function CalendarGrid({ children, style, ...props }, ref) {
    const { gridStyle, month, firstDayOfWeek } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)
    const ease = useTramEase()
    const isReduced = useReducedMotion()

    const days = useMemo(
      () => monthGrid(month, firstDayOfWeek),
      [month, firstDayOfWeek]
    )

    const rise = useSharedValue(0)
    const shown = useSharedValue(1)
    const previous = useRef<Date | undefined>(undefined)

    useEffect(() => {
      const direction = pageDirection(previous.current, month)
      previous.current = month
      if (direction === 0) return

      rise.value = isReduced ? 0 : direction * panel.slide
      shown.value = 0
      rise.value = ease(0)
      shown.value = ease(1)
    }, [month, isReduced, ease, rise, shown])

    const paged = useAnimatedStyle(() => {
      'worklet'
      return { opacity: shown.value, transform: [{ translateY: rise.value }] }
    }, [rise, shown])

    return (
      <Animated.View
        ref={ref}
        {...rest}
        style={[gridStyle, styleProps, style, paged]}
      >
        {days.map(date => (
          <View key={date.getTime()} style={CELL}>
            {typeof children === 'function' ? (
              children(date)
            ) : (
              <CalendarDay date={date} />
            )}
          </View>
        ))}
      </Animated.View>
    )
  }
)

CalendarGrid.displayName = 'XAUI.Tram.Calendar.Grid'

/** A seventh of the row; the day inside stretches to it, so squares touch across. */
const CELL = { width: '14.2857%' } as const
