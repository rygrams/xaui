import { forwardRef, useEffect, useMemo } from 'react'
import { I18nManager, View } from 'react-native'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  ReduceMotion,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { bubbles } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { bubbleAt, bubbleAtRest, bubbleRun } from '../../system/bubble-run'
import type { BubbleRun } from '../../system/bubble-run'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarFillProps } from './progress-bar.type'

const BUBBLES = Array.from({ length: bubbles.count }, (_, index) => index)

/**
 * What is filled of the bar, in the accent — or, on an indeterminate bar, the five
 * bubbles that run in its place.
 *
 * ```tsx
 * <ProgressBar.Fill />
 * ```
 *
 * The fill is a **child that grows**: the track clips it, so its far edge takes the
 * track's corner at 100 % and stays square before. It reaches a new value through
 * `useTramMotion` — a spring with next to no bounce, or the 150 ms fade.
 *
 * The bubbles come in fast, close up in the middle without ever overlapping, and leave
 * fast. Under reduced motion they stand in a row in the middle of the bar.
 *
 * `style` and the style props reach the fill; on an indeterminate bar they reach each
 * bubble.
 */
export const ProgressBarFill = forwardRef<View, ProgressBarFillProps>(
  function ProgressBarFill({ animation = true, style, ...props }, ref) {
    const {
      fillStyle,
      bubbleStyle,
      place,
      isIndeterminate,
      isStill,
      trackWidth,
      bubbleSize,
    } = useProgressBar()
    const [styleProps, rest] = useStyleProps(props)
    const isReduced = useReducedMotion()
    const moves = animation && !isStill

    if (isIndeterminate) {
      const merged = [bubbleStyle, styleProps, style]

      // Two components rather than a branch in one: "no animation" is only true if the
      // Reanimated hooks are never reached.
      return moves && !isReduced ? (
        <RunningBubbles
          {...rest}
          width={trackWidth}
          size={bubbleSize}
          style={merged}
        />
      ) : (
        <StandingBubbles
          {...rest}
          width={trackWidth}
          size={bubbleSize}
          style={merged}
        />
      )
    }

    const merged = [fillStyle, styleProps, style]

    if (!moves) {
      return (
        <View ref={ref} {...rest} style={[merged, { width: `${place * 100}%` }]} />
      )
    }

    return <GrowingFill ref={ref} {...rest} place={place} style={merged} />
  }
)

ProgressBarFill.displayName = 'XAUI.Tram.ProgressBar.Fill'

/** What is left of the slot's props once its style props are read: `View`'s own. */
type SlotRest = Omit<ViewProps, 'style' | 'children'>

type GrowingFillProps = SlotRest & { place: number; style: StyleProp<ViewStyle> }

const GrowingFill = forwardRef<View, GrowingFillProps>(function GrowingFill(
  { place, style, ...rest },
  ref
) {
  const animate = useTramMotion()
  const shown = useSharedValue(place)

  // A spring to a target, so a value arriving mid-way turns the first one around.
  useEffect(() => {
    shown.value = animate(place, 'navigation')
  }, [place, animate, shown])

  const grown = useAnimatedStyle(() => {
    'worklet'
    // Held within the bar: the spring's little bounce has nowhere to go past 100 %.
    const held = Math.min(Math.max(shown.value, 0), 1)

    return { width: `${held * 100}%` }
  }, [shown])

  return <Animated.View ref={ref} {...rest} style={[style, grown]} />
})

type BubblesProps = SlotRest & {
  width: number
  size: number
  style: StyleProp<ViewStyle>
}

// A transform does not mirror under RTL the way `start` does: toward the end is toward
// the start of the screen there.
function towardEnd(): number {
  return I18nManager.isRTL ? -1 : 1
}

/** The five, standing: the row reduced motion shows in place of the run. */
function StandingBubbles({ width, size, style, ...rest }: BubblesProps) {
  return BUBBLES.map(index => {
    const translateX = bubbleAtRest(width, size, index, bubbles) * towardEnd()

    return (
      <View key={index} {...rest} style={[style, { transform: [{ translateX }] }]} />
    )
  })
}

/**
 * The five, running. One clock for all of them, counted in milliseconds and looped on
 * the UI thread; it stops with the component.
 */
function RunningBubbles({ width, size, style, ...rest }: BubblesProps) {
  const run = useMemo(() => bubbleRun(width, size, bubbles), [width, size])
  const elapsed = useSharedValue(0)

  useEffect(() => {
    // Not measured yet: nothing to cross.
    if (width <= 0) return

    elapsed.value = 0
    // The component already answers reduced motion by not mounting this at all.
    elapsed.value = withRepeat(
      withTiming(run.cycle, {
        duration: run.cycle,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.Never,
      }),
      -1,
      false,
      undefined,
      ReduceMotion.Never
    )

    return () => cancelAnimation(elapsed)
  }, [run, width, elapsed])

  const direction = towardEnd()

  return BUBBLES.map(index => (
    <Bubble
      key={index}
      {...rest}
      index={index}
      run={run}
      elapsed={elapsed}
      direction={direction}
      style={style}
    />
  ))
}

type BubbleProps = SlotRest & {
  index: number
  run: BubbleRun
  elapsed: SharedValue<number>
  direction: number
  style: StyleProp<ViewStyle>
}

function Bubble({ index, run, elapsed, direction, style, ...rest }: BubbleProps) {
  const moved = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [{ translateX: bubbleAt(run, elapsed.value, index) * direction }],
    }
  }, [run, elapsed, index, direction])

  return <Animated.View {...rest} style={[style, moved]} />
}
