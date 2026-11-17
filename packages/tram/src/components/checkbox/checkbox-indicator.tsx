import { forwardRef, useEffect } from 'react'
import { View } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useCheckbox } from './checkbox.context'
import { barScale, markOpacity, markScale } from './checkbox.mark'
import type { MarkGeometry } from './checkbox.mark'
import type { CheckboxIndicatorProps } from './checkbox.type'

/**
 * The box, and the mark inside it: a square in the square, in the accent.
 *
 * ```tsx
 * <Checkbox.Indicator />
 *
 * <Checkbox.Indicator>
 *   <Icon as={CheckIcon} size={14} />
 * </Checkbox.Indicator>
 * ```
 *
 * The mark grows from the centre on a spring and bounces once; unticked, it is gone in a
 * few frames. In the third state it flattens into a bar. With motion reduced it fades in
 * and out at its full size.
 *
 * Children replace the square and keep its motion — and its place, so they are centred in
 * the same inset.
 */
export const CheckboxIndicator = forwardRef<View, CheckboxIndicatorProps>(
  function CheckboxIndicator({ children, animation = true, style, ...props }, ref) {
    const {
      indicatorStyle,
      markStyle,
      geometry,
      isSelected,
      isIndeterminate,
      isStill,
    } = useCheckbox()
    const [styleProps, rest] = useStyleProps(props)

    const isShown = isSelected || isIndeterminate
    // A custom mark is the caller's drawing: it takes the square's place, not its colour
    // or its bar.
    const isCustom = children != null
    const drawn = isCustom ? [markStyle, CLEAR] : markStyle
    const isFlat = isIndeterminate && !isCustom

    return (
      <View ref={ref} {...rest} style={[indicatorStyle, styleProps, style]}>
        {/* Two components rather than a branch in one: "no animation" is only true if
            the Reanimated hooks are never reached. */}
        {animation && !isStill ? (
          <SpringingMark
            style={drawn}
            geometry={geometry}
            isShown={isShown}
            isFlat={isFlat}
          >
            {children}
          </SpringingMark>
        ) : isShown ? (
          <View
            style={[
              drawn,
              { transform: [{ scaleY: barScale(isFlat ? 1 : 0, geometry) }] },
            ]}
          >
            {children}
          </View>
        ) : null}
      </View>
    )
  }
)

CheckboxIndicator.displayName = 'XAUI.Tram.Checkbox.Indicator'

const CLEAR = { backgroundColor: 'transparent' } as const

type SpringingMarkProps = {
  style: StyleProp<ViewStyle>
  geometry: MarkGeometry
  isShown: boolean
  isFlat: boolean
  children?: ReactNode
}

function SpringingMark({
  style,
  geometry,
  isShown,
  isFlat,
  children,
}: SpringingMarkProps) {
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const presence = useSharedValue(isShown ? 1 : 0)
  const flatness = useSharedValue(isFlat ? 1 : 0)

  // `press` on the way in: the firm bounce that answers a finger. On the way out the
  // same spring reaches nothing in a few frames, and `markScale` stops it there.
  useEffect(() => {
    presence.value = animate(isShown ? 1 : 0)
  }, [isShown, animate, presence])

  useEffect(() => {
    flatness.value = animate(isFlat ? 1 : 0, 'thumb')
  }, [isFlat, animate, flatness])

  const arriving = useAnimatedStyle(() => {
    'worklet'
    const scaleY = barScale(flatness.value, geometry)

    // Growing is motion for its own sake; with motion reduced the mark fades instead.
    if (isReduced) {
      return { opacity: markOpacity(presence.value), transform: [{ scaleY }] }
    }

    return {
      opacity: 1,
      transform: [{ scale: markScale(presence.value) }, { scaleY }],
    }
  }, [presence, flatness, geometry, isReduced])

  return <Animated.View style={[style, arriving]}>{children}</Animated.View>
}
