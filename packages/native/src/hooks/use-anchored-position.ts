import { useCallback, useContext, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { PortalContext } from '../system/portal'
import { resolvePlacement } from '../utils/placement'
import type { ViewStyle } from 'react-native'
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
  measuringStyle: ViewStyle
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
    measuringStyle: {
      // Invisible, and at the start of the host, so the reader never sees the panel at
      // the wrong place during the frame it is being measured in.
      opacity: 0,
      top: 0,
      start: 0,
      ...measuringWidth(options.width, local?.width, window, options.insets),
    },
  }
}

/**
 * How wide to lay the panel out **while measuring it**, which is not the same question as
 * how wide it ends up.
 *
 * A width the panel already knows is imposed, so the content wraps during the measuring
 * pass exactly as it will afterwards and the measured **height** is the real one.
 *
 * `content-fit` is the opposite: imposing anything is what makes it impossible to answer.
 * Constraining it to the anchor was this hook's first version, and against a small trigger
 * it measured a column one character wide and then held the panel at that width forever —
 * the `Select` never showed it, because its default width is the trigger's anyway.
 *
 * So `content-fit` measures unconstrained, bounded only by the screen: a paragraph has to
 * be allowed to ask for the room it wants, and refused only by the edges.
 */
function measuringWidth(
  width: AnchoredWidth,
  anchorWidth: number | undefined,
  window: Size2D,
  insets: Required<Insets>
): Pick<ViewStyle, 'width' | 'maxWidth'> {
  if (width === 'trigger') return { width: anchorWidth }
  if (typeof width === 'number') return { width }
  return { maxWidth: Math.max(window.width - insets.start - insets.end, 0) }
}

/** No host, no offset — `Portal` renders nothing in that case anyway. */
const ZERO = { x: 0, y: 0 }
