import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import type { MenuItemVariant, MenuSlot } from './menu.type'

const SLOTS = [
  'trigger',
  'overlay',
  'content',
  'label',
  'group',
  'item',
  'itemTitle',
  'itemDescription',
  'itemIndicator',
] as const

/**
 * Two rows, and the variant belongs to the **row** rather than to the menu. A menu has no
 * emphasis of its own — it is the theme's floating surface, like the `Popover` — but one
 * row in it can be the destructive one, and a list where "Supprimer" reads like "Renommer"
 * is the list that gets misread.
 *
 * The panel is resolved once and both faces of the row with it, so a row picks its own
 * without a slot ever touching the recipe (R5).
 */
const VARIANT_TOKENS: Record<MenuItemVariant, VariantTokens> = {
  default: { fg: 'overlayForeground' },
  danger: { fg: 'danger' },
}

/**
 * The widest a `content-fit` menu measures, as a multiple of the body size.
 *
 * Fifteen ems, two above the `Popover`'s thirteen: a menu row is a title with an indicator
 * beside it and sometimes a sentence under it, where a popover is prose alone. Wide enough
 * that "Remettre à zéro, et fermer" stays on one line, and not so wide that a list of
 * one-word actions reads as a sheet.
 */
export function menuMeasure(fontSize: number): number {
  return fontSize * 15
}

/** HeroUI's, in spacing steps: the panel is inset less than its rows are padded. */
const PANEL_PADDING_HORIZONTAL = 1.5
const PANEL_PADDING_VERTICAL = 3
const ITEM_PADDING_HORIZONTAL = 2.5
const ITEM_PADDING_VERTICAL = 2
const ITEM_GAP = 2.5
const LABEL_INSET = 3
/** The check's box, sized so a row never shifts when one appears. */
const INDICATOR = 5

export const menuRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    overlay: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
    content: {
      position: 'absolute',
      backgroundColor: theme.colors.overlay,
      paddingHorizontal: theme.spacing(PANEL_PADDING_HORIZONTAL),
      paddingVertical: theme.spacing(PANEL_PADDING_VERTICAL),
      // Their `--radius-3xl` on a base of 8 is 24; our base is 12, so the same 24 is `2xl`.
      borderRadius: theme.radius['2xl'],
      borderCurve: 'continuous',
      ...theme.shadows.overlay,
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      color: theme.colors.muted,
      // Inset to the row's own text rather than to the panel: a heading that starts
      // before the rows it heads reads as a heading for the panel.
      marginStart: theme.spacing(LABEL_INSET),
      paddingVertical: theme.spacing(1),
    },
    group: { flexDirection: 'column' },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(ITEM_GAP),
      paddingHorizontal: theme.spacing(ITEM_PADDING_HORIZONTAL),
      paddingVertical: theme.spacing(ITEM_PADDING_VERTICAL),
      borderRadius: theme.radius.lg,
      borderCurve: 'continuous',
    },
    itemTitle: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      fontSize: theme.fontSizes.md,
      lineHeight: theme.lineHeights.md,
      // Grows into the row so an indicator stays pinned to the end, whatever the label's
      // length — but from its **content** size rather than from zero.
      //
      // `flex: 1` is `flexBasis: 0`, and the panel is measured before it has a width: with
      // a basis of zero and no definite width to grow into, the row's content size is
      // nothing and the title collapses. The whole menu measured as a 70-point capsule
      // with no text in it. HeroUI writes `flex: 1` here and gets away with it because
      // their measuring pass hands the panel a definite width; ours asks the panel how
      // wide it wants to be, which is a question a zero basis cannot answer.
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
    },
    itemDescription: {
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      color: theme.colors.muted,
    },
    itemIndicator: {
      width: theme.spacing(INDICATOR),
      height: theme.spacing(INDICATOR),
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /** The variant paints the row's text and nothing else. The panel is the theme's. */
  paint: (_theme, colors): SlotStyles<MenuSlot> => ({
    itemTitle: { color: colors.fg },
    itemIndicator: { color: colors.fg },
  }),

  variants: { radius: radiusAxis('content') },

  states: {
    pressed: (theme: XAUITheme) => ({
      item: { backgroundColor: theme.colors.defaultSoftPressed },
    }),
    disabled: theme => ({ trigger: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default' },
})
