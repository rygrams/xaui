import { useCallback, useEffect, useRef } from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import type { Anchor } from '../utils/placement'

type Options = {
  /** Re-measured every time this turns true. */
  isOpen: boolean
  onAnchor: (anchor: Anchor) => void
  /** The caller's own handler, called before the measurement. */
  onLayout?: (event: LayoutChangeEvent) => void
}

/**
 * The rectangle a floating panel positions against, kept honest.
 *
 * Two things about it are load-bearing, and both were bugs before they were rules.
 *
 * **It measures through a ref of its own, not the layout event's `currentTarget`.** That
 * field is a node handle on the old architecture and a host instance on the new one, and
 * only one of the two answers `measureInWindow` — a crash on Android and nowhere else,
 * which is the worst shape a bug can take.
 *
 * **It measures again on every open.** `onLayout` fires when the trigger is laid out and
 * never again — not on scroll — so a trigger inside a `ScrollView` otherwise reports the
 * position it had before the user moved. Far enough down a screen the panel opens past
 * the bottom of the window and looks like nothing happened at all.
 */
export function useAnchorRef({ isOpen, onAnchor, onLayout }: Options) {
  const node = useRef<View | null>(null)

  // Read through a ref so `measure` never changes identity, even when the caller passes a
  // fresh arrow on every render — which it always does.
  const latest = useRef(onAnchor)
  latest.current = onAnchor

  const measure = useCallback(() => {
    node.current?.measureInWindow((x, y, width, height) => {
      latest.current({ x, y, width, height })
    })
  }, [])

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      measure()
    },
    [measure, onLayout]
  )

  useEffect(() => {
    if (isOpen) measure()
  }, [isOpen, measure])

  return { node, measure, onLayout: handleLayout }
}
