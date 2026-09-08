import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useFabDiscovery } from './fab-discovery.context'
import type { FabDiscoveryDescriptionProps } from './fab-discovery.type'

/**
 * The sentence under the title, at the same colour and a little less of it.
 *
 * Less by opacity rather than by a second token: the ground it sits on is a raw tint as
 * often as it is the accent, and there is no contrast colour in the theme for a colour the
 * caller invented — the one that is guaranteed to read on it is the one the title already
 * uses, turned down.
 */
export const FabDiscoveryDescription = forwardRef<
  Text,
  FabDiscoveryDescriptionProps
>(function FabDiscoveryDescription({ children, style, ...props }, ref) {
  const { descriptionStyle } = useFabDiscovery()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
      {children}
    </Text>
  )
})

FabDiscoveryDescription.displayName = 'XAUI.Fab.Discovery.Description'
