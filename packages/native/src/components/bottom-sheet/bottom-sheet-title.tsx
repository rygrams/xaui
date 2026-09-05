import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetTitleProps } from './bottom-sheet.type'

/** What the sheet is for. A `header`, so it announces as one. */
export const BottomSheetTitle = forwardRef<Text, BottomSheetTitleProps>(
  function BottomSheetTitle(
    { children, accessibilityRole = 'header', style, ...props },
    ref
  ) {
    const { titleStyle } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[titleStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

BottomSheetTitle.displayName = 'XAUI.BottomSheet.Title'
