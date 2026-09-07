import { useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { INDICATOR_ROTATION, INDICATOR_SPRING } from '../../system/anchored'
import { ChevronDownIcon, Icon } from '../../system/icon'
import { useAutocomplete } from '../autocomplete'

/** A cross is small; so is a chevron. The target grows outwards instead of the glyph. */
const HIT_SLOP = 8

/**
 * The chevron, turning with the panel — the `Select`'s, on the same spring.
 *
 * **It is a control here, where the `Autocomplete`'s is a decoration.** That component's
 * trigger is itself pressable, so its chevron only has to point; this one sits inside a
 * field that takes the tap and raises a keyboard, so the way to open the list *without*
 * typing has to be the chevron itself.
 */
export function ComboboxIndicator(props: {
  as?: typeof ChevronDownIcon
  accessibilityLabel?: string
}) {
  const { as = ChevronDownIcon, accessibilityLabel } = props
  const { indicatorStyle, isOpen, isDisabled, toggle } = useAutocomplete()
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
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, expanded: isOpen }}
      disabled={isDisabled}
      hitSlop={HIT_SLOP}
      onPress={toggle}
    >
      <Animated.View style={[indicatorStyle, rotation]}>
        <Icon as={as} />
      </Animated.View>
    </Pressable>
  )
}

ComboboxIndicator.displayName = 'XAUI.Combobox.Indicator'
