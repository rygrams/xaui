import { forwardRef, useCallback } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { CloseButton } from '../close-button'
import { useTextField } from '../text-field'
import { useSearchField } from './search-field.context'
import type { SearchFieldClearProps } from './search-field.type'

/**
 * The cross that empties the box, at its end:
 *
 * ```tsx
 * <SearchField.Field placeholder="rechercher">
 *   <SearchField.Clear accessibilityLabel="effacer la recherche" />
 * </SearchField.Field>
 * ```
 *
 * It **is** the Tram `CloseButton`, drawn `text` — the cross alone, in the page's ink, no
 * circle — at the field's size: it leans toward the finger and is pressed as 48.
 *
 * **It renders nothing while the box is empty**, as on Native: a cross that clears an
 * empty field is a target that does nothing. A press empties the query, reports it, and
 * hands the focus back to the text, so the next query is typed straight away.
 */
export const SearchFieldClear = forwardRef<View, SearchFieldClearProps>(
  function SearchFieldClear({ onPress, style, ...props }, ref) {
    const { query, clear, size, clearStyle } = useSearchField()
    const { isDisabled, fieldRef } = useTextField()

    // Composed, never replaced: a caller's `onPress` runs, and the box is still emptied.
    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        clear()
        fieldRef.current?.focus()
        onPress?.(event)
      },
      [clear, fieldRef, onPress]
    )

    if (query.length === 0) return null

    return (
      <CloseButton
        ref={ref}
        variant="text"
        size={size}
        isDisabled={isDisabled}
        {...props}
        style={
          typeof style === 'function'
            ? state => [clearStyle, style(state)]
            : [clearStyle, style]
        }
        onPress={handlePress}
      />
    )
  }
)

SearchFieldClear.displayName = 'XAUI.Tram.SearchField.Clear'
