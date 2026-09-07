import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteValueProps } from './autocomplete.type'

/**
 * What the trigger says: the chosen row's label, or the placeholder until there is one.
 *
 * The label is read off the rows as **elements**, before any of them mounts — the panel
 * lives in a portal that only exists while it is open, so a control with a `defaultValue`
 * would show its placeholder until the user had opened it once. A row wrapped in a
 * component of your own is not reachable that way, and `children` here is the way out.
 */
export const AutocompleteValue = forwardRef<Text, AutocompleteValueProps>(
  function AutocompleteValue({ children, placeholder, style, ...props }, ref) {
    const { valueStyle, placeholderStyle, value, labelFor } = useAutocomplete()
    const [styleProps, rest] = useStyleProps(props)

    const label = children ?? (value === undefined ? undefined : labelFor(value))
    const isEmpty = label === undefined || label === null

    return (
      <Text
        ref={ref}
        numberOfLines={1}
        {...rest}
        style={[isEmpty ? placeholderStyle : valueStyle, styleProps, style]}
      >
        {isEmpty ? placeholder : label}
      </Text>
    )
  }
)

AutocompleteValue.displayName = 'XAUI.Autocomplete.Value'
