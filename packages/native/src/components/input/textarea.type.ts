import type { TextInputProps } from './input.type'

export type TextAreaProps = Omit<TextInputProps, 'multiline'> & {
  /**
   * Minimum number of rows.
   * @default 3
   */
  minRows?: number
  /**
   * Optional maximum number of rows before scrolling.
   */
  maxRows?: number
}
