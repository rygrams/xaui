import type { ComponentType, ReactNode } from 'react'
import type { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native'
import type { ImageStyleProps } from '../style-props'

/**
 * The props Lucide, Ionicons and `react-native-vector-icons` all accept — the shape
 * `as` is handed. It is a convention rather than an interface anyone published, which is
 * exactly why `Icon` exists: without it every call site computes the two values by hand.
 */
export type IconComponentProps = {
  size?: number
  color?: string
}

/**
 * R14 reaches the **`source` form only**, exactly like `style` below and for the same
 * reason: it is the one of the three forms where we render the node. On the other two,
 * `size` and `color` are what shapes the icon.
 */
export type IconProps = ImageStyleProps & {
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
  /**
   * The **`source` form only** — it is the one of the three where we render the view.
   * `as` hands its props to a third-party component and the children form clones an
   * element the caller made; neither is a view this can style, and wrapping them would
   * add a level of depth to every icon in the library. `size` and `color` are the
   * escape hatch there.
   */
  style?: StyleProp<ImageStyle>
}

/** What a component root publishes so the icons inside it need no props at all. */
export type IconContextValue = {
  size?: number
  color?: string
}
