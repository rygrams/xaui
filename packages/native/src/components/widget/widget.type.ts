import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type WidgetSlot =
  | 'root'
  | 'header'
  | 'heading'
  | 'title'
  | 'description'
  | 'content'
  | 'footer'

export type WidgetSize = Size

type WidgetOwnProps = {
  /** The padding, the gaps and the corner. Never a height — a widget is as tall as its content. */
  size?: WidgetSize
  /** The frame's corner. The card's follows it, one step in. */
  radius?: RadiusKey
  /**
   * Whether the card is lifted off the frame.
   *
   * On by default: the soft frame stays flat against the page and the shadow is what
   * separates the card from it. There is no variant — a widget has one look.
   */
  isElevated?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the widget's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type WidgetProps = WidgetOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof WidgetOwnProps> &
  Omit<ViewStyleProps, keyof WidgetOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type WidgetViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type WidgetTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/** R5 — resolved style ids, never a token for a slot to resolve again. */
export type WidgetContextValue = {
  headerStyle: StyleProp<ViewStyle>
  headingStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  contentStyle: StyleProp<ViewStyle>
  footerStyle: StyleProp<TextStyle>
}
