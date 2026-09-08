import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDummyField } from './dummy-field.context'
import type { DummyFieldLabelProps } from './dummy-field.type'

/**
 * What the field is for. It turns `danger` with `isInvalid`, so the field that is wrong is
 * findable on a long form without reading every message.
 *
 * It carries the id the field points at, which is what makes a screen reader announce
 * the label when focusing the field.
 */
export const DummyFieldLabel = forwardRef<Text, DummyFieldLabelProps>(
  function DummyFieldLabel({ children, style, nativeID, ...props }, ref) {
    const { labelStyle, labelId } = useDummyField()
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

DummyFieldLabel.displayName = 'XAUI.DummyField.Label'
