import { useEffect } from 'react'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { INDICATOR_ROTATION, INDICATOR_SPRING } from '../../system/anchored'
import { ChevronDownIcon, Icon } from '../../system/icon'
import { useAutocomplete } from './autocomplete.context'

/** The chevron, turning with the panel — the `Select`'s, on the same spring. */
export function AutocompleteIndicator(props: { as?: typeof ChevronDownIcon }) {
  const { as = ChevronDownIcon } = props
  const { indicatorStyle, isOpen } = useAutocomplete()
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
      <Icon as={as} />
    </Animated.View>
  )
}

AutocompleteIndicator.displayName = 'XAUI.Autocomplete.Indicator'
