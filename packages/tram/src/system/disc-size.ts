import type { TramSize } from '../theme/tram-tokens'

/**
 * The line of a disc, and of the busy ring drawn in it: the `Button`'s, thin as the Metro
 * App Bar's circle. A filled disc draws it too, in its fill, so the two drawings are the
 * same size.
 */
export const DISC_LINE = 2

export type DiscSize = {
  /** The circle's diameter. A smaller one reaches the 48-point touch target with `hitSlop`. */
  diameter: number
  /** The glyph, and the busy ring that takes its place. */
  glyph: number
}

/**
 * The round button of the Metro App Bar, per size. Not Native's `Fab` (40 / 56 / 72):
 * small, as the App Bar's circles were in their band — the largest is the touch target,
 * the two others reach it with `hitSlop`.
 *
 * In `system/` since its second use: the `Fab`, the buttons of the `AppBar`, and the bar of
 * the `DatePicker` and `TimePicker` page.
 */
export const DISC_SIZE: Record<TramSize, DiscSize> = {
  sm: { diameter: 32, glyph: 16 },
  md: { diameter: 40, glyph: 20 },
  lg: { diameter: 48, glyph: 24 },
}
