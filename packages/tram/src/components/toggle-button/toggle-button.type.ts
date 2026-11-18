import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type {
  IconProps,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { ToggleTones } from '../../system/toggle-tones'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type ToggleButtonSlot = 'root' | 'label' | 'icon'

/**
 * How the toggle is drawn — never an intention:
 *
 * | Variant   | Released                     | Chosen                                    |
 * | --------- | ---------------------------- | ----------------------------------------- |
 * | `outline` | the ground in a line of ink  | a flat fill of the accent, its text on it |
 * | `text`    | the label alone, in the ink  | the label alone, in the accent as ink     |
 *
 * **Not Native's names** (T2.15). Native's `primary`, `secondary` and `ghost` are
 * emphases; Tram has one colour to spend, and a variant only says whether there is a box.
 * Inside a `ToggleButton.Group` a button is always a case of the group's box.
 */
export type ToggleButtonVariant = 'outline' | 'text'

export type ToggleButtonSize = TramSize

/** The state handed to a render child, so that a glyph can change with the selection. */
export type ToggleButtonRenderState = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}

type ToggleButtonOwnProps = {
  variant?: ToggleButtonVariant
  /** Height, padding, gap and type — the `Button`'s. Never width. */
  size?: ToggleButtonSize
  /**
   * The box's corner. Square by default, whatever the theme says, and capped at the Tram
   * 2. A button inside a group has no corner of its own: the group's box has it.
   */
  radius?: RadiusKey
  /** One of the twenty named accents: the colour of the chosen state. */
  accent?: TramAccentName
  /** A raw tint for the chosen state; it wins over `accent` and is never corrected. */
  color?: string
  /** The value this button stands for inside a `ToggleButton.Group`. */
  value?: string
  /** Controlled selection. Leave it out and the button keeps its own state. */
  isSelected?: boolean
  /** The starting selection when uncontrolled. @default false */
  defaultSelected?: boolean
  /** Fired with the next value after every press that changes it, controlled or not. */
  onSelectedChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  /** Drops the horizontal padding and squares the box on its height: 40, 48 or 56. */
  isIconOnly?: boolean
  /** Merges into the single child instead of rendering a pressable. */
  asChild?: boolean
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode | ((state: ToggleButtonRenderState) => ReactNode)
}

type ToggleButtonBehaviourProps = Omit<
  PressableFeedbackProps,
  | 'isPressed'
  | 'isDisabled'
  | 'style'
  | 'children'
  | 'asChild'
  | 'aria-pressed'
  | keyof ToggleButtonOwnProps
>

export type ToggleButtonProps = ToggleButtonOwnProps &
  ToggleButtonBehaviourProps &
  Omit<ViewStyleProps, keyof ToggleButtonOwnProps>

export type ToggleButtonLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/** `size` and `color` default to what the root resolved; passing either wins. */
export type ToggleButtonIconProps = IconProps

/** Resolved values, plus the state a custom slot or a render child needs. */
export type ToggleButtonContextValue = ToggleButtonRenderState & {
  /** The label's type, without its colour: that one moves. */
  labelStyle: StyleProp<TextStyle>
  iconSize: number | undefined
  /** The two ends of the fade. */
  tones: ToggleTones
  /** How far the button is chosen: 0 released, 1 chosen, in between while it fades. */
  chosen: SharedValue<number>
}
