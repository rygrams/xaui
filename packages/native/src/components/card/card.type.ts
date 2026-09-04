import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type CardSlot =
  | 'root'
  | 'header'
  | 'body'
  | 'footer'
  | 'title'
  | 'description'

/**
 * The emphasis ladder, and nothing else (§1 bis). A card **reports nothing**: it is the
 * surface something is reported on, so `success`, `warning` and `danger` are absent the
 * way they are absent from the `Button` — a card coloured by an outcome is a card holding
 * a `Chip` or an `Alert` that carries it.
 *
 * The four levels descend by how much surface is left, and each name means here exactly
 * what it means on a `Button` — that is what makes this a subtype of one vocabulary
 * rather than a second one:
 *
 * - **`default`** — the card: the `surface` fill, a hairline border, the surface shadow.
 * - **`secondary`** — a card inside a card: the next surface level up, no shadow, because
 *   a nested surface is not a second elevation.
 * - **`tertiary`** — the outline: a border, no fill, like the `Button`'s `tertiary`.
 * - **`ghost`** — nothing: a region that groups and pads, with no surface of its own.
 */
export type CardVariant = 'default' | 'secondary' | 'tertiary' | 'ghost'

export type CardSize = Size

/**
 * What the `Card` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the card's scale and never
 * `ViewStyle`'s, and `color` is R7's tint.
 */
type CardOwnProps = {
  variant?: CardVariant
  /**
   * Padding, gaps, radius and the type of `Title` and `Description`. **Never a height**:
   * a card is a surface, not a control, and it is as tall as what it holds.
   */
  size?: CardSize
  /** Overrides the radius `size` chose. Unset, a card is the shape its size implies. */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). Where it lands follows the variant, as
   * everywhere else: the fill of a `default`, the border of a `tertiary`, the text of a
   * `ghost`. Its contrasted slice is derived in OKLab, so a tinted card's title stays
   * readable on it without being told a second colour.
   */
  color?: string
  /**
   * Dims the card and, on a pressable one, stops the touch. A static card is only dimmed
   * — it announces nothing, because there was nothing to disable.
   */
  isDisabled?: boolean
  /**
   * Makes the card a control: a `PressableFeedback` with `accessibilityRole="button"`,
   * the shared scale, and a press wash over the surface.
   *
   * It is a prop and not an inference from `onPress` being present, because the two
   * answers are different **elements** — a `View` and a `Pressable` — and inferring it
   * would remount the card, and change what a screen reader announces, on the render
   * where a handler happens to become `undefined`.
   */
  isPressable?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

/**
 * The press behaviour a pressable card forwards. It is on the type unconditionally while
 * `isPressable` is read at runtime, so a handler written without it reaches a `View` that
 * ignores it — which is why the root warns about exactly that case.
 */
type CardBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
>

export type CardProps = CardOwnProps &
  CardBehaviourProps &
  Omit<ViewStyleProps, keyof CardOwnProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
type CardSectionProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & {
    children?: ReactNode
  }

export type CardHeaderProps = CardSectionProps
export type CardBodyProps = CardSectionProps
export type CardFooterProps = CardSectionProps

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
type CardTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type CardTitleProps = CardTextProps
export type CardDescriptionProps = CardTextProps

/**
 * R5 — resolved styles, not props for a slot to resolve a second time. Each entry is the
 * cached `StyleSheet` reference with the uncached tint pass layered over it, so a slot
 * merges its own `style` on top and does no work of its own.
 */
export type CardContextValue = {
  headerStyle: StyleProp<ViewStyle>
  bodyStyle: StyleProp<ViewStyle>
  footerStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  isDisabled: boolean
}
