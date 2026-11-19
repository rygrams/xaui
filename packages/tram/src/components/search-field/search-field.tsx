import { forwardRef, useCallback, useMemo, useState } from 'react'
import type { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useXAUITheme } from '@xaui/native/theme'
import { DISC_SIZE } from '../../system/disc-size'
import { TextFieldRoot } from '../text-field'
import { SearchFieldProvider } from './search-field.context'
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  searchFieldRecipe,
} from './search-field.recipe'
import type { SearchFieldProps } from './search-field.type'

/**
 * A query, with the mark that says so and the cross that takes it back — the Native
 * `SearchField`'s API, drawn in Metro: one box holding the magnifier, the typed text and
 * the cross, inside a line of 2 that takes the accent with the focus.
 *
 * ```tsx
 * <SearchField onValueChange={setQuery}>
 *   <SearchField.Label>artistes</SearchField.Label>
 *   <SearchField.Field placeholder="rechercher">
 *     <SearchField.Icon />
 *     <SearchField.Clear accessibilityLabel="effacer la recherche" />
 *   </SearchField.Field>
 *   <SearchField.Description>par nom ou par album.</SearchField.Description>
 * </SearchField>
 * ```
 *
 * **It is a `TextField`.** The root below is the Tram `TextField`'s — `size`, `radius`,
 * `accent`, `color`, `isInvalid`, `isDisabled` — and `Label`, `Description` and `Error`
 * **are** its slots, as on Native.
 *
 * **One box, where Native composes a `FieldGroup`.** Tram has no `FieldGroup`: the marks
 * are written inside `SearchField.Field`, the magnifier before the text and the cross
 * after it. With no marks written, the box draws the magnifier alone.
 *
 * **Typing and searching are two callbacks.** `onValueChange` is every keystroke and the
 * clear; `onSearch` is the search key on the keyboard.
 */
export const SearchFieldRoot = forwardRef<View, SearchFieldProps>(
  function SearchField(
    {
      children,
      value,
      defaultValue,
      onValueChange,
      onSearch,
      variant = DEFAULT_VARIANT,
      size = DEFAULT_SIZE,
      isDisabled = false,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const focus = useSharedValue(0)

    const [own, setOwn] = useState(defaultValue ?? '')
    const isControlled = value !== undefined
    const query = isControlled ? value : own

    // Said only when it differs from the query as it stands — the parent's `value` when
    // controlled, so a field the parent filled itself can still be cleared.
    const report = useCallback(
      (next: string) => {
        if (!isControlled) setOwn(next)
        if (next === query) return
        onValueChange?.(next)
      },
      [isControlled, onValueChange, query]
    )

    // The cross reports through the keystroke's path: emptying the box is a change of
    // the query, and a list filtered by it has to follow.
    const clear = useCallback(() => report(''), [report])
    const submit = useCallback(() => onSearch?.(query), [onSearch, query])

    const styles = searchFieldRecipe.resolve({
      theme,
      selection: { variant, size },
    })

    // The magnifier is a mark, not text: `muted` at rest, the page's ink with the focus.
    // Disabled, it stays grey with the rest of the box.
    const { muted, foreground } = theme.colors
    const iconInk = useMemo(
      () => ({ rest: muted, focus: isDisabled ? muted : foreground }),
      [muted, foreground, isDisabled]
    )

    const context = useMemo(
      () => ({
        query,
        onType: report,
        clear,
        submit,
        size,
        variant,
        focus,
        boxStyle: styles.box,
        inputStyle: styles.input,
        iconStyle: styles.icon,
        lensStyle: styles.lens,
        handleStyle: styles.handle,
        clearStyle: styles.clear,
        iconSide: DISC_SIZE[size].glyph,
        iconInk,
      }),
      [query, report, clear, submit, size, variant, focus, styles, iconInk]
    )

    return (
      <SearchFieldProvider value={context}>
        <TextFieldRoot ref={ref} size={size} isDisabled={isDisabled} {...props}>
          {children}
        </TextFieldRoot>
      </SearchFieldProvider>
    )
  }
)

SearchFieldRoot.displayName = 'XAUI.Tram.SearchField.Root'
