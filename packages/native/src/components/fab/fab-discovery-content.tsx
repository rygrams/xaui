import { forwardRef } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { FabDiscoveryProvider, useFabDiscovery } from './fab-discovery.context'
import { fabDiscoverySheet } from './fab-discovery.style'
import type { FabDiscoveryContentProps } from './fab-discovery.type'

/** The disc grows out of the target; the words arrive once it has. */
const DISC_DURATION = 260
const TEXT_DELAY = 120

/**
 * The disc, the ring, and the block of text on it.
 *
 * All three are placed by `discoveryGeometry`, measured off the target — including the
 * text, which is pinned by the edge nearest the target and laid out to the **chord of the
 * disc at its far end** rather than to the disc's width. A block set at the full diameter runs past the curve at both ends, which is
 * the shape every first coach mark has; where the chord is too narrow to read a paragraph
 * in, the block gives up on the disc and sets from the screen's edge instead.
 *
 * It renders into the nearest `PortalHost`, and it draws **under** the lifted target —
 * numbered rather than left to mount order, so a FAB does not end up beneath its own disc
 * because two slots were written the other way round.
 */
export const FabDiscoveryContent = forwardRef<View, FabDiscoveryContentProps>(
  function FabDiscoveryContent({ children, style, ...props }, ref) {
    const context = useFabDiscovery()
    const { circleStyle, haloStyle, contentStyle, geometry, isOpen } = context
    const [styleProps, rest] = useStyleProps(props)

    if (!isOpen || geometry === null) return null

    const { circle, halo, message } = geometry

    return (
      <Portal>
        <FabDiscoveryProvider value={context}>
          <Animated.View
            entering={ZoomIn.duration(DISC_DURATION)}
            exiting={FadeOut}
            style={[
              circleStyle,
              fabDiscoverySheet.disc,
              {
                width: circle.size,
                height: circle.size,
                borderRadius: circle.size / 2,
                top: circle.top,
                start: circle.start,
              },
            ]}
          />

          <Animated.View
            entering={FadeIn.duration(DISC_DURATION)}
            exiting={FadeOut}
            // Inert: the ring is a mark round the target, and the target is a control of
            // its own lifted above it.
            pointerEvents="none"
            style={[
              haloStyle,
              fabDiscoverySheet.disc,
              {
                width: halo.size,
                height: halo.size,
                borderRadius: halo.size / 2,
                top: halo.top,
                start: halo.start,
              },
            ]}
          />

          <Animated.View
            ref={ref}
            entering={FadeIn.delay(TEXT_DELAY)}
            exiting={FadeOut}
            // The block takes no touches of its own; only what is written inside it does,
            // so a press on the air beside a title still reaches the backdrop.
            pointerEvents="box-none"
            {...rest}
            style={[
              contentStyle,
              fabDiscoverySheet.disc,
              {
                // One of the two, never both: pinned by the edge nearest the target, so a
                // block above it grows upwards as the text runs long instead of down into
                // the FAB. React Native ignores the one that is `undefined`.
                top: message.top,
                bottom: message.bottom,
                start: message.start,
                width: message.width,
                maxHeight: message.maxHeight,
                // The lines set from the side the target is on, so the words and the thing
                // they describe read as one. R13: `flex-start` and `flex-end` are logical.
                alignItems: message.align === 'start' ? 'flex-start' : 'flex-end',
              },
              styleProps,
              style,
            ]}
          >
            {children}
          </Animated.View>
        </FabDiscoveryProvider>
      </Portal>
    )
  }
)

FabDiscoveryContent.displayName = 'XAUI.Fab.Discovery.Content'
