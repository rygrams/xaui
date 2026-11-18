import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { TabsSlot } from './tabs.type'

/** `triggerDisabled` is not a node: it is what a tab that cannot be chosen adds to its own. */
const SLOTS = [
  'root',
  'list',
  'trigger',
  'triggerDisabled',
  'label',
  'indicator',
  'content',
] as const

type RecipeSlot = TabsSlot | 'triggerDisabled'

export const DEFAULT_SIZE: TramSize = 'md'

type SizeStep = {
  /** The Tram type role of a title. */
  type: TramTypeRole
  /** Spacing steps between two titles. */
  gap: number
}

/**
 * A title is `subtitle`, `title` or `section`; a tab is 40, 48 or 56 tall — the theme's
 * control heights, so a row of tabs stands level with a field of the same size. `sm` is
 * under the 48 touch target, which the trigger makes up with its `hitSlop`.
 */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { type: 'subtitle', gap: 4 },
  md: { type: 'title', gap: 5 },
  lg: { type: 'section', gap: 6 },
}

function sizeAxis(size: TramSize) {
  const step = SIZES[size]

  return (theme: XAUITheme): SlotStyles<RecipeSlot> => ({
    list: { gap: theme.spacing(step.gap) },
    trigger: { height: theme.controlHeights[size] },
    label: roleType(step.type, theme),
  })
}

/** The `radius` axis under the Tram ceiling: the rule is the only thing here with a corner. */
function cornerAxis(): Record<RadiusKey, StyleFn<RecipeSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<RecipeSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      indicator: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

/**
 * A row of titles, and nothing else: no track, no box, no rule. Native's three variants
 * are three grounds for the row, and a Metro row has none — so there is no `variant`, and
 * no variant tokens for an accent to land on. The chosen tab is read by its colour alone.
 *
 * The two colours of a title are not written on `label`: they are the two ends of a fade,
 * which the root hands to the label as values.
 */
export const tabsRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { gap: theme.spacing(3) },
    // The content of a row that scrolls: the titles in a line, level on their middles.
    list: { flexDirection: 'row', alignItems: 'center' },
    trigger: { flexDirection: 'row', alignItems: 'center' },
    triggerDisabled: { opacity: theme.opacity.disabled },
    label: { color: theme.colors.muted },
    // Only drawn when the caller writes `Tabs.Indicator`. The accent as a line, so the
    // theme's ink of it: 4.5:1 on the ground.
    indicator: {
      position: 'absolute',
      bottom: 0,
      start: 0,
      height: theme.borderWidth.default,
      backgroundColor: theme.colors.focus,
    },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
    radius: cornerAxis(),
  },

  /** No `pressed`: a press shrinks the title and leaves its colour alone. */
  states: {
    disabled: theme => ({
      indicator: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})
