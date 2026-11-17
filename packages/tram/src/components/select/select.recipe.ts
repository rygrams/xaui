import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { SelectSlot } from './select.type'

const SLOTS = [
  'trigger',
  'value',
  'placeholder',
  'indicator',
  'overlay',
  'content',
  'page',
  'title',
  'groupLabel',
  'item',
  'itemLabel',
  'itemDescription',
  'itemIndicator',
  'current',
  'itemDisabled',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

type SizeStep = {
  /** The chevron, in points. */
  glyph: number
  /** Spacing steps between the value and the chevron. */
  gap: number
  /** The Tram type role of an item's second line. */
  help: TramTypeRole
}

/**
 * Only what the list adds. The box, its line, its height and the type of the value are
 * the `TextField`'s, read off its recipe by the root — a select and a text field stacked
 * in one form are one control.
 */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { glyph: 16, gap: 2, help: 'caption' },
  md: { glyph: 20, gap: 2.5, help: 'caption' },
  lg: { glyph: 24, gap: 3, help: 'body' },
}

function sizeAxis(size: TramSize) {
  const step = SIZES[size]

  return (theme: XAUITheme): SlotStyles<SelectSlot> => ({
    trigger: { gap: theme.spacing(step.gap) },
    indicator: { fontSize: step.glyph },
    // A choice is pressed like a control of 48 at least, and never smaller than its field.
    item: { minHeight: Math.max(TRAM_TOUCH_TARGET, theme.controlHeights[size]) },
    itemDescription: roleType(step.help, theme),
  })
}

export const selectRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    value: { flex: 1 },
    placeholder: { color: theme.colors.fieldPlaceholder },
    // Not a node's own style — the root flattens it into the glyph's size and colour.
    indicator: { color: theme.colors.fieldForeground },
    // Nothing is drawn: it only catches the touch that lands outside the list.
    overlay: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
    // Laid over the field's row, inside the box: the box's height is what unfolds.
    content: { position: 'absolute', top: 0, start: 0, end: 0 },
    page: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing(6),
      paddingTop: theme.spacing(6),
      gap: theme.spacing(4),
      backfaceVisibility: 'hidden',
    },
    title: { ...roleType('caption', theme), color: theme.colors.foreground },
    groupLabel: { ...roleType('caption', theme), color: theme.colors.muted },
    item: { justifyContent: 'center' },
    itemLabel: { color: theme.colors.foreground },
    itemDescription: { color: theme.colors.muted },
    itemIndicator: { alignItems: 'center', justifyContent: 'center' },
    // The accent as text, so the theme's ink of it: 4.5:1 on the ground.
    current: { color: theme.colors.focus },
    itemDisabled: { color: theme.colors.muted },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },

    mode: {
      // In the field the choices are set like its value, which the root layers on.
      inline: theme => ({
        groupLabel: { paddingTop: theme.spacing(2) },
      }),
      // On a page they are the page's content: a title above, the choices in `section`.
      fullscreen: theme => ({
        item: { paddingVertical: theme.spacing(2) },
        itemLabel: roleType('section', theme),
        itemDescription: roleType('body', theme),
        groupLabel: { paddingTop: theme.spacing(4) },
      }),
    },
  },

  states: {
    /** Grey, and no accent left. Not dimmed: the grey is the state. */
    disabled: theme => ({
      value: { color: theme.colors.muted },
      placeholder: { color: theme.colors.muted },
      indicator: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { size: DEFAULT_SIZE, mode: 'inline' },
})
