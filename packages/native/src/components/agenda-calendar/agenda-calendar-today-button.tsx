import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarNavButtonProps } from './agenda-calendar.type'

/**
 * Back to this week.
 *
 * **It moves the strip; it does not choose today.** The two are one press apart — today is
 * right there once its week is on screen — and a button that quietly answered the question
 * for you would be a button you cannot use to *look*.
 *
 * It goes dead while today's week is already the one on screen, which is the only state in
 * which pressing it would do nothing at all.
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
    isOnToday,
    isDisabled,
  } = useAgendaCalendar()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const disabled = isDisabled || isOnToday
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
