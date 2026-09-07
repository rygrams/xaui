import { forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { AgendaCalendarDay } from './agenda-calendar-day'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarWeekProps } from './agenda-calendar.type'

/** Past this far, or this fast, a drag is a page rather than a wobble. */
const SWIPE_DISTANCE = 48
const SWIPE_VELOCITY = 360

/** The finger only carries the strip half as far as it travels — a nudge, not a throw. */
const DRAG_FOLLOW = 0.5

const SPRING = { damping: 18, stiffness: 220, mass: 0.6 }

/**
 * The seven days on screen.
 *
 * Children may be a **function**, for `Calendar.Grid`'s reason: seven cells are generated
 * from a date rather than written, so there is nothing to compose against. Given one it
 * renders each day; given nothing, the built-in day.
 *
 * **A horizontal drag pages the week** — left for the next, right for the previous — so the
 * chevrons are a shortcut, not the only way. The strip follows the finger a little and
 * springs back; past `SWIPE_DISTANCE`, or faster than `SWIPE_VELOCITY`, the week turns. A
 * drag that would land on a week with no day in bounds does nothing, the same as the dead
 * chevron. `swipeable={false}` removes the gesture — and with it the need for the optional
 * `react-native-gesture-handler` peer and a `<GestureHandlerRootView>` above the strip.
 *
 * `activeOffsetX` keeps a tap on a day from starting a drag, and `failOffsetY` hands a
 * vertical drag straight back to whatever scrolls the page.
 */
export const AgendaCalendarWeek = forwardRef<View, AgendaCalendarWeekProps>(
  function AgendaCalendarWeek({ children, swipeable = true, style, ...props }, ref) {
    const { weekStyle, days, goByWeeks, canGoByWeeks, isDisabled } =
      useAgendaCalendar()
    const [styleProps, rest] = useStyleProps(props)

    const drag = useSharedValue(0)

    const page = useCallback(
      (direction: 1 | -1) => {
        if (canGoByWeeks(direction)) goByWeeks(direction)
      },
      [canGoByWeeks, goByWeeks]
    )

    const pan = Gesture.Pan()
      .enabled(swipeable && !isDisabled)
      .activeOffsetX([-12, 12])
      .failOffsetY([-16, 16])
      .onUpdate(event => {
        drag.set(event.translationX * DRAG_FOLLOW)
      })
      .onEnd(event => {
        const forward =
          event.translationX <= -SWIPE_DISTANCE || event.velocityX <= -SWIPE_VELOCITY
        const backward =
          event.translationX >= SWIPE_DISTANCE || event.velocityX >= SWIPE_VELOCITY

        if (forward) runOnJS(page)(1)
        else if (backward) runOnJS(page)(-1)

        drag.set(withSpring(0, SPRING))
      })
      .onFinalize(() => {
        drag.set(withSpring(0, SPRING))
      })

    const slide = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.get() }],
    }))

    const cells = days.map(date => (
      <View key={date.getTime()} style={CELL}>
        {typeof children === 'function' ? (
          children(date)
        ) : (
          <AgendaCalendarDay date={date} />
        )}
      </View>
    ))

    if (!swipeable) {
      return (
        <View ref={ref} {...rest} style={[weekStyle, styleProps, style]}>
          {cells}
        </View>
      )
    }

    return (
      <GestureDetector gesture={pan}>
        <Animated.View
          ref={ref}
          {...rest}
          style={[weekStyle, slide, styleProps, style]}
        >
          {cells}
        </Animated.View>
      </GestureDetector>
    )
  }
)

AgendaCalendarWeek.displayName = 'XAUI.AgendaCalendar.Week'

/** A seventh of the row, with the cell centred in it — the `Calendar`'s column, exactly. */
const CELL = { width: '14.2857%', alignItems: 'center' } as const
