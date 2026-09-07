import { forwardRef } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { Circle, Svg } from 'react-native-svg'
import { useStyleProps } from '../../system/style-props'
import { useProgressCircle } from './progress-circle.context'
import type { CircleGeometry } from './progress-circle.geometry'
import type { ProgressCircleIndicatorProps } from './progress-circle.type'

/** The `ProgressBar`'s fill duration. Two indicators on one screen move at one speed. */
const DURATION = 240

/**
 * Twelve o'clock, not three: a ring that starts at the right reads as already begun.
 *
 * Turned on the **wrapper**, not on each path. `Circle`'s own `originX` / `originY` /
 * `rotation` props are the obvious way to do it and they emit an invalid DOM property on
 * web, where `react-native-svg` writes them out as `transform-origin`. One rotation on the
 * box is also one thing to read instead of three props repeated on two circles.
 */
const START = { transform: [{ rotate: '-90deg' }] } as const

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

/**
 * The ring: the whole of the distance, and the arc of it that is done.
 *
 * `react-native-svg` is an **optional peer**, and this is the file that needs it — an arc
 * with a rounded cap is a stroked path, and the alternative in plain views is two rotated
 * half-discs clipped by a third, which cannot round its own ends. Nothing else in this
 * component imports it, so a project that never renders a `ProgressCircle` never pays for
 * it: each component is its own subpath export.
 *
 * The arc's length is a **dash offset** rather than a rotation, which is what lets it be one
 * path with one cap at each end instead of a shape rebuilt on every value.
 */
export const ProgressCircleIndicator = forwardRef<
  View,
  ProgressCircleIndicatorProps
>(function ProgressCircleIndicator({ animation = true, style, ...props }, ref) {
  const { geometry, trackColor, fillColor, fraction } = useProgressCircle()
  const [styleProps, rest] = useStyleProps(props)
  const { diameter, radius, strokeWidth, circumference } = geometry
  const centre = diameter / 2

  return (
    <View ref={ref} {...rest} style={[START, styleProps, style]}>
      <Svg width={diameter} height={diameter}>
        <Circle
          cx={centre}
          cy={centre}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {animation ? (
          <AnimatedArc geometry={geometry} fraction={fraction} color={fillColor} />
        ) : (
          <Circle
            cx={centre}
            cy={centre}
            r={radius}
            stroke={fillColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - fraction)}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  )
})

ProgressCircleIndicator.displayName = 'XAUI.ProgressCircle.Indicator'

/**
 * Mounted instead of the static arc rather than beside it: hooks cannot be conditional, and
 * "no animation" is only true if the Reanimated hooks are never reached at all.
 */
function AnimatedArc({
  geometry,
  fraction,
  color,
}: {
  geometry: CircleGeometry
  fraction: number
  color: string | undefined
}) {
  const { diameter, radius, strokeWidth, circumference } = geometry
  const centre = diameter / 2

  // `useDerivedValue` rather than an effect: the sweep starts on the UI thread the frame
  // the value changes, instead of waiting for a commit to schedule it.
  const progress = useDerivedValue(() => {
    'worklet'
    return withTiming(fraction, { duration: DURATION })
  }, [fraction])

  // An animated **prop**, not an animated style: `strokeDashoffset` is an SVG attribute,
  // and putting it in a style object is how it silently stops moving on Android.
  const animatedProps = useAnimatedProps(() => {
    'worklet'
    return { strokeDashoffset: circumference * (1 - progress.value) }
  }, [progress, circumference])

  return (
    <AnimatedCircle
      cx={centre}
      cy={centre}
      r={radius}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={circumference}
      strokeLinecap="round"
      fill="none"
      animatedProps={animatedProps}
    />
  )
}
