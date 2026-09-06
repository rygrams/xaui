import { createRecipe } from '../../system/recipe'
import type { SlotStyles } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import { SIZES as LIST_SIZES } from './list.recipe'
import type { ListGroupSlot } from './list-group.type'
import type { ListSize } from './list.type'

const SLOTS = ['root', 'section', 'header', 'footer'] as const

type SizeStep = {
  /** Between two sections. Wide enough that a footer reads as this section's, not the next one's. */
  gap: number
  /** Between a header, its list and its footer — a fraction of the gap above. */
  sectionGap: number
  type: FontSizeKey
}

/**
 * The group's whole geometry: how far apart two sections sit, and how close a header sits
 * to the list it heads.
 *
 * **The ratio is the point.** A header two thirds as far from its list as from the section
 * above it is what makes the screen read as sections rather than as a stack of headings and
 * cards — proximity is the only thing grouping them, since nothing draws a box around a
 * section.
 */
const SIZES: Record<ListSize, SizeStep> = {
  xs: { gap: 5, sectionGap: 1.5, type: 'xs' },
  sm: { gap: 6, sectionGap: 2, type: 'xs' },
  md: { gap: 6, sectionGap: 2, type: 'sm' },
  lg: { gap: 7, sectionGap: 2.5, type: 'md' },
}

function sizeAxis(size: ListSize) {
  const { gap, sectionGap, type } = SIZES[size]

  return (theme: XAUITheme): SlotStyles<ListGroupSlot> => {
    // A header inset by anything but the row's own padding puts the heading and the text
    // it heads on two different left edges. R13 — `paddingStart` / `paddingEnd`, so it is
    // the leading edge in RTL too.
    const inset = theme.spacing(LIST_SIZES[size].padding)

    return {
      root: { gap: theme.spacing(gap) },
      section: { gap: theme.spacing(sectionGap) },
      header: {
        fontSize: theme.fontSizes[type],
        lineHeight: theme.lineHeights[type],
        paddingStart: inset,
        paddingEnd: inset,
      },
      footer: {
        fontSize: theme.fontSizes[type],
        lineHeight: theme.lineHeights[type],
        paddingStart: inset,
        paddingEnd: inset,
      },
    }
  }
}

/**
 * The group paints no container of its own, and has no `variantTokens` for that reason: a
 * list resolves its own colours because it can be given a `variant` the group did not
 * choose, and a group that painted would be painting over the list that disagreed with it.
 *
 * What it does own is the type of its headings, which belongs to the group rather than to
 * any one list — a screen whose sections were headed at two sizes is not sectioned.
 */
export const listGroupRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { width: '100%' },
    header: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      // Quieter than the rows it heads: a heading that competes with the list under it is
      // read first and remembered instead of it.
      color: theme.colors.muted,
    },
    footer: { fontFamily: theme.fontFamilies.body, color: theme.colors.muted },
  }),

  variants: {
    size: {
      xs: sizeAxis('xs'),
      sm: sizeAxis('sm'),
      md: sizeAxis('md'),
      lg: sizeAxis('lg'),
    },
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { size: 'md' },
})
