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
import type {
  IconComponentProps,
  IconContextValue,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { TextFieldProps, TextFieldSize } from '../text-field'

/**
 * What the dummy field adds to the `TextField`'s recipe: the row inside the box, the value
 * and the glyph at its end. The box, the label and the help are the `TextField`'s.
 */
export type DummyFieldSlot = 'field' | 'value' | 'indicator'

export type DummyFieldSize = TextFieldSize

type DummyFieldOwnProps = {
  /**
   * What a press on the field does — open the sheet, the picker, the page that sets the
   * value. A touch on the label does it too. Composed with `DummyField.Field`'s own.
   */
  onPress?: (event: GestureResponderEvent) => void
  children?: ReactNode
}

/**
 * The Tram `TextField`'s root props, plus the press.
 *
 * Everything the Tram `TextField` understands — `size`, `radius`, `accent`, `color`,
 * `isInvalid`, `isDisabled`, `isRequired`, `asChild`, the style props — is here because the
 * root below **is** the `TextField`'s. Like it, there is no `variant` and no
 * `labelPlacement`: the Metro box has one drawing, and its label stands above it.
 */
export type DummyFieldProps = DummyFieldOwnProps &
  Omit<TextFieldProps, keyof DummyFieldOwnProps>

type DummyFieldFieldOwnProps = {
  /** Shown while there is no value, in the placeholder's grey. */
  placeholder?: string
  /** What the field shows, when it is not written as its children. */
  value?: ReactNode
  /** Merge into the single child instead of rendering the box. */
  asChild?: boolean
  children?: ReactNode
}

/**
 * The pressable box: `Pressable`'s props and the `ViewStyle` keys as props. A box-shaped
 * style lands on the box, and a `borderColor` written here holds in every state.
 */
export type DummyFieldFieldProps = DummyFieldFieldOwnProps &
  Omit<PressableProps, keyof DummyFieldFieldOwnProps> &
  Omit<ViewStyleProps, keyof DummyFieldFieldOwnProps | keyof PressableProps>

type DummyFieldValueOwnProps = {
  placeholder?: string
  children?: ReactNode
}

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
export type DummyFieldValueProps = DummyFieldValueOwnProps &
  Omit<TextProps, keyof DummyFieldValueOwnProps> &
  Omit<TextStyleProps, keyof DummyFieldValueOwnProps | keyof TextProps>

type DummyFieldIndicatorOwnProps = {
  /** The glyph. Defaults to a chevron. */
  as?: ComponentType<IconComponentProps>
  size?: number
  /** A raw value, never a token. Overrides the field's ink. */
  color?: string
  children?: ReactNode
}

export type DummyFieldIndicatorProps = DummyFieldIndicatorOwnProps &
  Omit<ViewProps, keyof DummyFieldIndicatorOwnProps> &
  Omit<ViewStyleProps, keyof DummyFieldIndicatorOwnProps | keyof ViewProps>

/**
 * Resolved styles and the press. It sits **beside** the Tram `TextField`'s context: the box,
 * its line, the ids and the states are read from that one.
 */
export type DummyFieldContextValue = {
  rowStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  /** Values, not a style: `Icon` hands `size` and `color` to a third-party component. */
  glyph: IconContextValue
  onPress?: (event: GestureResponderEvent) => void
}
