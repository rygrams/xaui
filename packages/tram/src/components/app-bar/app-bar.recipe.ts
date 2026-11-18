import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { DISC_LINE, DISC_SIZE } from '../../system/disc-size'
import type { DiscSize } from '../../system/disc-size'
import type { TramSize } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { AppBarMode, AppBarPlacement, AppBarSlot } from './app-bar.type'

const SLOTS = [
  'root',
  'row',
  'button',
  'label',
  'more',
  'dot',
  'menu',
  'menuItem',
  'menuItemLabel',
  'scrim',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

export const DEFAULT_PLACEMENT: AppBarPlacement = 'bottom'

export const DEFAULT_MODE: AppBarMode = 'default'

/** The Metro App Bar held four buttons; what does not fit goes in its menu. */
export const MAX_BUTTONS = 4

/**
 * The band's padding over and under the circles, in points: a 40-point circle makes a
 * 56-point band, over the safe area — the `Fab`'s.
 */
const BAND_PADDING = 8

/**
 * The room on each side of a circle, in points: where its label spreads, and half the
 * gap to the next one. Four `md` buttons between the two ends of the strip fit a
 * 360-point screen; past that a button gives up room, never less than the touch target.
 */
const CELL_SIDE = 12

/**
 * The "…": the thin strip a `minimal` bar folds to, and the box it is pressed in, at the
 * end of the band's top edge — and the room left at the start, so that the circles stay
 * centred. `hitSlop` reaches 48 over and under it.
 */
export const MORE_BOX = { width: 48, height: 28 } as const

const DOT = { size: 4, gap: 4 } as const

/** A menu entry: a Metro list row, 48 tall, the text on the phone's margin. */
const MENU_ITEM = { height: 48, margin: 24 } as const

/** The menu's padding over its first entry and under its last one. */
const MENU_PADDING = 8

/** The width a button takes in the row: its circle and the room for its label. */
export function cellOf({ diameter }: DiscSize): number {
  return diameter + 2 * CELL_SIDE
}

function sizeAxis({ diameter }: DiscSize) {
  return (): SlotStyles<AppBarSlot> => ({
    button: {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
    },
  })
}

/**
 * The Metro App Bar, flat. A band of the discreet `surface`, edge to edge, with no line
 * and no shadow; circles drawn with a thin line and no fill; a menu of words in the band's
 * ink. The colours of the circles are not here: the root picks them with `discPaint`,
 * from `accent`, `color` and the disabled state.
 *
 * No `pressed` state: the press is the tilt.
 */
export const appBarRecipe = createRecipe({
  slots: SLOTS,

  base: (theme: XAUITheme) => ({
    root: { backgroundColor: theme.colors.surface },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: BAND_PADDING,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: DISC_LINE,
    },
    // The App Bar's label: a caption in the band's ink, centred under its button.
    label: { ...roleType('caption', theme), textAlign: 'center' },
    more: {
      width: MORE_BOX.width,
      height: MORE_BOX.height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: DOT.gap,
    },
    // One of the circles Tram allows itself: a dot is round at any radius.
    dot: {
      width: DOT.size,
      height: DOT.size,
      borderRadius: DOT.size / 2,
      backgroundColor: theme.colors.surfaceForeground,
    },
    menu: { paddingVertical: MENU_PADDING },
    menuItem: {
      minHeight: MENU_ITEM.height,
      justifyContent: 'center',
      paddingHorizontal: MENU_ITEM.margin,
    },
    menuItemLabel: { ...roleType('subtitle', theme) },
    scrim: { backgroundColor: theme.colors.backdrop },
  }),

  variants: {
    size: {
      sm: sizeAxis(DISC_SIZE.sm),
      md: sizeAxis(DISC_SIZE.md),
      lg: sizeAxis(DISC_SIZE.lg),
    },
  },

  defaultVariants: { size: DEFAULT_SIZE },
})
