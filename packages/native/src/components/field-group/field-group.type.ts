import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { IconProps } from '../../system/icon'
import type { ViewStyleProps } from '../../system/style-props'
import type { TextFieldFieldProps } from '../text-field'

type FieldGroupOwnProps = {
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * R14 — the wrapper `View`'s own props, plus every `ViewStyle` key it does not claim.
 *
 * **There is no `variant`, no `size`, no `color` and no `isDisabled` here.** They are the
 * `TextField`'s, and a `FieldGroup` is one row inside it: a second `size` on this root would
 * be a second answer to a question the field has already answered.
 */
export type FieldGroupProps = FieldGroupOwnProps &
  Omit<ViewProps, keyof FieldGroupOwnProps> &
  Omit<ViewStyleProps, keyof FieldGroupOwnProps | keyof ViewProps> & {
    /** R12 — merge into the single child instead of rendering a `View`. */
    asChild?: boolean
  }

type FieldGroupDecoratorOwnProps = {
  /**
   * The decorator stops taking touches and disappears from the accessibility tree, so a
   * tap on the glyph focuses the field under it and a screen reader announces the field
   * rather than a mark it cannot act on.
   *
   * Leave it off whenever the decorator holds something to press — a reveal toggle, a
   * clear button — which is the whole reason it is a prop and not the default.
   *
   * @default false
   */
  isDecorative?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

type FieldGroupDecoratorProps = FieldGroupDecoratorOwnProps &
  Omit<ViewProps, keyof FieldGroupDecoratorOwnProps> &
  Omit<ViewStyleProps, keyof FieldGroupDecoratorOwnProps | keyof ViewProps>

export type FieldGroupPrefixProps = FieldGroupDecoratorProps
export type FieldGroupSuffixProps = FieldGroupDecoratorProps

/** Which edge a decorator is pinned to, and therefore which width it reports. */
export type FieldGroupSide = 'prefix' | 'suffix'

/**
 * Everything `TextField.Field` accepts. It **is** that field — the same `TextInput`, the same
 * focus plumbing, the same styles — with the padding the two decorators measured.
 */
export type FieldGroupFieldProps = TextFieldFieldProps

/** Everything `Icon` accepts. `size` and `color` fall back to the field's own. */
export type FieldGroupIconProps = IconProps

/**
 * R5 — but the only thing here that is not already resolved on the `TextField`'s context: two
 * widths nobody can know before layout.
 *
 * A decorator is out of flow, so it cannot push the text aside the way a sibling in a row
 * would; the field clears it by padding instead, and the padding is the decorator's own
 * measured width. That is the same shape `TextArea` uses for `rows` — a raw number the
 * slot turns into a style, outside the cache.
 */
export type FieldGroupContextValue = {
  /** `0` while the decorator is absent, and until its first layout. */
  prefixWidth: number
  suffixWidth: number
  setPrefixWidth: (width: number) => void
  setSuffixWidth: (width: number) => void
}
