import { blendHex } from '../../theme/accent-ink'
import { isHex } from '../../theme/on-accent'

/** How much of the page's ink the block holds: #333333 on black, #CCCCCC on white. */
export const FILL_SHARE = 0.2

/**
 * The block's grey: `share` of the page's `ink` laid over its `ground`, mixed channel by
 * channel in sRGB. Not in OKLab — a fifth of the way from black to white there is a
 * lightness of 0.2, which comes back out as #070707, a hole in the page rather than a
 * block on it.
 *
 * `undefined` when either colour is not written as hex — a theme can hand any colour
 * string, and only hex can be mixed here; the recipe then falls back to `muted`.
 */
export function skeletonFill(
  ink: string,
  ground: string,
  share: number = FILL_SHARE
): string | undefined {
  if (!isHex(ink) || !isHex(ground)) return undefined

  return blendHex(ground, ink, share)
}
