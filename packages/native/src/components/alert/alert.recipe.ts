// The module and not the barrel: a recipe is style data, and the barrel would pull
// `CloseButtonBase` — and therefore Reanimated — into anything that only wants the geometry.
import { closeButtonGeometry } from '../../system/close-button/close-button.recipe'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, XAUITheme } from '../../theme/theme.type'
import type { AlertSize, AlertSlot, AlertVariant } from './alert.type'

const SLOTS = [
  'root',
  'icon',
  'iconGlyph',
  'content',
  'title',
  'description',
  'close',
  'closeGlyph',
] as const

/**
 * Nine lines of data. A variant **names tokens and computes nothing** — `paint` below is
 * the only place that decides where a colour lands.
 *
 * `default` is the `Card`'s `default`, token for token: an alert is a surface, and the
 * neutral one is the same surface a card is. The eight that follow are the `Chip`'s
 * status ladder, which is the other half of what an alert is.
 *
 * **No `bgPressed`.** An alert is not a control: the only thing you can press inside one
 * is its `Alert.Close`, and that has its own feedback.
 *
 * **A filled alert has no border.** The fill is what separates it from the background; an
 * edge on top of it is a second signal saying the same thing. The outlined alert is
 * `default` with `borderWidth` and `borderColor` as style props.
 */
const VARIANT_TOKENS: Record<AlertVariant, VariantTokens> = {
  default: { bg: 'surface', fg: 'surfaceForeground' },
  primary: { bg: 'accent', fg: 'accentForeground' },
  secondary: { bg: 'accentSoft', fg: 'accentSoftForeground' },
  success: { bg: 'success', fg: 'successForeground' },
  'success-soft': { bg: 'successSoft', fg: 'successSoftForeground' },
  warning: { bg: 'warning', fg: 'warningForeground' },
  'warning-soft': { bg: 'warningSoft', fg: 'warningSoftForeground' },
  danger: { bg: 'danger', fg: 'dangerForeground' },
  'danger-soft': { bg: 'dangerSoft', fg: 'dangerSoftForeground' },
}

/**
 * How far the description sits behind the title.
 *
 * HeroUI uses the `muted` token here. This is a fraction of the title's own colour
 * instead, for the reason the `Card` gives: an alert's foreground is not fixed — a
 * `danger` alert paints its text on a saturated red, and a grey `muted` on that is the one
 * combination that stops being readable. The value is `muted` solved for, so an untinted
 * alert renders the token and a tinted one still renders something legible.
 */
const DESCRIPTION_OPACITY = 0.6

/**
 * `size` drives padding, gaps, radius and type — **never a height**. An alert is a
 * surface: it is as tall as the message it carries and as wide as its parent lets it be.
 *
 * Two gaps, not one. `gap` separates the three columns of the row — icon, content, close
 * — and `contentGap` separates the title from its description. One value for both reads
 * as a list of four things rather than as a message with a heading.
 *
 * The icon's `paddingTop` is **half the title's leading**: a glyph is a solid box and a
 * line of text is not, so aligning their boxes puts the glyph visibly above the cap-height
 * it should sit level with. HeroUI hard-codes 3.5px for their single size; deriving it
 * gives the same 3 at `md` and keeps the other three sizes right.
 */
function sizeAxis(step: SizeStep) {
  const { padding, gap, contentGap, title, description, glyph, cross, radius } = step

  return (theme: XAUITheme): SlotStyles<AlertSlot> => ({
    root: {
      padding: theme.spacing(padding),
      gap: theme.spacing(gap),
      borderRadius: theme.radius[radius],
    },
    icon: { paddingTop: (theme.lineHeights[title] - theme.fontSizes[glyph]) / 2 },
    iconGlyph: { fontSize: theme.fontSizes[glyph] },
    content: { gap: theme.spacing(contentGap) },
    title: {
      fontSize: theme.fontSizes[title],
      lineHeight: theme.lineHeights[title],
    },
    description: {
      fontSize: theme.fontSizes[description],
      lineHeight: theme.lineHeights[description],
    },
    // The touch target is the glyph's box; the shared `CloseButtonBase` grows it outwards
    // with `hitSlop`, because a cross big enough to hit is a cross too big to look right.
    close: { width: theme.fontSizes[glyph], height: theme.fontSizes[glyph] },
    closeGlyph: { width: theme.spacing(cross) },
  })
}

