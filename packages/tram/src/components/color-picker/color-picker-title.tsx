import { forwardRef, useLayoutEffect } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerTitleProps } from './color-picker.type'

/**
 * The page's title, light and large — `pivot` on the Tram scale, the head of the Windows
 * Phone accents page. A `header` for a screen reader, and the id the page is labelled by:
 * the page names itself after it only while one is mounted.
 */
export const ColorPickerTitle = forwardRef<Text, ColorPickerTitleProps>(
  function ColorPickerTitle(
    { children, accessibilityRole = 'header', style, ...props },
    ref
  ) {
    const { titleStyle, titleId, registerTitle } = useColorPicker()
    const [styleProps, rest] = useStyleProps(props)

    useLayoutEffect(() => registerTitle(), [registerTitle])

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole}
        {...rest}
        // After `rest`: the id is the page's label, whatever else the caller passes.
        nativeID={titleId}
        style={[titleStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

ColorPickerTitle.displayName = 'XAUI.Tram.ColorPicker.Title'
