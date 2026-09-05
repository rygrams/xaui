import { closeButtonBase } from '../../system/close-button/close-button.recipe'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, XAUITheme } from '../../theme/theme.type'
import type { TagGroupSize, TagGroupSlot, TagGroupVariant } from './tag-group.type'

const SLOTS = ['root', 'list', 'item', 'itemLabel', 'close', 'closeGlyph'] as const

/**
 * Two grounds, and they swap so a tag never disappears into what is behind it: `default`
 * is the neutral fill for a group on a card, `surface` the card colour for one on the page.
 *
 * A selected tag leaves both and takes the accent's soft slice — the only place this
 * component uses colour, and the reason `Chip` is not this: a chip is a piece of metadata
 * that is always the same, a tag is a piece of metadata you can turn on.
 */
const VARIANT_TOKENS: Record<TagGroupVariant, VariantTokens> = {
  default: { bg: 'default', fg: 'fieldForeground' },
  surface: { bg: 'surface', fg: 'fieldForeground' },
}

type SizeStep = {
  paddingVertical: number
  paddingHorizontal: number
  gap: number
  label: FontSizeKey
  radius: RadiusKey
  /** The remove button's box, so a tag with one is not taller than a tag without. */
  glyph: number
  /** The cross's bar, in spacing steps. It is smaller than the box it centres in. */
  cross: number
}

/** HeroUI's, step for step. */
const SIZES: Record<TagGroupSize, SizeStep> = {
  sm: {
    paddingVertical: 0.5,
    paddingHorizontal: 2,
    gap: 1,
    label: 'xs',
    cross: 1.75,
    radius: 'xl',
    glyph: 14,
  },
  md: {
    paddingVertical: 1,
    paddingHorizontal: 2.5,
    gap: 1,
    label: 'sm',
    cross: 2,
    radius: '2xl',
    glyph: 16,
  },
  lg: {
    paddingVertical: 1.5,
    paddingHorizontal: 3,
    gap: 1.5,
    label: 'md',
    cross: 2.25,
    radius: '3xl',
    glyph: 18,
  },
}

function sizeAxis(step: SizeStep) {
  const { paddingVertical, paddingHorizontal, gap, label, radius, glyph, cross } =
    step

  return (theme: XAUITheme): SlotStyles<TagGroupSlot> => ({
    item: {
      paddingVertical: theme.spacing(paddingVertical),
      paddingHorizontal: theme.spacing(paddingHorizontal),
      gap: theme.spacing(gap),
      borderRadius: theme.radius[radius],
    },
    itemLabel: {
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
    close: { width: glyph, height: glyph },
    closeGlyph: { width: theme.spacing(cross) },
  })
}

export const tagGroupRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // The cross's thickness and its centring are the shared button's, written once there.
    ...closeButtonBase(theme),
    root: { gap: theme.spacing(3) },
    /**
     * Wrapping is the point. A tag group is a set of the same kind of thing, and a set
     * that scrolls sideways hides how many of it there are — which is the one fact a
     * reader wants from a row of tags.
     */
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: theme.spacing(2),
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      borderCurve: 'continuous',
    },
    itemLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors): SlotStyles<TagGroupSlot> => ({
    item: { backgroundColor: colors.bg },
    itemLabel: { color: colors.fg },
    // The cross takes the label's colour, so it never outweighs the word beside it.
    closeGlyph: { backgroundColor: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /**
     * The selected face, resolved on the root beside the resting one so a group of forty
     * tags costs what a group of two costs and no slot touches the recipe (R5).
     */
    isSelected: {
      true: (theme: XAUITheme): SlotStyles<TagGroupSlot> => ({
        item: { backgroundColor: theme.colors.accentSoft },
        itemLabel: { color: theme.colors.accentSoftForeground },
        closeGlyph: { backgroundColor: theme.colors.accentSoftForeground },
      }),
    },

    radius: radiusAxis('item'),
  },

  states: {
    pressed: theme => ({
      item: { backgroundColor: theme.colors.defaultSoftPressed },
    }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default', size: 'md' },
})
