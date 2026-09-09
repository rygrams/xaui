import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { IconContextValue, IconProps } from '../../system/icon'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type ToggleButtonSlot =
  | 'root'
  | 'rootPressed'
  | 'rootSelected'
  | 'label'
  | 'labelSelected'
  | 'icon'
  | 'iconSelected'

/** A neutral fill or no resting fill. Selection supplies the accent in both cases. */
export type ToggleButtonVariant = 'default' | 'ghost'

export type ToggleButtonSize = Size

/** The state exposed to a render child, so marks can change with the selection. */
export type ToggleButtonRenderState = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}

type ToggleButtonOwnProps = {
  variant?: ToggleButtonVariant
  /** Height, padding, gap, radius and type. Never width. */
  size?: ToggleButtonSize
  /** Overrides the radius `size` chose. */
  radius?: RadiusKey
  /** A raw tint (R7). Selection uses its soft slice. */
  color?: string
  /** The value this button represents inside a `ToggleButton.Group`. */
  value?: string
  /** Controlled selection. Leave it out and the button keeps its own state. */
  isSelected?: boolean
  /** The starting selection when uncontrolled. @default false */
  defaultSelected?: boolean
  /** Fired with the next value after every press, controlled or not. */
  onSelectedChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  /** Drops the horizontal padding and squares the button on its fixed height. */
  isIconOnly?: boolean
  /** R12 — merge into the single child instead of rendering a pressable. */
  asChild?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
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

export type ToggleButtonIconProps = IconProps

/** R5 — resolved values, plus the state a custom slot or render child needs. */
export type ToggleButtonContextValue = ToggleButtonRenderState & {
  labelStyle: StyleProp<TextStyle>
  icon: IconContextValue
}
