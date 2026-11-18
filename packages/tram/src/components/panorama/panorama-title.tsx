import { forwardRef } from 'react'
import { Text } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { usePanorama } from './panorama.context'
import type { PanoramaTitleProps } from './panorama.type'

/**
 * The Panorama's name, in the giant `hero` role, on one line that runs past the screen's
 * end: the finger brings the rest of it in, slower than the sections. Metro wrote it in
 * lower case; Tram draws what it is given. Announced as a heading.
 */
export const PanoramaTitle = forwardRef<Text, PanoramaTitleProps>(
  function PanoramaTitle({ children, style, onLayout, ...props }, ref) {
    const { titleStyle, measureTitle } = usePanorama()
    const [styleProps, rest] = useStyleProps(props)

    const handleLayout = (event: LayoutChangeEvent) => {
      measureTitle(event.nativeEvent.layout.width)
      onLayout?.(event)
    }

    return (
      <Text
        ref={ref}
        accessibilityRole="header"
        // The size is already giant: the system's text size does not grow it further.
        maxFontSizeMultiplier={1}
        numberOfLines={1}
        {...rest}
        style={[titleStyle, styleProps, style]}
        onLayout={handleLayout}
      >
        {children}
      </Text>
    )
  }
)

PanoramaTitle.displayName = 'XAUI.Tram.Panorama.Title'
