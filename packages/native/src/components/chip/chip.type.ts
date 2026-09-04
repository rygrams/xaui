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
import type { IconContextValue, IconProps } from '../../system/icon'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type ChipSlot =
  | 'root'
  | 'label'
  | 'icon'
  | 'dot'
  | 'avatar'
  | 'close'
  | 'closeGlyph'

/**
 * The full vocabulary (§1 bis) — this is the component the `Button` deferred to.
 *
 * `Button.variant` stops at `danger` because a button is something you press and neither
 * a success nor a warning is an action. A chip is the opposite: it **reports**. A status
 * on a row, a tag on a file, a filter that is on — the outcome *is* what the component
 * says, so the three status families are here, each with its soft slice.
 *
 * The first five are the same emphasis ladder, descending by how much accent is left:
 * `primary` is the full accent, `secondary` its soft slice, `default` the neutral fill,
 * `tertiary` a border, `ghost` nothing at all. A name means here exactly what it means on
 * a `Button`, which is what makes this one vocabulary rather than two.
 *
 * It replaces HeroUI's `variant × color` matrix — four emphases times five intents, of
 * which nine combinations paint the same thing. Eleven flat names say the same set once.
 */
export type ChipVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'ghost'
  | 'success'
  | 'success-soft'
  | 'warning'
  | 'warning-soft'
  | 'danger'
  | 'danger-soft'

export type ChipSize = Size

/**
 * What the `Chip` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the chip's scale and never
 * `ViewStyle`'s, and `color` is R7's tint.
 */
type ChipOwnProps = {
  variant?: ChipVariant
  /** Height, horizontal padding, gap and the type of `Label`. Never width. */
  size?: ChipSize
  /**
   * Overrides the capsule. A chip is a pill at every size — that is the shape the name
   * means — so this is the prop for the rare tag that wants square corners.
   */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). Where it lands follows the variant: the
   * fill of a `primary`, the border and text of a `tertiary`, the text of a `ghost`. Its
   * contrasted, soft and pressed slices are derived in OKLab, so it behaves exactly like
   * `accent` — which is also why it must be a hex value.
   */
  color?: string
  /** Dims the chip and, on a pressable one, stops the touch. */
  isDisabled?: boolean
  /**
   * Makes the chip a control — a filter, a toggle, a token you can open. A
   * `PressableFeedback` with `accessibilityRole="button"`, the shared scale, and the
   * variant's own pressed colour.
   *
   * It is a prop and not an inference from `onPress` being present, because the two
   * answers are different **elements** — a `View` and a `Pressable` — and inferring it
   * would remount the chip, and change what a screen reader announces, on the render
   * where a handler happens to become `undefined`.
   *
   * A chip carrying only a `Chip.Close` stays static: the control is the close, not the
   * chip around it.
   */
  isPressable?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

/**
 * The press behaviour a pressable chip forwards. It is on the type unconditionally while
 * `isPressable` is read at runtime, so a handler written without it reaches a `View` that
 * ignores it — which is why the root warns about exactly that case.
 */
type ChipBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
>

export type ChipProps = ChipOwnProps &
  ChipBehaviourProps &
  Omit<ViewStyleProps, keyof ChipOwnProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type ChipLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/**
 * `Icon`'s three forms, plus the `style` every slot carries (R2). `size` and `color`
 * default to what the root resolved; passing either wins over it.
 */
export type ChipIconProps = IconProps

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type ChipDotProps = ViewProps & Omit<ViewStyleProps, keyof ViewProps>

type ChipAvatarOwnProps = {
  /** An image, clipped to the circle the chip's size defines. */
  source?: ImageSourcePropType
  /** Anything else — initials, a future `<Avatar>` — centred and clipped the same way. */
  children?: ReactNode
}

export type ChipAvatarProps = ChipAvatarOwnProps &
  ViewProps &
  Omit<ViewStyleProps, keyof ViewProps | keyof ChipAvatarOwnProps>

type ChipCloseOwnProps = {
  /**
   * Replaces the built-in cross — a `Chip.Icon`, or any glyph. Unset, the slot draws its
   * own from two rotated bars, which is what makes a dismissible chip work in a project
   * that has installed no icon set.
   */
  children?: ReactNode
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

export type ChipCloseProps = ChipCloseOwnProps &
  Omit<PressableFeedbackProps, 'isPressed' | 'style' | 'children'> &
  Omit<ViewStyleProps, keyof ChipCloseOwnProps>

/**
 * R5 — resolved styles, not props for a slot to resolve a second time. Each entry is the
 * cached `StyleSheet` reference with the uncached tint pass layered over it, so a slot
 * merges its own `style` on top and does no work of its own.
 */
export type ChipContextValue = {
  labelStyle: StyleProp<TextStyle>
  dotStyle: StyleProp<ViewStyle>
  avatarStyle: StyleProp<ViewStyle>
  closeStyle: StyleProp<ViewStyle>
  closeGlyphStyle: StyleProp<ViewStyle>
  /**
   * Values, not a style: `Icon` hands `size` and `color` to a third-party component, so
   * the root flattens its icon slot once here rather than in every icon it contains.
   */
  icon: IconContextValue
  isDisabled: boolean
}
