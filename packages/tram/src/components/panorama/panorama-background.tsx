import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import type { PanoramaBackgroundProps } from './panorama.type'

/**
 * What lies behind the whole Panorama — a picture, blocks of flat colour. It is wider than
 * the screen by a quarter of the track's way and slides the slowest of all, so it barely
 * moves while the sections go by. Its children fill it.
 *
 * Text drawn over it is the caller's to keep legible: Tram adds no shade.
 */
export const PanoramaBackground = forwardRef<View, PanoramaBackgroundProps>(
  function PanoramaBackground({ children, style, ...props }, ref) {
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[StyleSheet.absoluteFill, styleProps, style]}
      >
        {children}
      </View>
    )
  }
)

PanoramaBackground.displayName = 'XAUI.Tram.Panorama.Background'
