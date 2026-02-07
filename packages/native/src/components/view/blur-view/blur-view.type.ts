import type { ReactNode } from 'react'
import type { ColorValue, StyleProp, ViewStyle } from 'react-native'

export type BlurViewProps = {
  children: ReactNode
  unlockable?: boolean
  intensity?: number
  overlayColor?: ColorValue
  style?: StyleProp<ViewStyle>
}
