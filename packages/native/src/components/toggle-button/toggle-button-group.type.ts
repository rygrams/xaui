import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { AsChildProps } from '../../system/slot'
import type { ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'
import type { ToggleButtonSize, ToggleButtonVariant } from './toggle-button.type'

export type ToggleButtonGroupOrientation = 'horizontal' | 'vertical'

type ToggleButtonGroupOwnProps = {
  /** The selected button's value. Leave it out for an uncontrolled group. */
  value?: string
  /** The selected button on first mount when the group is uncontrolled. */
  defaultValue?: string
  /** Fires when a button selects itself. A group always has zero or one selection. */
  onValueChange?: (value: string) => void
  orientation?: ToggleButtonGroupOrientation
  /** Defaults passed to every member; a member's own appearance still wins. */
  variant?: ToggleButtonVariant
  size?: ToggleButtonSize
  radius?: RadiusKey
  color?: string
  /** Stops every member. A member cannot opt back in. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type ToggleButtonGroupProps = ToggleButtonGroupOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof ToggleButtonGroupOwnProps> &
  Omit<ViewStyleProps, keyof ToggleButtonGroupOwnProps | keyof ViewProps>

export type ToggleButtonGroupContextValue = {
  /** The one value no member can determine by itself. */
  value: string | undefined
  select: (value: string) => void
  /** Appearance defaults, which a member may deliberately override. */
  variant: ToggleButtonVariant | undefined
  size: ToggleButtonSize | undefined
  radius: RadiusKey | undefined
  color: string | undefined
  isDisabled: boolean
}
