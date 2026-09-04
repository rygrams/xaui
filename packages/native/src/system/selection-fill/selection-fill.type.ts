import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type SelectionFillProps = {
  /** Whether the control is on. The fill is the answer, and the mark rides on it. */
  isVisible: boolean
  /** The resolved style of the host component's `fill` slot (R5). */
  style: StyleProp<ViewStyle>
  /** `false` shows the fill without the fade and the scale, and mounts no worklet. */
  animation?: boolean
  /** The mark — a check, a dash, a dot. It appears with the fill, never before it. */
  children?: ReactNode
}
