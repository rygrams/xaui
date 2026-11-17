import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { accentInk } from '../../theme/accent-ink'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { TextFieldSlot } from './text-field.type'

const SLOTS = [
  'root',
  'label',
  'field',
  'placeholder',
  'focus',
  'description',
  'error',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

type SizeStep = {
  /** Spacing steps on each side of the text. */
  padding: number
  /** Spacing steps between the label, the box and the line of help. */
  gap: number
  /** The Tram type roles: what is typed, the label, the description and the error. */
  field: TramTypeRole
  label: TramTypeRole
  help: TramTypeRole
}

/**
 * The box is as tall as the theme's control of that size — 40, 48, 56 — and what is typed
 * in it steps up the Tram scale with it. Only `sm` stands under the 48 touch target,
 * which the field makes up with its `hitSlop`.
 */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { padding: 2.5, gap: 1, field: 'body', label: 'caption', help: 'caption' },
  md: { padding: 3, gap: 1.5, field: 'subtitle', label: 'body', help: 'caption' },
  lg: { padding: 4, gap: 2, field: 'title', label: 'subtitle', help: 'body' },
}

function sizeAxis(size: TramSize) {
  const step = SIZES[size]

  return (theme: XAUITheme): SlotStyles<TextFieldSlot> => {
    const help = roleType(step.help, theme)

    return {
      root: { gap: theme.spacing(step.gap) },
      label: roleType(step.label, theme),
      // No `lineHeight`: on a single line iOS sinks the typed text under it.
      field: {
        ...roleType(step.field, theme),
        minHeight: theme.controlHeights[size],
        paddingHorizontal: theme.spacing(step.padding),
      },
      description: help,
      error: help,
    }
  }
}

/** The `radius` axis under the Tram ceiling — `full` included: the field is a box. */
function cornerAxis(): Record<RadiusKey, StyleFn<TextFieldSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<TextFieldSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      field: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

/** `danger` where it is read — a line, a message: the ink, not the fill. */
function dangerInk(theme: XAUITheme): string {
  return accentInk(theme.colors.danger, theme.colors.background)
}

export const textFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'column' },
    label: { color: theme.colors.foreground },
    // The ground inside a line of the page's ink: the box has no fill of its own.
    field: {
      backgroundColor: theme.colors.fieldBackground,
      color: theme.colors.fieldForeground,
      borderColor: theme.colors.fieldBorder,
      borderWidth: theme.borderWidth.field,
      borderRadius: boxCornerFor('lg', theme.radius),
      paddingVertical: 0,
      // iOS centres a single line in its box and Android pins it to the top.
      textAlignVertical: 'center',
    },
    // Not nodes — the root flattens these two into values: the placeholder's colour is a
    // `TextInput` prop, and the focused border is one end of an animation.
    placeholder: { color: theme.colors.fieldPlaceholder },
    // The accent as a line, so the theme's ink of it: 4.5:1 on the ground.
    focus: { borderColor: theme.colors.focus },
    description: { color: theme.colors.muted },
    error: { color: dangerInk(theme) },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },

    radius: cornerAxis(),

    /**
     * The line in `danger`, focused or not: an error outranks the focus. The label and
     * the description keep their ink — the box says which field is wrong, and
     * `TextField.Error` says why.
     */
    isInvalid: {
      true: theme => ({
        field: { borderColor: dangerInk(theme) },
        focus: { borderColor: dangerInk(theme) },
      }),
    },
  },

  states: {
    /** Everything grey and no accent left. Not dimmed: the grey is the state. */
    disabled: theme => ({
      label: { color: theme.colors.muted },
      field: { borderColor: theme.colors.muted, color: theme.colors.muted },
      focus: { borderColor: theme.colors.muted },
    }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})
