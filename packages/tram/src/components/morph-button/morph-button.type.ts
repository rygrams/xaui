import type { ComponentProps, ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type Animated from 'react-native-reanimated'
import type {
  IconContextValue,
  IconProps,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'
import type { ButtonVariant } from '../button/button.type'

export type MorphButtonSlot =
  | 'root'
  | 'collapsed'
  | 'expanded'
  | 'label'
  | 'title'
  | 'description'
  | 'icon'

/**
 * The `Button`'s four drawings, because a `MorphButton` is that button at rest:
 * `contained` (the accent), `flat` (its soft slice), `outline`, `text`. Open, the box
 * keeps what it was drawn with — it is the same box, grown.
 *
 * Not Native's seven: Native's ladder mixes emphasis and intention, and its card is an
 * inverted surface. Tram has one colour to spend, so the variant only says how the box is
 * drawn; a destructive one is `color={theme.colors.danger}`.
 */
export type MorphButtonVariant = ButtonVariant

/** The `Button`'s three heights — 40, 48, 56. No `xs`, as in Native. */
export type MorphButtonSize = TramSize

/**
 * How the box travels between the two shapes, merged over the Tram `navigation` spring.
 * Three knobs, because that is what a spring is.
 */
export type MorphSpring = {
  stiffness?: number
  damping?: number
  mass?: number
}

type MorphButtonOwnProps = {
  variant?: MorphButtonVariant
  /** The collapsed height, the insets, the gaps and the type. Never width. */
  size?: MorphButtonSize
  /** Overrides the corner both shapes share — capped at the Tram 2, `full` included. */
  radius?: RadiusKey
  /** One of the twenty named accents, for a button that is not in the theme's. */
  accent?: TramAccentName
  /** A raw tint, landing where the variant put its colour. Wins over `accent`. */
  color?: string
  /** Which shape it is in. Present means controlled. */
  isExpanded?: boolean
  /** Which shape it is in at first mount. @default false */
  defaultExpanded?: boolean
  onExpandedChange?: (isExpanded: boolean) => void
  /**
   * `false` puts it in the other shape with no travel, the faces swap without a fade,
   * and the press does not tilt. An object retunes the travel's spring.
   */
  animation?: boolean | MorphSpring
  isDisabled?: boolean
  /** Merge into the single child instead of rendering a pressable. */
  asChild?: boolean
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

/** It renders a `PressableFeedback`, so it carries that node's style keys through it. */
export type MorphButtonProps = MorphButtonOwnProps &
  Omit<
    PressableFeedbackProps,
    'isPressed' | 'layout' | 'style' | 'children' | keyof MorphButtonOwnProps
  >

/** `View`'s own props win over the `ViewStyle` keys of the same name. */
export type MorphButtonFaceProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
export type MorphButtonTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/** `size` and `color` default to what the root resolved; passing either wins. */
export type MorphButtonIconProps = IconProps

type AnimatedViewProps = ComponentProps<typeof Animated.View>

/** How the faces swap: `undefined` where there is nothing to play. */
export type MorphFaceMotion = {
  entering: AnimatedViewProps['entering']
  exiting: AnimatedViewProps['exiting']
}

/** Resolved styles and the state the slots read. No slot resolves the recipe again. */
export type MorphButtonContextValue = {
  collapsedStyle: StyleProp<ViewStyle>
  expandedStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  /** Values, not a style: `Icon` hands them to a third-party component. */
  icon: IconContextValue
  /** Which face is mounted — the faces read it rather than being told by a prop. */
  isExpanded: boolean
  /** Morphs it. A control inside a face is written against this, and it costs no state. */
  toggle: () => void
  isDisabled: boolean
  /**
   * Whether the faces animate as they swap: `false` with `animation={false}`, and until
   * the button has changed shape once — Reanimated plays `entering` on the first mount
   * too, and every button on a screen would otherwise fade in with it.
   */
  animation: boolean
  /** The swap itself, already chosen for reduced motion. Read only when `animation`. */
  motion: MorphFaceMotion
}
