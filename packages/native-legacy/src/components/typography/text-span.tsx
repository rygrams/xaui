import React from 'react'
import { Text } from 'react-native'
import { TextSpanContext } from './text-span.context'
import type { TextSpanAlign, TextSpanProps } from './text-span.type'
import type { TextStyle } from 'react-native'

const alignToTextAlign: Record<TextSpanAlign, TextStyle['textAlign']> = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
}

/**
 * @deprecated Use `TextSpan` from `@xaui/native/typography`. It is a bare React Native
 * `Text` there: the inheritance this component carried through `TextSpanContext` is what
 * React Native already does for a nested `Text`. `align="left"` becomes `textAlign` (R13).
 */
export const TextSpan: React.FC<TextSpanProps> = ({
  children,
  color,
  fontWeight,
  fontStyle,
  textTransform,
  spacing,
  align,
  backgroundColor,
  style,
}: TextSpanProps) => {
  const inheritedTextStyle = {
    color,
    fontWeight,
    fontStyle,
    textTransform,
    align,
    spacing,
  }

  return (
    <TextSpanContext.Provider value={inheritedTextStyle}>
      <Text
        style={[
          {
            ...(align ? { textAlign: alignToTextAlign[align] } : {}),
            ...(backgroundColor ? { backgroundColor } : {}),
          },
          style,
        ]}
      >
        {children}
      </Text>
    </TextSpanContext.Provider>
  )
}

TextSpan.displayName = 'TextSpan'
