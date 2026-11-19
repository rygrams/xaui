import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { FontSizeKey, XAUITheme } from '@xaui/native/theme'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { NumberPadSlot } from './number-pad.type'

const SLOTS = [
  'root',
  'row',
  'key',
  'label',
  'icon',
  'ghostLabel',
  'ghostIcon',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

type SizeStep = {
  /** The key's height, in points: a thumb's target, at least the 48 of a control. */
  height: number
  /** Spacing steps between two keys, across and down. */
  gap: number
  /** The digit, in a light role of the Tram scale, and what a bare cell holds. */
  digit: TramTypeRole
  ghost: TramTypeRole
  glyph: FontSizeKey
}

const SIZES: Record<TramSize, SizeStep> = {
  sm: { height: 48, gap: 1, digit: 'title', ghost: 'body', glyph: 'xl' },
  md: { height: 56, gap: 1, digit: 'section', ghost: 'subtitle', glyph: '2xl' },
  lg: { height: 64, gap: 1.5, digit: 'pivot', ghost: 'subtitle', glyph: '3xl' },
}

function sizeAxis(size: TramSize) {
  const step = SIZES[size]

  return (theme: XAUITheme): SlotStyles<NumberPadSlot> => ({
    root: { gap: theme.spacing(step.gap) },
    row: { gap: theme.spacing(step.gap) },
    key: { height: step.height },
    label: roleType(step.digit, theme),
    ghostLabel: roleType(step.ghost, theme),
    icon: { fontSize: theme.fontSizes[step.glyph] },
    ghostIcon: { fontSize: theme.fontSizes[step.glyph] },
  })
}

/**
 * The Metro dialer: three columns of keys with no fill, no line and no corner — the digit
 * alone on the ground, light, centred, in the page's ink. The backspace and the free cell
 * are the same bare cell holding something smaller.
 *
 * No `…Pressed` role: a pressed key keeps its colours, and shrinks a little.
 */
export const numberPadRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'column' },
    row: { flexDirection: 'row' },
    key: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    label: { color: theme.colors.foreground, fontVariant: ['tabular-nums'] },
    icon: { color: theme.colors.foreground },
    ghostLabel: { color: theme.colors.foreground },
    ghostIcon: { color: theme.colors.foreground },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    /** Every digit and glyph grey. Not dimmed: the grey is the state. */
    disabled: theme => ({
      label: { color: theme.colors.muted },
      icon: { color: theme.colors.muted },
      ghostLabel: { color: theme.colors.muted },
      ghostIcon: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})
