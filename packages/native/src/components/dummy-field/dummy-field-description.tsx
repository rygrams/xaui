import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDummyField } from './dummy-field.context'
import type { DummyFieldDescriptionProps } from './dummy-field.type'

/**
 * The hint under the field — explaining what is expected or what the chosen value does.
 * It carries the id the field points at with `aria-describedby`.
 */
export const DummyFieldDescription = forwardRef<Text, DummyFieldDescriptionProps>(
  function DummyFieldDescription({ children, style, nativeID, ...props }, ref) {
    const { descriptionStyle, descriptionId } = useDummyField()
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

DummyFieldDescription.displayName = 'XAUI.DummyField.Description'
