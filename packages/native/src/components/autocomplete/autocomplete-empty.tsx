import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteEmptyProps } from './autocomplete.type'

/**
 * What the panel says when nothing matches.
 *
 * `Autocomplete.Content` renders it **instead of** the results, and only then — a panel
 * that filtered its last row away and showed an empty box reads as a control that has
 * broken rather than as a search that found nothing.
 */
export const AutocompleteEmpty = forwardRef<Text, AutocompleteEmptyProps>(
  function AutocompleteEmpty({ children, style, ...props }, ref) {
    const { emptyStyle } = useAutocomplete()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[emptyStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

AutocompleteEmpty.displayName = 'XAUI.Autocomplete.Empty'
