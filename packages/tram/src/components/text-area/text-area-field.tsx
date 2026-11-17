import { forwardRef, useMemo } from 'react'
import type { TextInput } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { linesHeight } from '../../system/lines-height'
import { TextFieldField, useTextField } from '../text-field'
import { useTextArea } from './text-area.context'
import type { TextAreaFieldProps } from './text-area.type'

/**
 * The `TextInput`, on several lines: the `TextField`'s field — the same line, the same
 * focus, the same props — with its text starting at the top and its height counted in
 * lines.
 *
 * ```tsx
 * <TextArea.Field value={message} onChangeText={setMessage} />
 * ```
 *
 * It grows with what is typed, from `rows` up to `maxRows`, and scrolls past that.
 */
export const TextAreaField = forwardRef<TextInput, TextAreaFieldProps>(
  function TextAreaField({ style, scrollEnabled, ...props }, ref) {
    const { textAreaStyle, textArea } = useTextField()
    const { rows, maxRows } = useTextArea()
    const [styleProps, rest] = useStyleProps(props)

    const height = useMemo(
      () => ({
        minHeight: linesHeight(rows, textArea),
        // Unset, the field grows for as long as the text does.
        maxHeight: maxRows ? linesHeight(maxRows, textArea) : undefined,
      }),
      [rows, maxRows, textArea]
    )

    return (
      <TextFieldField
        ref={ref}
        multiline
        // Only a field with a ceiling has anything to scroll.
        scrollEnabled={scrollEnabled ?? maxRows !== undefined}
        {...rest}
        style={[textAreaStyle, height, styleProps, style]}
      />
    )
  }
)

TextAreaField.displayName = 'XAUI.Tram.TextArea.Field'
