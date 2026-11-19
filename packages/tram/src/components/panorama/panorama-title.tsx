import { forwardRef } from 'react'
import { Text } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { adjustableProps } from './panorama.adjust'
import { usePanorama } from './panorama.context'
import type { PanoramaTitleProps } from './panorama.type'

/**
 * The Panorama's name, in the giant `hero` role, on one line that runs past the screen's
 * end: the finger brings the rest of it in, slower than the sections. Metro wrote it in
 * lower case; Tram draws what it is given.
 *
 * It is the screen reader's way through the sections — an `adjustable` read as its name
 * and the section on screen, whose swipes up and down step to the next or the previous
 * one. It stays on screen while they change, so the focus stays on it.
 */
export const PanoramaTitle = forwardRef<Text, PanoramaTitleProps>(
  function PanoramaTitle(
    {
      children,
      style,
      onLayout,
      accessibilityActions,
      onAccessibilityAction,
      ...props
    },
    ref
  ) {
    const { titleStyle, measureTitle, adjust } = usePanorama()
    const [styleProps, rest] = useStyleProps(props)

    const handleLayout = (event: LayoutChangeEvent) => {
      measureTitle(event.nativeEvent.layout.width)
      onLayout?.(event)
    }

    return (
      <Text
        ref={ref}
        {...adjustableProps(adjust, { accessibilityActions, onAccessibilityAction })}
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
