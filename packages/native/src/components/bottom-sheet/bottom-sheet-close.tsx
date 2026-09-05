import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetCloseProps } from './bottom-sheet.type'

/**
 * Anything that sends the sheet back down. It renders no glyph of its own: a sheet is
 * dismissed by dragging it or by a button that says what it did, far more often than by a
 * cross in a corner. `system/close-button` is there for the cross.
 */
export const BottomSheetClose = forwardRef<View, BottomSheetCloseProps>(
  function BottomSheetClose(
    {
      children,
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
    const { close } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const handlePress = useCallback(
      (event: Parameters<NonNullable<BottomSheetCloseProps['onPress']>>[0]) => {
        onPress?.(event)
        close()
      },
      [close, onPress]
    )

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
        {children}
      </PressableFeedback>
    )
  }
)

BottomSheetClose.displayName = 'XAUI.BottomSheet.Close'
