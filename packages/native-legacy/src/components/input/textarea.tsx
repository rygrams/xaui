import React from 'react'
import { TextInput } from './input'
import { useTextInputSizeStyles } from './input.hook'
import type { TextAreaProps } from './textarea.type'
import { textAreaStyles } from './textarea.style'

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
