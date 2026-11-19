import type { ComponentType, ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { IconComponentProps } from '@xaui/native/system'
import type { CloseButtonProps } from '../close-button'
import type { TextFieldFieldProps, TextFieldProps } from '../text-field'
import type { TramSize } from '../../theme/tram-tokens'

export type SearchFieldSlot = 'box' | 'input' | 'icon' | 'lens' | 'handle' | 'clear'

/**
 * Native's two, drawn the Metro way:
 *
 * - **`primary`** — the ground inside a line of 2 in `muted`, the line in the accent once
 *   the box has the focus.
 * - **`secondary`** — the discreet `surface` with no line at rest, for a search box that
 *   sits on a sheet or a header. The accent line still comes with the focus.
 */
export type SearchFieldVariant = 'primary' | 'secondary'

export type SearchFieldSize = TramSize

/** What the `SearchField` adds to the `TextField` it is. */
type SearchFieldOwnProps = {
  /** The box: a line on the ground, or the discreet surface. `primary` by default. */
  variant?: SearchFieldVariant
  /** The query, controlled. Leave it unset and the field keeps its own. */
  value?: string
  /** The query it starts with, uncontrolled. */
  defaultValue?: string
  /** Every keystroke, and the clear — what a list filtered as you type reads. */
  onValueChange?: (query: string) => void
  /**
   * The search key on the keyboard, not every keystroke: a query that costs a request is
   * submitted, one that filters a list in memory is `onValueChange`.
   */
  onSearch?: (query: string) => void
}

/**
 * Native's props: the Tram `TextField`'s — `size`, `radius`, `accent`, `color`,
 * `isInvalid`, `isDisabled`, `isRequired`, `asChild` and the style props — plus the
 * query and the two variants.
 */
export type SearchFieldProps = SearchFieldOwnProps &
  Omit<TextFieldProps, keyof SearchFieldOwnProps>

/**
 * Everything `TextField.Field` takes, minus the four the root owns: the query is the
 * root's state. `children` are the marks drawn in the box — `SearchField.Icon` at the
 * start, anything else at the end. Left out, the box draws the magnifier alone.
 */
export type SearchFieldFieldProps = Omit<
  TextFieldFieldProps,
  'value' | 'defaultValue' | 'onChangeText' | 'onSubmitEditing' | 'children'
> & {
  children?: ReactNode
}

/** Native's three levers on the mark. */
export type SearchFieldIconProps = {
  /**
   * Replaces the built-in magnifier with an icon component of your own. It is handed the
   * mark's size and its colour at rest: the change of ink at the focus is the built-in
   * mark's alone.
   */
  as?: ComponentType<IconComponentProps>
  /** Overrides the mark's side. */
  size?: number
  /** A raw value, never a token. Overrides the `muted` grey and the ink of the focus. */
  color?: string
}

/**
 * The Tram `CloseButton`'s props, less what this slot settles: the cross alone
 * (`variant="text"`) at the field's size. A cross is not text: it needs an
 * `accessibilityLabel`.
 */
export type SearchFieldClearProps = Omit<CloseButtonProps, 'variant' | 'size'>

/** Resolved styles and the query, never props for a slot to resolve a second time. */
export type SearchFieldContextValue = {
  query: string
  onType: (query: string) => void
  /** Empties the box and reports it, which is the whole of what `Clear` does. */
  clear: () => void
  submit: () => void
  size: SearchFieldSize
  variant: SearchFieldVariant
  /** 0 at rest, 1 with the focus: the line and the magnifier's ink move with it. */
  focus: SharedValue<number>
  boxStyle: StyleProp<ViewStyle>
  inputStyle: StyleProp<TextStyle>
  iconStyle: StyleProp<ViewStyle>
  lensStyle: StyleProp<ViewStyle>
  handleStyle: StyleProp<ViewStyle>
  clearStyle: StyleProp<ViewStyle>
  /** The magnifier's side, in points: a custom `as` is handed it. */
  iconSide: number
  /** Values, not a style: the two ends the magnifier's ink moves between. */
  iconInk: { rest: string; focus: string }
}
