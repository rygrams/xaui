import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize } from '../../theme/tram-tokens'
import { BUTTON_STEPS, LINE_WIDTH } from '../button/button.recipe'
import type { ToggleButtonSlot, ToggleButtonVariant } from './toggle-button.type'

const SLOTS = ['root', 'label', 'icon'] as const

export const DEFAULT_SIZE: TramSize = 'md'

export const DEFAULT_VARIANT: ToggleButtonVariant = 'outline'

/** Where a button is drawn: a box of its own, or a case of a group's row or column. */
export type ToggleButtonPlace = 'alone' | 'row' | 'column'

/**
 * The height of a case inside a group: the size's own, less the group's frame above and
 * below, so a group stands as tall as a button of its size.
 */
export function cellHeight(theme: XAUITheme, size: TramSize): number {
  return theme.controlHeights[size] - 2 * LINE_WIDTH
}

/**
 * `size` is the `Button`'s, step for step — 40, 48, 56 tall, the same type and the same
 * paddings: a toggle is a button that keeps its state.
 */
function sizeAxis(size: TramSize) {
  const step = BUTTON_STEPS[size]

  return (theme: XAUITheme): SlotStyles<ToggleButtonSlot> => ({
    root: {
      height: theme.controlHeights[size],
      paddingHorizontal: theme.spacing(step.padding),
      gap: theme.spacing(step.gap),
    },
    label: { fontSize: tramType[step.type].fontSize },
    icon: { fontSize: theme.fontSizes[step.glyph] },
  })
}

/**
 * The `radius` axis as a box's: the theme's value, never past 2 — `full` included,
 * since a toggle is never a circle. Without `radius` there is no corner at all.
 */
function cornerAxis(): Record<RadiusKey, StyleFn<ToggleButtonSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<ToggleButtonSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      root: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

/**
 * Geometry only. The colours are the two ends of a fade — released and chosen — and they
 * move on a shared value, so they are computed by `toggleTones` and set by the root's
 * animated style, never cached here.
 */
export const toggleButtonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // As wide as what it holds, as in Native: a column does not stretch it.
      alignSelf: 'flex-start',
      // The `Button`'s line. A `text` toggle keeps it, transparent, so that it lines up
      // with a boxed one beside it.
      borderWidth: LINE_WIDTH,
      borderRadius: 0,
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.regular,
    },
  }),

  variants: {
    size: {
      sm: sizeAxis('sm'),
      md: sizeAxis('md'),
      lg: sizeAxis('lg'),
    },

    radius: cornerAxis(),

    isIconOnly: {
      true: () => ({ root: { paddingHorizontal: 0, aspectRatio: 1 } }),
    },

    /**
     * A case of a group has no line and no corner: the group draws the frame and the bars,
     * and the case's fill runs up to both. Down a column the labels start at the start.
     */
    place: {
      alone: () => ({}),
      row: () => ({ root: { borderWidth: 0, borderRadius: 0, alignSelf: 'auto' } }),
      column: () => ({
        root: {
          borderWidth: 0,
          borderRadius: 0,
          alignSelf: 'stretch',
          justifyContent: 'flex-start',
        },
      }),
    },
  },

  defaultVariants: { size: DEFAULT_SIZE, place: 'alone' },
})
