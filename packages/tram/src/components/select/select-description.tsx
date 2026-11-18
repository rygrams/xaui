import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useSelect } from './select.context'
import type { SelectDescriptionProps } from './select.type'

/**
 * The hint under the field, in the muted ink — invalid or not. It carries an id the
 * trigger points at with `aria-describedby`, so it is read after the label.
 */
export const SelectDescription = forwardRef<Text, SelectDescriptionProps>(
  function SelectDescription({ children, style, nativeID, ...props }, ref) {
    const { descriptionStyle, descriptionId } = useSelect()
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
  }
)

SelectDescription.displayName = 'XAUI.Tram.Select.Description'
