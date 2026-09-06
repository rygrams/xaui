import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { ChevronDownIcon, Icon } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarNavButtonProps } from './agenda-calendar.type'

/** A quarter turn each way, so one chevron draws both arrows. */
const sheet = StyleSheet.create({
  back: { transform: [{ rotate: '90deg' }] },
  forward: { transform: [{ rotate: '-90deg' }] },
})

/**
 * The week before, and the week after.
 *
 * Dead when the week it would reach has no selectable day in it — the `Calendar`'s rule,
 * one unit down: a chevron that stays lit while it stops working is worse than one that
 * says so.
 */
function navButton(step: number, name: string, rotation: ViewStyle) {
  const Component = forwardRef<View, AgendaCalendarNavButtonProps>(
    function NavButton(
      {
        children,
        step: overrideStep,
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
      const { navButtonStyle, goByWeeks, canGoByWeeks, isDisabled } =
        useAgendaCalendar()
      const [styleProps, rest] = useStyleProps(props)
      const [isPressed, press] = usePressState({ onPressIn, onPressOut })

      const weeks = overrideStep ?? step
      const disabled = isDisabled || !canGoByWeeks(weeks)

      return (
        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          isDisabled={disabled}
          accessibilityRole={accessibilityRole ?? 'button'}
          accessibilityState={{ disabled, ...accessibilityState }}
          {...rest}
          style={[navButtonStyle, styleProps, style]}
          onPress={event => {
            onPress?.(event)
            goByWeeks(weeks)
          }}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {children ?? (
            <View style={rotation}>
              <Icon as={ChevronDownIcon} />
            </View>
          )}
        </PressableFeedback>
      )
    }
  )

  Component.displayName = name
  return Component
}

export const AgendaCalendarPreviousButton = navButton(
  -1,
  'XAUI.AgendaCalendar.PreviousButton',
  sheet.back
)

export const AgendaCalendarNextButton = navButton(
  1,
  'XAUI.AgendaCalendar.NextButton',
  sheet.forward
)
