import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'

export type SkeletonSlot = 'root'

/**
 * Native's props, unchanged. No `variant`, as in Native — one flat block has nothing for a
 * drawing to name — and no `accent`: a placeholder stands in for content, it does not
 * carry the app's colour. A block that has to stand out on a particular ground takes a
 * raw `color`.
 */
type SkeletonOwnProps = {
  /**
   * The corner. Square by default, the Tram corner of 2 at most, and `full` let through:
   * a circle is the one shape past it, for an avatar placeholder drawn round.
   */
  radius?: RadiusKey
  /** A raw tint, never a token. Drawn as given, over the page's grey. */
  color?: string
  /**
   * `false` swaps the block for `children` — the component is a gate, not a shape mounted
   * and unmounted around the content.
   *
   * @default true
   */
  isLoading?: boolean
  /**
   * `false` keeps the block still and mounts no worklet. With motion reduced it is still
   * either way.
   *
   * @default true
   */
  animation?: boolean
  /** What the block stands in for, rendered once `isLoading` is `false`. */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export type SkeletonProps = Omit<ViewProps, 'style'> &
  SkeletonOwnProps &
  Omit<ViewStyleProps, keyof SkeletonOwnProps | keyof ViewProps>
