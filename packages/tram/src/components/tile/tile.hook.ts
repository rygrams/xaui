import { useEffect, useState } from 'react'
import type { TileFaceName } from './tile.type'

/**
 * A cadence for a live tile: the face to show, turned over every `interval` milliseconds.
 *
 * ```tsx
 * const face = useTileFace(4000, !isFocused)
 * <Tile face={face}>…</Tile>
 * ```
 *
 * Give each tile its own interval — a start screen that turns all at once reads as one
 * blink. Paused, the tile keeps the face it was on.
 */
export function useTileFace(interval: number, isPaused = false): TileFaceName {
  const [face, setFace] = useState<TileFaceName>('front')

  useEffect(() => {
    if (isPaused || !(interval > 0)) return

    const timer = setInterval(
      () => setFace(shown => (shown === 'front' ? 'back' : 'front')),
      interval
    )

    return () => clearInterval(timer)
  }, [interval, isPaused])

  return face
}
