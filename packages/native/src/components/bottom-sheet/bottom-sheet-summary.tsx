import { forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetSummaryProps } from './bottom-sheet.type'

/**
 * The part of a long sheet that stays when it is reduced.
 *
 * ```tsx
 * <BottomSheet.Content>
 *   <BottomSheet.Handle accessibilityLabel="Réduire la fiche" />
 *   <BottomSheet.Summary>
 *     <BottomSheet.Title>Café des Arts</BottomSheet.Title>
 *     <Rating value={4.2} />
 *   </BottomSheet.Summary>
 *   <Hours />
 *   <Reviews />
 * </BottomSheet.Content>
 * ```
 *
 * It is `<summary>` to the sheet's `<details>`, and the same thing an `Accordion.Trigger`
 * is: **the part that survives**, not a different view for the reduced state. It renders in
 * both — what changes is whether everything under it does — so it costs no second layout
 * and the reduce animates the way it already did.
 *
 * **It reports where its bottom edge falls**, not how tall it is, so whatever sits above it
 * is counted too: a handle above a summary is visible when the sheet is reduced, and
 * measuring the summary alone would have cut it off. That edge becomes the reduced height,
 * which is why it must be a direct child of `Content` — `y` is relative to the immediate
 * parent, and a summary wrapped in a `View` would report the wrapper's coordinates.
 *
 * With one of these the sheet needs no `collapsedHeight`, and the cut lands exactly where
 * you put it rather than wherever the line happened to fall.
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

BottomSheetSummary.displayName = 'XAUI.BottomSheet.Summary'
