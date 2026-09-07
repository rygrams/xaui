import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type {
  EmptyStateSize,
  EmptyStateSlot,
  EmptyStateVariant,
} from './empty-state.type'

const SLOTS = [
  'root',
  'header',
  'media',
  'mediaIcon',
  'mediaGlyph',
  'title',
  'description',
  'content',
] as const

/**
 * `bgSelected` is the icon's circle, `fgSelected` the mark on it, and `border` the outline —
 * the three things a raw `color` has to reach, and roles are what survive a re-tint. The
 * title and the description are not among them: an empty state's words are the page's ink,
 * and tinting them would make the quietest thing on the screen the loudest.
 *
 * `fgSelected` names a `*Foreground` token, which is what tells `resolveTint` to answer with
 * the **contrast colour on the tint** rather than with the tint itself — without it a grey
 * mark would sit on a saturated circle, which is how this was found on screen.
 */
const VARIANT_TOKENS: Record<EmptyStateVariant, VariantTokens> = {
  // Nothing at all: the empty state sits on whatever is already there. It is the default
  // because most empty states fill a screen, and a screen already has a ground.
  plain: { bgSelected: 'default', fgSelected: 'defaultForeground' },
  surface: { bg: 'surface', bgSelected: 'default', fgSelected: 'defaultForeground' },
  outlined: {
    border: 'border',
    bgSelected: 'default',
    fgSelected: 'defaultForeground',
  },
}

type SizeStep = {
  /** The circle the `icon` media variant draws. */
  media: number
  /** Between the media, the words and the buttons, in spacing steps. */
  gap: number
  /** The whole block's own inset. */
  padding: number
  title: FontSizeKey
  description: FontSizeKey
  /** A glyph inside the circle, in points. */
  glyph: number
}

/**
 * `size` moves the media, the gaps and the type — **never a height**. An empty state is as
 * tall as what is in it, and how tall the space it fills is, is the layout's business.
 */
const SIZES: Record<EmptyStateSize, SizeStep> = {
  xs: { media: 40, gap: 2, padding: 4, title: 'sm', description: 'xs', glyph: 18 },
  sm: { media: 48, gap: 2.5, padding: 5, title: 'md', description: 'sm', glyph: 22 },
  md: { media: 64, gap: 3, padding: 6, title: 'lg', description: 'md', glyph: 28 },
  lg: { media: 80, gap: 4, padding: 8, title: 'xl', description: 'md', glyph: 34 },
}

/** The glyph size the media publishes, read as a value — an `Icon` takes props, not styles. */
export function emptyStateGlyph(size: EmptyStateSize): number {
  return SIZES[size].glyph
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<EmptyStateSlot> => ({
    root: { padding: theme.spacing(step.padding), gap: theme.spacing(step.gap) },
    header: { gap: theme.spacing(step.gap * 0.5) },
    mediaIcon: {
      width: step.media,
      height: step.media,
      borderRadius: step.media / 2,
    },
    title: {
      fontSize: theme.fontSizes[step.title],
      lineHeight: theme.lineHeights[step.title],
    },
    description: {
      fontSize: theme.fontSizes[step.description],
      lineHeight: theme.lineHeights[step.description],
    },
    content: { gap: theme.spacing(step.gap * 0.75) },
  })
}

/** How long a line of description is allowed to be before it wraps, in characters. */
const DESCRIPTION_WIDTH = 320

export const emptyStateRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      borderCurve: 'continuous',
    },
    header: { alignItems: 'center' },
    media: { alignItems: 'center', justifyContent: 'center' },
    mediaIcon: { alignItems: 'center', justifyContent: 'center' },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.foreground,
      textAlign: 'center',
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
      textAlign: 'center',
      // A description that runs the width of a tablet is a paragraph nobody reads. It is a
      // ceiling rather than a width, so on a phone the column still decides.
      maxWidth: DESCRIPTION_WIDTH,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mediaGlyph: { color: theme.colors.muted },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
      // Dashed, and only where there is an edge to dash: a broken line says "this is a
      // container waiting to be filled", where a solid one says "this is a panel".
      borderStyle: colors.border ? 'dashed' : undefined,
    },
    mediaIcon: { backgroundColor: colors.bgSelected },
    // A slot that renders nothing and is read as a value: an `Icon` is a third party's
    // component and takes `color` as a prop, so this is where the mark's colour is named.
    mediaGlyph: { color: colors.fgSelected },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** The outlined variant's corner. A `plain` one has no edge to round. */
    radius: radiusAxis('root'),
  },

  defaultVariants: { variant: 'plain', size: 'md', radius: '2xl' },
})
