import { createRecipe, radiusAxis } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { FontSizeKey, Size, XAUITheme } from '@xaui/native/theme'
import { tramType } from '../../theme/tram-tokens'
import type { TramTypeRole } from '../../theme/tram-tokens'
import { pressedColors } from './button.pressed'
import type { ButtonSlot, ButtonVariant } from './button.type'

const SLOTS = ['root', 'label', 'icon', 'spinner'] as const

export const DEFAULT_SIZE: Size = 'md'

/**
 * A variant names tokens and computes nothing. Every boxed variant names a `border`, the
 * fills in their own colour, so the box is the same size whether it is filled or
 * outlined. An outline also names `bgPressed`, the colour it fills with under the finger;
 * a fill names none and inverts — `pressedColors` reads exactly that difference.
 */
const VARIANT_TOKENS: Record<ButtonVariant, VariantTokens> = {
  primary: { bg: 'accent', border: 'accent', fg: 'accentForeground' },
  secondary: { border: 'accent', fg: 'accent', bgPressed: 'accent' },
  default: { bg: 'default', border: 'default', fg: 'defaultForeground' },
  tertiary: { border: 'border', fg: 'foreground', bgPressed: 'foreground' },
  ghost: { fg: 'accent' },
  danger: { bg: 'danger', border: 'danger', fg: 'dangerForeground' },
  'danger-soft': { border: 'danger', fg: 'danger', bgPressed: 'danger' },
}

type SizeStep = {
  size: Size
  /** The Tram type role of the label. */
  type: TramTypeRole
  /** Spacing steps, not points. */
  padding: number
  gap: number
  glyph: FontSizeKey
  /** The two small sizes draw a thinner line; unset, the theme's 3. */
  border?: number
}

/** The ring `Button.Spinner` turns: one of the two circles Tram allows itself. */
function ring(size: number): SlotStyles<ButtonSlot>['spinner'] {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 2,
    borderTopColor: 'transparent',
  }
}

/**
 * `size` drives height, padding, gap, border and type — never width. The heights are the
 * theme's control heights, so `lg` is the 56 of Windows Phone; `xs` and `sm` sit under
 * the 48 touch target, which the root makes up with `hitSlop`.
 *
 * No `lineHeight`: the label is one line, centred by the row.
 */
function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<ButtonSlot> => ({
    root: {
      height: theme.controlHeights[step.size],
      paddingHorizontal: theme.spacing(step.padding),
      gap: theme.spacing(step.gap),
      borderWidth: step.border ?? theme.borderWidth.default,
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
   * one rather than none: the width is the size's, so a `ghost` lines up with the boxed
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
      xs: sizeAxis({
        size: 'xs',
        type: 'caption',
        padding: 2,
        gap: 1.5,
        glyph: 'md',
        border: 2,
      }),
      sm: sizeAxis({
        size: 'sm',
        type: 'body',
        padding: 2.5,
        gap: 2,
        glyph: 'lg',
        border: 2,
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
    /** The inversion. The 0.96 scale is motion, and belongs to the root. */
    pressed: (theme, colors) => {
      const { fill, ink } = pressedColors(theme, colors)

      return {
        root: fill ? { backgroundColor: fill, borderColor: fill } : {},
        label: { color: ink },
        icon: { color: ink },
        spinner: { borderColor: ink },
      }
    },

    /**
     * The fill goes and the line and the label grey — dimmed as well, which on true black
     * lands on the design's `#4d4d4d` without a colour of its own.
     */
    disabled: (theme, colors) => ({
      root: {
        backgroundColor: 'transparent',
        borderColor: colors.border ? theme.colors.muted : 'transparent',
        opacity: theme.opacity.disabled,
      },
      label: { color: theme.colors.muted },
      icon: { color: theme.colors.muted },
      spinner: { borderColor: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: 'primary', size: DEFAULT_SIZE },
})
