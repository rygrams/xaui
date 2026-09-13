import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteLabelProps } from './autocomplete.type'

/**
 * What the field is for — the `TextField.Label`, on a field that opens a list.
 *
 * It turns `danger` with `isInvalid`, so the field that is wrong is findable on a long form
 * without reading every message. Its colour is the theme's `foreground` rather than the
 * variant's: the label sits outside the box, on the screen behind it, so a tinted field
 * does not tint it.
 *
 * It carries the id the trigger points at, which is what makes a screen reader announce
 * "État, liste déroulante" instead of reading the placeholder and hoping.
 */
export const AutocompleteLabel = forwardRef<Text, AutocompleteLabelProps>(
  function AutocompleteLabel({ children, style, nativeID, ...props }, ref) {
    const { labelStyle, labelId } = useAutocomplete()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? labelId}
        style={[labelStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

AutocompleteLabel.displayName = 'XAUI.Autocomplete.Label'
