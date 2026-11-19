import { forwardRef, useEffect } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { pulse } from '../../motion/motion-tokens'
import { skeletonRecipe } from './skeleton.recipe'
import { pulseStart } from './skeleton.pulse'
import type { SkeletonProps } from './skeleton.type'

/**
 * The shape of what has not arrived yet: a flat block, square, in a fifth of the page's
 * ink over its ground — #333333 on black, #CCCCCC on white — that breathes down to half
 * and back.
 *
 * ```tsx
 * <Skeleton width={52} height={52} />
 * <Skeleton width="70%" height={16} />
 *
 * <Skeleton isLoading={!user} width={140} height={20}>
 *   <Typography>{user?.name}</Typography>
 * </Skeleton>
 * ```
 *
 * One node and no slots, as in Native, and no `size`: only the caller knows the shape of
 * what is missing, so R14's `width` and `height` are the whole sizing API.
 */
export const Skeleton = forwardRef<View, SkeletonProps>(function Skeleton(
  { radius, color, isLoading = true, animation = true, children, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  const isReduced = useReducedMotion()
  // An ancestor's `animation="disable-all"` stands every block under it still too.
  const isInheritedStill = useAnimationDisabled()
  // After the component's own props are taken out: `color` stays the tint, not the style
  // prop of the same name.
  const [styleProps, rest] = useStyleProps(props)

  const styles = skeletonRecipe.resolve({ theme, selection: { radius } })

  // What has loaded is the caller's content: no block style reaches it, and a fragment
  // keeps the parent's `gap` and `flex` measuring the real node.
  if (!isLoading) return <>{children}</>

  const blockProps: ViewProps = {
    // A block stands in for content that is not there; `busy` belongs on the region that
    // loads, not a stop on each rectangle. Both stay overridable.
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants',
    ...rest,
  }

  // Most general to most specific: the cached recipe, the raw colour, the style props,
  // `style`. The colour is uncached: it takes arbitrary values.
  const blockStyle = [
    styles.root,
    color ? { backgroundColor: color } : undefined,
    styleProps,
    style,
  ]

  // Two components rather than a branch inside one: hooks cannot be conditional, and a
  // still block — asked for, under `disable-all`, or with motion reduced — never reaches
  // Reanimated's.
  if (!animation || isInheritedStill || isReduced) {
    return <View ref={ref} {...blockProps} style={blockStyle} />
  }

  return <BreathingBlock ref={ref} {...blockProps} style={blockStyle} />
})

Skeleton.displayName = 'XAUI.Tram.Skeleton'

const [x1, y1, x2, y2] = pulse.curve
const BREATH = Easing.bezier(x1, y1, x2, y2)

const BreathingBlock = forwardRef<View, ViewProps & { style: StyleProp<ViewStyle> }>(
  function BreathingBlock({ style, ...props }, ref) {
    const opacity = useSharedValue(1)

    useEffect(() => {
      // Joined on the shared clock, so every block on the screen breathes together.
      const start = pulseStart(Date.now(), pulse.duration, pulse.low)
      opacity.value = start.from
      opacity.value = withSequence(
        withTiming(start.to, { duration: start.ms, easing: BREATH }),
        // Reversed, so the block breathes rather than snapping back at each turn.
        withRepeat(
          withTiming(start.next, { duration: pulse.duration, easing: BREATH }),
          -1,
          true
        )
      )
      // A repeat with no end runs until something stops it; unmounting is not that.
      return () => cancelAnimation(opacity)
    }, [opacity])

    const animatedStyle = useAnimatedStyle(() => {
      'worklet'
      return { opacity: opacity.value }
    }, [opacity])

    return <Animated.View ref={ref} {...props} style={[style, animatedStyle]} />
  }
)

BreathingBlock.displayName = 'XAUI.Tram.Skeleton.Block'
