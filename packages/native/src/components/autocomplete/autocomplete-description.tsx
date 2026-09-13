import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteDescriptionProps } from './autocomplete.type'

/**
 * The hint under the field — what the list holds, how much of it there is. The
 * `TextField.Description`, on a field that opens a list.
 *
 * It turns `danger` with `isInvalid`, like the label, and sits inset by half the field's
 * padding so the column reads as one block rather than a label, a box and a stray line.
 *
 * It carries the id the trigger points at, so a screen reader reads the hint after the
 * value rather than leaving it on screen for the sighted alone.
 */
export const AutocompleteDescription = forwardRef<
  Text,
  AutocompleteDescriptionProps
>(function AutocompleteDescription({ children, style, nativeID, ...props }, ref) {
  const { descriptionStyle, descriptionId } = useAutocomplete()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      nativeID={nativeID ?? descriptionId}
      style={[descriptionStyle, styleProps, style]}
      {...rest}
    >
      {children}
    </Text>
  )
})

AutocompleteDescription.displayName = 'XAUI.Autocomplete.Description'
