import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import { checkGlyph } from '../../utils/check-glyph'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type { StepperSlot, StepperVariant } from './stepper.type'

const SLOTS = [
  'root',
  'item',
  'track',
  'connector',
  'connectorDone',
  'indicator',
  'indicatorCurrent',
  'indicatorCompleted',
  'mark',
  'markCurrent',
  'check',
  'content',
  'title',
  'titleUpcoming',
  'description',
] as const

/**
 * One variant, and two roles: **the accent is the progress**.
 *
 * A stepper reports where you are rather than how loud it is, so there is no emphasis
 * ladder to walk — what a `color` should move is the travelled part of the line, the ring
 * around the step you are on and the disc behind the ones you are past. Those three are
 * the accent, and `fg` is what a check has to read against once it is on that disc.
 *
 * **The untravelled track is deliberately not a role.** `border` and `muted` are written
 * from the theme in `base` below, so they stay neutral under a tint: a stepper coloured
 * `#7c3aed` paints its progress purple and leaves the road ahead grey, which is the whole
 * point of showing progress at all.
 */
const VARIANT_TOKENS: Record<StepperVariant, VariantTokens> = {
  default: { bg: 'accent', fg: 'accentForeground' },
}

type SizeStep = {
  /** The indicator's diameter, in spacing steps. */
  indicator: number
  /** The connector's thickness, in points — a line is not a gap. */
  stroke: number
  /** The check's stroke, which is heavier than the line it replaces. */
  tick: number
  /** Between the track and the content, along whichever axis the item runs. */
  gap: number
  /** What a vertical step leaves under its content for the line to run through. */
  run: number
  mark: FontSizeKey
  title: FontSizeKey
  description: FontSizeKey
}

/**
 * `size` moves the indicator and the type — **never a width**. A vertical stepper is as
 * wide as its parent lets it be and a horizontal one splits that width evenly, which is
 * RN's own behaviour and the reason there is no `fullWidth` prop here either.
 *
 * `md`'s indicator is twenty-eight points, HeroUI's, measured off their own stepper.
 */
const SIZES: Record<Size, SizeStep> = {
  xs: {
    indicator: 5,
    stroke: 1,
    tick: 1.5,
    gap: 2,
    run: 4,
    mark: 'xs',
    title: 'sm',
    description: 'xs',
  },
  sm: {
    indicator: 6,
    stroke: 1,
    tick: 2,
    gap: 2.5,
    run: 5,
    mark: 'xs',
    title: 'md',
    description: 'sm',
  },
  md: {
    indicator: 7,
    stroke: 2,
    tick: 2,
    gap: 3,
    run: 6,
    mark: 'sm',
    title: 'md',
    description: 'sm',
  },
  lg: {
    indicator: 8,
    stroke: 2,
    tick: 2.5,
    gap: 3.5,
    run: 7,
    mark: 'md',
    title: 'lg',
    description: 'md',
  },
}

/**
 * The connector is given **both** a width and a height, and the orientation axis then adds
 * the `flex` that picks which one survives: flex governs the main axis and leaves the
 * cross axis to the explicit value. One line of data covers a rail that runs down and a
 * rail that runs across, instead of eight compound variants that would say the same thing.
 */
function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<StepperSlot> => {
    const side = theme.spacing(step.indicator)

    return {
      item: { gap: theme.spacing(step.gap) },
      connector: { width: step.stroke, height: step.stroke },
      indicator: { width: side, height: side },
      mark: {
        fontSize: theme.fontSizes[step.mark],
        lineHeight: theme.lineHeights[step.mark],
      },
      check: checkGlyph(side, step.tick),
      title: {
        fontSize: theme.fontSizes[step.title],
        lineHeight: theme.lineHeights[step.title],
      },
      description: {
        fontSize: theme.fontSizes[step.description],
        lineHeight: theme.lineHeights[step.description],
      },
    }
  }
}

/**
 * Vertical is the layout that can carry a description: the indicator sits at the **top**
 * of the text beside it rather than centred on it, and the line runs down through whatever
 * height that text takes.
 *
 * Horizontal centres each indicator over its label and gives every step the same width, so
 * the circles land at even intervals whatever their labels say. That is why the track
 * stretches and carries a line on **both** sides of the indicator: two halves meeting at
 * the item boundary draw one continuous rail, where a single trailing line would have to
 * reach across a neighbour it cannot measure.
 */
const ORIENTATIONS = {
  vertical: (): SlotStyles<StepperSlot> => ({
    root: { flexDirection: 'column' },
    item: { flexDirection: 'row', alignItems: 'stretch' },
    track: { flexDirection: 'column', alignItems: 'center' },
    connector: { flexGrow: 1, flexBasis: 0 },
    content: { flex: 1 },
  }),

  horizontal: (): SlotStyles<StepperSlot> => ({
    root: { flexDirection: 'row', alignItems: 'flex-start' },
    item: { flexDirection: 'column', alignItems: 'center', flex: 1 },
    track: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' },
    connector: { flexGrow: 1, flexBasis: 0 },
    content: { alignItems: 'center' },
  }),
}

/**
 * The one thing the two axes genuinely cross on: how far a vertical step's content reaches
 * past its own text, which is the space the line has to run through and therefore the gap
 * between two steps. A horizontal step has no such space — its neighbour is beside it —
 * so only the vertical half is written.
 */
const VERTICAL_RUN = (Object.keys(SIZES) as Size[]).map(size => ({
  when: { size, orientation: 'vertical' } as const,
  style: (theme: XAUITheme): SlotStyles<StepperSlot> => ({
    content: { paddingBottom: theme.spacing(SIZES[size].run) },
  }),
}))

export const stepperRecipe = createRecipe({
  slots: SLOTS,

  /**
   * The neutral half of the component, written from the theme rather than from a role so
   * that a `color` cannot reach it — see `VARIANT_TOKENS`.
   *
   * Each of the three statuses is a base slot plus, for the two that differ, an overlay
   * the item lays on top: `indicator` is what an upcoming step looks like, and
   * `indicatorCurrent` and `indicatorCompleted` are what the other two add. That keeps the
   * status out of the cache key and inside the tint pass at the same time — an axis would
   * have given up the second, because `tint` re-runs `paint` and the states, not the axes.
   */
  base: theme => ({
    connector: { backgroundColor: theme.colors.border },
    indicator: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.full,
      borderWidth: theme.borderWidth.default,
      borderColor: theme.colors.border,
      borderCurve: 'continuous',
    },
    mark: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
    },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.foreground,
    },
    titleUpcoming: { color: theme.colors.muted },
    description: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    connectorDone: { backgroundColor: colors.bg },
    indicatorCurrent: { borderColor: colors.bg },
    indicatorCompleted: { backgroundColor: colors.bg, borderColor: colors.bg },
    markCurrent: { color: colors.bg },
    // A completed step marks itself with the tick rather than with its number, so `fg`
    // lands on the glyph and there is no completed mark colour to name.
    check: { borderColor: colors.fg },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    orientation: ORIENTATIONS,
  },

  compoundVariants: VERTICAL_RUN,

  defaultVariants: { variant: 'default', size: 'md', orientation: 'vertical' },
})

export type { StepperSlot }
