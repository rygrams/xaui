import { forwardRef, useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import { useControllableState } from '@xaui/native'
import { useXAUITheme } from '@xaui/native/theme'
import type { ListPickerMode } from '../../system/list-picker'
import { SelectRoot } from '../select/select'
import { SelectExtensionContext } from '../select/select.extension'
import { DEFAULT_SIZE } from '../select/select.recipe'
import { textFieldRecipe } from '../text-field/text-field.recipe'
import { AutocompleteProvider } from './autocomplete.context'
import { autocompleteRecipe } from './autocomplete.recipe'
import type { AutocompleteProps } from './autocomplete.type'

type SearchingRootProps = AutocompleteProps & {
  /** A page (the `Autocomplete`), or unfolded under its row (the `Combobox`). */
  mode: ListPickerMode
}

/**
 * The root the `Autocomplete` and the `Combobox` share: a Tram `SelectRoot` — the column,
 * the box, the value, the rows, the page — with a query on top. A value, an open list
 * and a query narrowing it is all either holds, and a second copy of the `Select` would
 * be a second thing to keep in step.
 *
 * It owns the open state so the query can go with the list: whatever closes it clears
 * what was typed.
 *
 * Internal. `Autocomplete` and `Combobox` are the public roots.
 */
export const SearchingRoot = forwardRef<View, SearchingRootProps>(
  function SearchingRoot(
    {
      mode,
      children,
      query: controlledQuery,
      defaultQuery = '',
      onQueryChange,
      isOpen: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      size = DEFAULT_SIZE,
      radius,
      isDisabled = false,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()

    const [query, setQuery] = useControllableState({
      value: controlledQuery,
      defaultValue: defaultQuery,
      onChange: onQueryChange,
    })
    const [isOpen, setOpen] = useControllableState({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })

    // The query goes with the list, however it closes: a choice, the overlay, the
    // system's back, a controlled `isOpen` set to false, or the field disabled while open.
    const isShown = isOpen && !isDisabled
    useEffect(() => {
      if (!isShown) setQuery('')
    }, [isShown, setQuery])

    const styles = autocompleteRecipe.resolve({ theme, selection: { mode } })
    const field = textFieldRecipe.resolve({ theme, selection: { size, radius } })

    const extension = useMemo(
      () => ({ query, keepsRow: mode === 'inline' }),
      [query, mode]
    )

    const context = useMemo(() => {
      // Unfolded under the field, the empty line is inset like its rows: by the field's
      // own padding.
      const { paddingHorizontal } = StyleSheet.flatten<TextStyle>(field.field)

      return {
        query,
        setQuery,
        mode,
        size,
        isDisabled,
        emptyStyle:
          mode === 'inline' ? [styles.empty, { paddingHorizontal }] : styles.empty,
      }
    }, [query, setQuery, mode, size, isDisabled, styles, field])

    return (
      <SelectExtensionContext.Provider value={extension}>
        <AutocompleteProvider value={context}>
          <SelectRoot
            ref={ref}
            size={size}
            radius={radius}
            isDisabled={isDisabled}
            isOpen={isOpen}
            onOpenChange={setOpen}
            {...props}
          >
            {children}
          </SelectRoot>
        </AutocompleteProvider>
      </SelectExtensionContext.Provider>
    )
  }
)

SearchingRoot.displayName = 'XAUI.Tram.Autocomplete.SearchingRoot'

/**
 * A field that opens a list you search — the Native `Autocomplete`'s API, drawn as the
 * Tram `Select` it is built on: the `TextField`'s box with the value and a chevron, which
 * opens the `Select`'s page, swivelled in on its top edge, with the search under its
 * title and the rows cascading in.
 *
 * ```tsx
 * <Autocomplete onValueChange={setCountry}>
 *   <Autocomplete.Label>pays</Autocomplete.Label>
 *   <Autocomplete.Trigger>
 *     <Autocomplete.Value placeholder="choisir un pays" />
 *     <Autocomplete.Indicator />
 *   </Autocomplete.Trigger>
 *   <Autocomplete.Content>
 *     <Autocomplete.Search placeholder="nom ou code" />
 *     <Autocomplete.Item value="ci">Côte d'Ivoire</Autocomplete.Item>
 *     <Autocomplete.Item value="ml">Mali</Autocomplete.Item>
 *     <Autocomplete.Empty>aucun pays</Autocomplete.Empty>
 *   </Autocomplete.Content>
 * </Autocomplete>
 * ```
 *
 * It is not a `Select`: a select is for a list you read, an autocomplete for one you
 * cannot, where choosing is finding. The rows narrow as you type, and the letters they
 * matched are written in the accent read as ink.
 */
export const AutocompleteRoot = forwardRef<View, AutocompleteProps>(
  function Autocomplete(props, ref) {
    return <SearchingRoot ref={ref} mode="fullscreen" {...props} />
  }
)

AutocompleteRoot.displayName = 'XAUI.Tram.Autocomplete.Root'
