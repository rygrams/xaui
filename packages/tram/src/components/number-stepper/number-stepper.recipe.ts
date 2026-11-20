import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { cornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import { DRAWING_TOKENS, LINE_WIDTH } from '../button/button.recipe'
import type { NumberStepperSlot, NumberStepperVariant } from './number-stepper.type'

const SLOTS = ['root', 'track', 'value', 'button', 'glyph'] as const

export const DEFAULT_SIZE: TramSize = 'md'

export const DEFAULT_VARIANT: NumberStepperVariant = 'outline'

/**
 * A key's side and the bar its mark is drawn with, per size, and the value between them.
 * The keys are the `Button`'s boxes made square, a step under its heights — the stepper
 * sits in a row beside a label, where a 48 would outweigh it. The bars are the
 * `NumberField`'s.
 */
export const NUMBER_STEPPER_GEOMETRY: Record<
  TramSize,
  { side: number; bar: number; type: TramTypeRole; gap: number }
> = {
  sm: { side: 32, bar: 12, type: 'body', gap: 1 },
  md: { side: 40, bar: 14, type: 'subtitle', gap: 1 },
  lg: { side: 48, bar: 16, type: 'title', gap: 1.5 },
}

function sizeAxis(size: TramSize) {
  const { side, bar, type, gap } = NUMBER_STEPPER_GEOMETRY[size]

  return (theme: XAUITheme): SlotStyles<NumberStepperSlot> => ({
    root: { gap: theme.spacing(gap) },
    // At least a key wide, so a value going from 9 to 10 does not shift the plus.
    value: { ...roleType(type, theme), minWidth: side },
    button: { width: side, height: side },
    glyph: { width: bar },
  })
}

/** The `radius` axis under the Tram ceiling, on the keys. */
function cornerAxis(): Record<RadiusKey, StyleFn<NumberStepperSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<NumberStepperSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({ button: { borderRadius: cornerFor(key, theme.radius) } })
  }

  return axis
}

/**
 * Two square keys and the value between them, on the ground: no pill, no ring, no shadow.
 * The keys take the `Button`'s drawing tokens, so a stepper beside a button of the same
 * variant is the same colour; the value stays in the page's ink whatever the keys are.
 *
 * No `…Pressed` role: a pressed key keeps its colours, and leans. A key with nowhere left
 * to go is drawn as a disabled one — the root resolves the disabled state once more for it.
 */
export const numberStepperRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center' },
    // Out of flow and unpainted: Metro raises the keys off nothing. A caller's style draws it.
    track: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
    value: {
      color: theme.colors.foreground,
      textAlign: 'center',
      fontVariant: ['tabular-nums'],
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: LINE_WIDTH,
      borderRadius: cornerFor('lg', theme.radius),
    },
    // Absolute, because the plus is this bar and a second one a quarter turn from it.
    glyph: { position: 'absolute', height: LINE_WIDTH },
  }),

  variantTokens: DRAWING_TOKENS,

  paint: (_theme, colors) => ({
    button: {
      backgroundColor: colors.bg,
      borderColor: colors.border ?? 'transparent',
    },
    glyph: { backgroundColor: colors.fg },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
    radius: cornerAxis(),
  },

  states: {
    /** The `Button`'s: the fill goes, the line and the mark grey, dimmed. */
    disabled: (theme, colors) => ({
      value: { color: theme.colors.muted },
      button: {
        backgroundColor: 'transparent',
        borderColor: colors.bg || colors.border ? theme.colors.muted : 'transparent',
        opacity: theme.opacity.disabled,
      },
      glyph: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})
