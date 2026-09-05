import { useEffect } from 'react'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { ChevronDownIcon, Icon } from '../../system/icon'
import { useSelect } from './select.context'
import { INDICATOR_ROTATION, INDICATOR_SPRING } from './select.animation'
import type { SelectIndicatorProps } from './select.type'

/**
 * The chevron, turning with the list.
 *
 * It rotates on a spring rather than a timing curve. A 180-degree turn on a curve reads
 * as an animation playing next to the list; on a spring heavy enough not to overshoot it
 * reads as the list pushing the glyph round — which is the same trade HeroUI makes, with
 * the same numbers.
 *
 * The rotation is a worklet on the UI thread, so it keeps turning while JavaScript is
 * busy mounting the rows.
 */
export function SelectIndicator({
  as = ChevronDownIcon,
  ...props
}: SelectIndicatorProps) {
  const { indicatorStyle, isOpen } = useSelect()
  const progress = useSharedValue(isOpen ? 1 : 0)

  useEffect(() => {
    progress.set(withSpring(isOpen ? 1 : 0, INDICATOR_SPRING))
  }, [isOpen, progress])

  const rotation = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(progress.get(), [0, 1], [INDICATOR_ROTATION[0], INDICATOR_ROTATION[1]])}deg`,
      },
    ],
  }))

  return (
    <Animated.View style={[indicatorStyle, rotation]}>
      <Icon as={as} {...props} />
    </Animated.View>
  )
}

SelectIndicator.displayName = 'XAUI.Select.Indicator'
