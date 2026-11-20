import { forwardRef, useCallback } from 'react'
import type {
  GestureResponderEvent,
  PressableStateCallbackType,
  View,
} from 'react-native'
import { useTramSafeArea } from '../../theme/tram-safe-area'
import { CloseButton } from '../close-button'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerCloseProps } from './color-picker.type'

/**
 * The way out of the page, beside the system's back.
 *
 * ```tsx
 * <ColorPicker.Close accessibilityLabel="fermer" />
 * ```
 *
 * **It is the Tram `CloseButton`**, its cross alone (`variant="text"`) unless told
 * otherwise, pinned in the page's top-end corner wherever it is written — no row to build.
 * Under `asChild` it is the caller's element instead, in the flow. The caller's `onPress`
 * runs first, then the page goes.
 */
export const ColorPickerClose = forwardRef<View, ColorPickerCloseProps>(
  function ColorPickerClose(
    { variant = 'text', asChild = false, style, onPress, ...props },
    ref
  ) {
    const { closeStyle, pageTop, close } = useColorPicker()
    const insets = useTramSafeArea()

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        close()
      },
      [onPress, close]
    )

    const pinned = asChild ? undefined : [closeStyle, { top: insets.top + pageTop }]

    return (
      <CloseButton
        ref={ref}
        variant={variant}
        asChild={asChild}
        {...props}
        style={(state: PressableStateCallbackType) => [
          pinned,
          typeof style === 'function' ? style(state) : style,
        ]}
        onPress={handlePress}
      />
    )
  }
)

ColorPickerClose.displayName = 'XAUI.Tram.ColorPicker.Close'
