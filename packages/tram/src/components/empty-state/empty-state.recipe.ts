import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import { LINE_WIDTH } from '../button/button.recipe'
import { DESCRIPTION_OPACITY } from '../card/card.recipe'
import type { EmptyStateSlot, EmptyStateVariant } from './empty-state.type'

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

export const DEFAULT_VARIANT: EmptyStateVariant = 'plain'

export const DEFAULT_SIZE: TramSize = 'md'

/**
 * `bgSelected` is the media's square and `fgSelected` the glyph on it: the accent and the
 * ink that reads on it, which a tint replaces with its own pair. The ground and the line
 * are the variant's alone — a tint never reaches them (the root reads only the square's
 * slots of it), so an `outlined` empty state keeps its quiet line whatever the accent.
 *
 * The line is `muted`, as `Surface`'s `secondary`: softer than the page's ink, an outline
 * round an empty space rather than a frame asking to be pressed.
 */
const SQUARE = { bgSelected: 'accent', fgSelected: 'accentForeground' } as const

const VARIANT_TOKENS: Record<EmptyStateVariant, VariantTokens> = {
  plain: { ...SQUARE },
  surface: { bg: 'surface', ...SQUARE },
  outlined: { border: 'muted', ...SQUARE },
}

type SizeStep = {
  /** All in spacing steps. */
  padding: number
  gap: number
  headerGap: number
  /** The side of the media's square — the `Avatar`'s 40, 56 and 72. */
  media: number
  /** The role the glyph on the square is set as tall as. */
  glyph: TramTypeRole
  title: TramTypeRole
  description: TramTypeRole
}

/**
 * A Metro page's empty list, at three scales: the title Light or SemiLight on the Tram
 * scale, the detail in running text under it. `md` is the mock-up's — 25 over 16.
 */
const SIZES: Record<TramSize, SizeStep> = {
  sm: {
    padding: 3,
    gap: 3,
    headerGap: 1.5,
    media: 10,
    glyph: 'subtitle',
    title: 'subtitle',
    description: 'caption',
  },
  md: {
    padding: 4,
    gap: 4,
    headerGap: 2,
    media: 14,
    glyph: 'title',
    title: 'title',
    description: 'body',
  },
  lg: {
    padding: 5,
    gap: 5,
    headerGap: 2.5,
    media: 18,
    glyph: 'section',
    title: 'section',
    description: 'body',
  },
}

/** The glyph size the media publishes, read as a value — an `Icon` takes props. */
export function emptyStateGlyph(size: TramSize): number {
  return tramType[SIZES[size].glyph].fontSize
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<EmptyStateSlot> => {
    const media = theme.spacing(step.media)

    return {
      root: { padding: theme.spacing(step.padding), gap: theme.spacing(step.gap) },
      header: { gap: theme.spacing(step.headerGap) },
      mediaIcon: { width: media, height: media },
      title: roleType(step.title, theme),
      description: roleType(step.description, theme),
      content: { gap: theme.spacing(step.headerGap) },
    }
  }
}

/** The Tram corner of 2 at most — `full` included: an empty state is a box. */
function cornerAxis(): Record<RadiusKey, StyleFn<EmptyStateSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<EmptyStateSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      root: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

/** How long a line of description may run before it wraps: a ceiling, not a width. */
const DESCRIPTION_WIDTH = 320

export const emptyStateRecipe = createRecipe({
  slots: SLOTS,

  // To the start, as a Metro page: the words read as the rest of the page does, not as a
  // message in the middle of it.
  base: theme => ({
    root: {
      alignItems: 'flex-start',
      borderRadius: boxCornerFor('lg', theme.radius),
    },
    header: { alignItems: 'flex-start' },
    media: { alignItems: 'center', justifyContent: 'center' },
    // A tile, sharp: the square the Metro list puts at the start of a row.
    mediaIcon: { alignItems: 'center', justifyContent: 'center' },
    title: { color: theme.colors.foreground },
    // The `Card`'s detail: the title's ink faded, which lands on `muted`.
    description: {
      color: theme.colors.foreground,
      opacity: DESCRIPTION_OPACITY,
      maxWidth: DESCRIPTION_WIDTH,
    },
    content: { flexDirection: 'row', alignItems: 'center' },
    mediaGlyph: { color: theme.colors.accentForeground },
  }),

  variantTokens: VARIANT_TOKENS,

  /** Flat, no shadow; the `Button`'s line of 2, solid, only where the variant names one. */
  paint: (_theme, colors) => ({
    root: {
      backgroundColor: colors.bg ?? 'transparent',
      borderColor: colors.border,
      borderWidth: colors.border ? LINE_WIDTH : 0,
    },
    mediaIcon: { backgroundColor: colors.bgSelected },
    // A slot that renders nothing and is read as a value, for the `Icon` on the square.
    mediaGlyph: { color: colors.fgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: cornerAxis(),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})
