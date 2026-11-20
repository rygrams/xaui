import { tramAccents } from '../../theme/tram-tokens'
import type { TramAccentName } from '../../theme/tram-tokens'
import type { ColorGroup } from './color-picker.type'

const NAMES = Object.keys(tramAccents) as TramAccentName[]

/**
 * The twenty Tram accents, in the order of the Windows Phone 8 accents page, each named.
 *
 * **One group with no name, and no shades.** The Windows Phone page offered twenty
 * colours, not twenty ramps: a reader chooses "cobalt", not a step of it. So the group has
 * no heading, and each swatch is named by its `shade` — which is the accent's name.
 *
 * Pass `colors` on the root to replace it, in whole or in part.
 */
export const TRAM_PALETTE: readonly ColorGroup[] = [
  { swatches: NAMES.map(name => ({ shade: name, value: tramAccents[name] })) },
]
