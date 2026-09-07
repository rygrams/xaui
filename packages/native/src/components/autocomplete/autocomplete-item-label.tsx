import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteItemLabelProps } from './autocomplete.type'

/** The word on a result. Written for you from a text child (R3). */
export const AutocompleteItemLabel = forwardRef<Text, AutocompleteItemLabelProps>(
  function AutocompleteItemLabel({ children, style, ...props }, ref) {
    const { itemLabelStyle } = useAutocomplete()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[itemLabelStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

AutocompleteItemLabel.displayName = 'XAUI.Autocomplete.ItemLabel'
