import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { StyleFn } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import { cornerFor } from '../../theme/tram-corner'
import { faintFill } from '../../system/faint-fill'
import type { SkeletonSlot } from './skeleton.type'

const SLOTS = ['root'] as const

/** Square by default; up to the Tram corner, or `full` for a circle — the `Avatar`'s rule. */
function cornerAxis(): Record<RadiusKey, StyleFn<SkeletonSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<SkeletonSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({ root: { borderRadius: cornerFor(key, theme.radius) } })
  }

  return axis
}

/**
 * One flat block in the page's grey, no `paint`: the grey is not a theme token but a
 * fifth of the page's ink over its ground (`faintFill`), and a raw `color` is drawn as
 * given rather than derived into a tint — there is one thing on a block to colour.
 */
export const skeletonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      backgroundColor:
        faintFill(theme.colors.foreground, theme.colors.background) ??
        theme.colors.muted,
    },
  }),

  variants: { radius: cornerAxis() },
})
