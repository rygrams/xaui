import { forwardRef } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { usePanorama } from './panorama.context'
import type { PanoramaSectionProps } from './panorama.type'

/**
 * One section of the track: the screen's width less what shows of the next one, laid
 * after the one before. What it holds is the caller's — a `Panorama.Header`, then a list,
 * tiles, a `ScrollView` for what runs long.
 *
 * Only the section on screen is read by a screen reader; the others are hidden until the
 * track settles on them.
 */
export const PanoramaSection = forwardRef<View, PanoramaSectionProps>(
  function PanoramaSection({ children, value, style, onLayout, ...props }, ref) {
    const { sectionStyle, sectionWidth, current, placeSection } = usePanorama()
    const [styleProps, rest] = useStyleProps(props)
    const isAway = current !== value

    const handleLayout = (event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout
      placeSection(value, x, width)
      onLayout?.(event)
    }

    return (
      <View
        ref={ref}
        accessibilityElementsHidden={isAway}
        importantForAccessibility={isAway ? 'no-hide-descendants' : 'auto'}
        {...rest}
        // Its width before the caller's: a wide section is a `width` away.
        style={[
          sectionStyle,
          sectionWidth > 0 ? { width: sectionWidth } : null,
          styleProps,
          style,
        ]}
        onLayout={handleLayout}
      >
        {children}
      </View>
    )
  }
)

PanoramaSection.displayName = 'XAUI.Tram.Panorama.Section'
