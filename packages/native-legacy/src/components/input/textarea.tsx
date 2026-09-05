import React from 'react'
import { TextInput } from './input'
import { useTextInputSizeStyles } from './input.hook'
import type { TextAreaProps } from './textarea.type'
import { textAreaStyles } from './textarea.style'

/**
 * @deprecated Use `TextArea` from `@xaui/native/text-area`. This tree is frozen and
 * receives fixes only.
 *
 * The v1 `TextArea` **is** the `Input` — it renders an `InputRoot` and adds only what a
 * multiline field needs, so its variants, sizes, slots, `radius` and `color` are the
 * `Input`'s and cannot drift from them. Read that component's marker for the migration;
 * `minRows` and `maxRows` keep their names.
 */
export const TextArea: React.FC<TextAreaProps> = ({
  minRows = 3,
  maxRows,
  size = 'md',
  customAppearance,
  numberOfLines,
  textAlignVertical,
  scrollEnabled,
  ...props
}: TextAreaProps) => {
  const sizeStyles = useTextInputSizeStyles(size)
  const lineHeight = Math.round(sizeStyles.fontSize * 1.35)
  const verticalPadding = sizeStyles.paddingVertical * 2
  const normalizedMaxRows =
    typeof maxRows === 'number' ? Math.max(maxRows, minRows) : undefined
  const minHeight = minRows * lineHeight + verticalPadding
  const maxHeight =
    typeof normalizedMaxRows === 'number'
      ? normalizedMaxRows * lineHeight + verticalPadding
      : undefined

  return (
    <TextInput
      {...props}
      size={size}
      multiline
      numberOfLines={numberOfLines ?? minRows}
      textAlignVertical={textAlignVertical ?? 'top'}
      scrollEnabled={scrollEnabled ?? !!maxHeight}
      customAppearance={{
        ...customAppearance,
        inputWrapper: [
          textAreaStyles.inputWrapper,
          {
            minHeight,
            ...(maxHeight ? { maxHeight } : {}),
          },
          customAppearance?.inputWrapper,
        ],
        input: [
          textAreaStyles.input,
          {
            lineHeight,
          },
          customAppearance?.input,
        ],
      }}
    />
  )
}
