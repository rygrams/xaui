import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import { DRAWING_TOKENS, LINE_WIDTH } from '../button/button.recipe'
import type { AccordionSlot, AccordionVariant } from './accordion.type'

const SLOTS = [
  'root',
  'container',
  'separator',
  'item',
  'trigger',
  'indicator',
  'indicatorBar',
  'content',
] as const

export const DEFAULT_VARIANT: AccordionVariant = 'ghost'

export const DEFAULT_SIZE: TramSize = 'md'

/**
 * No `border` on any of them. `primary` is the `Card`'s ground, `secondary` the
 * `Button`'s soft slice, and `tertiary` — Native's outline — is `ghost`.
 */
const VARIANT_TOKENS: Record<AccordionVariant, VariantTokens> = {
  primary: { bg: 'surface', fg: 'surfaceForeground' },
  secondary: DRAWING_TOKENS.flat,
  tertiary: { fg: 'foreground' },
  ghost: { fg: 'foreground' },
}

type SizeStep = {
  /** Points: the row as drawn, 48 at the least so the touch needs no reach. */
  row: number
  title: TramTypeRole
  /** Spacing steps, not points. */
  cross: number
  /** Under the open panel. */
  contentBottom: number
  /** From a filled ground's edge to the rows' text. */
  inset: number
}

/** A Metro list's rows at three scales, the title on the `Card`'s roles. */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { row: 48, title: 'body', cross: 3, contentBottom: 3, inset: 3 },
  md: { row: 56, title: 'subtitle', cross: 3.5, contentBottom: 4, inset: 4 },
  lg: { row: 64, title: 'title', cross: 4, contentBottom: 5, inset: 5 },
}

/** The square the plus is drawn in: the touch is the row's, so it only has to fit. */
const INDICATOR_SIDE = 6

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<AccordionSlot> => ({
    trigger: { minHeight: step.row, ...roleType(step.title, theme) },
    indicatorBar: { width: theme.spacing(step.cross) },
    content: { paddingBottom: theme.spacing(step.contentBottom) },
  })
}

/** The rows of a filled ground stand off its edge; on the page they run to it. */
function insetFor(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<AccordionSlot> => ({
    trigger: { paddingHorizontal: theme.spacing(step.inset) },
    content: { paddingHorizontal: theme.spacing(step.inset) },
  })
}

/** The Tram corner of 2 at most — `full` included: the accordion is a box. */
function cornerAxis(): Record<RadiusKey, StyleFn<AccordionSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<AccordionSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => {
      const borderRadius = boxCornerFor(key, theme.radius)
      return { root: { borderRadius }, container: { borderRadius } }
    }
  }

  return axis
}

const FILLED = ['primary', 'secondary'] as const

const SIZE_KEYS = ['sm', 'md', 'lg'] as const

export const accordionRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const borderRadius = boxCornerFor('lg', theme.radius)

    return {
      root: { flexDirection: 'column', borderRadius },
      // What the rows are clipped to, so a pressed row stays inside the corner.
      container: { flexDirection: 'column', overflow: 'hidden', borderRadius },
      // Clipped, so the panel unrolls with the row's height rather than spilling past it.
      item: { flexDirection: 'column', overflow: 'hidden' },
      trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing(3),
        paddingVertical: theme.spacing(2),
      },
      indicator: {
        width: theme.spacing(INDICATOR_SIDE),
        height: theme.spacing(INDICATOR_SIDE),
        alignItems: 'center',
        justifyContent: 'center',
      },
      // Square-ended, the `Button`'s line: the `CloseButton`'s bars, crossed upright.
      indicatorBar: { position: 'absolute', height: LINE_WIDTH },
    }
  },

  variantTokens: VARIANT_TOKENS,

  /** Flat, no line, no shadow: the ground is the root's, never a row's. */
  paint: (_theme, colors) => ({
    root: { backgroundColor: colors.bg ?? 'transparent' },
    trigger: { color: colors.fg },
    indicatorBar: { backgroundColor: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: cornerAxis(),
  },

  compoundVariants: FILLED.flatMap(variant =>
    SIZE_KEYS.map(size => ({
      when: { variant, size },
      style: insetFor(SIZES[size]),
    }))
  ),

  states: {
    // On the row: a disabled row fades and keeps its colours, as every Tram control.
    disabled: theme => ({ trigger: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})
