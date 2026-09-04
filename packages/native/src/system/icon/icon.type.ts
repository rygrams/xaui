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

/** What every form takes, and the only lever the two non-rendering ones have. */
type IconBase = {
  /** Overrides what the surrounding slot asked for. */
  size?: number
  /** A raw value (R7), never a token. Overrides the slot's. */
  color?: string
}

/**
 * An icon component — `size` and `color` are injected into it.
 *
 * No style props and no `style`: we do not render this node, the third party does, and
 * there is no published interface that says it would accept either. Wrapping it in a view
 * to make them work would add a level of depth to every icon in the library.
 */
type IconAsProps = IconBase & {
  as: ComponentType<IconComponentProps>
  children?: never
  source?: never
}

/**
 * A raw `react-native-svg` element, cloned with the resolved size and colour.
 *
 * No style props and no `style` either: the node is the caller's own element, and they can
 * style it where they wrote it.
 */
type IconChildrenProps = IconBase & {
  as?: never
  children: ReactNode
  source?: never
}

/**
 * An image, tinted with the resolved colour — **the one form that carries R14**, because
 * it is the one where we render the node.
 */
export type IconSourceProps = IconBase &
  ImageStyleProps & {
    as?: never
    children?: never
    source: ImageSourcePropType
    style?: StyleProp<ImageStyle>
  }

/**
 * Three forms, and the type says which one you are in.
 *
 * The union is what makes R14's boundary checkable rather than merely documented. When
 * every form declared the style props, `<Icon as={Trash2} marginEnd={8} />` compiled and
 * did nothing at all — the prop was dropped on the two forms that do not render the node,
 * silently, and only a comment said so. Now it is a compile error that points at `size`
 * and `color`, which are the levers those forms actually have.
 *
 * It also makes the three mutually exclusive, which they always were at runtime: `as`
 * wins over children, and children over `source`.
 */
export type IconProps = IconAsProps | IconChildrenProps | IconSourceProps

/** What a component root publishes so the icons inside it need no props at all. */
export type IconContextValue = {
  size?: number
  color?: string
}
