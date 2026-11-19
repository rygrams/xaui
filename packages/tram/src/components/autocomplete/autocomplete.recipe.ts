import { createRecipe } from '@xaui/native/system'
import { roleType } from '../typography/typography.role'

/**
 * Only what searching adds to the `Select`: the line a list says when nothing matches.
 * The box, the rows and the page are the `Select`'s recipe, resolved by its root.
 */
export const autocompleteRecipe = createRecipe({
  slots: ['empty'] as const,

  base: theme => ({
    empty: { ...roleType('body', theme), color: theme.colors.muted },
  }),

  variants: {
    mode: {
      // Unfolded under the field, it sits where a row would, inset as the rows are by the
      // root, which reads the field's padding.
      inline: theme => ({ empty: { paddingVertical: theme.spacing(3) } }),
      // On a page it is the page's content, under the search.
      fullscreen: theme => ({ empty: { paddingVertical: theme.spacing(2) } }),
    },
  },

  defaultVariants: { mode: 'fullscreen' },
})
