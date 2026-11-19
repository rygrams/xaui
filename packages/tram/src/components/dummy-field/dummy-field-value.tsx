import { forwardRef, useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'
import type { TextStyle } from 'react-native'
import { childrenToString, useStyleProps } from '@xaui/native/system'
import { splitFieldStyle } from '../../system/split-field-style'
import { useTextField } from '../text-field'
import { useDummyField } from './dummy-field.context'
import type { DummyFieldValueProps } from './dummy-field.type'

/**
 * What the field shows, in the type of what a `TextField` holds, or the placeholder in its
 * grey until there is something to show.
 *
 * A single line: a value long enough to wrap would grow a box whose height is set.
 */
export const DummyFieldValue = forwardRef<Text, DummyFieldValueProps>(
  function DummyFieldValue(
    { placeholder, children, numberOfLines = 1, style, ...props },
    ref
  ) {
    const { fieldStyle, placeholderTextColor } = useTextField()
    const { valueStyle } = useDummyField()
    const [styleProps, rest] = useStyleProps(props)

    // The `TextField`'s field, less its box: the type and the ink of what is typed there.
    const type = useMemo(
      () => splitFieldStyle(StyleSheet.flatten<TextStyle>(fieldStyle)).text,
      [fieldStyle]
    )

    const text = childrenToString(children)
    const content = text ?? children
    const isEmpty = content === undefined || content === null || content === ''

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[
          type,
          valueStyle,
          isEmpty ? { color: placeholderTextColor } : undefined,
          styleProps,
          style,
        ]}
      >
        {isEmpty ? placeholder : content}
      </Text>
    )
  }
)

DummyFieldValue.displayName = 'XAUI.Tram.DummyField.Value'
