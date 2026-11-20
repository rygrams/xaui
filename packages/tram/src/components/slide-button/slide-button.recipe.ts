import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { FontSizeKey, RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { LINE_WIDTH } from '../button/button.recipe'
import { roleType } from '../typography/typography.role'
import type { SlideButtonSlot } from './slide-button.type'

const SLOTS = [
  'root',
  'face',
  'fill',
  'label',
  'labelDone',
  'thumb',
  'thumbDone',
  'glyph',
  'check',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'block'

/**
 * The accent is the thumb, the trail's soft slice and the box once it is filled; the text
 * on it is the accent's foreground. The line and the label at rest are the page's ink in
 * every accent, and are named in `base`.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: {
    bg: 'accentSoft',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
}

/**
 * From the inside of the line to the thumb, on every side — the Metro lock screen's
 * margin. The box is a control height plus this twice, and the thumb a control height
 * wide: 48 / 56 / 64 boxes around 40 / 48 / 56 thumbs.
 */
export const THUMB_INSET = 4

type SizeStep = {
  /** The Tram type role of the label. */
  type: TramTypeRole
  /** The side of the built-in chevron, in points: a drawn mark, not a gap. */
  chevron: number
  /** The size an `Icon` in the thumb takes. */
  glyph: FontSizeKey
}

/**
 * The three sizes. The height leads — a slide is a target before it is type — and the
 * label follows the drawing's 15 / 17 / 20 onto the nearest roles of the Tram scale.
 */
export const SLIDE_BUTTON_SIZES: Record<TramSize, SizeStep> = {
  sm: { type: 'body', chevron: 8, glyph: 'lg' },
  md: { type: 'body', chevron: 9, glyph: 'xl' },
  lg: { type: 'subtitle', chevron: 11, glyph: '2xl' },
}

/** The thumb's width for a size — what the travel is shortened by. */
export function thumbWidthFor(size: TramSize, theme: XAUITheme): number {
  return theme.controlHeights[size]
}

function sizeAxis(size: TramSize) {
  const step = SLIDE_BUTTON_SIZES[size]

  return (theme: XAUITheme): SlotStyles<SlideButtonSlot> => {
    const thumbWidth = thumbWidthFor(size, theme)
    // Clear of the thumb at both ends, so the label stays centred on the box and never
    // runs under the thumb at rest or once it has arrived.
    const clear = THUMB_INSET + thumbWidth + theme.spacing(3)

    return {
      // The line is inside the height, so the thumb is the control height less the line.
      root: { height: theme.controlHeights[size] + THUMB_INSET * 2 },
      label: { start: clear, end: clear, ...roleType(step.type, theme) },
      thumb: { width: thumbWidth },
      // Turned, the square's lit corner stands a third of its side past the middle: the
      // margin pulls the mark back to the optical centre, toward the start — mirrored
      // under RTL with no code, as a margin is.
      glyph: {
        width: step.chevron,
        height: step.chevron,
        marginEnd: Math.round(step.chevron * 0.5),
      },
      // An L half as tall as it is wide, turned into a tick — lifted by the same reasoning.
      check: {
        width: Math.round(step.chevron * 1.4),
        height: Math.round(step.chevron * 0.7),
        marginBottom: Math.round(step.chevron * 0.4),
      },
    }
  }
}

/**
 * The `radius` axis under the Tram ceiling, on the box and the thumb at once — `full`
 * included: both are rectangles, and neither becomes a pill.
 */
function cornerAxis(): Record<RadiusKey, StyleFn<SlideButtonSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<SlideButtonSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => {
      const borderRadius = boxCornerFor(key, theme.radius)

      return { root: { borderRadius }, thumb: { borderRadius } }
    }
  }

  return axis
}

export const slideButtonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const borderRadius = boxCornerFor('lg', theme.radius)

    return {
      // A box of fixed height holding absolutely-placed children — the face, the trail,
      // the label, the thumb — so none of them pushes the others as it moves. The
      // `Button`'s line, in the ink, and no fill at rest.
      root: {
        width: '100%',
        justifyContent: 'center',
        borderWidth: LINE_WIDTH,
        borderColor: theme.colors.foreground,
        borderRadius,
      },
      // The accent the box fills with once confirmed, inside the line; the line itself
      // turns to the same colour beside it.
      face: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
      },
      fill: { position: 'absolute', top: 0, bottom: 0, start: 0 },
      // No `top` or `bottom`: the root's `justifyContent` centres it.
      label: {
        position: 'absolute',
        textAlign: 'center',
        color: theme.colors.foreground,
      },
      // `start`, never `left`: the thumb rests at the leading edge.
      thumb: {
        position: 'absolute',
        top: THUMB_INSET,
        bottom: THUMB_INSET,
        start: THUMB_INSET,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius,
      },
      // Two lines of a square, a quarter turn round: the lit edges are `top` and `end`,
      // and the root turns it the other way under RTL, so it points where the thumb goes.
      glyph: {
        position: 'absolute',
        borderTopWidth: LINE_WIDTH,
        borderEndWidth: LINE_WIDTH,
      },
      check: {
        position: 'absolute',
        borderBottomWidth: LINE_WIDTH,
        borderStartWidth: LINE_WIDTH,
      },
    }
  },

  variantTokens: VARIANT_TOKENS,

  /** Flat fills: the accent is a block here, never read as a line on the ground. */
  paint: (_theme, colors) => ({
    face: { backgroundColor: colors.bgSelected },
    fill: { backgroundColor: colors.bg },
    labelDone: { color: colors.fgSelected },
    thumb: { backgroundColor: colors.bgSelected },
    thumbDone: { backgroundColor: colors.fgSelected },
    glyph: { borderColor: colors.fgSelected },
    check: { borderColor: colors.bgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis('sm'),
      md: sizeAxis('md'),
      lg: sizeAxis('lg'),
    },

    /** After `size`, so a caller's corner wins over the Tram default. */
    radius: cornerAxis(),
  },

  states: {
    /**
     * Everything grey and no accent left — a confirmed box that is disabled is filled
     * with the grey, the thumb inverted on it. Dimmed as well, which on true black lands
     * on the design's `#4d4d4d` without a colour of its own.
     */
    disabled: theme => ({
      root: { borderColor: theme.colors.muted, opacity: theme.opacity.disabled },
      face: { backgroundColor: theme.colors.muted },
      fill: { backgroundColor: 'transparent' },
      label: { color: theme.colors.muted },
      labelDone: { color: theme.colors.background },
      thumb: { backgroundColor: theme.colors.muted },
      thumbDone: { backgroundColor: theme.colors.background },
      glyph: { borderColor: theme.colors.background },
      check: { borderColor: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})
