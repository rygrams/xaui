import type { ComponentType, ReactNode } from 'react'
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconComponentProps, IconContextValue } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type DummyFieldSlot =
  | 'root'
  | 'label'
  | 'field'
  | 'value'
  | 'placeholder'
  | 'indicator'
  | 'description'
  | 'error'
  | 'prefix'
  | 'suffix'
  | 'icon'

/**
 * The four emphasis levels, matching `TextField` and `Select`.
 *
 * - **`primary`** — the `fieldBackground` fill plus the theme's `field` shadow.
 * - **`secondary`** — the neutral `default` fill.
 * - **`tertiary`** — the border alone, no fill.
 * - **`ghost`** — neither fill nor border.
 */
export type DummyFieldVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

/**
 * Where the label sits relative to the field's box.
 *
 * `outside` is the label above the box, in the column's flow. `inside` lifts it into the
 * box, above the value text, out of flow.
 */
export type DummyFieldLabelPlacement = 'outside' | 'inside'

export type DummyFieldSize = Size

type DummyFieldOwnProps = {
  variant?: DummyFieldVariant
  /** The field's height, its padding, the gaps and the type. Never width. */
  size?: DummyFieldSize
  /** Overrides the `field` radius the theme chose for every size. */
  radius?: RadiusKey
  /** Above the box, or lifted into it. @default 'outside' */
  labelPlacement?: DummyFieldLabelPlacement
  /** A raw tint (`'#7c3aed'`), never a token (R7). */
  color?: string
  /** Paints the border, label and description in `danger`. */
  isInvalid?: boolean
  /** Dims the field and prevents interaction. */
  isDisabled?: boolean
  /** Optional press handler on the field. Composed with `DummyField.Field`'s `onPress`. */
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The root is the column: a `View` that stacks the label, the field and the hint.
 * R14 — style props belong to the column wrapper `View`.
 */
export type DummyFieldProps = DummyFieldOwnProps &
  Omit<ViewProps, keyof DummyFieldOwnProps> &
  Omit<ViewStyleProps, keyof DummyFieldOwnProps | keyof ViewProps> & {
    /** R12 — merge into the single child instead of rendering a `View`. */
    asChild?: boolean
  }

type DummyFieldFieldOwnProps = {
  /** Placeholder text shown when no value or child is provided. */
  placeholder?: string
  /** Value displayed inside the field if not passed as children. */
  value?: ReactNode
  asChild?: boolean
  children?: ReactNode
}

/**
 * The pressable box styled identically to a text input.
 *
 * It accepts press events (`onPress`, `onPressIn`, `onPressOut`), forwards refs, and
 * renders touch feedback through `PressableFeedback`.
 */
export type DummyFieldFieldProps = DummyFieldFieldOwnProps &
  Omit<PressableProps, 'children'> &
  ViewStyleProps

type DummyFieldValueOwnProps = {
  placeholder?: string
  children?: ReactNode
}

/**
 * The text slot displaying the value or placeholder.
 * Truncates with `numberOfLines={1}` by default.
 */
export type DummyFieldValueProps = DummyFieldValueOwnProps &
  Omit<TextProps, keyof DummyFieldValueOwnProps> &
  Omit<TextStyleProps, keyof DummyFieldValueOwnProps | keyof TextProps>

export type DummyFieldIndicatorProps = ViewProps &
  ViewStyleProps & {
    /** Custom icon component. Defaults to `ChevronDownIcon`. */
    as?: ComponentType<IconComponentProps>
  }

type DummyFieldTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type DummyFieldLabelProps = DummyFieldTextProps
export type DummyFieldDescriptionProps = DummyFieldTextProps
export type DummyFieldErrorProps = DummyFieldTextProps

/** R5 — resolved styles, not props for a slot to resolve a second time. */
export type DummyFieldContextValue = {
  fieldStyle: StyleProp<ViewStyle>
  fieldPressedStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<ViewStyle>
  glyph: IconContextValue
  labelStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  errorStyle: StyleProp<TextStyle>
  labelId: string
  descriptionId: string
  isDisabled: boolean
  isInvalid: boolean
  onPress?: (event: GestureResponderEvent) => void
}
