import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetDescriptionProps } from './bottom-sheet.type'

/** The sentence under it. It wraps — that is what it exists to carry. */
export const BottomSheetDescription = forwardRef<Text, BottomSheetDescriptionProps>(
  function BottomSheetDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

BottomSheetDescription.displayName = 'XAUI.BottomSheet.Description'
