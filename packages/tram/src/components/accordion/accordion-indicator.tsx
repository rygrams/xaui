import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { INDICATOR_ROTATION, Icon } from '@xaui/native/system'
import { duration } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { useAccordion, useAccordionItem } from './accordion.context'
import type { AccordionIndicatorProps } from './accordion.type'

/** The upright bar, closed: a quarter turn from lying with the other. */
const UPRIGHT = 90

/**
 * The plus at the end of the row, drawn from two bars of the `Button`'s line — the
 * `CloseButton`'s, crossed upright — so no icon set is needed. As the row opens the
 * upright bar lies down onto the other and the plus reads as a minus, on the Metro curve.
 *
 * `as` puts a glyph in its place, which turns half a turn instead, as Native's chevron.
 */
export function AccordionIndicator({ as, size, color }: AccordionIndicatorProps) {
  const { indicatorStyle, indicatorBarStyle } = useAccordion()
  const { isExpanded } = useAccordionItem()
  const glide = useTramEase()
  const progress = useSharedValue(isExpanded ? 1 : 0)

  useEffect(() => {
    progress.value = glide(isExpanded ? 1 : 0, 'metro', duration.base)
  }, [isExpanded, glide, progress])

  const upright = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        { rotate: `${interpolate(progress.value, [0, 1], [UPRIGHT, 0])}deg` },
      ],
    }
  }, [progress])

  const turning = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        {
          rotate: `${interpolate(progress.value, [0, 1], [INDICATOR_ROTATION[0], INDICATOR_ROTATION[1]])}deg`,
        },
      ],
    }
  }, [progress])

  if (as) {
    return (
      <Animated.View style={[indicatorStyle, turning]}>
        <Icon as={as} size={size} color={color} />
      </Animated.View>
    )
  }

  const bar = [
    indicatorBarStyle,
    size !== undefined ? { width: size } : undefined,
    color !== undefined ? { backgroundColor: color } : undefined,
  ]

  return (
    <View
      style={indicatorStyle}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={bar} />
      <Animated.View style={[bar, upright]} />
    </View>
  )
}

AccordionIndicator.displayName = 'XAUI.Tram.Accordion.Indicator'
