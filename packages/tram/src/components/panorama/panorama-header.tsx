import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { usePanorama } from './panorama.context'
import type { PanoramaHeaderProps } from './panorama.type'

/**
 * What names a section, at its top: the `pivot` role, Light, in the page's ink — no
 * accent, no line under it. Announced as a heading.
 */
export const PanoramaHeader = forwardRef<Text, PanoramaHeaderProps>(
  function PanoramaHeader({ children, style, ...props }, ref) {
    const { headerStyle } = usePanorama()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole="header"
        {...rest}
        style={[headerStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

PanoramaHeader.displayName = 'XAUI.Tram.Panorama.Header'
