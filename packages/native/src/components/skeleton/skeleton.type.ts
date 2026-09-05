import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'

export type SkeletonSlot = 'root'

/**
 * What the `Skeleton` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `color` is R7's tint.
 *
 * **No `variant`.** It had two — the neutral fill and that fill at half — sold as the two
 * backgrounds a placeholder is drawn on. Measured, the second is *less* visible than the
 * first on every surface in both modes, so it was never the answer to "this block reads as
 * a hole"; and on a `secondary` `Card` in dark mode both resolve to the surface's own
 * `#27272a` and vanish. A skeleton has to contrast with whatever is under it, and a fixed
 * token cannot know what that is — two frozen values were never going to cover three
 * surfaces times two modes. `color` is the way past it, and it is honest about being a
 * raw value rather than a name that promises a system.
 *
 * **No `asChild`** (R12), because `children` is already taken and means the opposite of
 * what the prop would need it to. Here it is the content the block stands in for — what
 * renders once `isLoading` is `false` — while `asChild` hands `Slot` an element to merge
 * the block's own styles into. One `children` with two meanings, disambiguated by a second
 * prop, is the kind of API this library exists not to ship. Styling is the escape hatch
 * instead, and R14 gives every `ViewStyle` key as a prop.
 */
type SkeletonOwnProps = {
  /**
   * The corner. `full` is the circle an avatar placeholder needs, and it is why this is a
   * prop rather than the caller's `borderRadius` — a circle is a shape the vocabulary
   * names, and it has to survive a theme redrawing every corner in the library.
   */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). There is one thing to colour on a block,
   * so it lands on the block.
   */
  color?: string
  /**
   * `false` swaps the block for `children`. It is the prop that makes the component a
   * gate rather than a shape you mount and unmount around your own content:
   *
   * ```tsx
   * <Skeleton isLoading={!user} height={20} width={140}>
   *   <Typography>{user?.name}</Typography>
   * </Skeleton>
   * ```
   *
   * @default true
   */
  isLoading?: boolean
  /**
   * `false` freezes the block at full opacity and mounts no worklet.
   *
   * A boolean rather than HeroUI's `'shimmer' | 'pulse' | 'none'`: a shimmer is a
   * gradient sweeping across the block, a gradient needs `react-native-svg`, and that is
   * an optional peer a component in the core cannot require. One animation, so there is
   * nothing for a name to choose between.
   */
  animation?: boolean
  /**
   * What the block stands in for, rendered once `isLoading` is `false`. A skeleton with no
   * children is a block that never resolves, which is the right thing for a placeholder
   * whose content is mounted elsewhere.
   */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export type SkeletonProps = Omit<ViewProps, 'style'> &
  SkeletonOwnProps &
  Omit<ViewStyleProps, keyof SkeletonOwnProps | keyof ViewProps>
