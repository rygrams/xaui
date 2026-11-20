import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { faintFill } from '../../system/faint-fill'
import type { TramSize } from '../../theme/tram-tokens'
import { faceFor } from '../typography/typography.face'
import { roleType } from '../typography/typography.role'
import type { TimelineSlot } from './timeline.type'

const SLOTS = [
  'root',
  'item',
  'leading',
  'leadingLabel',
  'leadingCaption',
  'rail',
  'marker',
  'connector',
  'content',
  'title',
  'description',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** The line from one tile to the next, in points. */
const LINE = 2

/** The mark an entry with no tile draws instead, in points. */
const MARKER = 12

/** The title's line, and how far the words sit below the entry's top. */
const TITLE_LINE = 24
const CONTENT_TOP = 2

/** Above a bare rail's mark: what puts it level with the middle of the title's first line. */
export const MARKER_TOP = CONTENT_TOP + (TITLE_LINE - MARKER) / 2

type SizeStep = {
  /** The tile's side. */
  tile: number
  /** Its large line, Light. */
  label: number
}

export const TIMELINE_SIZES: Record<TramSize, SizeStep> = {
  sm: { tile: 60, label: 24 },
  md: { tile: 76, label: 30 },
  lg: { tile: 92, label: 36 },
}

function sizeAxis(size: TramSize) {
  const step = TIMELINE_SIZES[size]

  return (theme: XAUITheme): SlotStyles<TimelineSlot> => ({
    leading: { width: step.tile, height: step.tile },
    leadingLabel: {
      ...faceFor(theme.fontFamilies.heading, 'light'),
      fontSize: step.label,
      lineHeight: step.label,
    },
  })
}

/**
 * The Windows Phone timeline: each entry opens on a **tile** of its date, flat, the large
 * line Light and the small one under it, set at the foot as a tile's name is. A line of 2
 * in the faint grey drops from the tile's middle to the next one. Beside it, 16 along, the
 * title and the grey description; 28 of air under each entry, which the line runs through.
 *
 * The tile is painted by the entry's status: the accent, the ink while in progress, the
 * faint grey, or green, amber and red.
 */
export const timelineRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const faint = faintFill(theme.colors.foreground, theme.colors.background)

    return {
      root: { flexDirection: 'column' },
      item: { flexDirection: 'row', gap: theme.spacing(4) },
      leading: {
        justifyContent: 'flex-end',
        paddingVertical: theme.spacing(2),
        paddingHorizontal: theme.spacing(2.5),
      },
      leadingLabel: { fontVariant: ['tabular-nums'], includeFontPadding: false },
      leadingCaption: roleType('caption', theme),
      // Placed under the tile by `Timeline.Rail`, which knows the tile's side.
      rail: { position: 'absolute', width: LINE },
      marker: { width: MARKER, height: MARKER },
      connector: {
        flexGrow: 1,
        width: LINE,
        alignSelf: 'center',
        backgroundColor: faint ?? theme.colors.muted,
      },
      content: { flex: 1, gap: theme.spacing(1), paddingTop: CONTENT_TOP },
      title: {
        ...roleType('subtitle', theme),
        lineHeight: TITLE_LINE,
        color: theme.colors.foreground,
      },
      description: { ...roleType('caption', theme), color: theme.colors.muted },
    }
  },

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
    density: {
      compact: theme => ({ content: { paddingBottom: theme.spacing(4) } }),
      comfortable: theme => ({ content: { paddingBottom: theme.spacing(7) } }),
    },
  },

  defaultVariants: { size: DEFAULT_SIZE, density: 'comfortable' },
})
