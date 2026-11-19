import { forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetSummaryProps } from './bottom-sheet.type'

/**
 * The part of a long band that stays when it is reduced — `<summary>` to the sheet's
 * `<details>`. It renders in both states; what changes is whether everything under it is
 * on the screen.
 *
 * **It reports where its bottom edge falls**, not how tall it is, so a handle above it
 * stays visible when the band is reduced. Which is why it must be a direct child of
 * `Content`. With one, the sheet needs no `collapsedHeight`.
 */
export const BottomSheetSummary = forwardRef<View, BottomSheetSummaryProps>(
  function BottomSheetSummary({ children, style, onLayout, ...props }, ref) {
    const { setSummaryExtent } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)

    const measure = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        const { y, height } = event.nativeEvent.layout
        setSummaryExtent(y + height)
      },
      [onLayout, setSummaryExtent]
    )

    return (
      <View ref={ref} {...rest} onLayout={measure} style={[styleProps, style]}>
        {children}
      </View>
    )
  }
)

BottomSheetSummary.displayName = 'XAUI.Tram.BottomSheet.Summary'
