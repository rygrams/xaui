import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { TramSize } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { ListBoxGroupSlot } from './list-box-group.type'

const SLOTS = ['root', 'section', 'header', 'footer'] as const

/** One drawing, so one row. */
const DRAWING = 'sections'

type SizeStep = {
  /** Spacing steps between two sections. */
  between: number
  /** Spacing steps between a header, its list and its footer. */
  within: number
}

/**
 * Proximity is all that groups a header with its rows — no section has a fill — so a
 * section's own gap is a quarter of the gap between two of them.
 */
const GROUP_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: { between: 6, within: 1 },
  md: { between: 8, within: 2 },
  lg: { between: 10, within: 2.5 },
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<ListBoxGroupSlot> => ({
    root: { gap: theme.spacing(step.between) },
    section: { gap: theme.spacing(step.within) },
  })
}

export const listBoxGroupRecipe = createRecipe({
  slots: SLOTS,

  // No fill for the group nor for a section: the lists sit on the ground.
  base: theme => ({
    root: { alignSelf: 'stretch' },
    section: { alignSelf: 'stretch' },
    header: { ...roleType('caption', theme), color: theme.colors.muted },
    footer: { ...roleType('caption', theme), color: theme.colors.muted },
  }),

  variants: {
    size: {
      sm: sizeAxis(GROUP_GEOMETRY.sm),
      md: sizeAxis(GROUP_GEOMETRY.md),
      lg: sizeAxis(GROUP_GEOMETRY.lg),
    },
  },

  states: {
    /** The words around a grey list are dimmed with it. */
    disabled: theme => ({
      header: { opacity: theme.opacity.disabled },
      footer: { opacity: theme.opacity.disabled },
    }),
  },

  defaultVariants: { variant: DRAWING, size: 'md' },
})
