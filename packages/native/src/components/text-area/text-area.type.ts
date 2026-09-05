import type { ReactNode } from 'react'
import type { InputFieldProps, InputProps } from '../input'

type TextAreaOwnProps = {
  /**
   * How many lines tall the field starts. It is a **raw value**, not a token: it resolves
   * outside the style cache from the line height the size chose, the same path `color`
   * takes — which is what lets `rows={7}` exist without seven entries in the cache.
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
 * Everything the `Input` root understands, plus the two the shape of a multiline field
 * needs. They sit on the **root** rather than on `TextArea.Field` for the reason `size`
 * and `variant` do: the root is where the field's shape is decided, and the slot reads
 * what it resolved.
 */
export type TextAreaProps = Omit<InputProps, 'children'> & TextAreaOwnProps

/**
 * Everything `Input.Field` accepts except `multiline`, which this sets — it is the same
 * `TextInput`, and the same props, with the three things several lines need.
 */
export type TextAreaFieldProps = Omit<InputFieldProps, 'multiline'>

/**
 * The one thing the `Input`'s own context cannot carry, because `rows` is not the
 * `Input`'s business: a single-line field has no use for it, and a prop that does nothing
 * in the common case is a prop that reads as broken.
 */
export type TextAreaContextValue = {
  rows: number
  maxRows: number | undefined
}
