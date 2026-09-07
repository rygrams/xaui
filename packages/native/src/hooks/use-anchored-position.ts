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
  /**
   * The widest a `content-fit` panel may measure, before the screen is considered.
   *
   * Without one, "as wide as its content wants" against a paragraph means the width of the
   * screen, because a paragraph always wants more. A panel that is an aside has to be
   * given a measure to stop at.
   */
  maxWidth?: number
  /**
   * A floor under the resolved width, `maxWidth`'s mirror: a `trigger`-width panel narrower
   * than this takes this instead. The case is a panel with a natural minimum — a month grid
   * is seven columns of a fixed cell — sitting under a field that can be wider.
   */
  minWidth?: number
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
 *
 * **Nothing inside a `content-fit` panel may use `flex: 1`.** That is `flexBasis: 0`, and
 * the measuring pass has no definite width for a zero basis to grow into — the child's
 * content size is nothing, so the panel measures to nothing and holds that width. Write
 * `flexGrow: 1, flexShrink: 1, flexBasis: 'auto'` instead: it fills the row exactly the
 * same once the width is known, and it starts from the content rather than from zero.
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
      ...measuringWidth(options, local?.width, window),
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
 * `content-fit` cannot be imposed on, because imposing is what makes it unanswerable.
 * Constraining it to the anchor was this hook's first version, and against a small trigger
 * it measured a column one character wide and held the panel there — the `Select` never
 * showed it, because its default width is the trigger's anyway.
 *
 * It is still bounded, by two things and in this order: the component's own `maxWidth`,
 * and the screen. The first is what stops "as wide as its content wants" from meaning the
 * width of the screen the moment the content is a paragraph — a paragraph always wants
 * more, so a panel that is an aside has to be given a measure to stop at. The second is
 * the floor under that, for a component that declares none.
 */
function measuringWidth(
  {
    width,
    minWidth,
    maxWidth,
    insets,
  }: Pick<AnchoredPositionOptions, 'width' | 'minWidth' | 'maxWidth' | 'insets'>,
  anchorWidth: number | undefined,
  window: Size2D
): Pick<ViewStyle, 'width' | 'minWidth' | 'maxWidth'> {
  const screen = Math.max(window.width - insets.start - insets.end, 0)
  const floor = minWidth ?? 0

  if (width === 'trigger') return { width: Math.max(anchorWidth ?? 0, floor) }
  if (width === 'full') return { width: screen }
  if (typeof width === 'number') return { width: Math.max(width, floor) }

  // `content-fit` measures freely between the two bounds.
  return {
    minWidth: floor || undefined,
    maxWidth: Math.min(maxWidth ?? Number.POSITIVE_INFINITY, screen),
  }
}

/** No host, no offset — `Portal` renders nothing in that case anyway. */
const ZERO = { x: 0, y: 0 }
