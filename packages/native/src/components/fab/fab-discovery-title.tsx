import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useFabDiscovery } from './fab-discovery.context'
import type { FabDiscoveryTitleProps } from './fab-discovery.type'

/**
 * What the feature is, in a few words.
 *
 * The one line a reader who dismisses the mark in a second will still have read, so it says
 * the thing rather than introducing it.
 */
export const FabDiscoveryTitle = forwardRef<Text, FabDiscoveryTitleProps>(
  function FabDiscoveryTitle({ children, style, ...props }, ref) {
    const { titleStyle, textAlign } = useFabDiscovery()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole="header"
        {...rest}
        style={[titleStyle, { textAlign }, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

FabDiscoveryTitle.displayName = 'XAUI.FabDiscovery.Title'
