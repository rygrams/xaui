import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { SnackbarActionLabel } from './snackbar-action-label'
import { useSnackbar } from './snackbar.context'
import type { SnackbarActionProps } from './snackbar.type'

export const SnackbarAction = forwardRef<View, SnackbarActionProps>(
  function SnackbarAction(
    {
      children,
      isCloseOnPress = true,
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
    const { actionStyle, dismiss } = useSnackbar()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })
    const handlePress = useCallback(
      (event: Parameters<NonNullable<SnackbarActionProps['onPress']>>[0]) => {
        onPress?.(event)
        if (isCloseOnPress) dismiss()
      },
      [dismiss, isCloseOnPress, onPress]
    )
    const text = childrenToString(children)
    return (
      <PressableFeedback
        ref={ref}
        asChild={asChild}
        isPressed={isPressed}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[
          actionStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {text !== null ? (
          <SnackbarActionLabel>{text}</SnackbarActionLabel>
        ) : (
          children
        )}
      </PressableFeedback>
    )
  }
)
SnackbarAction.displayName = 'XAUI.Snackbar.Action'
