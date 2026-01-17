import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type SidebarThemeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'default'

export type SidebarPosition = 'left' | 'right'

export type SidebarProps = {
  children: ReactNode
  trigger?: ReactNode
  position?: SidebarPosition
  width?: number
  overlayOpacity?: number
  themeColor?: SidebarThemeColor
  isOpen?: boolean
  enableSwipeToClose?: boolean
  style?: ViewStyle
  overlayStyle?: ViewStyle
} & SidebarEvents

export type SidebarEvents = {
  onClose?: () => void
  onOpenChange?: (isOpen: boolean) => void
}
