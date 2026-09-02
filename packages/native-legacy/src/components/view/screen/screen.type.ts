import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type ScreenProps = {
  /**
   * Content rendered inside the screen container.
   */
  children: ReactNode
  /**
   * Uniform padding applied to the screen.
   */
  padding?: number
  /**
   * Optional custom background color.
   * Uses theme background by default.
   */
  backgroundColor?: string
  /**
   * Wrap content in a SafeAreaView.
   * @default false
   */
  safeArea?: boolean
  /**
   * Additional container styles.
   */
  style?: StyleProp<ViewStyle>
}
