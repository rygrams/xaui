import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet, type TextInput } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useGrowWithContent } from '../../system/use-grow-with-content'
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
 * It grows with what is typed, from `rows` up to `maxRows`, and scrolls past that — unless
 * its `style` names a `height`, which is then the height it keeps.
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

    // A height the caller chose is not one to grow out of.
    const isSized = StyleSheet.flatten([styleProps, style])?.height !== undefined
    const grow = useGrowWithContent(!isSized, [
      rest.value,
      height.minHeight,
      height.maxHeight,
    ])

    const setRef = useCallback(
      (node: TextInput | null) => {
        grow(node)
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [grow, ref]
    )

    return (
      <TextFieldField
        ref={setRef}
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
