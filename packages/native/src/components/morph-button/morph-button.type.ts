import type { ReactNode } from 'react'
import type {
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
import type { RadiusKey } from '../../theme/theme.type'

export type MorphButtonSlot =
  | 'root'
  | 'collapsed'
  | 'expanded'
  | 'label'
  | 'title'
  | 'description'
  | 'icon'

/**
 * The `Button`'s union, unchanged: a `MorphButton` is a button, and the emphasis ladder it
 * sits on is the same one. `success` and `warning` are absent here for the reason they are
 * absent there — neither is an action, and a button is something you press.
 */
export type MorphButtonVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'ghost'
  | 'danger'
  | 'danger-soft'

/**
 * Three steps, not four. `xs` is a 32-point control, and a card that opens out of one has
 * less room for its own padding than the padding it would need — the shape it morphs into
 * would be a pill with two lines crammed in it.
 */
export type MorphButtonSize = 'sm' | 'md' | 'lg'

/**
 * How the box travels between the two shapes. Three knobs, because that is what a spring
 * is; anything past them is a different animation and therefore a different component.
 */
export type MorphSpring = {
  stiffness?: number
  damping?: number
  mass?: number
}

type MorphButtonOwnProps = {
  variant?: MorphButtonVariant
  /** The collapsed height, the paddings, the gaps, the corner and the type. Never width. */
  size?: MorphButtonSize
  /**
   * Overrides the corner both shapes share. Unset, it is half the collapsed height — which
   * is what makes the collapsed shape a pill and the expanded one a card, from one value.
   */
  radius?: RadiusKey
  /** A raw tint (R7), landing where the variant put its tokens. */
  color?: string
  /** Which shape it is in. Present means controlled. */
  isExpanded?: boolean
  /** Which shape it is in at first mount. @default false */
  defaultExpanded?: boolean
  onExpandedChange?: (isExpanded: boolean) => void
  /**
   * `false` puts it in the other shape with no travel at all — the box jumps and the faces
   * swap without a fade.
   */
  animation?: boolean | MorphSpring
  isDisabled?: boolean
  /** R12 — merge into the single child instead of rendering a pressable. */
  asChild?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

/** R14 — it renders a `PressableFeedback`, so it carries that node's style keys through it. */
export type MorphButtonProps = MorphButtonOwnProps &
  Omit<
    PressableFeedbackProps,
    'isPressed' | 'layout' | 'style' | 'children' | keyof MorphButtonOwnProps
  >

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type MorphButtonFaceProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type MorphButtonTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

export type MorphButtonIconProps = IconProps

/**
 * R5 — resolved styles, not props for a slot to resolve a second time. The two faces are
 * in here for the same reason the label is: each one is a cached `StyleSheet` reference
 * the root already computed, and a face merges its own `style` on top of it.
 */
export type MorphButtonContextValue = {
  collapsedStyle: StyleProp<ViewStyle>
  expandedStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  /**
   * Values, not a style: `Icon` hands `size` and `color` to a third-party component, so
   * the root flattens its icon slot once here rather than in every icon it contains.
   */
  icon: IconContextValue
  /** Which face is mounted — the faces read it rather than being told by a prop. */
  isExpanded: boolean
  /** Morphs it. A control inside a face is written against this, and it costs no state. */
  toggle: () => void
  isDisabled: boolean
  /**
   * Whether the faces fade as they swap. `animation={false}` has to reach them too, or the
   * box would jump while the content still took a hundred and forty milliseconds to arrive.
   *
   * It is also `false` until the button has changed shape once, because Reanimated runs an
   * `entering` animation on the first mount as well: without that, every button on a screen
   * would fade its collapsed face in as the screen arrived.
   */
  animation: boolean
}
