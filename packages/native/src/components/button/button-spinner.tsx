import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useRotation } from '../../hooks'
import { useStyleProps } from '../../system/style-props'
import { useButton } from './button.context'
import type { ButtonSpinnerProps } from './button.type'

/**
 * The busy indicator. `isLoading` inserts one when none is composed, so
 * `<Button isLoading>Envoi…</Button>` works; composing it explicitly is how you put it
 * after the label instead of before it.
 *
 * A ring rather than RN's `ActivityIndicator`: the recipe owns its diameter and its
 * colour like every other measurement, which is what makes it follow the button's `size`
 * and its variant with nothing to pass.
 *
 * It is not a `<Spinner>` with props, and it is the standalone component that says why:
 * `Spinner`'s `size` is a token of its own scale and its `variant` names an ink, while
 * everything this slot draws was already decided by the button's recipe. Handing it two
 * raw values would be R6 in reverse — a vocabulary prop taking a computed number. What
 * the two do share is the turn, and that is `useRotation`.
 */
export function ButtonSpinner({
  style,
  animation = true,
  ...props
}: ButtonSpinnerProps) {
  const { spinnerStyle } = useButton()
  const [styleProps] = useStyleProps(props)
  const ringStyle = [spinnerStyle, styleProps, style]

  // Two components rather than a branch inside one: hooks cannot be conditional, and
  // "no animation" is only true if the Reanimated hooks are never reached.
  if (!animation) return <View style={ringStyle} />

  return <SpinningRing style={ringStyle} />
}

ButtonSpinner.displayName = 'XAUI.Button.Spinner'

function SpinningRing({ style }: { style: StyleProp<ViewStyle> }) {
  const rotation = useRotation()

  return <Animated.View style={[style, rotation]} />
}
