import { blendHex } from '../theme/accent-ink'
import { isHex } from '../theme/on-accent'

/** How much of the page's ink a faint fill holds: #333333 on black, #CCCCCC on white. */
export const FAINT_SHARE = 0.2

/**
 * A grey that sits on the page without reading as a line: `share` of the page's `ink` laid
 * over its `ground`, mixed channel by channel in sRGB. The `Skeleton`'s block, and the
 * `Rating`'s mark before it is given. Not in OKLab — a fifth of the way from black to white there is a
 * lightness of 0.2, which comes back out as #070707, a hole in the page rather than a
 * block on it.
 *
 * `undefined` when either colour is not written as hex — a theme can hand any colour
 * string, and only hex can be mixed here; a recipe then falls back to `muted`.
 */
export function faintFill(
  ink: string,
  ground: string,
  share: number = FAINT_SHARE
): string | undefined {
  if (!isHex(ink) || !isHex(ground)) return undefined

  return blendHex(ground, ink, share)
}
