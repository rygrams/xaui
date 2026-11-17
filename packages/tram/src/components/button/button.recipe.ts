import { createRecipe, radiusAxis } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { FontSizeKey, XAUITheme } from '@xaui/native/theme'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import type { ButtonSlot, ButtonVariant } from './button.type'

const SLOTS = ['root', 'label', 'icon', 'spinner'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/**
 * The button's line. One point under the theme's 3: at 3 an outlined label reads as a
 * frame around a word rather than as a control, and the two small sizes had no room.
 */
const LINE_WIDTH = 2

/**
 * A variant names tokens and computes nothing. The line is always there, transparent
 * when the variant names no `border`, so the box is the same size in all four.
 *
 * No `…Pressed` role anywhere: a pressed Tram button keeps its colours. The press is the
 * tilt, and that is motion — the root's, not the recipe's.
 */
const VARIANT_TOKENS: Record<ButtonVariant, VariantTokens> = {
  contained: { bg: 'accent', border: 'accent', fg: 'accentForeground' },
  // No `border`: the soft slice is translucent, and a line of it over a fill of it would
  // show as a darker edge.
  flat: { bg: 'accentSoft', fg: 'accentSoftForeground' },
  outline: { border: 'accent', fg: 'accent' },
  text: { fg: 'accent' },
}

type SizeStep = {
  size: TramSize
  /** The Tram type role of the label. */
  type: TramTypeRole
  /** Spacing steps, not points. */
  padding: number
  gap: number
  glyph: FontSizeKey
}

/** The ring `Button.Spinner` turns: one of the two circles Tram allows itself. */
function ring(size: number): SlotStyles<ButtonSlot>['spinner'] {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: LINE_WIDTH,
    borderTopColor: 'transparent',
  }
}

/**
 * `size` drives height, padding, gap and type — never width. The heights are the
 * theme's control heights — 40, 48, 56, so `lg` is Windows Phone's. `sm` sits under the 48
 * touch target, which the root makes up with `hitSlop`.
 *
 * No `lineHeight`: the label is one line, centred by the row.
 */
function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<ButtonSlot> => ({
    root: {
      height: theme.controlHeights[step.size],
      paddingHorizontal: theme.spacing(step.padding),
      gap: theme.spacing(step.gap),
    },
    label: { fontSize: tramType[step.type].fontSize },
    icon: { fontSize: theme.fontSizes[step.glyph] },
    spinner: ring(theme.fontSizes[step.glyph]),
  })
}

export const buttonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: LINE_WIDTH,
      borderRadius: theme.radius.lg,
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.regular,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Flat, for every variant at once. A variant with no `border` role keeps a transparent
   * one rather than none, so a `text` button lines up with the boxed
   * button beside it.
   */
  paint: (_theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border ?? 'transparent',
    },
    label: { color: colors.fg },
    icon: { color: colors.fg },
    spinner: { borderColor: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis({
        size: 'sm',
        type: 'body',
        padding: 2.5,
        gap: 2,
        glyph: 'lg',
      }),
      md: sizeAxis({
        size: 'md',
        type: 'subtitle',
        padding: 3,
        gap: 2,
        glyph: 'xl',
      }),
      lg: sizeAxis({
        size: 'lg',
        type: 'subtitle',
        padding: 3.5,
        gap: 2.5,
        glyph: '2xl',
      }),
    },

    radius: radiusAxis('root'),

    isIconOnly: {
      true: () => ({ root: { paddingHorizontal: 0, aspectRatio: 1 } }),
    },
  },

  states: {
    /**
     * The fill goes and the line and the label grey — a bare label has no line to grey — dimmed as well, which on true black
     * lands on the design's `#4d4d4d` without a colour of its own.
     */
    disabled: (theme, colors) => ({
      root: {
        backgroundColor: 'transparent',
        borderColor: colors.bg || colors.border ? theme.colors.muted : 'transparent',
        opacity: theme.opacity.disabled,
      },
      label: { color: theme.colors.muted },
      icon: { color: theme.colors.muted },
      spinner: { borderColor: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: 'contained', size: DEFAULT_SIZE },
})
