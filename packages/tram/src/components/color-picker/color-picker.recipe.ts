import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import type { TramSize } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { ColorPickerLayout, ColorPickerSlot } from './color-picker.type'

const SLOTS = [
  'preview',
  'previewEmpty',
  'page',
  'title',
  'close',
  'grid',
  'group',
  'groupLabel',
  'swatches',
  'mosaicRow',
  'cell',
  'swatch',
  'swatchFill',
  'swatchName',
  'swatchNameKept',
  'ring',
  'ringLine',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

export const DEFAULT_LAYOUT: ColorPickerLayout = 'ramps'

/** The chip is the box's height less this, so it sits in the row with air above and below. */
const PREVIEW_INSET = 20

/** The line of an empty chip, and the gap between two squares of the mosaic. */
const LINE = 2

/** The chosen square's ring: a band of the ground at its edge, then the ink inside it. */
const RING_GROUND = 3
const RING_LINE = 2

function sizeAxis(size: TramSize) {
  return (theme: XAUITheme): SlotStyles<ColorPickerSlot> => {
    const chip = theme.controlHeights[size] - PREVIEW_INSET

    return { preview: { width: chip, height: chip } }
  }
}

const FILL = { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 } as const

/**
 * The field's chip, the page and the palette. The field itself is the Tram `DummyField`'s,
 * token for token, and is not restated here.
 *
 * The page is the `Select`'s: the ground, the page's inset, a light title. The palette is
 * the two Windows Phone pages of accents — `ramps` the WP7 list, a square of 48 and its
 * name, rows of 56 four apart; `mosaic` the WP8 grid, squares closed up 2 apart. No
 * corner anywhere: a square is the shape of a colour.
 */
export const colorPickerRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    preview: { flexShrink: 0 },
    // No fill: the colour is the chip's, and there is none yet. A line says the place waits.
    previewEmpty: { borderWidth: LINE, borderColor: theme.colors.muted },
    page: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing(6),
      gap: theme.spacing(4),
      backfaceVisibility: 'hidden',
    },
    title: { ...roleType('pivot', theme), color: theme.colors.foreground },
    // Pinned in the page's top-end corner; the slot adds the safe area to its top.
    close: { position: 'absolute', end: theme.spacing(4), zIndex: 1 },
    grid: {},
    group: { gap: theme.spacing(2) },
    groupLabel: { ...roleType('caption', theme), color: theme.colors.muted },
    swatches: {},
    mosaicRow: { flexDirection: 'row', gap: LINE },
    cell: { flex: 1 },
    swatch: {},
    swatchFill: {},
    swatchName: {
      ...roleType('subtitle', theme),
      color: theme.colors.foreground,
      flexShrink: 1,
    },
    // Disabled, the answer keeps the page's ink and the rest go grey: no accent is left,
    // and the choice is still read.
    swatchNameKept: { color: theme.colors.foreground },
    ring: {
      ...FILL,
      borderWidth: RING_GROUND,
      borderColor: theme.colors.background,
    },
    ringLine: {
      ...FILL,
      borderWidth: RING_LINE,
      borderColor: theme.colors.foreground,
    },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },

    layout: {
      ramps: theme => ({
        grid: { gap: theme.spacing(4) },
        swatches: { gap: theme.spacing(1) },
        // A square of 48 — the touch target — and a row a step taller, as the WP7 list.
        swatch: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing(4),
          height: TRAM_TOUCH_TARGET + theme.spacing(2),
        },
        swatchFill: { width: TRAM_TOUCH_TARGET, height: TRAM_TOUCH_TARGET },
      }),
      // Every gap is the line's: the squares read as one block of colour.
      mosaic: () => ({
        grid: { gap: LINE },
        swatches: { gap: LINE },
        swatch: { width: '100%', aspectRatio: 1 },
        swatchFill: { flex: 1 },
      }),
    },
  },

  states: {
    /** Grey names, colours kept: the grey is the state, and a colour greyed is another one. */
    disabled: theme => ({ swatchName: { color: theme.colors.muted } }),
  },

  defaultVariants: { size: DEFAULT_SIZE, layout: DEFAULT_LAYOUT },
})
