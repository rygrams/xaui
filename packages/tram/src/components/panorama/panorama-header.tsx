import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { adjustableProps } from './panorama.adjust'
import { useIsCurrentPanoramaSection, usePanorama } from './panorama.context'
import type { PanoramaHeaderProps } from './panorama.type'

/**
 * What names a section, at its top: the `pivot` role, Light, in the page's ink — no
 * accent, no line under it. Announced as a heading — except in a Panorama without a
 * `Panorama.Title`, where the section on screen's header is the screen reader's
 * `adjustable` through the sections.
 */
export const PanoramaHeader = forwardRef<Text, PanoramaHeaderProps>(
  function PanoramaHeader(
    { children, style, accessibilityActions, onAccessibilityAction, ...props },
    ref
  ) {
    const { headerStyle, adjust, hasTitle } = usePanorama()
    const isCurrent = useIsCurrentPanoramaSection()
    const [styleProps, rest] = useStyleProps(props)
    const caller = { accessibilityActions, onAccessibilityAction }

    return (
      <Text
        ref={ref}
        accessibilityRole="header"
        {...(!hasTitle && isCurrent ? adjustableProps(adjust, caller) : caller)}
        {...rest}
        style={[headerStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

PanoramaHeader.displayName = 'XAUI.Tram.Panorama.Header'
