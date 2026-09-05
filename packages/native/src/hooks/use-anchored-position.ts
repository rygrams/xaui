import { useCallback, useContext, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { PortalContext } from '../system/portal'
import { resolvePlacement } from '../utils/placement'
import type {
  Align,
  Anchor,
  AnchoredWidth,
  Insets,
  Placement,
  PlacementResult,
  Size2D,
} from '../utils/placement'

export type AnchoredPositionOptions = {
  anchor: Anchor | null
  isOpen: boolean
  placement: Placement
  align: Align
  width: AnchoredWidth
  offset: number
  alignOffset: number
  avoidCollisions: boolean
  insets: Required<Insets>
  /** The caller's own handler, called before the panel is measured. */
  onLayout?: (event: LayoutChangeEvent) => void
}

/**
 * Where the panel goes, and the measuring pass that makes it knowable.
 *
 * **It measures before it positions.** The first pass mounts the panel invisibly to learn
 * how big it wants to be; the second places it. Without that pass `avoidCollisions` has
 * nothing to compare, and a panel that does not fit on the side it was asked for would
 * open off the screen. The cost is one frame, and it is why an entrance animation has to
 * be keyed on the resolved placement rather than started at mount.
 *
 * **It works in the host's coordinates, not the window's.** The trigger reported itself
 * against the window; the panel is laid out inside the `PortalHost`. Anything the two
 * differ by — a status bar, a safe-area inset, a host mounted below a header — is exactly
 * the distance the panel would be wrong by.
 */
export function useAnchoredPosition({
  anchor,
  isOpen,
  onLayout,
  ...options
}: AnchoredPositionOptions): {
  position: PlacementResult | null
  /** What the panel's own `onLayout` must be, or it never leaves the measuring pass. */
  onContentLayout: (event: LayoutChangeEvent) => void
  /** Where to lay the panel out while it is still being measured. */
  measuringStyle: { opacity: 0; top: 0; start: 0; width: number | undefined }
} {
  const window = useWindowDimensions()
  const origin = useContext(PortalContext)?.origin ?? ZERO
  const [measured, setMeasured] = useState<Size2D | null>(null)

  const onContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      const { width, height } = event.nativeEvent.layout
      setMeasured(current =>
        current !== null && current.width === width && current.height === height
          ? current
          : { width, height }
      )
    },
    [onLayout]
  )

  // Measured per open rather than kept: a panel whose content changed while it was closed
  // would otherwise be placed against the size it had last time.
  if (!isOpen && measured !== null) setMeasured(null)

  const local = anchor && {
    ...anchor,
    x: anchor.x - origin.x,
    y: anchor.y - origin.y,
  }

  const position =
    local && measured
      ? resolvePlacement({
          anchor: local,
          content: measured,
          window: {
            width: window.width - origin.x,
            height: window.height - origin.y,
          },
          ...options,
        })
      : null

  return {
    position,
    onContentLayout,
    // Laid out at the anchor's width so the content wraps as it finally will, and
    // invisible so the reader never sees it at the wrong place.
    measuringStyle: { opacity: 0, top: 0, start: 0, width: local?.width },
  }
}

/** No host, no offset — `Portal` renders nothing in that case anyway. */
const ZERO = { x: 0, y: 0 }
