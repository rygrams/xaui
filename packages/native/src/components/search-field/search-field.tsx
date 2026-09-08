import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { useXAUITheme } from '../../theme/theme-hooks'
import { TextFieldRoot } from '../text-field'
import { SearchFieldProvider } from './search-field.context'
import { searchFieldRecipe } from './search-field.recipe'
import type { SearchFieldProps } from './search-field.type'

/**
 * A query, with the mark that says so and the cross that takes it back.
 *
 * ```tsx
 * <SearchField onValueChange={setQuery}>
 *   <SearchField.Label>Find products</SearchField.Label>
 *   <FieldGroup>
 *     <FieldGroup.Prefix isDecorative>
 *       <SearchField.Icon />
 *     </FieldGroup.Prefix>
 *     <SearchField.Field placeholder="Search…" />
 *     <SearchField.Clear accessibilityLabel="Clear the search" />
 *   </FieldGroup>
 *   <SearchField.Description>Search by name, category, or SKU</SearchField.Description>
 * </SearchField>
 * ```
 *
 * **It is a `TextField`.** The root below is the `TextField`'s: the same `size`, `radius`,
 * `color`, `labelPlacement`, `isInvalid` and `isDisabled`, and `SearchField.Label`,
 * `.Description` and `.Error` **are** its slots — the same components, not wrappers. The
 * `MaskField`'s and the `NumberField`'s arrangement exactly.
 *
 * **What differs is the fill and the two marks.** There are two variants rather than four
 * — a flat `primary` and a soft `secondary`, both without the `field` shadow — because a
 * search box sits alone on a screen or on a surface, and those are the two things it has to
 * be. The `TextField` underneath is handed `tertiary`, which is the edge and the focus
 * colour with no fill of their own; the fill goes over it.
 *
 * **Typing and searching are two callbacks, on purpose.** `onValueChange` is every
 * keystroke, which is what a list filtered in memory reads; `onSearch` is the search key on
 * the keyboard, which is what a query costing a request waits for. A field that fired one
 * callback for both would make the caller debounce to tell them apart.
 *
 * For a query that opens a list of suggestions, that is `Autocomplete`; for one that picks
 * from a closed set, `Combobox`.
 */
export const SearchFieldRoot = forwardRef<View, SearchFieldProps>(
  function SearchField(
    {
      children,
      value,
      defaultValue,
      onValueChange,
      onSearch,
      variant,
      size,
      color,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()

    const [own, setOwn] = useState(defaultValue ?? '')

    const isControlled = value !== undefined
    const query = isControlled ? value : own

    // Not state: it is only read to decide whether the callback says anything new, and a
    // render of its own would be a render per keystroke that changes nothing on screen.
    const reported = useRef(query)

    const report = useCallback(
      (next: string) => {
        if (!isControlled) setOwn(next)

        if (next === reported.current) return
        reported.current = next
        onValueChange?.(next)
      },
      [isControlled, onValueChange]
    )

    // The cross reports through the same path a keystroke does: emptying the box *is* a
    // change of the query, and a caller filtering a list would otherwise keep the last
    // results on screen with nothing in the field.
    const clear = useCallback(() => report(''), [report])
    const submit = useCallback(() => onSearch?.(query), [onSearch, query])

    const selection = { variant, size }
    const styles = searchFieldRecipe.resolve({ theme, selection })
    // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
    // letting one into the key would grow the table with the colours users invent.
    const tint = color
      ? searchFieldRecipe.tint({ theme, color, selection })
      : undefined

    const context = useMemo(
      () => ({
        query,
        onType: report,
        clear,
        submit,
        boxStyle: tint ? [styles.field, tint.field] : styles.field,
        clearStyle: styles.clear,
        clearGlyphStyle: styles.clearGlyph,
      }),
      [query, report, clear, submit, styles, tint]
    )

    return (
      <SearchFieldProvider value={context}>
        {/*
          `tertiary` rather than the caller's variant: the two this component publishes are
          fills, and they are painted by its own recipe over the edge this one draws. The
          tint stays here too — it lands on the fill, which is where a colour named on a
          search box is expected to land.
        */}
        <TextFieldRoot ref={ref} variant="tertiary" size={size} {...props}>
          {children}
        </TextFieldRoot>
      </SearchFieldProvider>
    )
  }
)

SearchFieldRoot.displayName = 'XAUI.SearchField.Root'
