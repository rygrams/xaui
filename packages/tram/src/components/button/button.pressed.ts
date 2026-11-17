import type { VariantColors } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { onAccent } from '../../theme/on-accent'

export type PressedColors = {
  /** The fill, and the border with it. Absent when there is no box to fill. */
  fill?: string
  ink: string
}

/**
 * Metro inverts under the finger, and what that means depends on what the button was:
 *
 * - **the label alone** (no border role) has nothing to fill, so the label greys;
 * - **an outline** names the colour it fills with as `bgPressed`;
 * - **a fill** names none and takes the ground's ink — white on black, black on white.
 *
 * The label is whatever reads on the new fill, computed rather than assumed: black on
 * lime, amber and yellow, and on a raw `color` just the same.
 */
export function pressedColors(
  theme: Pick<XAUITheme, 'colors'>,
  colors: VariantColors
): PressedColors {
  if (!colors.border) return { ink: theme.colors.muted }

  const fill = colors.bgPressed ?? theme.colors.foreground
  return { fill, ink: onAccent(fill) }
}
