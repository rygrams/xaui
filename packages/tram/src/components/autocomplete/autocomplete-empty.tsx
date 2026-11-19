import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteEmptyProps } from './autocomplete.type'

/**
 * What the list says when nothing matches, in `body` and the grey of a description. The
 * content draws it only then. It is announced as it appears: typing a word that empties
 * the list is something a screen reader user should hear rather than discover.
 */
export const AutocompleteEmpty = forwardRef<Text, AutocompleteEmptyProps>(
  function AutocompleteEmpty({ children, style, ...props }, ref) {
    const { emptyStyle } = useAutocomplete()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityLiveRegion="polite"
        aria-live="polite"
        {...rest}
        style={[emptyStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

AutocompleteEmpty.displayName = 'XAUI.Tram.Autocomplete.Empty'
