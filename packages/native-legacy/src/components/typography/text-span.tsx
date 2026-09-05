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
 * @deprecated Use `TextSpan` from `@xaui/native/typography`. This tree is frozen and
 * receives fixes only.
 *
 * A nested `Text` inherits from its parent in React Native, so the v1 span needs no
 * context and no resolved style of its own: it is a `Text` with style props and `asChild`.
 * `themeColor` becomes a raw hex `color`; the rest are `TextStyle` keys under their own
 * React Native names.
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
