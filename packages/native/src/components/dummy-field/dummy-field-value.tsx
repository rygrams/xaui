import { forwardRef } from 'react'
import { Text } from 'react-native'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useDummyField } from './dummy-field.context'
import type { DummyFieldValueProps } from './dummy-field.type'

/**
 * The text slot displaying the chosen value or the placeholder when empty.
 * Single-line by default; truncates if text exceeds available width.
 */
export const DummyFieldValue = forwardRef<Text, DummyFieldValueProps>(
  function DummyFieldValue(
    { placeholder, children, numberOfLines = 1, style, ...props },
    ref
  ) {
    const { valueStyle, placeholderStyle } = useDummyField()
    const [styleProps, rest] = useStyleProps(props)

    const text = childrenToString(children)
    const content = text !== null ? text : children
    const isEmpty = content === undefined || content === null || content === ''

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[valueStyle, isEmpty && placeholderStyle, styleProps, style]}
      >
        {isEmpty ? placeholder : content}
      </Text>
    )
  }
)

DummyFieldValue.displayName = 'XAUI.DummyField.Value'
