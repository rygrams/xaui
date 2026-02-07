import type { ReactNode } from 'react'
import type {
  GestureResponderEvent,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { Radius, ThemeColor } from '../../types'
import type { ElevationLevel } from '../button/button.type'

export type CardCustomAppearance = {
  /**
   * Custom styles for the card container
   */
  container?: ViewStyle
  /**
   * Custom styles for the card header section
   */
  header?: ViewStyle
  /**
   * Custom styles for the card body section
   */
  body?: ViewStyle
  /**
   * Custom styles for the card footer section
   */
  footer?: ViewStyle
  /**
   * Custom styles for title text
   */
  title?: TextStyle
  /**
   * Custom styles for description text
   */
  description?: TextStyle
}

export type CardProps = {
  /**
   * Content to render inside the card.
   */
  children: ReactNode
  /**
   * The theme color of the card.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * Card corner radius.
   * @default 'lg'
   */
  radius?: Radius
  /**
   * Android elevation level from 0 to 4.
   * @default 0
   */
  elevation?: ElevationLevel
  /**
   * Whether the card should take full width of its container.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Whether hover interactions are enabled.
   * @default false
   */
  isHoverable?: boolean
  /**
   * Whether press interactions are enabled.
   * @default false
   */
  isPressable?: boolean
  /**
   * Whether the whole card should be blurred.
   * @default false
   */
  isBlurred?: boolean
  /**
   * Whether the footer section should be blurred.
   * @default false
   */
  isFooterBlurred?: boolean
  /**
   * Whether the card is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Disable all card animations.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * Disable press ripple animation.
   * @default false
   */
  disableRipple?: boolean
  /**
   * Allow text selection while pressing a pressable card.
   * @default false
   */
  allowTextSelectionOnPress?: boolean
  /**
   * Custom appearance styles for card parts.
   */
  customAppearance?: CardCustomAppearance
  /**
   * Callback fired when card is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when card is long pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when card press starts.
   */
  onPressIn?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when card press ends.
   */
  onPressOut?: (event: GestureResponderEvent) => void
}

export type CardHeaderProps = {
  /**
   * Header content.
   */
  children: ReactNode
  /**
   * Custom styles for the header container.
   */
  customAppearance?: {
    container?: ViewStyle
  }
}

export type CardBodyProps = {
  /**
   * Body content.
   */
  children: ReactNode
  /**
   * Custom styles for the body container.
   */
  customAppearance?: {
    container?: ViewStyle
  }
}

export type CardFooterProps = {
  /**
   * Footer content.
   */
  children: ReactNode
  /**
   * Custom styles for the footer container.
   */
  customAppearance?: {
    container?: ViewStyle
  }
}

export type CardTitleProps = {
  /**
   * Title content.
   */
  children: ReactNode
  /**
   * Custom styles for the title text.
   */
  customAppearance?: {
    text?: TextStyle
  }
}

export type CardDescriptionProps = {
  /**
   * Description content.
   */
  children: ReactNode
  /**
   * Custom styles for the description text.
   */
  customAppearance?: {
    text?: TextStyle
  }
}
