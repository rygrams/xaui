import type { ComponentType, ReactNode } from 'react'
import type { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native'

/**
 * The props Lucide, Ionicons and `react-native-vector-icons` all accept — the shape
 * `as` is handed. It is a convention rather than an interface anyone published, which is
 * exactly why `Icon` exists: without it every call site computes the two values by hand.
 */
export type IconComponentProps = {
  size?: number
  color?: string
}

export type IconProps = {
  /** An icon component. `size` and `color` are injected into it. */
  as?: ComponentType<IconComponentProps>
  /** A raw `react-native-svg` element, cloned with the resolved size and colour. */
  children?: ReactNode
  /** An image, tinted with the resolved colour. */
  source?: ImageSourcePropType
  /** Overrides what the surrounding slot asked for. */
  size?: number
  /** A raw value (R7), never a token. Overrides the slot's. */
  color?: string
  style?: StyleProp<ImageStyle>
}

/** What a component root publishes so the icons inside it need no props at all. */
export type IconContextValue = {
  size?: number
  color?: string
}
