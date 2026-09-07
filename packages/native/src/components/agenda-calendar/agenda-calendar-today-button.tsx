import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarNavButtonProps } from './agenda-calendar.type'

/**
 * Back to today — in one press.
 *
 * It brings today's week on screen, closes any month or year row that is open, **and
 * chooses today** (unless the bounds refuse it). Legacy's dialog did exactly this, and a
 * "Today" that dropped you on the right week and left you to find the day is a button half
 * done.
 *
 * It goes dead only when there is nothing left for it to do: today's week is showing, the
 * day strip is the view, and today is already the chosen day. Page away, open a picker, or
 * choose another day and it comes back to life.
 *
 * The word is the caller's: "Today", "Aujourd'hui", "Hoy". R3 wraps a text child into the
 * label, so `<AgendaCalendar.TodayButton>Today</…>` is the whole call.
 */
export const AgendaCalendarTodayButton = forwardRef<
  View,
  AgendaCalendarNavButtonProps
>(function AgendaCalendarTodayButton(
  {
    children,
    accessibilityRole,
    accessibilityState,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const {
    todayStyle,
    todayDisabledStyle,
    todayLabelStyle,
    goToToday,
    isTodayResolved,
    isDisabled,
  } = useAgendaCalendar()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const disabled = isDisabled || isTodayResolved
  const text = childrenToString(children)

  return (
    <PressableFeedback
      ref={ref}
      isPressed={isPressed}
      isDisabled={disabled}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityState={{ disabled, ...accessibilityState }}
      {...rest}
      style={[todayStyle, disabled && todayDisabledStyle, styleProps, style]}
      onPress={event => {
        onPress?.(event)
        goToToday()
      }}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {text !== null ? <Text style={todayLabelStyle}>{text}</Text> : children}
    </PressableFeedback>
  )
})

AgendaCalendarTodayButton.displayName = 'XAUI.AgendaCalendar.TodayButton'
