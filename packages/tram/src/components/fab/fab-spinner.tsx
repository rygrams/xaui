import { forwardRef } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useFab } from './fab.context'
import { useTurn } from './fab.hook'
import type { FabSpinnerProps } from './fab.type'

/**
 * The busy ring, in the ink that reads on the circle. `isLoading` puts one in the glyph's
 * place when none is composed; composing it is how it is given a style of its own.
 *
 * It turns as the `Button`'s does, and it turns with motion reduced too: a busy `Fab` is a
 * state, not a flourish. Only `animation={false}`, or an ancestor that asked for no
 * animation at all, leaves a fixed ring.
 */
export const FabSpinner = forwardRef<View, FabSpinnerProps>(function FabSpinner(
  { style, animation = true, ...props },
  ref
) {
  const { spinnerStyle, isStill } = useFab()
  const [styleProps] = useStyleProps(props)
  const ringStyle = [spinnerStyle, styleProps, style]

  // Two components rather than a branch inside one: "no animation" is only true if the
  // rotation hook is never reached.
  if (!animation || isStill) return <View ref={ref} style={ringStyle} />

  return <SpinningRing ref={ref} style={ringStyle} />
})

FabSpinner.displayName = 'XAUI.Tram.Fab.Spinner'

type RingProps = { style: StyleProp<ViewStyle> }

const SpinningRing = forwardRef<View, RingProps>(function SpinningRing(
  { style },
  ref
) {
  const rotation = useTurn()

  // The animated wrapper types its ref as itself; at runtime it is the host view.
  return <Animated.View ref={ref as never} style={[style, rotation]} />
})
