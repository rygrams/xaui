import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  ChevronDownIcon,
  Icon,
  IconContext,
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { useCalendar } from './calendar.context'
import type { CalendarNavButtonProps } from './calendar.type'

const sheet = StyleSheet.create({
  up: { transform: [{ rotate: '180deg' }] },
  down: {},
})

/**
 * A bare chevron in a square of 48 — no box, no line. The month before points **up** and
 * the month after **down**, as the Windows calendar pages. A press shrinks it a little.
 *
 * On the month and year panels a step is a year. At the bounds it goes dead, drawn in the faint
 * grey, rather than staying lit while it does nothing.
 */
function navButton(step: number, name: string, turn: ViewStyle) {
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
    const { navStyle, glyph, view, goToMonth, canGoToMonth, isDisabled } =
      useCalendar()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const motion = resolveAnimation(undefined, useAnimationDisabled())
    const Press = motion.scale ? PressRow : PressableFeedback

    // Off the days, the title names a year, so a step is one.
    const months = (overrideStep ?? step) * (view === 'grid' ? 1 : 12)
    const disabled = isDisabled || !canGoToMonth(months)

    const icon = useMemo(
      () => ({ size: glyph.size, color: disabled ? glyph.dead : glyph.color }),
      [glyph, disabled]
    )

    return (
      <Press
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        animation={motion.disableAll ? 'disable-all' : false}
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
        <IconContext.Provider value={icon}>
          {children ?? (
            <View style={turn}>
              <Icon as={ChevronDownIcon} />
            </View>
          )}
        </IconContext.Provider>
      </Press>
    )
  })

  Component.displayName = name
  return Component
}

/** A month back — the chevron up. `accessibilityLabel` is the caller's. */
export const CalendarPreviousButton = navButton(
  -1,
  'XAUI.Tram.Calendar.PreviousButton',
  sheet.up
)

/** A month forward — the chevron down. */
export const CalendarNextButton = navButton(
  1,
  'XAUI.Tram.Calendar.NextButton',
  sheet.down
)
