import { createRecipe } from '@xaui/native/system'

const SLOTS = ['root'] as const

/**
 * A page is the ground, edge to edge: what turns is the whole screen, so the page under
 * it never shows through a page at rest.
 */
export const pageRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flex: 1, backgroundColor: theme.colors.background },
  }),
})
