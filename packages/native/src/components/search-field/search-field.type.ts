import type { ComponentType } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { CloseButtonBaseProps } from '../../system/close-button'
import type { IconComponentProps } from '../../system/icon'
import type { TextFieldFieldProps, TextFieldProps } from '../text-field'

export type SearchFieldSlot = 'field' | 'clear' | 'clearGlyph'

/**
 * Two, where the `TextField` has four — and they are the two a search box is actually
 * drawn as:
 *
 * - **`primary`** — the `fieldBackground` fill, flat. The `TextField`'s `primary` without
 *   the `field` shadow: a search box is the one field that usually sits alone on a screen
 *   rather than in a column of siblings, and there the elevation reads as a card that has
 *   lost its content rather than as a control.
 * - **`secondary`** — the `defaultSoft` fill, a neutral wash and no fill of its own weight.
 *   What a search box takes when it sits *on* a surface — a sheet, a card, a header — where
 *   a white box would be invisible and a solid grey one would read as disabled.
 *
 * `tertiary` and `ghost` are absent rather than narrowed away by accident: a field with no
 * fill at all cannot be told from the text beside it once the placeholder is gone, and a
 * search box is found before it is read.
 */
export type SearchFieldVariant = 'primary' | 'secondary'

/**
 * What the `SearchField` adds to the `TextField` it is. R14 — a name in here is the
 * component's, so the style prop that shares it is not exposed.
 */
type SearchFieldOwnProps = {
  /** The fill. Two, and `primary` is the default. */
  variant?: SearchFieldVariant
  /** The query, controlled. Leave it unset and the field keeps its own. */
  value?: string
  /** The query it starts with, uncontrolled. */
  defaultValue?: string
  /** Every keystroke, and the clear — this is what a field filtering as you type reads. */
  onValueChange?: (query: string) => void
  /**
   * The search key on the keyboard. It is **not** every keystroke: a query that costs a
   * request is submitted, and one that filters a list in memory is `onValueChange`.
   */
  onSearch?: (query: string) => void
}

export type SearchFieldProps = SearchFieldOwnProps &
  Omit<TextFieldProps, keyof SearchFieldOwnProps>

/**
 * Everything `TextField.Field` accepts, minus the four props the root owns: the query is
 * the root's state, and a `value` or an `onChangeText` written here would be writing into
 * the middle of it.
 */
export type SearchFieldFieldProps = Omit<
  TextFieldFieldProps,
  'value' | 'defaultValue' | 'onChangeText' | 'onSubmitEditing'
>

/** `Icon`'s two levers, plus the mark itself. */
export type SearchFieldIconProps = {
  /** Replaces the built-in magnifier with an icon component of your own. */
  as?: ComponentType<IconComponentProps>
  /** Overrides the field's own glyph size. */
  size?: number
  /** A raw value (R7), never a token. Overrides the placeholder grey. */
  color?: string
}

/**
 * Everything the shared close button takes, minus what this slot resolves for it. `name`
 * is `'SearchField.Clear'` and the styles are the recipe's.
 */
export type SearchFieldClearProps = Omit<
  CloseButtonBaseProps,
  'name' | 'baseStyle' | 'glyphStyle'
>

/** R5 — resolved styles and the query, never props for a slot to resolve a second time. */
export type SearchFieldContextValue = {
  query: string
  onType: (query: string) => void
  /** Empties the box and reports it, which is the whole of what `Clear` does. */
  clear: () => void
  submit: () => void
  /** The variant's fill, layered over the `TextField`'s own box by `SearchField.Field`. */
  boxStyle: StyleProp<TextStyle>
  clearStyle: StyleProp<ViewStyle>
  clearGlyphStyle: StyleProp<ViewStyle>
}
