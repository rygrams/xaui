import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetHandleProps } from './bottom-sheet.type'

/**
 * The grab bar.
 *
 * It is the only thing telling a reader the sheet can be dragged — the gesture has no other
 * affordance, and a sheet without one reads as a panel that happens to have arrived from
 * below. Written by the caller rather than drawn by the content, because a sheet with
 * `isSwipeable={false}` should not be advertising a gesture it refuses.
 */
export const BottomSheetHandle = forwardRef<View, BottomSheetHandleProps>(
  function BottomSheetHandle({ style, ...props }, ref) {
    const { handleStyle } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        // A pill carries nothing a screen reader can read, and the drag it stands for is
        // not a gesture a screen reader performs.
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[handleStyle, styleProps, style]}
      />
    )
  }
)

BottomSheetHandle.displayName = 'XAUI.BottomSheet.Handle'
