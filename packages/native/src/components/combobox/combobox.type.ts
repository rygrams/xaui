import type { ReactNode } from 'react'
import type { TextInputProps, ViewProps } from 'react-native'
import type { ViewStyleProps, TextStyleProps } from '../../system/style-props'
import type {
  AutocompleteContentProps,
  AutocompleteEmptyProps,
  AutocompleteItemLabelProps,
  AutocompleteItemProps,
  AutocompleteOverlayProps,
  AutocompleteProps,
  AutocompleteSize,
  AutocompleteVariant,
} from '../autocomplete'

/** The `Autocomplete`'s four field levels, because the box is the same field. */
export type ComboboxVariant = AutocompleteVariant
export type ComboboxSize = AutocompleteSize

/**
 * The `Autocomplete`'s state, to the prop. The two differ in **where you type**, not in
 * what they hold: a value, an open panel, and a query narrowing the list.
 */
export type ComboboxProps = AutocompleteProps

type ComboboxTriggerOwnProps = { children?: ReactNode; asChild?: boolean }

/**
 * The field box. A `View` rather than a `Pressable`: the thing you press is the input
 * inside it, and a pressable wrapper around a text field is a second target over the one
 * that already takes the tap.
 */
export type ComboboxTriggerProps = ComboboxTriggerOwnProps &
  Omit<ViewProps, keyof ComboboxTriggerOwnProps> &
  Omit<ViewStyleProps, keyof ComboboxTriggerOwnProps | keyof ViewProps>

type ComboboxInputOwnProps = {
  /**
   * Whether typing opens the panel. On by default — a combobox whose list stays shut while
   * you type is a text field that lies about being one.
   */
  opensOnChange?: boolean
  /** Whether focusing opens it. On by default, for the same reason. */
  opensOnFocus?: boolean
}

export type ComboboxInputProps = ComboboxInputOwnProps &
  Omit<TextInputProps, keyof ComboboxInputOwnProps> &
  Omit<TextStyleProps, keyof ComboboxInputOwnProps | keyof TextInputProps>

/** The panel and its rows are the `Autocomplete`'s, and so are their props. */
export type ComboboxContentProps = AutocompleteContentProps
export type ComboboxOverlayProps = AutocompleteOverlayProps
export type ComboboxItemProps = AutocompleteItemProps
export type ComboboxItemLabelProps = AutocompleteItemLabelProps
export type ComboboxEmptyProps = AutocompleteEmptyProps
