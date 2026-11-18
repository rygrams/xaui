import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { StyleFn } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { LINE_WIDTH } from '../button/button.recipe'
import type { ToggleButtonGroupSlot } from './toggle-button-group.type'

const SLOTS = ['root', 'bar'] as const

function cornerAxis(): Record<RadiusKey, StyleFn<ToggleButtonGroupSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<ToggleButtonGroupSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      root: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

/**
 * One box: a frame in a line of ink, the `Button`'s 2, and a bar of the same line between
 * every two buttons, across the whole of the frame. The buttons have no line of their
 * own, so there is never a line laid over another one, and the fill of a chosen button
 * runs up to the frame and the bars.
 *
 * The frame takes the width of what it holds; stretched, its buttons share the width.
 * The frame and the bars stay in the ink whatever is chosen; disabled, they are grey.
 */
export const toggleButtonGroupRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      alignSelf: 'flex-start',
      alignItems: 'stretch',
      borderWidth: LINE_WIDTH,
      borderRadius: 0,
      borderColor: theme.colors.foreground,
    },
    bar: { alignSelf: 'stretch', backgroundColor: theme.colors.foreground },
  }),

  variants: {
    orientation: {
      horizontal: () => ({
        root: { flexDirection: 'row' },
        bar: { width: LINE_WIDTH },
      }),
      vertical: () => ({
        root: { flexDirection: 'column' },
        bar: { height: LINE_WIDTH },
      }),
    },

    radius: cornerAxis(),
  },

  states: {
    disabled: theme => ({
      root: { borderColor: theme.colors.muted },
      bar: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: { orientation: 'horizontal' },
})
