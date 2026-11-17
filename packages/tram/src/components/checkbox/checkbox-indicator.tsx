import { forwardRef, useEffect } from 'react'
import { View } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTramMotion } from '../../motion/use-tram-motion'
import type { MarkGeometry } from '../../system/selection-mark'
import { SpringingMark } from '../../system/springing-mark'
import { useCheckbox } from './checkbox.context'
import { barScale } from './checkbox.mark'
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
          <FlatteningMark
            style={drawn}
            geometry={geometry}
            isShown={isShown}
            isFlat={isFlat}
          >
            {children}
          </FlatteningMark>
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

type FlatteningMarkProps = {
  style: StyleProp<ViewStyle>
  geometry: MarkGeometry
  isShown: boolean
  isFlat: boolean
  children?: ReactNode
}

/** The shared mark, with what is the checkbox's alone: the square flattening to a bar. */
function FlatteningMark({
  style,
  geometry,
  isShown,
  isFlat,
  children,
}: FlatteningMarkProps) {
  const animate = useTramMotion()
  const flatness = useSharedValue(isFlat ? 1 : 0)

  useEffect(() => {
    flatness.value = animate(isFlat ? 1 : 0, 'thumb')
  }, [isFlat, animate, flatness])

  const scaleY = useDerivedValue(() => {
    'worklet'
    return barScale(flatness.value, geometry)
  }, [flatness, geometry])

  return (
    <SpringingMark style={style} isShown={isShown} scaleY={scaleY}>
      {children}
    </SpringingMark>
  )
}
