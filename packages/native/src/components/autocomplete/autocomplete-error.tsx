import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteErrorProps } from './autocomplete.type'

/**
 * What is wrong with the chosen row, in `danger` — the `TextField.Error`, on a field that
 * opens a list.
 *
 * **It always renders what it is given.** `isInvalid` paints the trigger's border and turns
 * the label and the description, but it does not mount or unmount this slot: a slot that
 * silently renders nothing is one you cannot debug, so you write the condition yourself.
 */
export const AutocompleteError = forwardRef<Text, AutocompleteErrorProps>(
  function AutocompleteError({ children, style, ...props }, ref) {
    const { errorStyle } = useAutocomplete()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[errorStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

AutocompleteError.displayName = 'XAUI.Autocomplete.Error'
