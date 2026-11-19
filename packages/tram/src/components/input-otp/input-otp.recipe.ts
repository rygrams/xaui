import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { accentInk } from '../../theme/accent-ink'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { InputOTPSlot, InputOTPVariant } from './input-otp.type'
import { faintLine } from './input-otp.utils'

const SLOTS = [
  'root',
  'group',
  'box',
  'filled',
  'active',
  'value',
  'placeholder',
  'caret',
  'separator',
] as const

export const DEFAULT_VARIANT: InputOTPVariant = 'primary'
export const DEFAULT_SIZE: TramSize = 'md'

/** The `TextField`'s line: a code is a row of fields one character wide. */
const LINE_WIDTH = 2

/**
 * How much of `muted` an empty box's line keeps over the ground. Faint enough that a
 * filled box — the line in the ink — reads as done, present enough to count the boxes
 * before anything is typed.
 */
const EMPTY_LINE_SHARE = 0.6

/** The caret's and the separator's thickness, at every size. */
const BAR = 2

type SizeStep = {
  /** The box, in points — a little taller than wide, like a digit. */
  width: number
  height: number
  /** The character in the box, on the Tram scale. */
  glyph: TramTypeRole
  /** Spacing steps between the boxes, and around a separator. */
  gap: number
  /** The separator's length, in points. */
  dash: number
}

/**
 * The box's geometry, which belongs to this control alone. A box has a width as well as a
 * height, and narrows — never widens — when the row runs out of room (`flexShrink` from
 * `width`, with no `flexGrow`).
 */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { width: 36, height: 44, glyph: 'subtitle', gap: 1.5, dash: 8 },
  md: { width: 44, height: 52, glyph: 'title', gap: 2, dash: 10 },
  lg: { width: 52, height: 60, glyph: 'section', gap: 2.5, dash: 12 },
}

function sizeAxis(size: TramSize) {
  const { width, height, glyph, gap, dash } = SIZES[size]

  return (theme: XAUITheme): SlotStyles<InputOTPSlot> => {
    const type = roleType(glyph, theme)

    return {
      root: { gap: theme.spacing(gap) },
      group: { gap: theme.spacing(gap) },
      // `width`, not `flexBasis`: a row measures itself on its children's width, and on
      // the web a basis alone left it — and its boxes — a character wide.
      box: { height, width },
      value: type,
      placeholder: type,
      // As tall as the character it stands in for.
      caret: { height: type.fontSize, width: BAR },
      separator: { height: BAR, width: dash },
    }
  }
}

/** The `radius` axis under the Tram ceiling — `full` included: the box is a box. */
function cornerAxis(): Record<RadiusKey, StyleFn<InputOTPSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<InputOTPSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      box: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

/** `danger` where it is read — a line: the ink, not the fill. */
function dangerInk(theme: XAUITheme): string {
  return accentInk(theme.colors.danger, theme.colors.background)
}

/**
 * Two drawings. `primary` is the ground inside a line — faint while the box is empty, the
 * ink once it holds a character. `secondary` is the discreet surface and no line: it names
 * no `border`, and `paint` reads that absence. `tertiary` is `primary`.
 */
const VARIANT_TOKENS: Record<InputOTPVariant, VariantTokens> = {
  primary: { bg: 'fieldBackground', border: 'fieldBorder', fg: 'fieldForeground' },
  secondary: { bg: 'surface', fg: 'surfaceForeground' },
  tertiary: { bg: 'fieldBackground', border: 'fieldBorder', fg: 'fieldForeground' },
}

/**
 * The box is a `TextField` box one character wide: a line of 2, no fill of its own beyond
 * the variant's, no shadow. `filled` and `active` are not nodes — they are the two lines
 * a box can take over its resting one, layered by `InputOTP.Box`.
 */
export const inputOTPRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center' },
    group: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 1,
      minWidth: 0,
    },
    box: {
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 0,
      flexShrink: 1,
      minWidth: 0,
      borderWidth: LINE_WIDTH,
      borderRadius: boxCornerFor('lg', theme.radius),
      overflow: 'hidden',
    },
    // The line and the caret in the accent, as ink: 4.5:1 on the ground.
    active: { borderColor: theme.colors.focus },
    value: { fontVariant: ['tabular-nums'] },
    placeholder: { color: theme.colors.muted, fontVariant: ['tabular-nums'] },
    caret: { position: 'absolute', backgroundColor: theme.colors.focus },
    separator: { backgroundColor: theme.colors.muted },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    box: {
      backgroundColor: colors.bg,
      borderColor: colors.border
        ? faintLine(theme.colors.muted, theme.colors.background, EMPTY_LINE_SHARE)
        : 'transparent',
    },
    filled: { borderColor: colors.border ?? 'transparent' },
    value: { color: colors.fg },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },

    radius: cornerAxis(),

    /** Every line in `danger`, the active one too: an error outranks the focus. */
    isInvalid: {
      true: theme => ({
        box: { borderColor: dangerInk(theme) },
        filled: { borderColor: dangerInk(theme) },
        active: { borderColor: dangerInk(theme) },
        caret: { backgroundColor: dangerInk(theme) },
      }),
    },
  },

  states: {
    /** Grey and no accent left, like the `TextField`. Not dimmed: the grey is the state. */
    disabled: (theme, colors) => ({
      filled: { borderColor: colors.border ? theme.colors.muted : 'transparent' },
      active: { borderColor: colors.border ? theme.colors.muted : 'transparent' },
      value: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})
