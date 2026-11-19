import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { IconProps, ViewStyleProps } from '@xaui/native/system'
import type { TextFieldFieldProps } from '../text-field'

export type FieldGroupSlot =
  | 'box'
  | 'field'
  | 'decorator'
  | 'rule'
  | 'rulePrefix'
  | 'ruleSuffix'

type FieldGroupOwnProps = {
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The box's own props, plus every `ViewStyle` key it does not claim — Native's three terms.
 *
 * **No `variant`, no `size`, no `color`, no `isDisabled`**, as on Native: they are the
 * `TextField`'s, and a `FieldGroup` is one row inside it.
 */
export type FieldGroupProps = FieldGroupOwnProps &
  Omit<ViewProps, keyof FieldGroupOwnProps> &
  Omit<ViewStyleProps, keyof FieldGroupOwnProps | keyof ViewProps> & {
    /**
     * Merge into the single child instead of rendering a `View`. The caller's element then
     * draws the box, and its line stays at rest: the focus moves the line of a view Tram
     * animates, and the caller's may not be one.
     */
    asChild?: boolean
  }

type FieldGroupDecoratorOwnProps = {
  /**
   * The decorator stops taking touches and leaves the accessibility tree, so a tap on the
   * glyph focuses the field and a screen reader announces the field, not the mark.
   *
   * It also decides how the cell is drawn: a decorative mark sits in the text's line, a
   * control is a key of its own, ruled off from the text.
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

/** Which end of the box a decorator stands at. */
export type FieldGroupSide = 'prefix' | 'suffix'

/** Everything `TextField.Field` accepts: it **is** that field, inside the box. */
export type FieldGroupFieldProps = TextFieldFieldProps

/** Everything `Icon` accepts. `size` and `color` fall back to the box's own. */
export type FieldGroupIconProps = IconProps

/** How a cell is inset, per end and per kind. */
export type CellInsets = Record<
  FieldGroupSide,
  { decorative: ViewStyle; control: ViewStyle }
>

/**
 * Resolved styles, and the values a slot cannot compute for itself.
 *
 * **Not Native's two widths.** Native lays its decorators over the field and pads the
 * field by what they measured; Tram draws one row — a cell, the field, a cell — so there
 * is nothing to measure, and what the slots share is the box's focus and its geometry.
 */
export type FieldGroupContextValue = {
  /** 0 at rest, 1 while the field inside has the focus: the box's line reads it. */
  focus: SharedValue<number>
  /** What the field wears inside the box: no line of its own, the box's height less its line. */
  fieldStyle: StyleProp<TextStyle>
  decoratorStyle: StyleProp<ViewStyle>
  ruleStyle: StyleProp<ViewStyle>
  rulePrefixStyle: StyleProp<ViewStyle>
  ruleSuffixStyle: StyleProp<ViewStyle>
  cellInsets: CellInsets
  /** The field's own padding, in points: how far a cell's content stands off the box's end. */
  inset: number
  /** The height inside the box's line, in points. */
  innerHeight: number
  /** The glyph a `FieldGroup.Icon` takes when it is told nothing. */
  icon: { size: number; color: string }
}
