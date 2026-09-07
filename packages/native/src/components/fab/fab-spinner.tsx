import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useRotation } from '../../hooks'
import { useStyleProps } from '../../system/style-props'
import { useFab } from './fab.context'
import type { ViewStyleProps } from '../../system/style-props'

export type FabSpinnerProps = Omit<ViewStyleProps, 'style'> & {
  /** `false` renders a still ring, for a screen that has asked for less motion. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

/**
 * The busy ring. `isLoading` inserts one when none is composed; composing it explicitly is
 * how you put it after the label instead of before it.
 *
 * The `Button.Spinner`'s argument, unchanged: a ring the recipe owns rather than a
 * `<Spinner>` with props, so it follows the FAB's `size` and its variant with nothing to
 * pass. What the two share is the turn, and that is `useRotation`.
 */
export function FabSpinner({ style, animation = true, ...props }: FabSpinnerProps) {
  const { spinnerStyle } = useFab()
  const [styleProps] = useStyleProps(props)
  const ringStyle = [spinnerStyle, styleProps, style]

  // Two components rather than a branch inside one: hooks cannot be conditional, and "no
  // animation" is only true if the Reanimated hooks are never reached.
  if (!animation) return <View style={ringStyle} />

  return <SpinningRing style={ringStyle} />
}

FabSpinner.displayName = 'XAUI.Fab.Spinner'

function SpinningRing({ style }: { style: StyleProp<ViewStyle> }) {
  const turn = useRotation()

  return <Animated.View style={[style, turn]} />
}
