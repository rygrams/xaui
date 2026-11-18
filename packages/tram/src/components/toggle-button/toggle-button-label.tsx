import { forwardRef } from 'react'
import type { Text } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useToggleButton } from './toggle-button.context'
import type { ToggleButtonLabelProps } from './toggle-button.type'

/**
 * The text of a toggle, single-line, on the `Button`'s type. Its colour fades with the
 * box — the ink released, the ink that reads on the accent chosen — on the root's one
 * shared value. The case is the app's.
 */
export const ToggleButtonLabel = forwardRef<Text, ToggleButtonLabelProps>(
  function ToggleButtonLabel({ children, style, numberOfLines = 1, ...props }, ref) {
    const { labelStyle, tones, chosen } = useToggleButton()
    const [styleProps, rest] = useStyleProps(props)
    const from = tones.off.text
    const to = tones.on.text

    const tone = useAnimatedStyle(() => {
      'worklet'
      return { color: interpolateColor(chosen.value, [0, 1], [from, to]) }
    }, [chosen, from, to])

    return (
      <Animated.Text
        // The animated wrapper types its ref as itself; at runtime it is the host text.
        ref={ref as never}
        numberOfLines={numberOfLines}
        {...rest}
        style={[labelStyle, tone, styleProps, style]}
      >
        {children}
      </Animated.Text>
    )
  }
)

ToggleButtonLabel.displayName = 'XAUI.Tram.ToggleButton.Label'
