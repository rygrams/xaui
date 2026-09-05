import { useEffect } from 'react'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { ChevronDownIcon, Icon } from '../../system/icon'
import { useAccordion, useAccordionItem } from './accordion.context'
import { INDICATOR_ROTATION, INDICATOR_SPRING } from '../../system/anchored'
import type { AccordionIndicatorProps } from './accordion.type'

/**
 * The chevron, turning with the panel.
 *
 * The same spring as the `Select`'s, for the same reason: a 180-degree turn on a timing
 * curve reads as an animation playing beside the row, and on a spring heavy enough not to
 * overshoot it reads as the panel pushing the glyph round. It is a worklet, so it keeps
 * turning while the panel's content mounts.
 */
export function AccordionIndicator({
  as = ChevronDownIcon,
  ...props
}: AccordionIndicatorProps) {
  const { indicatorStyle } = useAccordion()
  const { isExpanded } = useAccordionItem()
  const progress = useSharedValue(isExpanded ? 1 : 0)

  useEffect(() => {
    progress.set(withSpring(isExpanded ? 1 : 0, INDICATOR_SPRING))
  }, [isExpanded, progress])

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

AccordionIndicator.displayName = 'XAUI.Accordion.Indicator'
