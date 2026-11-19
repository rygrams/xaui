import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetDescriptionProps } from './bottom-sheet.type'

/**
 * The sentence under the title, in `body` — `muted` moved toward the band's ink until it
 * reads at 4.5:1 on the band. The id the band is described by.
 */
export const BottomSheetDescription = forwardRef<Text, BottomSheetDescriptionProps>(
  function BottomSheetDescription({ children, nativeID, style, ...props }, ref) {
    const { descriptionStyle, descriptionId } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? descriptionId}
        {...rest}
        style={[descriptionStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

BottomSheetDescription.displayName = 'XAUI.Tram.BottomSheet.Description'
