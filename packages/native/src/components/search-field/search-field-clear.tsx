import { forwardRef, useCallback } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { CloseButtonBase } from '../../system/close-button'
import { FieldGroupSuffix } from '../field-group'
import { useTextField } from '../text-field'
import { useSearchField } from './search-field.context'
import type { SearchFieldClearProps } from './search-field.type'

/**
 * The cross that empties the box:
 *
 * ```tsx
 * <FieldGroup>
 *   <SearchField.Field placeholder="Search…" />
 *   <SearchField.Clear accessibilityLabel="Clear the search" />
 * </FieldGroup>
 * ```
 *
 * **It renders nothing while the box is empty**, which is the one place this component
 * departs from the library's rule that a slot rendering nothing is a slot you cannot debug.
 * A cross that clears an empty field is a target that does nothing, and every search box
 * ever drawn hides it — the alternative is the caller writing that condition at the call
 * site, in the middle of their JSX, on every screen with a search on it.
 *
 * **And it is its own `FieldGroup.Suffix`**, unlike `SearchField.Icon`, which the caller
 * wraps in a `Prefix` the way every other decorator in the library is wrapped. That is the
 * price of being conditional: a decorator is inset by the field's own padding, so an empty
 * one is still two paddings wide and the field would go on clearing room for a cross that
 * is not there. Owning the edge is what lets the whole decorator go with the cross.
 *
 * Everything else is the shared close button's: it owns its press state, because the cross
 * and the field under it are different targets; it grows its target with `hitSlop` rather
 * than growing the glyph; and with no children it draws its own cross from two bars a
 * quarter turn apart.
 */
export const SearchFieldClear = forwardRef<View, SearchFieldClearProps>(
  function SearchFieldClear({ onPress, ...props }, ref) {
    const { query, clear, clearStyle, clearGlyphStyle } = useSearchField()
    const { isDisabled } = useTextField()

    // Composed, never replaced: a caller's `onPress` runs, and the box is still emptied.
    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        clear()
        onPress?.(event)
      },
      [clear, onPress]
    )

    if (query.length === 0) return null

    return (
      <FieldGroupSuffix>
        <CloseButtonBase
          ref={ref}
          name="SearchField.Clear"
          baseStyle={clearStyle}
          glyphStyle={clearGlyphStyle}
          isDisabled={isDisabled}
          {...props}
          onPress={handlePress}
        />
      </FieldGroupSuffix>
    )
  }
)

SearchFieldClear.displayName = 'XAUI.SearchField.Clear'
