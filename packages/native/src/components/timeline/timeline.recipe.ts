import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { TimelineSize, TimelineSlot, TimelineStatus } from './timeline.type'

const SLOTS = [
  'root',
  'item',
  'leading',
  'rail',
  'marker',
  'markerRing',
  'connector',
  'content',
  'title',
  'description',
] as const

/**
 * One entry's ink, per status.
 *
 * `bg` is the dot and `fg` is a glyph on it. `current` names the accent for both and is drawn
 * as a **ring** rather than a disc — the slot below is what makes it hollow, because the
 * difference between "done" and "being done" should survive a colour-blind reader.
 *
 * **A tint reaches two of the six, and the root is what decides that** — not this table. A
 * token named `success` is a bare name, so `resolveTint` maps it to the tint like any other;
 * the roles here cannot express "leave this one alone". A timeline's greens and reds mean
 * *succeeded* and *failed*, and a tint that repainted them would be a tint that lied, so the
 * root names the two it may reach.
 */
const VARIANT_TOKENS: Record<TimelineStatus, VariantTokens> = {
  default: {
    bg: 'foreground',
    fg: 'background',
    bgSelected: 'foreground',
    fgSelected: 'background',
  },
  muted: { bg: 'separator', fg: 'muted' },
  current: {
    bg: 'accent',
    fg: 'accentForeground',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
  success: { bg: 'success', fg: 'successForeground' },
  warning: { bg: 'warning', fg: 'warningForeground' },
  danger: { bg: 'danger', fg: 'dangerForeground' },
}

type SizeStep = {
  /** The dot's diameter. */
  marker: number
  /** The rail's column at its narrowest — a composed marker wider than the dot widens it. */
  rail: number
  /** How thick the connector is. */
  line: number
  title: FontSizeKey
  description: FontSizeKey
  leading: FontSizeKey
  /** A glyph inside a marker, in points. */
  glyph: number
}

const SIZES: Record<TimelineSize, SizeStep> = {
  sm: {
    marker: 10,
    rail: 20,
    line: 2,
    title: 'sm',
    description: 'xs',
    leading: 'xs',
    glyph: 10,
  },
  md: {
    marker: 12,
    rail: 24,
    line: 2,
    title: 'md',
    description: 'sm',
    leading: 'xs',
    glyph: 12,
  },
  lg: {
    marker: 16,
    rail: 28,
    line: 2,
    title: 'lg',
    description: 'md',
    leading: 'sm',
    glyph: 16,
  },
}

/**
 * The row's measurements, read as values — the rail and the time column place themselves by
 * arithmetic rather than by a style.
 *
 * **Everything hangs off one number: `line`, the middle of the title's first line.** That is
 * the height an entry reads at, so the dot, the time and the title all have to meet there,
 * and each of them is a different height. Hand-picked insets are what put them a point or
 * three apart at `md` and `lg` — derived from the title's own line height, they cannot drift,
 * and a theme that changes `lineHeights` keeps them together.
 */
export function timelineRail(
  theme: XAUITheme,
  size: TimelineSize
): {
  width: number
  marker: number
  line: number
  inset: number
  leadInset: number
  glyph: number
} {
  const { rail, marker, glyph, title, leading } = SIZES[size]
  const line = theme.lineHeights[title] / 2

  return {
    width: rail,
    marker,
    glyph,
    line,
    // How tall the rail's upper half is on a `start` entry: what is left of the line once the
    // marker's own half is taken off it, so the marker's centre lands on the line.
    inset: timelineInset(line, marker),
    // The same line, for a column of times whose type is smaller than the title's.
    leadInset: timelineInset(line, theme.lineHeights[leading]),
  }
}

/**
 * The upper half of the line for something of a given height — the one piece of arithmetic in
 * this component, written once because the dot, the time and a composed marker all need it.
 *
 * It clamps at zero: something taller than the title's line cannot be centred on it without
 * hanging off the top of the entry, and a list whose first row bleeds over its own edge is
 * worse than a marker a point low.
 */
export function timelineInset(line: number, height: number): number {
  return Math.max(0, line - height / 2)
}

/** How much air under an entry, in spacing steps. */
const DENSITY = { compact: 3, comfortable: 5 } as const

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<TimelineSlot> => ({
    leading: {
      fontSize: theme.fontSizes[step.leading],
      lineHeight: theme.lineHeights[step.leading],
    },
    // **`minWidth`, not `width`.** A composed rail carries a marker of your own — a circled
    // icon, a number — and one wider than the dot would otherwise spill out of a fixed column
    // and land on the words beside it. The column takes the marker's width instead, and the
    // line stays centred in it either way.
    rail: { minWidth: step.rail },
    marker: {
      width: step.marker,
      height: step.marker,
      borderRadius: step.marker / 2,
    },
    markerRing: {
      width: step.marker,
      height: step.marker,
      borderRadius: step.marker / 2,
      borderWidth: step.line,
    },
    connector: { width: step.line, borderRadius: step.line },
    title: {
      fontSize: theme.fontSizes[step.title],
      lineHeight: theme.lineHeights[step.title],
    },
    description: {
      fontSize: theme.fontSizes[step.description],
      lineHeight: theme.lineHeights[step.description],
    },
  })
}

export const timelineRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // No `gap`, and that is the one measurement this component cannot have: the rail runs
    // the full height of its entry, so the air between two entries has to be *inside* the
    // one above — a gap on the root would be a break in the line.
    root: { flexDirection: 'column' },
    // The gutter between the three columns, and it has to be a `gap` on the row rather than
    // air inside the rail: the rail's own slack is what centres the dot, so widening it to
    // make room for the text moves the line instead of moving the text.
    item: { flexDirection: 'row', gap: theme.spacing(2) },
    leading: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
      textAlign: 'right',
      // Same-width digits, which is the other half of making a column of times a column:
      // right-aligning proportional figures still leaves `11:06` and `10:43` starting at
      // different places, and a stack of times that each begin somewhere else reads ragged.
      fontVariant: ['tabular-nums'],
    },
    rail: { alignItems: 'center' },
    marker: { alignItems: 'center', justifyContent: 'center' },
    markerRing: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    // It fills whatever the rail leaves it, which is what makes one line out of an entry's
    // own padding and the next entry's top.
    connector: { flexGrow: 1, backgroundColor: theme.colors.separator },
    content: { flex: 1, gap: theme.spacing(0.5) },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.foreground,
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    marker: { backgroundColor: colors.bg },
    // The ring takes the colour on its edge and keeps the page behind it, which is what
    // makes "being done" tell itself apart from "done" without relying on a hue.
    markerRing: { borderColor: colors.bg },
  }),

  variants: {
    size: { sm: sizeAxis(SIZES.sm), md: sizeAxis(SIZES.md), lg: sizeAxis(SIZES.lg) },

    /**
     * The air under an entry, and it belongs to the **content** rather than to the entry.
     *
     * A padding on the entry is inside its box, so the rail — a child of that box — stops
     * above it and the line breaks at every step. On the content it makes the row taller
     * instead, and the rail, stretched to the row, runs through it. That is the one
     * measurement in this component that has to be in the right place, and it was found by
     * looking at a timeline with four gaps in its line.
     */
    density: {
      compact: (theme: XAUITheme): SlotStyles<TimelineSlot> => ({
        content: { paddingBottom: theme.spacing(DENSITY.compact) },
      }),
      comfortable: (theme: XAUITheme): SlotStyles<TimelineSlot> => ({
        content: { paddingBottom: theme.spacing(DENSITY.comfortable) },
      }),
    },
  },

  defaultVariants: { variant: 'default', size: 'md', density: 'comfortable' },
})
