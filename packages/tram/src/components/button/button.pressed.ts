import type { VariantColors } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { onAccent } from '../../theme/on-accent'

export type PressedColors = {
  /** The fill, and the border with it. Absent when there is no box to fill. */
  fill?: string
  ink: string
}

/** Whether the variant draws a box at all — a fill or a line — rather than a bare label. */
export function isBoxed(colors: VariantColors): boolean {
  return Boolean(colors.bg ?? colors.border)
}

/**
 * Metro inverts under the finger, and what that means depends on what the button was:
 *
 * - **the label alone** (no fill, no line) has nothing to fill, so the label greys;
 * - **`flat` and `outline`** name the colour they fill with as `bgPressed`;
 * - **`contained`** names none and takes the ground's ink — white on black, black on
 *   white.
 *
 * The label is whatever reads on the new fill, computed rather than assumed: black on
 * lime, amber and yellow, and on a raw `color` just the same.
 */
export function pressedColors(
  theme: Pick<XAUITheme, 'colors'>,
  colors: VariantColors
): PressedColors {
  if (!isBoxed(colors)) return { ink: theme.colors.muted }

  const fill = colors.bgPressed ?? theme.colors.foreground
  return { fill, ink: onAccent(fill) }
}
