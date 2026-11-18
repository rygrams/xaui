import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { ChevronDownIcon, Icon } from '@xaui/native/system'
import { useSelect } from './select.context'
import type { SelectIndicatorProps } from './select.type'

/** Degrees: the chevron points down when the list is closed and up when it is open. */
const TURNED = 180

/**
 * The chevron at the end of the field, in the field's ink. It turns with the border, on
 * the same shared value — so it follows the same spring, or the same short fade.
 */
export function SelectIndicator({
  as = ChevronDownIcon,
  ...props
}: SelectIndicatorProps) {
  const { motion } = useSelect()
  const { line } = motion

  const turned = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ rotate: `${line.value * TURNED}deg` }] }
  }, [line])

  return (
    <Animated.View style={turned}>
      <Icon as={as} {...props} />
    </Animated.View>
  )
}

SelectIndicator.displayName = 'XAUI.Tram.Select.Indicator'
