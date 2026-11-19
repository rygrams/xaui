import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetTitleProps } from './bottom-sheet.type'

/**
 * What the band is for, in `title` and in the band's ink. A `header` for a screen
 * reader, and the id the band is labelled by.
 */
export const BottomSheetTitle = forwardRef<Text, BottomSheetTitleProps>(
  function BottomSheetTitle(
    { children, accessibilityRole = 'header', nativeID, style, ...props },
    ref
  ) {
    const { titleStyle, titleId } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? titleId}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[titleStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

BottomSheetTitle.displayName = 'XAUI.Tram.BottomSheet.Title'
