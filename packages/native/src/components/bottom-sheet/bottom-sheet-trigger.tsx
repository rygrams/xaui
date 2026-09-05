import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetTriggerProps } from './bottom-sheet.type'

/**
 * What brings the sheet up. It paints nothing of its own — a sheet's trigger is a `Button`
 * far more often than not, and giving it a surface would put a second box around one.
 */
export const BottomSheetTrigger = forwardRef<View, BottomSheetTriggerProps>(
  function BottomSheetTrigger(
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
    const { isOpen, isDisabled, toggle } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const handlePress = useCallback(
      (event: Parameters<NonNullable<BottomSheetTriggerProps['onPress']>>[0]) => {
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

BottomSheetTrigger.displayName = 'XAUI.BottomSheet.Trigger'
