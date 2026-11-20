import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { faintFill } from '../../system/faint-fill'
import { SVG_FRAME } from '../../system/svg-frame'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize } from '../../theme/tram-tokens'
import { faceFor } from '../typography/typography.face'
import { roleType } from '../typography/typography.role'
import type { ChartSlot } from './chart.type'

const SLOTS = [
  'root',
  'plot',
  'label',
  'grid',
  'axis',
  'header',
  'heading',
  'footer',
  'title',
  'description',
  'value',
  'legend',
  'legendItem',
  'legendDot',
  'legendLabel',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/**
 * The plot's height, in points — Native's ladder. **Never a width**: a chart spans its
 * parent. Only the figure grows with `size`; the words around it keep their Tram roles.
 */
export const PLOT_HEIGHTS: Record<TramSize, number> = { sm: 140, md: 200, lg: 280 }

/** A legend entry's mark: a square of 10, the series' colour flat — not Native's dot. */
const LEGEND_SQUARE = 10

/** A reading's mark on a line or a radar: a square, as every Tram mark is, 6 a side. */
export const POINT_SIDE = 6

function sizeAxis(size: TramSize) {
  return (): SlotStyles<ChartSlot> => ({ plot: { height: PLOT_HEIGHTS[size] } })
}

/**
 * The words of a Metro figure: the title on the `title` role in **Light** (the Finance
 * app's), the description and every label on `caption`, the one number on `section`.
 */
function frameType(theme: XAUITheme): SlotStyles<ChartSlot> {
  const caption = roleType('caption', theme)

  return {
    title: {
      fontSize: tramType.title.fontSize,
      ...faceFor(theme.fontFamilies.heading, 'light'),
      color: theme.colors.foreground,
    },
    description: { ...caption, color: theme.colors.muted },
    value: {
      ...roleType('section', theme),
      color: theme.colors.foreground,
      // A number that grows a digit must not shift the words beside it.
      fontVariant: ['tabular-nums'],
    },
    legendLabel: { ...caption, color: theme.colors.foreground },
    label: {
      ...caption,
      color: theme.colors.muted,
      fontVariant: ['tabular-nums'],
    },
  }
}

export const chartRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    ...frameType(theme),
    // No ground, no line, no corner, no shadow — the `Table`'s rule: a Metro figure sits
    // on the page. The caller who wants a card puts it in a Tram `Card`. Only the layout
    // stays.
    root: { width: '100%', gap: theme.spacing(3) },
    // The labels beside the figure are placed in its own left-to-right frame.
    plot: { width: '100%', ...SVG_FRAME },
    // Pushed apart and wrapping: a long title takes the row and the legend drops under
    // it, rather than squeezing it.
    header: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      rowGap: theme.spacing(2),
      columnGap: theme.spacing(4),
    },
    heading: { flexShrink: 1, gap: theme.spacing(0.5) },
    footer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(3),
    },
    legend: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      rowGap: theme.spacing(1),
      columnGap: theme.spacing(3),
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1.5),
    },
    // Still named `legendDot`, as in Native, so `useChartLegend().dotStyle` keeps its
    // name — but square: Tram has no round mark outside the radio.
    legendDot: { width: LEGEND_SQUARE, height: LEGEND_SQUARE },
    // The rules are the `Skeleton`'s grey: a reading aid, not an edge.
    grid: {
      backgroundColor:
        faintFill(theme.colors.foreground, theme.colors.background) ??
        theme.colors.muted,
    },
    // The zero axis is the one line that is an edge, so it is the muted ink.
    axis: { backgroundColor: theme.colors.muted },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    // `root` is the frame's and `plot` a figure's: each dims for its own `isDisabled`, so
    // a figure inside a disabled frame is not dimmed twice.
    disabled: theme => {
      const dimmed = { opacity: theme.opacity.disabled }
      return { root: dimmed, plot: dimmed }
    },
  },

  defaultVariants: { size: DEFAULT_SIZE },
})
