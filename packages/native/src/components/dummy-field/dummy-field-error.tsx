import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDummyField } from './dummy-field.context'
import type { DummyFieldErrorProps } from './dummy-field.type'

/**
 * The error message under the field when invalid.
 * Uses the `errorStyle` resolved by the recipe (painted in `danger`).
 */
export const DummyFieldError = forwardRef<Text, DummyFieldErrorProps>(
  function DummyFieldError({ children, style, nativeID, ...props }, ref) {
    const { errorStyle, descriptionId } = useDummyField()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? descriptionId}
        style={[errorStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

DummyFieldError.displayName = 'XAUI.DummyField.Error'
