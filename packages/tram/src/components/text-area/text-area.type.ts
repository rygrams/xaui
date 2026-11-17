import type { ReactNode } from 'react'
import type { TextFieldFieldProps, TextFieldProps } from '../text-field'

type TextAreaOwnProps = {
  /**
   * How many lines tall the field starts. A raw value, not a token: the height it implies
   * is computed outside the style cache, from the line height the size chose.
   *
   * @default 3
   */
  rows?: number
  /**
   * The ceiling, in lines. Past it the field stops growing and scrolls; unset, it grows
   * with the text for as long as the text goes on.
   */
  maxRows?: number
  children?: ReactNode
}

/**
 * Everything the Tram `TextField` root understands, plus the two the shape of a multiline
 * field needs — on the root, where the field's shape is decided.
 */
export type TextAreaProps = Omit<TextFieldProps, 'children'> & TextAreaOwnProps

/** Everything `TextField.Field` accepts except `multiline`, which this sets. */
export type TextAreaFieldProps = Omit<TextFieldFieldProps, 'multiline'>

/** What the `TextField`'s own context has no use for: the two row counts. */
export type TextAreaContextValue = {
  rows: number
  maxRows: number | undefined
}
