import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'

export type SnackbarPosition = 'top' | 'bottom'
export type SnackbarVariant = 'secondary' | 'success' | 'warning' | 'danger'
export type SnackbarSlot = 'root' | 'message' | 'actions' | 'action' | 'actionLabel'

type SnackbarOwnProps = {
  children?: ReactNode
  variant?: SnackbarVariant
  /** A raw tint applied outside the recipe cache. */
  color?: string
  radius?: RadiusKey
  isVisible?: boolean
  defaultVisible?: boolean
  duration?: number
  onVisibleChange?: (isVisible: boolean) => void
  onClose?: () => void
  position?: SnackbarPosition
  insetHorizontal?: number
  insetVertical?: number
  maxWidth?: number
  isPortalled?: boolean
  asChild?: boolean
}
export type SnackbarProps = SnackbarOwnProps &
  Omit<ViewProps, keyof SnackbarOwnProps> &
  Omit<ViewStyleProps, keyof SnackbarOwnProps | keyof ViewProps>

type SnackbarTextOwnProps = { children?: ReactNode }
export type SnackbarMessageProps = SnackbarTextOwnProps &
  Omit<TextProps, keyof SnackbarTextOwnProps> &
  Omit<TextStyleProps, keyof SnackbarTextOwnProps | keyof TextProps>
export type SnackbarActionLabelProps = SnackbarMessageProps

type SnackbarActionsOwnProps = { children?: ReactNode }
export type SnackbarActionsProps = SnackbarActionsOwnProps &
  Omit<ViewProps, keyof SnackbarActionsOwnProps> &
  Omit<ViewStyleProps, keyof SnackbarActionsOwnProps | keyof ViewProps>

type SnackbarActionOwnProps = {
  children?: ReactNode
  isCloseOnPress?: boolean
  asChild?: boolean
}
export type SnackbarActionProps = SnackbarActionOwnProps &
  Omit<PressableProps, keyof SnackbarActionOwnProps> &
  Omit<ViewStyleProps, keyof SnackbarActionOwnProps | keyof PressableProps>
export type SnackbarCloseProps = Omit<SnackbarActionProps, 'isCloseOnPress'>

export type SnackbarContextValue = {
  messageStyle: StyleProp<TextStyle>
  actionsStyle: StyleProp<ViewStyle>
  actionStyle: StyleProp<ViewStyle>
  actionLabelStyle: StyleProp<TextStyle>
  dismiss: () => void
}
