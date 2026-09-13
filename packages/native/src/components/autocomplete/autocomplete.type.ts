import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconContextValue } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { SelectAnchor, SelectContentProps } from '../select/select.type'

export type AutocompleteSlot = 'search' | 'empty'

/** The field's four levels, because the trigger **is** a field — the `Select`'s exactly. */
export type AutocompleteVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type AutocompleteSize = Exclude<Size, 'xs'>

export type AutocompleteAnchor = SelectAnchor

type AutocompleteOwnProps = {
  children?: ReactNode
  variant?: AutocompleteVariant
  size?: AutocompleteSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. */
  color?: string
  /** Controlled selection. Leave unset and the root owns it. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Controlled open state. Leave unset and the root owns it. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Controlled query. Leave unset and the root owns it — and clears it every time the
   * panel closes, because a search that survives its own panel means the list is already
   * filtered the next time it opens, by a word nobody can see.
   */
  query?: string
  defaultQuery?: string
  onQueryChange?: (query: string) => void
  isDisabled?: boolean
  isInvalid?: boolean
  asChild?: boolean
}

/**
 * The root is the **column** — a `View` stacking the label, the trigger and the help line —
 * so `ref`, `style` and R14's style props here dress that column. The control itself is
 * `Autocomplete.Trigger`, which keeps its own `ref` and its own a11y props: it is the node
 * the panel measures and the node a screen reader stops on.
 */
export type AutocompleteProps = AutocompleteOwnProps &
  Omit<ViewProps, keyof AutocompleteOwnProps> &
  Omit<ViewStyleProps, keyof AutocompleteOwnProps | keyof ViewProps>

export type AutocompleteTriggerProps = {
  children?: ReactNode
  asChild?: boolean
} & Omit<PressableProps, 'children'> &
  ViewStyleProps

type AutocompleteTextOwnProps = { children?: ReactNode; placeholder?: string }

export type AutocompleteValueProps = AutocompleteTextOwnProps &
  Omit<TextProps, keyof AutocompleteTextOwnProps> &
  Omit<TextStyleProps, keyof AutocompleteTextOwnProps | keyof TextProps>

export type AutocompleteOverlayProps = ViewProps & ViewStyleProps

type AutocompleteTextSlotOwnProps = { children?: ReactNode }

/** What the field is for — the `TextField.Label`, on a field that opens a list. */
export type AutocompleteLabelProps = AutocompleteTextSlotOwnProps &
  Omit<TextProps, keyof AutocompleteTextSlotOwnProps> &
  Omit<TextStyleProps, keyof AutocompleteTextSlotOwnProps | keyof TextProps>

/** The hint under the field — the `TextField.Description`. */
export type AutocompleteDescriptionProps = AutocompleteLabelProps

/** What is wrong with the chosen row — the `TextField.Error`. */
export type AutocompleteErrorProps = AutocompleteLabelProps

/** A row's own word. It has no placeholder — a row is never empty. */
export type AutocompleteItemLabelProps = { children?: ReactNode } & Omit<
  TextProps,
  'children'
> &
  Omit<TextStyleProps, keyof TextProps>

/** The panel's placement props are the `Select`'s — it is the same anchored surface. */
export type AutocompleteContentProps = SelectContentProps

type AutocompleteSearchOwnProps = {
  /**
   * Whether the field takes focus as the panel opens. On by default: an autocomplete that
   * has to be tapped twice before it can be typed into is a select with a spare row.
   */
  autoFocus?: boolean
}

export type AutocompleteSearchProps = AutocompleteSearchOwnProps &
  Omit<TextInputProps, keyof AutocompleteSearchOwnProps> &
  Omit<TextStyleProps, keyof AutocompleteSearchOwnProps | keyof TextInputProps>

type AutocompleteEmptyOwnProps = { children?: ReactNode }

export type AutocompleteEmptyProps = AutocompleteEmptyOwnProps &
  Omit<TextProps, keyof AutocompleteEmptyOwnProps> &
  Omit<TextStyleProps, keyof AutocompleteEmptyOwnProps | keyof TextProps>

type AutocompleteItemOwnProps = {
  value: string
  /** Read before the row mounts, for a trigger that has to name a value it has never shown. */
  label?: string
  children?: ReactNode
  isDisabled?: boolean
  asChild?: boolean
}

export type AutocompleteItemProps = AutocompleteItemOwnProps &
  Omit<PressableProps, keyof AutocompleteItemOwnProps> &
  Omit<ViewStyleProps, keyof AutocompleteItemOwnProps | keyof PressableProps>

/** R5 — resolved style ids and the state the slots read. */
export type AutocompleteContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  triggerPressedStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<ViewStyle>
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  searchStyle: StyleProp<TextStyle>
  emptyStyle: StyleProp<TextStyle>
  itemStyle: StyleProp<ViewStyle>
  itemPressedStyle: StyleProp<ViewStyle>
  itemLabelStyle: StyleProp<TextStyle>
  labelStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  errorStyle: StyleProp<TextStyle>
  glyph: IconContextValue
  placeholderColor?: string
  value?: string
  query: string
  setQuery: (query: string) => void
  isOpen: boolean
  isDisabled: boolean
  isInvalid: boolean
  open: () => void
  close: () => void
  toggle: () => void
  select: (value: string, label?: string) => void
  anchor: AutocompleteAnchor | null
  setAnchor: (anchor: AutocompleteAnchor) => void
  labelFor: (value: string) => string | undefined
  registerLabel: (value: string, label: string) => void
  /** The ids the trigger points at, so the label and the hint are what it is announced by. */
  labelId: string
  descriptionId: string
}

/** What one row publishes to its own slots. */
export type AutocompleteItemContextValue = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}
