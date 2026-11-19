import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { JumpListLayout } from './jump-list.sections'
import type { JumpListSlot } from './jump-list.type'

const SLOTS = [
  'root',
  'section',
  'header',
  'headerLabel',
  'overlay',
  'grid',
  'row',
  'cell',
  'key',
  'keyLabel',
  'emptyKey',
  'emptyKeyLabel',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the colours land. */
const DRAWING = 'fill'

/** A header and a key are flat fills of the accent, written in the ink that reads on it. */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bg: 'accent', fg: 'accentForeground' },
}

type SizeStep = {
  /** A header's height — and its width, as a square of one letter. */
  side: number
  /** The letter in a header square. */
  letter: TramTypeRole
  /** A word in a header — a date, a category. */
  word: TramTypeRole
  /** The letter in a key of the grid. */
  key: TramTypeRole
  /** A key of the list layout: a bar this tall, and what it says. */
  bar: number
  barWord: TramTypeRole
}

/**
 * The Metro jump list, measured. A header square is the size of a control — 40 / 48 / 56
 * — the 40 pressed as 48 through `hitSlop`; its letter grows with it. Points, not spacing
 * steps.
 */
export const JUMP_LIST_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: {
    side: 40,
    letter: 'title',
    word: 'body',
    key: 'section',
    bar: 56,
    barWord: 'subtitle',
  },
  md: {
    side: 48,
    letter: 'section',
    word: 'subtitle',
    key: 'pivot',
    bar: 64,
    barWord: 'title',
  },
  lg: {
    side: 56,
    letter: 'pivot',
    word: 'title',
    key: 'pivot',
    bar: 72,
    barWord: 'title',
  },
}

/** The grid's padding and the space between two keys, which the turnstile's hinge reads. */
export function gridSpacing(theme: XAUITheme) {
  return { inset: theme.spacing(3), gap: theme.spacing(2) }
}

/** A layout and a size, as one axis: what a header or a key is drawn as reads both. */
export type JumpListForm = `${JumpListLayout}-${TramSize}`

export function formOf(layout: JumpListLayout, size: TramSize): JumpListForm {
  return `${layout}-${size}`
}

/**
 * A header of one letter is a square with the letter in its bottom-start corner, as a
 * tile writes its name; a header of a word is as wide as the word. A key of the grid is a
 * square too, a quarter of the screen whatever the size — only its letter grows; a key
 * of the list is a bar across the screen.
 */
function formAxis(layout: JumpListLayout, size: TramSize) {
  const step = JUMP_LIST_GEOMETRY[size]

  return (theme: XAUITheme): SlotStyles<JumpListSlot> => {
    const header = { height: step.side, minWidth: step.side }

    if (layout === 'grid') {
      const letter = roleType(step.key, theme)
      // The letter sits in the corner as on a tile: the same inset, a step under it.
      const square = {
        paddingHorizontal: theme.spacing(2),
        paddingBottom: theme.spacing(1),
      }

      return {
        header: {
          ...header,
          paddingHorizontal: theme.spacing(1.5),
          paddingBottom: theme.spacing(0.5),
        },
        headerLabel: roleType(step.letter, theme),
        key: { ...square, aspectRatio: 1 },
        emptyKey: { ...square, aspectRatio: 1 },
        keyLabel: letter,
        emptyKeyLabel: letter,
      }
    }

    const bar = { height: step.bar, paddingBottom: theme.spacing(2) }
    const word = roleType(step.barWord, theme)

    return {
      header: {
        ...header,
        paddingHorizontal: theme.spacing(3),
        paddingBottom: theme.spacing(1.5),
      },
      headerLabel: roleType(step.word, theme),
      key: { ...bar, paddingHorizontal: theme.spacing(3) },
      emptyKey: { ...bar, paddingHorizontal: theme.spacing(3) },
      keyLabel: word,
      emptyKeyLabel: word,
    }
  }
}

export const jumpListRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const { inset, gap } = gridSpacing(theme)
    const corner = boxCornerFor('lg', theme.radius)
    // What a header or a key holds sits at its bottom-start corner, as on a tile.
    const square = {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      borderRadius: corner,
    } as const

    return {
      root: { backgroundColor: theme.colors.background },
      // The room around a header: a Metro list reads by the space between its groups,
      // not by a line. The header's own box carries no margin.
      section: {
        alignItems: 'flex-start',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
      },
      header: square,
      headerLabel: {},
      // The page's own ground, opaque: the list does not show through the keys.
      overlay: { flex: 1, backgroundColor: theme.colors.background },
      grid: { padding: inset, gap },
      row: { flexDirection: 'row', gap },
      cell: { flex: 1 },
      key: square,
      keyLabel: {},
      // A letter with nothing under it: the soft grey, its letter muted. Not dimmed — the
      // grey is the state, and it is not pressable.
      emptyKey: { ...square, backgroundColor: theme.colors.default },
      emptyKeyLabel: { color: theme.colors.muted },
    }
  },

  variantTokens: VARIANT_TOKENS,

  /** Flat fills, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    header: { backgroundColor: colors.bg },
    headerLabel: { color: colors.fg },
    key: { backgroundColor: colors.bg },
    keyLabel: { color: colors.fg },
  }),

  variants: {
    form: {
      'grid-sm': formAxis('grid', 'sm'),
      'grid-md': formAxis('grid', 'md'),
      'grid-lg': formAxis('grid', 'lg'),
      'list-sm': formAxis('list', 'sm'),
      'list-md': formAxis('list', 'md'),
      'list-lg': formAxis('list', 'lg'),
    },
  },

  states: {
    /** Dimmed as the other controls are: the headers stay, and open nothing. */
    disabled: theme => ({ header: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: DRAWING, form: formOf('grid', DEFAULT_SIZE) },
})
