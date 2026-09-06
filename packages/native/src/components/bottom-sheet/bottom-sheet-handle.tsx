import { forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { warnDev } from '../../utils/warn-dev'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetHandleProps } from './bottom-sheet.type'

/**
 * The grab bar, and on a sheet that can be reduced, the control that reduces it.
 *
 * It is the only thing telling a reader the sheet can be dragged — the gesture has no other
 * affordance, and a sheet without one reads as a panel that happens to have arrived from
 * below. Written by the caller rather than drawn by the content, because a sheet with
 * `isSwipeable={false}` should not be advertising a gesture it refuses.
 *
 * **With a `collapsedHeight` it becomes a real control**, the way an `Accordion.Trigger` is:
 * a press toggles the two heights. That is not decoration acquiring a behaviour by accident
 * — a drag is the one way in and out of the reduced state, and a drag is a gesture some
 * people cannot perform. Without one the handle stays what it was: a pill, hidden from
 * screen readers, taking no touches.
 */
export const BottomSheetHandle = forwardRef<View, BottomSheetHandleProps>(
  function BottomSheetHandle(
    {
      accessibilityRole = 'button',
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const { handleStyle, isCollapsible, isExpanded, toggleExpanded } =
      useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        toggleExpanded()
      },
      [onPress, toggleExpanded]
    )

    if (!isCollapsible) {
      return (
        <View
          ref={ref}
          // A pill carries nothing a screen reader can read, and the drag it stands for is
          // not a gesture a screen reader performs.
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          {...rest}
          // R9 — `style` may be `Pressable`'s function form now that the collapsible
          // handle takes one. A decorative pill is never pressed, so it resolves at rest.
          style={[
            handleStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: false }) : style,
          ]}
        />
      )
    }

    // A pill is not text. Here it is the only way to the reduced state that is not a drag,
    // so unlike the decorative case there is something to announce and nothing to announce
    // it with.
    if (!rest.accessibilityLabel && !rest['aria-label']) {
      warnDev(
        'BottomSheet.Handle: a collapsible sheet needs an `accessibilityLabel` on its ' +
          'handle — it is the control that reduces and restores the sheet, and a pill ' +
          'says nothing to someone who cannot see it.'
      )
    }

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ expanded: isExpanded }}
        {...rest}
        style={[
          handleStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      />
    )
  }
)

BottomSheetHandle.displayName = 'XAUI.BottomSheet.Handle'
