import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { faintFill } from '../../system/faint-fill'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { faceFor } from '../typography/typography.face'
import { roleType } from '../typography/typography.role'
import type { StepperSlot } from './stepper.type'

const SLOTS = [
  'root',
  'item',
  'indicator',
  'bar',
  'barCompleted',
  'barCurrent',
  'numeral',
  'numeralUpcoming',
  'content',
  'title',
  'titleCurrent',
  'titleUpcoming',
  'description',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** A step's bar, in points: a Metro rule, not a hairline. */
const BAR = 4

/** Between two bars, so a run of steps reads as segments of one line. */
const BAR_GAP = 2

type SizeStep = {
  /** The numeral's size, Light, and the width of its column. */
  numeral: number
  /** The step's line height: the numeral's and the title's, so both sit on it. */
  row: number
  title: TramTypeRole
  /** The step in progress, a role larger: the size of the type says where you are. */
  current: TramTypeRole
}

const SIZES: Record<TramSize, SizeStep> = {
  sm: { numeral: 24, row: 32, title: 'body', current: 'subtitle' },
  md: { numeral: 28, row: 36, title: 'body', current: 'title' },
  lg: { numeral: 34, row: 44, title: 'subtitle', current: 'section' },
}

function sizeAxis(size: TramSize) {
  const step = SIZES[size]

  return (theme: XAUITheme): SlotStyles<StepperSlot> => ({
    numeral: {
      ...faceFor(theme.fontFamilies.heading, 'light'),
      fontSize: step.numeral,
      lineHeight: step.row,
      width: step.numeral,
    },
    title: { ...roleType(step.title, theme), lineHeight: step.row },
    titleCurrent: { ...roleType(step.current, theme), lineHeight: step.row },
  })
}

/**
 * Metro has no stepper, so it is drawn from what Metro does have: bars and type. No
 * circle, no check, no connector line.
 *
 * Vertical, a step is a row — a bar of 4 at the start edge running its full height, a
 * Light numeral, the title and the description. The bars stand 2 apart and read as one
 * line cut into steps: the accent for the steps done, the page's ink for the step in
 * progress, the faint grey for the steps ahead, whose words go grey too. The step in
 * progress has its title a role larger.
 *
 * Horizontal, the same bars lie end to end with a name under each, only the one in
 * progress in the ink — the way a pivot's headers say which one is open.
 */
export const stepperRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const faint = faintFill(theme.colors.foreground, theme.colors.background)

    return {
      root: { gap: BAR_GAP },
      item: { flexDirection: 'row', gap: theme.spacing(3.5) },
      indicator: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        gap: theme.spacing(3.5),
      },
      bar: {
        width: BAR,
        alignSelf: 'stretch',
        backgroundColor: faint ?? theme.colors.muted,
      },
      barCompleted: { backgroundColor: theme.colors.accent },
      barCurrent: { backgroundColor: theme.colors.foreground },
      numeral: {
        textAlign: 'center',
        color: theme.colors.foreground,
        fontVariant: ['tabular-nums'],
        includeFontPadding: false,
      },
      numeralUpcoming: { color: theme.colors.muted },
      content: {
        flex: 1,
        paddingBottom: theme.spacing(3),
      },
      title: { color: theme.colors.foreground },
      titleCurrent: { color: theme.colors.foreground },
      titleUpcoming: { color: theme.colors.muted },
      description: { ...roleType('caption', theme), color: theme.colors.muted },
    }
  },

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
    // After `size`, so the horizontal names win over the sizes' titles.
    orientation: {
      vertical: () => ({}),
      horizontal: theme => ({
        root: { flexDirection: 'row' },
        item: { flex: 1, flexDirection: 'column', gap: theme.spacing(2) },
        indicator: { flexDirection: 'column' },
        bar: { width: 'auto', height: BAR },
        numeral: { display: 'none' },
        content: { paddingBottom: 0 },
        title: {
          ...roleType('caption', theme),
          lineHeight: undefined,
          color: theme.colors.muted,
        },
        titleCurrent: {
          ...roleType('caption', theme),
          lineHeight: undefined,
          color: theme.colors.foreground,
        },
      }),
    },
  },

  defaultVariants: { size: DEFAULT_SIZE, orientation: 'vertical' },
})
