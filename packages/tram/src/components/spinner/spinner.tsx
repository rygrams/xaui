import { forwardRef, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
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
import { useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { orbit } from '../../motion/motion-tokens'
import { bubbleAt } from '../../system/bubble-run'
import type { BubbleRun } from '../../system/bubble-run'
import { flatPaint } from '../../system/flat-paint'
import { DEFAULT_SIZE, SPINNER_GEOMETRY, spinnerRecipe } from './spinner.recipe'
import { orbitAtRest, orbitRun } from './spinner.orbit'
import type { SpinnerProps } from './spinner.type'

const DOTS = Array.from({ length: orbit.count }, (_, index) => index)

/** Measured once: the run depends on the tokens alone, not on the size. */
const RUN = orbitRun(orbit)

const AT_REST = orbitAtRest(orbit.count)

/**
 * The wait, drawn as Metro drew it: five round dots piled into one at six o'clock set off
 * one after the other, slow, then fast over the top, and slow again into six — where each
 * is caught up by the next until the five are one dot again, and the first sets off.
 *
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" accent="magenta" accessibilityLabel="chargement des messages" />
 * ```
 *
 * With motion reduced the five stand evenly round the ring and the ring turns slowly: a
 * spinner that stopped would no longer say that something is on its way.
 */
export const Spinner = forwardRef<View, SpinnerProps>(function Spinner(
  { size = DEFAULT_SIZE, accent, color, animation = true, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const isReduced = useReducedMotion()
  // An ancestor that asked for no animation at all leaves the ring still too.
  const isAncestorStill = useAnimationDisabled()
  const isStill = !animation || isAncestorStill

  const selection = { size }
  const styles = spinnerRecipe.resolve({ theme, selection })
  // A dot is a fill: a named accent is its true colour. Uncached, as every raw tint.
  const paint = flatPaint({ accent, color })
  const tint = paint
    ? spinnerRecipe.tint({ theme, color: paint, selection })
    : undefined
  const dotStyle = useMemo(() => [styles.dot, tint?.dot], [styles, tint])

  // How far out a dot runs: from the centre to where its edge meets the ring's.
  const { diameter, dot } = SPINNER_GEOMETRY[size]
  const reach = (theme.spacing(diameter) - dot) / 2

  const ring = isStill ? (
    <StillDots dotStyle={dotStyle} reach={reach} />
  ) : isReduced ? (
    <TurningDots dotStyle={dotStyle} reach={reach} />
  ) : (
    <RunningDots dotStyle={dotStyle} reach={reach} />
  )

  return (
    <View
      ref={ref}
      // What a screen reader announces as busy. No default label: only the caller knows
      // what is loading, and the role already says "loading".
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
      {...rest}
      style={[styles.root, tint?.root, styleProps, style]}
    >
      {ring}
    </View>
  )
})

Spinner.displayName = 'XAUI.Tram.Spinner'

type DotsProps = {
  dotStyle: StyleProp<ViewStyle>
  /** Points from the centre to a dot's centre. */
  reach: number
}

/** A dot sent `angle` degrees round from the top, `reach` points out. */
function placeAt(angle: number, reach: number): ViewStyle {
  return { transform: [{ rotate: `${angle}deg` }, { translateY: -reach }] }
}

/** Five dots, evenly round the ring, nothing moving. */
function StillDots({ dotStyle, reach }: DotsProps) {
  return DOTS.map(index => (
    <View key={index} style={[dotStyle, placeAt(AT_REST[index]!, reach)]} />
  ))
}

/** The five at rest, and the whole ring turning once every `reducedLap`. */
function TurningDots({ dotStyle, reach }: DotsProps) {
  const angle = useSharedValue(0)

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(360, {
        duration: orbit.reducedLap,
        easing: Easing.linear,
        // Reduced motion already chose this: the ring is the slow form of the run.
        reduceMotion: ReduceMotion.Never,
      }),
      -1,
      false,
      undefined,
      ReduceMotion.Never
    )
    // A repeat with no end runs until something stops it; unmounting is not that.
    return () => cancelAnimation(angle)
  }, [angle])

  const turning = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ rotate: `${angle.value}deg` }] }
  }, [angle])

  return (
    <Animated.View style={[{ flex: 1 }, turning]}>
      <StillDots dotStyle={dotStyle} reach={reach} />
    </Animated.View>
  )
}

/** The Metro run: one clock for the five, looped on the UI thread. */
function RunningDots({ dotStyle, reach }: DotsProps) {
  const elapsed = useSharedValue(0)

  useEffect(() => {
    elapsed.value = 0
    // The component already answers reduced motion by not mounting this at all.
    elapsed.value = withRepeat(
      withTiming(RUN.cycle, {
        duration: RUN.cycle,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.Never,
      }),
      -1,
      false,
      undefined,
      ReduceMotion.Never
    )

    return () => cancelAnimation(elapsed)
  }, [elapsed])

  return DOTS.map(index => (
    <RunningDot
      key={index}
      index={index}
      run={RUN}
      elapsed={elapsed}
      reach={reach}
      dotStyle={dotStyle}
    />
  ))
}

type RunningDotProps = DotsProps & {
  index: number
  run: BubbleRun
  elapsed: SharedValue<number>
}

function RunningDot({ index, run, elapsed, reach, dotStyle }: RunningDotProps) {
  const place = useAnimatedStyle(() => {
    'worklet'
    const angle = bubbleAt(run, elapsed.value, index)

    return {
      transform: [{ rotate: `${angle}deg` }, { translateY: -reach }],
    }
  }, [run, elapsed, index, reach])

  return <Animated.View style={[dotStyle, place]} />
}