type SizeStep = {
  /** Spacing steps, not pixels — `spacing(3)` is 12 on the base-4 scale. */
  padding: number
  /** Between the icon, the content and the close. */
  gap: number
  /** Inside the content — a title and its description. */
  contentGap: number
  title: FontSizeKey
  description: FontSizeKey
  /** The icon's box, and the close's. */
  glyph: FontSizeKey
  /** Length of one bar of the close's cross, in spacing steps. */
  cross: number
  radius: RadiusKey
}

/**
 * `md` is the anchor, and it is HeroUI's alert measured: 12pt of padding, a 12pt gap, a
 * 24pt radius, a 16/24 title above a 14/20 description, an 18pt icon. Their scale has a
 * single step; ours moves around that one, a step of type and a level of radius at a time.
 */
const SIZES: Record<AlertSize, SizeStep> = {
  xs: {
    padding: 2,
    gap: 2,
    contentGap: 0.5,
    title: 'xs',
    description: 'xs',
    glyph: 'sm',
    cross: 2,
    radius: 'lg',
  },
  sm: {
    padding: 2.5,
    gap: 2.5,
    contentGap: 0.5,
    title: 'sm',
    description: 'xs',
    glyph: 'md',
    cross: 2,
    radius: 'xl',
  },
  md: {
    padding: 3,
    gap: 3,
    contentGap: 1,
    title: 'md',
    description: 'sm',
    glyph: 'lg',
    cross: 2.5,
    radius: '2xl',
  },
  lg: {
    padding: 4,
    gap: 3.5,
    contentGap: 1,
    title: 'lg',
    description: 'md',
    glyph: 'xl',
    cross: 3,
    radius: '3xl',
  },
}

export const alertRecipe = createRecipe({
  slots: SLOTS,

  // The cross's own geometry — thickness and centring — belongs to the shared
  // `CloseButtonBase`; what stays below is the box and bar size this component's scale sets.
  base: theme => ({
    ...closeButtonGeometry(theme),
    root: {
      flexDirection: 'row',
      // Top-aligned, not centred: an alert's message can run to three lines, and an icon
      // floating beside the middle of a paragraph reads as decoration rather than as the
      // mark of what the paragraph is. A single-line alert centres itself with
      // `alignItems="center"` on the root — one prop, and it is the caller's call.
      alignItems: 'flex-start',
      borderWidth: 0,
      // iOS's squircle. Free on Android, and it is what makes a radius this large read as
      // a shape rather than as four arcs meeting straight edges.
      borderCurve: 'continuous',
      // Deliberately no `overflow: 'hidden'`: on iOS it clips the node's own shadow, so a
      // `default` alert would lose the elevation the variant just gave it.
    },
    // `flex: 1` and not `flexGrow`: the root is a row, so the content has to be measured
    // from a zero basis to take exactly what the icon and the close leave — the opposite
    // of the `Card`'s body, which grows in a column where a zero basis collapses it.
    content: { flex: 1 },
    // `medium`, not `semibold`. An alert's title sits in prose rather than on a control:
    // one weight above the description is enough to rank them.
    title: {
      fontFamily: theme.fontFamilies.heading,
      fontWeight: theme.fontWeights.medium,
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.regular,
      opacity: DESCRIPTION_OPACITY,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land, for every variant at once.
   *
   * The icon takes the **title's** colour rather than a status colour of its own — on a
   * `danger` alert the readable colour is the one the title already uses, and on a
   * `danger-soft` one that token *is* the red. HeroUI arrives at the same place from the
   * other direction, colouring the icon by status on a neutral surface; here the variant
   * decides both, and an icon that has to disagree with its alert says so itself with
   * `<Alert.Icon color={…} />`.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    iconGlyph: { color: colors.fg },
    title: { color: colors.fg },
    description: { color: colors.fg },
    closeGlyph: { backgroundColor: colors.fg },
  }),

  /** Declaration order is application order: `radius` overrides the radius `size` set. */
  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('root'),
  },

  /**
   * The elevation belongs to the one variant that is a surface standing on the background,
   * exactly as on the `Card`. A tinted alert already separates itself by its fill, and a
   * shadow under it would read as dirt. In dark mode the theme's `surface` shadow is
   * already nothing (§4), which is why this names the role instead of a set of numbers.
   */
  compoundVariants: [
    {
      when: { variant: 'default' },
      style: theme => ({ root: theme.shadows.surface }),
    },
  ],

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default', size: 'md' },
})
