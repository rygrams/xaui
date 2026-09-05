import { forwardRef, useMemo } from 'react'
import { TextInput } from 'react-native'
import { InputField, useInput } from '../input'
import { useStyleProps } from '../../system/style-props'
import { useTextArea } from './text-area.context'
import type { TextAreaFieldProps } from './text-area.type'

/**
 * The `TextInput` itself — `Input.Field` with the three things several lines need:
 * `multiline`, the text pinned to the top, and a height counted in lines.
 *
 * It renders the `Input`'s field rather than a second `TextInput`, so the focus plumbing,
 * the placeholder colour, the label association and `isDisabled` are the ones already
 * written. What it adds is layered **over** the field's own style: the recipe resolved the
 * colours, the border and the radius once for both.
 *
 * The height is arithmetic rather than a token, because `rows` is a raw value (R6): the
 * root published the line height and the vertical padding its `size` chose, and this
 * multiplies. That is what lets `rows={7}` exist without seven entries in the style cache.
 */
export const TextAreaField = forwardRef<TextInput, TextAreaFieldProps>(
  function TextAreaField({ style, scrollEnabled, ...props }, ref) {
    const { textAreaStyle, textArea } = useInput()
    const { rows, maxRows } = useTextArea()
    const [styleProps, rest] = useStyleProps(props)

    const height = useMemo(() => {
      const chrome = textArea.paddingVertical * 2
      return {
        minHeight: rows * textArea.lineHeight + chrome,
        // Unset, the field grows for as long as the text does. With a ceiling it stops
        // there and scrolls, which is the only case that needs `scrollEnabled` — a
        // multiline field that can grow has nothing to scroll.
        maxHeight: maxRows ? maxRows * textArea.lineHeight + chrome : undefined,
      }
    }, [rows, maxRows, textArea])

    return (
      <InputField
        ref={ref}
        multiline
        scrollEnabled={scrollEnabled ?? maxRows !== undefined}
        {...rest}
        style={[textAreaStyle, height, styleProps, style]}
      />
    )
  }
)

TextAreaField.displayName = 'XAUI.TextArea.Field'
