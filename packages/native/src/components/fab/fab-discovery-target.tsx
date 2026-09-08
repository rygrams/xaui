import { forwardRef } from 'react'
import { View } from 'react-native'
import { useAnchorRef } from '../../hooks/use-anchor-ref'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { Portal } from '../../system/portal'
import { FabRoot } from './fab'
import { useFabDiscovery } from './fab-discovery.context'
import { fabDiscoverySheet } from './fab-discovery.style'
import type { FabDiscoveryTargetProps } from './fab-discovery.type'

/**
 * The FAB the mark is about.
 *
 * It **is** a `Fab` — the same recipe, the same ten variants, the same `placement`,
 * `isExtended`, `color` and `radius` — with one thing added: it reports where it is, and
 * while the mark is up it is **lifted into the portal at that same rectangle**, so it draws
 * above the disc instead of underneath it.
 *
 * That is the whole difference from the legacy `FeatureDiscovery`, which drew a *copy* of
 * whatever the caller passed as `highlightContent`. A copy is a picture: it does not press,
 * and it is only correct for as long as somebody keeps it in step with the original. This is
 * the FAB itself, at the coordinates it already occupied — so it never appears to move, and
 * pressing it still does what it always did.
 *
 * The node left in the flow stays mounted and invisible. It has to: it is what holds the
 * space the layout gave the FAB, and what `onLayout` measures. It is taken out of the
 * accessibility tree while it is a placeholder, or a screen reader would find the same
 * button twice.
 */
export const FabDiscoveryTarget = forwardRef<View, FabDiscoveryTargetProps>(
  function FabDiscoveryTarget({ children, style, onLayout, ...props }, ref) {
    const { isOpen, geometry, setAnchor } = useFabDiscovery()

    const anchor = useAnchorRef({ isOpen, onAnchor: setAnchor, onLayout })
    const refs = useMergedRef(anchor.node, ref)

    // Only once it has been measured: until then there is nowhere to lift it to, and a FAB
    // parked at the host's origin for a frame is worse than one that has not moved yet.
    const isLifted = isOpen && geometry !== null

    return (
      <>
        <FabRoot
          ref={refs}
          accessibilityElementsHidden={isLifted || undefined}
          importantForAccessibility={isLifted ? 'no-hide-descendants' : undefined}
          focusable={!isLifted}
          {...props}
          onLayout={anchor.onLayout}
          style={
            typeof style === 'function'
              ? state => [isLifted && fabDiscoverySheet.placeholder, style(state)]
              : [isLifted && fabDiscoverySheet.placeholder, style]
          }
        >
          {children}
        </FabRoot>

        {isLifted ? (
          <Portal>
            <View
              // Its own rectangle, in the host's coordinates — the same place it is on
              // screen, which is why nothing appears to move.
              style={[
                fabDiscoverySheet.target,
                {
                  top: geometry.target.top,
                  start: geometry.target.start,
                  width: geometry.target.width,
                  height: geometry.target.height,
                },
              ]}
            >
              <FabRoot {...props} style={style}>
                {children}
              </FabRoot>
            </View>
          </Portal>
        ) : null}
      </>
    )
  }
)

FabDiscoveryTarget.displayName = 'XAUI.Fab.Discovery.Target'
