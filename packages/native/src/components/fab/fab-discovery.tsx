import { useCallback, useContext, useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { PortalContext } from '../../system/portal'
import { useXAUITheme } from '../../theme/theme-hooks'
import { discoveryGeometry } from '../../utils/discovery'
import { FabDiscoveryProvider } from './fab-discovery.context'
import { fabDiscoveryRecipe } from './fab-discovery.recipe'
import type { FabDiscoveryAnchor, FabDiscoveryProps } from './fab-discovery.type'

/** The legacy's two, and Material's: a disc two thirds wider than the screen, a 14pt ring. */
const DEFAULT_SCALE = 1.65
const DEFAULT_PADDING = 14

/**
 * The coach mark that says what a FAB is for.
 *
 * ```tsx
 * <Fab.Discovery isOpen={tour} onOpenChange={setTour}>
 *   <Fab.Discovery.Target placement="bottom-end" accessibilityLabel="Composer" onPress={compose}>
 *     <Fab.Icon as={PlusIcon} />
 *   </Fab.Discovery.Target>
 *   <Fab.Discovery.Overlay />
 *   <Fab.Discovery.Content>
 *     <Fab.Discovery.Title>Composez d'où vous voulez</Fab.Discovery.Title>
 *     <Fab.Discovery.Description>
 *       Ce bouton suit chaque écran de la boîte de réception.
 *     </Fab.Discovery.Description>
 *     <Fab.Discovery.Action>Compris</Fab.Discovery.Action>
 *   </Fab.Discovery.Content>
 * </Fab.Discovery>
 * ```
 *
 * **The FAB does not move, and it stays the FAB.** The legacy `FeatureDiscovery` took a
 * `targetRef`, measured it, and drew a *copy* of whatever the caller passed as
 * `highlightContent` over the disc — so the thing being taught was a picture of itself,
 * unpressable, and only correct as long as the caller kept the copy in step with the
 * original. Here `Fab.Discovery.Target` **is** the FAB: it stays exactly where the layout
 * put it and is lifted into the portal at its own measured rectangle while the mark is up,
 * so it sits above the disc, still presses, and never appears to move.
 *
 * **It is opened by the app, not by the FAB.** A discovery is shown because this reader has
 * not seen the feature — a question only the app can answer — so `isOpen` is controlled far
 * more often than not, and pressing the target does what it always did.
 *
 * **The root renders no node.** It holds the disclosure, the measured rectangle and the
 * geometry every slot reads.
 *
 * For a FAB that opens a list of actions rather than explaining itself, that is `Fab.Menu`.
 */
export function FabDiscovery({
  children,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  color,
  scale = DEFAULT_SCALE,
  padding = DEFAULT_PADDING,
}: FabDiscoveryProps) {
  const theme = useXAUITheme()
  const window = useWindowDimensions()
  // The host the mark is drawn in may not start at the window's origin — a status bar, a
  // safe-area inset, a host mounted under a header. That difference is exactly how far
  // wrong every part of the mark would be.
  const origin = useContext(PortalContext)?.origin
  const [anchor, setAnchor] = useState<FabDiscoveryAnchor | null>(null)

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const styles = fabDiscoveryRecipe.resolve({ theme })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color ? fabDiscoveryRecipe.tint({ theme, color }) : undefined

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])

  const geometry = useMemo(() => {
    if (anchor === null) return null

    const x = origin?.x ?? 0
    const y = origin?.y ?? 0

    return discoveryGeometry({
      target: { ...anchor, x: anchor.x - x, y: anchor.y - y },
      window: { width: window.width - x, height: window.height - y },
      scale,
      padding,
    })
  }, [anchor, origin?.x, origin?.y, window.width, window.height, scale, padding])

  const context = useMemo(
    () => ({
      overlayStyle: styles.overlay,
      circleStyle: tint ? [styles.circle, tint.circle] : styles.circle,
      haloStyle: tint ? [styles.halo, tint.halo] : styles.halo,
      contentStyle: styles.content,
      titleStyle: tint ? [styles.title, tint.title] : styles.title,
      descriptionStyle: tint
        ? [styles.description, tint.description]
        : styles.description,
      actionStyle: tint ? [styles.action, tint.action] : styles.action,
      geometry,
      isOpen,
      open,
      close,
      anchor,
      setAnchor,
    }),
    [styles, tint, geometry, isOpen, open, close, anchor]
  )

  return <FabDiscoveryProvider value={context}>{children}</FabDiscoveryProvider>
}

FabDiscovery.displayName = 'XAUI.Fab.Discovery.Root'
