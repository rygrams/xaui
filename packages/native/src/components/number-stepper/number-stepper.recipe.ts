import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type {
  NumberStepperSize,
  NumberStepperSlot,
  NumberStepperVariant,
} from './number-stepper.type'

const SLOTS = [
  'root',
  'track',
  'value',
  'button',
  'buttonContent',
  'buttonGlyph',
  'buttonExhausted',
] as const

/**
 * The variant colours the **buttons**, because they are what a finger is aimed at. The pill
 * under them is the ground they are raised off, and it is the same soft grey at every level
 * that has a pill at all.
 *
 * **No `bgPressed`.** Each button owns its own press state — two buttons on one control are
 * two targets, and a root that does not know which one is down cannot resolve a colour for
 * it — so the press is the shared `PressableFeedback` treatment, exactly as the
 * `CloseButton`'s is.
 */
const VARIANT_TOKENS: Record<NumberStepperVariant, VariantTokens> = {
  primary: { bg: 'accent', fg: 'accentForeground' },
  // `surface` and not `default`: the pill under it is already `defaultSoft`, and two greys
  // a shade apart is a button that has stopped reading as raised.
  secondary: { bg: 'surface', fg: 'foreground', border: 'border' },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
}

type SizeStep = {
  /** The buttons' diameter, in spacing steps — `spacing(9)` is 36 on the base-4 scale. */
  button: number
  /**
   * How far the pill is inset from the top and bottom of the control.
   *
   * That inset **is** the overhang: the buttons are the control's full height and the pill
   * is shorter, so the two circles stand proud of the ground between them. A pill as tall
   * as its buttons is a segmented control, which says "pick one" rather than "more of it".
   */
  inset: number
  /** The room either side of the number, so a three-digit value does not touch a button. */
  gutter: number
  value: FontSizeKey
  /** The bar's length, as the mark inside a button. */
  glyph: FontSizeKey
}

/** `md` is the `Button`'s own control height, so a stepper lines up with one beside it. */
const SIZES: Record<NumberStepperSize, SizeStep> = {
  xs: { button: 7, inset: 0.75, gutter: 2, value: 'sm', glyph: 'sm' },
  sm: { button: 8, inset: 1, gutter: 2.5, value: 'md', glyph: 'md' },
  md: { button: 9, inset: 1, gutter: 3, value: 'lg', glyph: 'lg' },
  lg: { button: 11, inset: 1.25, gutter: 3.5, value: 'xl', glyph: 'xl' },
}

function sizeAxis(size: NumberStepperSize) {
  const step = SIZES[size]

  return (theme: XAUITheme): SlotStyles<NumberStepperSlot> => {
    const side = theme.spacing(step.button)
    const inset = theme.spacing(step.inset)

    return {
      root: { height: side },
      // Inset top and bottom, and pinned to both ends: the pill runs the whole width of the
      // control and under both buttons, which is what makes it read as one object.
      track: {
        top: inset,
        bottom: inset,
        borderRadius: (side - inset * 2) / 2,
      },
      value: {
        paddingHorizontal: theme.spacing(step.gutter),
        fontSize: theme.fontSizes[step.value],
      },
      button: { width: side, height: side, borderRadius: side / 2 },
      buttonGlyph: { width: theme.fontSizes[step.glyph] },
    }
  }
}

export const numberStepperRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    // The pill is the root's own ground rather than a slot: it sits behind every slot and
    // is inset from the root's own height, neither of which a sibling in a row can be.
    // `start` / `end`, never `left` / `right` (R13).
    track: {
      position: 'absolute',
      start: 0,
      end: 0,
      backgroundColor: theme.colors.defaultSoft,
    },
    // The number is on the pill, not on a button, so it keeps the page's own ink whatever
    // the buttons are painted — which is why `paint` below does not touch it.
    value: {
      color: theme.colors.foreground,
      fontWeight: theme.fontWeights.medium,
      fontFamily: theme.fontFamilies.body,
      textAlign: 'center',
      // The `Badge`'s two rules, for the `Badge`'s reason: a number inside a box of a
      // fixed height must not be the thing that decides that height. Android reserves
      // leading above and below the glyphs, and the scale's own leading is taller than the
      // control at the small end — between them a `lineHeight` here is a row a point or two
      // taller than its buttons. The root centres the number anyway.
      includeFontPadding: false,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderCurve: 'continuous',
      // Raised off the pill, which is the whole shape: a flat circle on a soft ground is a
      // hole in it. Dark mode drops the surface shadow, so this is a role and not a lift.
      ...theme.shadows.surface,
    },
    // Absolute, because the plus is this bar and a second one a quarter turn from it, and
    // the two have to overlap at the centre rather than stack.
    buttonGlyph: {
      position: 'absolute',
      height: theme.borderWidth.default * 1.5,
      borderRadius: theme.borderWidth.default,
    },
    // The button's **content**, so a spent button fades its mark and keeps its fill.
    //
    // Dimming the box instead is what makes it translucent, and a translucent button stops
    // hiding the pill it is raised off: the ground reads straight through the circle. It is
    // also the wrong thing to say — the affordance is gone, the button is still there.
    //
    // Not a state on the button either: the two run out of room at opposite ends of the
    // range, so which one is spent is the slot's own question and not the root's.
    // `start` / `end`, never `left` / `right` (R13) — which is also why this is written
    // out rather than taken from `StyleSheet.absoluteFillObject`.
    buttonContent: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonExhausted: { opacity: theme.opacity.disabled },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    button: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    buttonGlyph: { backgroundColor: colors.fg },
  }),

  variants: {
    size: {
      xs: sizeAxis('xs'),
      sm: sizeAxis('sm'),
      md: sizeAxis('md'),
      lg: sizeAxis('lg'),
    },

    /** Declared after `size` so it overrides the circle the diameter made. */
    radius: radiusAxis('button'),
  },

  compoundVariants: [
    {
      // No pill, and no shadow under a button that has no ground to be raised off.
      when: { variant: 'ghost' },
      style: () => ({
        track: { backgroundColor: 'transparent' },
        button: { shadowOpacity: 0, elevation: 0 },
      }),
    },
    {
      // The border is the whole button, so it needs no lift either.
      when: { variant: 'tertiary' },
      style: () => ({ button: { shadowOpacity: 0, elevation: 0 } }),
    },
  ],

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'secondary', size: 'md' },
})
