import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { faceFor } from '../typography/typography.face'
import { roleType } from '../typography/typography.role'
import type { RoleType } from '../typography/typography.role'
import {
  BUTTON_STEPS,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DRAWING_TOKENS,
  LINE_WIDTH,
} from '../button/button.recipe'
import type { MorphButtonSlot } from './morph-button.type'

const SLOTS = [
  'root',
  'collapsed',
  'expanded',
  'label',
  'title',
  'description',
  'icon',
] as const

/**
 * The sentence under the title, the title's own ink turned down — the mock-up's. Higher
 * than the `Card`'s, because here the ground is a fill of the accent as often as not, and
 * the ink on it is already the one `onAccent` picked to read.
 */
const DESCRIPTION_OPACITY = 0.85

type CardStep = {
  /** Spacing steps, not points: the card's frame, measured from the box's outer edge. */
  inset: number
  /** The frame's top, a half step under the others: a Light title brings its own air. */
  top: number
  /** Between the title and the sentence under it. */
  stack: number
  title: TramTypeRole
  description: TramTypeRole
}

/**
 * The card a button opens into, at three scales. `md` is the mock-up's: 20 points of
 * frame, 18 over the title, the title on the `title` role and the sentence under it on
 * the `Card`'s detail role.
 */
const CARD_STEPS: Record<TramSize, CardStep> = {
  sm: { inset: 4, top: 3.5, stack: 1.5, title: 'subtitle', description: 'caption' },
  md: { inset: 5, top: 4.5, stack: 2, title: 'title', description: 'caption' },
  lg: { inset: 6, top: 5.5, stack: 2.5, title: 'section', description: 'body' },
}

/** A role's size in the Light face: the card's title is Metro's thin heading. */
function lightType(role: TramTypeRole, theme: XAUITheme): RoleType {
  return {
    fontSize: tramType[role].fontSize,
    ...faceFor(theme.fontFamilies.heading, 'light'),
  }
}

/**
 * `size` writes each face's measurements once. Exactly one face is mounted, and the box
 * has no height of its own, so the root is the size of whichever that is.
 *
 * The collapsed face is the `Button`, to the point: its height, its padding and its type.
 * The line is drawn by the box around the face, so the face takes the line out of both
 * — a closed `MorphButton` beside a `Button` is the same rectangle.
 */
function sizeAxis(size: TramSize) {
  const button = BUTTON_STEPS[size]
  const card = CARD_STEPS[size]

  return (theme: XAUITheme): SlotStyles<MorphButtonSlot> => ({
    collapsed: {
      height: theme.controlHeights[size] - 2 * LINE_WIDTH,
      paddingHorizontal: theme.spacing(button.padding) - LINE_WIDTH,
      gap: theme.spacing(button.gap),
    },
    expanded: {
      paddingTop: theme.spacing(card.top) - LINE_WIDTH,
      paddingBottom: theme.spacing(card.inset) - LINE_WIDTH,
      paddingHorizontal: theme.spacing(card.inset) - LINE_WIDTH,
      gap: theme.spacing(card.stack),
    },
    label: { fontSize: tramType[button.type].fontSize },
    title: lightType(card.title, theme),
    description: roleType(card.description, theme),
    icon: { fontSize: theme.fontSizes[button.glyph] },
  })
}

/**
 * The `radius` axis under the Tram ceiling, `full` included. Unlike the `Button`, whose
 * icon-only form may be a circle, this box opens into a card: a `full` corner would be a
 * pill closed and a gélule open, which is the drawing Tram replaced.
 */
function cornerAxis(): Record<RadiusKey, StyleFn<MorphButtonSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<MorphButtonSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      root: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

export const morphButtonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      // No width and no height: the faces carry the measurements. RN's own
      // `alignItems: 'stretch'` is what lets the card fill the box the label sized.
      borderWidth: LINE_WIDTH,
      borderRadius: boxCornerFor('lg', theme.radius),
      // The arriving face is at its final size while the box is still travelling;
      // clipped, those frames read as the box revealing it.
      overflow: 'hidden',
    },
    collapsed: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    expanded: { flexDirection: 'column' },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.regular,
    },
    description: { opacity: DESCRIPTION_OPACITY },
  }),

  // The `Button`'s table, imported rather than restated: closed, this is that button,
  // and the day its drawing moves this one moves with it.
  variantTokens: DRAWING_TOKENS,

  /**
   * The `Button`'s paint, with the card's two text slots on the label's ink. Open, the box
   * keeps its fill: it does not become the `Card`'s discreet surface.
   */
  paint: (_theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border ?? 'transparent',
    },
    label: { color: colors.fg },
    title: { color: colors.fg },
    description: { color: colors.fg },
    icon: { color: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis('sm'),
      md: sizeAxis('md'),
      lg: sizeAxis('lg'),
    },

    radius: cornerAxis(),
  },

  states: {
    /** The `Button`'s: the fill goes, the line and the words grey, dimmed. */
    disabled: (theme, colors) => ({
      root: {
        backgroundColor: 'transparent',
        borderColor: colors.bg || colors.border ? theme.colors.muted : 'transparent',
        opacity: theme.opacity.disabled,
      },
      label: { color: theme.colors.muted },
      title: { color: theme.colors.muted },
      description: { color: theme.colors.muted },
      icon: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})
