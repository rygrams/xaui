import { forwardRef, useEffect } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { skeletonRecipe } from './skeleton.recipe'
import type { SkeletonProps } from './skeleton.type'

/** One breath in, one breath out. HeroUI's pulse, at HeroUI's timing. */
const PULSE_DURATION = 1000

/** How far down the block breathes. Under a half and the pulse reads as a flicker. */
const PULSE_MIN_OPACITY = 0.5

/**
 * The shape of what has not arrived yet.
 *
 * ```tsx
 * <Skeleton width={140} height={20} />
 * <Skeleton width={48} height={48} radius="full" />
 *
 * <Skeleton isLoading={!user} height={20} width={140}>
 *   <Typography>{user?.name}</Typography>
 * </Skeleton>
 * ```
 *
 * **One node and no slots.** A placeholder is a rectangle; there is nothing inside it to
 * name. A paragraph of them is three of these in a `Column`, which is composition doing
 * what a `lines={3}` prop would otherwise hard-code — including the last line being
 * shorter, which is the only reason the paragraph reads as a paragraph.
 *
 * **It has no `size`, and that is the design.** Only the caller knows the shape of the
 * thing that is missing, so R14's `width` and `height` are the whole sizing API — full
 * React Native names and values, `width="60%"` as readily as `width={140}`. A `size`
 * token here would be a scale of rectangles nobody's content happens to be.
 *
 * **`isLoading={false}` renders `children`**, which is what makes it a gate rather than a
 * shape you mount and unmount around your own content.
 */
export const Skeleton = forwardRef<View, SkeletonProps>(function Skeleton(
  {
    variant,
    radius,
    color,
    isLoading = true,
    animation = true,
    children,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  // R14, after the component's own vocabulary is destructured: that is what keeps `color`
  // R7's tint rather than the style prop of the same name.
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, radius }
  const styles = skeletonRecipe.resolve({ theme, selection })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours callers invent.
  const tint = color ? skeletonRecipe.tint({ theme, color, selection }) : undefined

  // Before any style is merged: what has loaded is the caller's content, and the block's
  // width, radius and pulse have nothing to say about it. Returning a fragment rather
  // than a wrapper is what keeps the parent's `gap` and `flex` measuring the real node.
  if (!isLoading) return <>{children}</>

  const blockProps: ViewProps = {
    // A block stands in for content that is not there. Announcing its absence is `busy`
    // on whatever region is loading, not a stop on each rectangle. Both stay overridable
    // (R9) for the caller whose skeleton really is the whole screen.
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants',
    ...rest,
  }

  // The order of §2 ter, most general to most specific: the cached recipe, the uncached
  // tint, the style props, then `style` — the last word.
  const blockStyle = [styles.root, tint?.root, styleProps, style]

  // Two components rather than a branch inside one: hooks cannot be conditional, and
  // `animation={false}` is only true if the Reanimated hooks are never reached.
  if (!animation) return <View ref={ref} {...blockProps} style={blockStyle} />

  return <PulsingBlock ref={ref} {...blockProps} style={blockStyle} />
})

Skeleton.displayName = 'XAUI.Skeleton'

const PulsingBlock = forwardRef<View, ViewProps & { style: StyleProp<ViewStyle> }>(
  function PulsingBlock({ style, ...props }, ref) {
    const opacity = useSharedValue(1)

    useEffect(() => {
      opacity.value = withRepeat(
        withTiming(PULSE_MIN_OPACITY, {
          duration: PULSE_DURATION,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        // Reversed, so the block breathes rather than snapping back to full at each turn.
        true
      )
      // A repeat with no end runs until something stops it, and unmounting the block that
      // started it is not by itself that something.
      return () => cancelAnimation(opacity)
    }, [opacity])

    const animatedStyle = useAnimatedStyle(() => {
      'worklet'
      return { opacity: opacity.value }
    }, [opacity])

    return <Animated.View ref={ref} {...props} style={[style, animatedStyle]} />
  }
)

PulsingBlock.displayName = 'XAUI.Skeleton.Block'
