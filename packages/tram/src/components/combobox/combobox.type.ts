import type { ComponentType, ReactNode } from 'react'
import type { TextInputProps, ViewProps } from 'react-native'
import type {
  IconComponentProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type {
  AutocompleteContentProps,
  AutocompleteDescriptionProps,
  AutocompleteEmptyProps,
  AutocompleteErrorProps,
  AutocompleteItemLabelProps,
  AutocompleteItemProps,
  AutocompleteLabelProps,
  AutocompleteOverlayProps,
  AutocompleteProps,
  AutocompleteSize,
} from '../autocomplete/autocomplete.type'

export type ComboboxSize = AutocompleteSize

/** The `Autocomplete`'s props: the same value, open state and query. */
export type ComboboxProps = AutocompleteProps

type ComboboxTriggerOwnProps = { children?: ReactNode; asChild?: boolean }

/**
 * The field's row — `Combobox.Input` and `Combobox.Indicator` — in the `TextField`'s box,
 * which also holds the list once it unfolds. A `View`, not a pressable: the input takes
 * the touch.
 */
export type ComboboxTriggerProps = ComboboxTriggerOwnProps &
  Omit<ViewProps, keyof ComboboxTriggerOwnProps> &
  Omit<ViewStyleProps, keyof ComboboxTriggerOwnProps | keyof ViewProps>

type ComboboxInputOwnProps = {
  /** Typing opens the list. On by default. */
  opensOnChange?: boolean
  /** Taking the focus opens the list. On by default. */
  opensOnFocus?: boolean
}

export type ComboboxInputProps = ComboboxInputOwnProps &
  Omit<TextInputProps, keyof ComboboxInputOwnProps> &
  Omit<TextStyleProps, keyof ComboboxInputOwnProps | keyof TextInputProps>

/** The chevron at the end of the row, and the way into the list without typing. */
export type ComboboxIndicatorProps = {
  /** The glyph. Defaults to a chevron. */
  as?: ComponentType<IconComponentProps>
  /** What a screen reader says the chevron does. */
  accessibilityLabel?: string
}

/** These **are** the `Autocomplete`'s, as on Native. */
export type ComboboxContentProps = AutocompleteContentProps
export type ComboboxOverlayProps = AutocompleteOverlayProps
export type ComboboxItemProps = AutocompleteItemProps
export type ComboboxItemLabelProps = AutocompleteItemLabelProps
export type ComboboxEmptyProps = AutocompleteEmptyProps
export type ComboboxLabelProps = AutocompleteLabelProps
export type ComboboxDescriptionProps = AutocompleteDescriptionProps
export type ComboboxErrorProps = AutocompleteErrorProps
