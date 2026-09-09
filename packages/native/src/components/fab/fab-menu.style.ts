import { StyleSheet } from 'react-native'
import type { FabMenuAlign } from './fab-menu.type'

/**
 * How the pills line up inside the column, per `align`.
 *
 * Pure geometry with no token in it, which is why it is here and not in the recipe — and
 * it cannot be in the recipe anyway: `align` is a prop of `FabMenu.Content`, and the
 * recipe resolves on the root, which never sees it.
 *
 * It has to follow `align` rather than being fixed at the trailing edge. The column is
 * `content-fit`, so it is as wide as its **widest** action — and every shorter one would
 * hug the far edge of a menu that had been asked to open from the leading one.
 */
export const fabMenuAlignment: Record<
  FabMenuAlign,
  { alignItems: 'flex-start' | 'center' | 'flex-end' }
> = StyleSheet.create({
  start: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
})
