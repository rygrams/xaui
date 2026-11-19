import type { ReactNode } from 'react'
import type { StyleProp, TextProps, TextStyle } from 'react-native'
import type { TextStyleProps } from '@xaui/native/system'
import type { ListPickerMode } from '../../system/list-picker'
import type { SearchFieldFieldProps } from '../search-field/search-field.type'
import type {
  SelectContentProps,
  SelectDescriptionProps,
  SelectErrorProps,
  SelectIndicatorProps,
  SelectItemLabelProps,
  SelectItemProps,
  SelectLabelProps,
  SelectOverlayProps,
  SelectProps,
  SelectSize,
  SelectTriggerProps,
  SelectValueProps,
} from '../select/select.type'

export type AutocompleteSlot = 'empty'

export type AutocompleteSize = SelectSize

type AutocompleteOwnProps = {
  /**
   * Controlled query. Leave unset and the root owns it — and clears it every time the
   * list closes, because a search that survives its own list means the list is already
   * filtered the next time it opens, by a word nobody can see.
   */
  query?: string
  defaultQuery?: string
  onQueryChange?: (query: string) => void
}

/**
 * The Tram `Select`'s props — the same column, box, value and rows — plus the query.
 *
 * **No `variant`**, where Native has four: the Metro box has one fill, the ground inside
 * a line, as on the Tram `Select`; `accent` is added in its place.
 */
export type AutocompleteProps = AutocompleteOwnProps &
  Omit<SelectProps, keyof AutocompleteOwnProps>

/**
 * The list. It is always a page — the `Select`'s, swivelled in on its top edge — because
 * an autocomplete is for a list too long to read, and a long list is what the `Select`
 * gives a page to.
 *
 * **No placement props** and no `mode`: Native's eight (`placement`, `align`, `offset`,
 * …) place a panel, and a page is not placed. A page starts at the very top of the
 * screen; pad it with the app's own inset.
 */
export type AutocompleteContentProps = Omit<SelectContentProps, 'mode'>

/**
 * The field the list is searched by: the Tram `SearchField`'s box, on the page under its
 * title, and not scrolled with the rows. Its props are `SearchField.Field`'s, the query
 * being the root's; its children are the marks in the box — `SearchField.Icon` before
 * the text, `SearchField.Clear` after it — and written with none it draws the magnifier.
 *
 * `autoFocus` is on by default: an autocomplete that has to be tapped twice before it can
 * be typed into is a select with a spare row.
 */
export type AutocompleteSearchProps = SearchFieldFieldProps

type AutocompleteEmptyOwnProps = { children?: ReactNode }

/** What the list says when nothing matches. It is drawn only then. */
export type AutocompleteEmptyProps = AutocompleteEmptyOwnProps &
  Omit<TextProps, keyof AutocompleteEmptyOwnProps> &
  Omit<TextStyleProps, keyof AutocompleteEmptyOwnProps | keyof TextProps>

/** These slots **are** the Tram `Select`'s: the same field, opening onto a searched list. */
export type AutocompleteLabelProps = SelectLabelProps
export type AutocompleteTriggerProps = SelectTriggerProps
export type AutocompleteValueProps = SelectValueProps
export type AutocompleteIndicatorProps = SelectIndicatorProps
export type AutocompleteOverlayProps = SelectOverlayProps
export type AutocompleteItemProps = SelectItemProps
export type AutocompleteItemLabelProps = SelectItemLabelProps
export type AutocompleteDescriptionProps = SelectDescriptionProps
export type AutocompleteErrorProps = SelectErrorProps

/**
 * What the slots of the search read. The field, its list and its rows read the `Select`'s
 * own context — `useSelect` — which the root builds; this is only what searching adds.
 */
export type AutocompleteContextValue = {
  query: string
  setQuery: (query: string) => void
  /** A page for the `Autocomplete`; unfolded under the field for the `Combobox`. */
  mode: ListPickerMode
  size: AutocompleteSize
  isDisabled: boolean
  emptyStyle: StyleProp<TextStyle>
}
