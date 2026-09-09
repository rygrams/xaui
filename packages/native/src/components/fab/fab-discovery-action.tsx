import { forwardRef, useCallback } from 'react'
import { Text } from 'react-native'
import type { GestureResponderEvent, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useFabDiscovery } from './fab-discovery.context'
import type { FabDiscoveryActionProps } from './fab-discovery.type'

/**
 * The way out — "Compris", "Suivant", "Ne plus afficher".
 *
 * A word rather than a button: a boxed control on the disc would be a second surface on a
 * surface, and this is the one place in the library where an underlined link is the right
 * shape. It closes the mark after the caller's `onPress` has run, and in that order — a
 * handler that advances a tour has to run while there is still a mark to advance from.
 * `closesOnPress={false}` is for the step that hands over to the next one itself.
 *
 * R3 — a bare string is wrapped in the resolved text style, so the common case is one line.
 */
export const FabDiscoveryAction = forwardRef<View, FabDiscoveryActionProps>(
  function FabDiscoveryAction(
    {
      children,
      closesOnPress = true,
      asChild = false,
      accessibilityRole = 'button',
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const { actionStyle, close } = useFabDiscovery()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        if (closesOnPress) close()
      },
      [close, closesOnPress, onPress]
    )

    const text = childrenToString(children)

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        asChild={asChild}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {text !== null ? <Text style={actionStyle}>{text}</Text> : children}
      </PressableFeedback>
    )
  }
)

FabDiscoveryAction.displayName = 'XAUI.FabDiscovery.Action'
