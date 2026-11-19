import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useLayoutEffect,
} from 'react'
import type { ReactNode } from 'react'
import type { View } from 'react-native'
import { collectItemLabels, filterItems, useStyleProps } from '@xaui/native/system'
import { SelectInlineList } from '../select/select-inline-list'
import { SelectItem } from '../select/select-item'
import { SelectPage } from '../select/select-page'
import { useSelect } from '../select/select.context'
import { ORDER_SEPARATOR, readItems } from '../select/select.items'
import { AutocompleteEmpty } from './autocomplete-empty'
import { AutocompleteSearch } from './autocomplete-search'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteContentProps } from './autocomplete.type'

/** By identity rather than by `displayName`: a minifier keeps the reference. */
const isItem = (type: unknown) => type === SelectItem
const isOfType = (child: ReactNode, type: unknown) =>
  isValidElement(child) && child.type === type

/**
 * The list, narrowed by the query. On a page for the `Autocomplete` — the search under
 * the title, held still, the rows scrolling under it — and unfolded under the field for
 * the `Combobox`.
 *
 * Rows are filtered by their label, read off the elements: a row whose label does not
 * hold the query is dropped, one with no label to read stays. `Autocomplete.Empty` is
 * drawn only when no row is left. **Direct children only**: a row wrapped in a component
 * of the caller's is a row the search will not hide.
 *
 * `ref`, `style` and the view's props go to whichever is drawn.
 */
export const AutocompleteContent = forwardRef<View, AutocompleteContentProps>(
  function AutocompleteContent({ children, style, ...props }, ref) {
    const { query, mode } = useAutocomplete()
    const { inlineList, registerLabel, setListing } = useSelect()
    const [styleProps, rest] = useStyleProps(props)

    // Keyed once, so a row keeps its node — and its place in the cascade — as others drop
    // out around it.
    const all = Children.toArray(children)
    const search = all.filter(child => isOfType(child, AutocompleteSearch))
    const listed = all.filter(child => !isOfType(child, AutocompleteSearch))
    const { children: kept, matched } = filterItems(listed, query, isItem)
    const shown =
      matched > 0 ? kept.filter(child => !isOfType(child, AutocompleteEmpty)) : kept

    const order = readItems(shown, isItem)
      .map(item => item.value)
      .join(ORDER_SEPARATOR)

    // Every row's label, filtered or not: the field names its value whatever was typed.
    useEffect(() => {
      for (const [value, label] of collectItemLabels(children, isItem)) {
        registerLabel(value, label)
      }
    }, [children, registerLabel])

    useEffect(() => {
      setListing({ mode, order })
    }, [mode, order, setListing])

    const drawn = [styleProps, style]
    const unfolded =
      mode === 'inline' ? (
        <SelectInlineList ref={ref} {...rest} style={drawn}>
          {search}
          {shown}
        </SelectInlineList>
      ) : null

    // Handed to the box on every render — it is the box that draws an unfolded list, inside
    // its own line. Publishing re-renders the box, never this component.
    useLayoutEffect(() => {
      inlineList.set(unfolded)
    })
    useLayoutEffect(() => () => inlineList.set(null), [inlineList])

    if (mode === 'inline') return null

    return (
      <SelectPage ref={ref} {...rest} style={drawn} header={search}>
        {shown}
      </SelectPage>
    )
  }
)

AutocompleteContent.displayName = 'XAUI.Tram.Autocomplete.Content'
