import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useDialog } from './dialog.context'
import type { DialogTriggerProps } from './dialog.type'

/**
 * What asks the question. It paints nothing of its own — a dialog's trigger is a `Button`
 * far more often than not, and giving it a surface would put a second box around one.
 */
export const DialogTrigger = forwardRef<View, DialogTriggerProps>(
  function DialogTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const { isOpen, isDisabled, toggle } = useDialog()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const handlePress = useCallback(
      (event: Parameters<NonNullable<DialogTriggerProps['onPress']>>[0]) => {
        onPress?.(event)
        toggle()
      },
      [onPress, toggle]
    )

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          disabled: isDisabled,
          expanded: isOpen,
          ...accessibilityState,
        }}
        {...rest}
        style={[
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children}
      </PressableFeedback>
    )
  }
)

DialogTrigger.displayName = 'XAUI.Dialog.Trigger'
