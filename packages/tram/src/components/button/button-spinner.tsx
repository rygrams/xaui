import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, { useReducedMotion } from 'react-native-reanimated'
import { useRotation } from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { useButton } from './button.context'
import type { ButtonSpinnerProps } from './button.type'

/**
 * The busy indicator: a flat ring in the label's colour, sized by the recipe. `isLoading`
 * inserts one when none is composed; composing it yourself is how it goes after the label.
 *
 * With motion reduced the ring stays and stops turning — the label and the busy state
 * still say the button is working.
 */
export function ButtonSpinner({
  style,
  animation = true,
  ...props
}: ButtonSpinnerProps) {
  const { spinnerStyle } = useButton()
  const isReduced = useReducedMotion()
  const [styleProps] = useStyleProps(props)
  const ringStyle = [spinnerStyle, styleProps, style]

  // Two components rather than a branch inside one: "no animation" is only true if the
  // rotation hook is never reached.
  if (!animation || isReduced) return <View style={ringStyle} />

  return <SpinningRing style={ringStyle} />
}

ButtonSpinner.displayName = 'XAUI.Tram.Button.Spinner'

function SpinningRing({ style }: { style: StyleProp<ViewStyle> }) {
  const rotation = useRotation()

  return <Animated.View style={[style, rotation]} />
}
