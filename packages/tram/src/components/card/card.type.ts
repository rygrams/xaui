import type { ReactNode } from 'react'
import type {
  ImageSourcePropType,
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type CardSlot =
  | 'root'
  | 'background'
  | 'header'
  | 'body'
  | 'footer'
  | 'title'
  | 'description'

/**
 * The Native ladder, kept by name — a card reports nothing, so its variant only says how
 * much ground it has, which is what a Tram variant says:
 *
 * | Variant     | Drawn as                                          |
 * | ----------- | ------------------------------------------------- |
 * | `default`   | the discreet surface, no line, no shadow          |
 * | `secondary` | the next grey, for a card inside a card           |
 * | `tertiary`  | the page inside the theme's line                  |
 * | `ghost`     | nothing: the content on the page, Metro's own way |
 */
export type CardVariant = 'default' | 'secondary' | 'tertiary' | 'ghost'

export type CardSize = TramSize

type CardOwnProps = {
  variant?: CardVariant
  /** Padding, gaps, and the type of `Title` and `Description`. Never a height. */
  size?: CardSize
  /** Overrides the Tram corner. The scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents. It fills a `default` or a `secondary` with its true
   * colour, the title in the ink that reads on it; on a `tertiary` it is the line, and on
   * a `ghost` the title, both as the mode's ink.
   */
  accent?: TramAccentName
  /** A raw tint, never a token. It lands where `accent` does, and wins over it. */
  color?: string
  /** Dims the card and, on a pressable one, stops the touch. */
  isDisabled?: boolean
  /**
   * Makes the card a control: a button that leans toward the finger, as the Tram `Button`
   * does. A prop rather than read off `onPress`: the two are different elements.
   */
  isPressable?: boolean
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

type CardBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
>

export type CardProps = CardOwnProps &
  CardBehaviourProps &
  Omit<ViewStyleProps, keyof CardOwnProps>

type CardSectionProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & {
    children?: ReactNode
  }

export type CardHeaderProps = CardSectionProps
export type CardBodyProps = CardSectionProps
export type CardFooterProps = CardSectionProps

type CardTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type CardTitleProps = CardTextProps
export type CardDescriptionProps = CardTextProps

type CardBackgroundOwnProps = {
  /** An image, stretched over the whole card and clipped to its corner. */
  source?: ImageSourcePropType
  /** Anything else, already positioned. */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export type CardBackgroundProps = Omit<ViewProps, 'style'> &
  CardBackgroundOwnProps &
  Omit<ViewStyleProps, keyof CardBackgroundOwnProps | keyof ViewProps>

/** Resolved styles, not props for a slot to resolve a second time. */
export type CardContextValue = {
  backgroundStyle: StyleProp<ViewStyle>
  headerStyle: StyleProp<ViewStyle>
  bodyStyle: StyleProp<ViewStyle>
  footerStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  isDisabled: boolean
}
