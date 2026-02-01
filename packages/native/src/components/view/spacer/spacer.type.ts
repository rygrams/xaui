import type { StyleProp, ViewStyle } from 'react-native'

export type SpacerProps = {
  /**
   * Flex factor for the spacer.
   * @default 1
   */
  flex?: number
  /**
   * Custom style for the spacer.
   */
  style?: StyleProp<ViewStyle>
}
