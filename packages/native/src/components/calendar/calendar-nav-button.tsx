import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { ChevronDownIcon, Icon } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useCalendar } from './calendar.context'
import type { CalendarNavButtonProps } from './calendar.type'
import type { ViewStyle } from 'react-native'

/** A quarter turn each way, so one chevron draws both arrows. */
const sheet = StyleSheet.create({
  back: { transform: [{ rotate: '90deg' }] },
  forward: { transform: [{ rotate: '-90deg' }] },
})

/**
 * The month before, and the month after.
 *
 * **It goes dead at the bounds** rather than merely doing nothing: a step that would land
 * on a month with no selectable day in it has nothing to show, and a chevron that stays lit
 * while it stops working is the worst of the three options.
 *
 * With no children it draws the shared chevron turned a quarter — the library ships one
 * chevron, and two more assets for the same shape is two more to keep in step.
 */
function navButton(step: number, name: string, rotation: ViewStyle) {
  const Component = forwardRef<View, CalendarNavButtonProps>(function NavButton(
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
    const { navStyle, goToMonth, canGoToMonth, isDisabled } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const months = overrideStep ?? step
    const disabled = isDisabled || !canGoToMonth(months)

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        accessibilityRole={accessibilityRole ?? 'button'}
        accessibilityState={{ disabled, ...accessibilityState }}
        {...rest}
        style={[navStyle, styleProps, style]}
        onPress={event => {
          onPress?.(event)
          goToMonth(months)
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
  })

  Component.displayName = name
  return Component
}

/**
 * A month back. `accessibilityLabel` is the caller's — the month it goes to is what a
 * screen reader should hear, and only the caller knows which language to say it in.
 */
export const CalendarPreviousButton = navButton(
  -1,
  'XAUI.Calendar.PreviousButton',
  sheet.back
)

/** A month forward. */
export const CalendarNextButton = navButton(
  1,
  'XAUI.Calendar.NextButton',
  sheet.forward
)
