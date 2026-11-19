import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import { usePressState } from '@xaui/native'
import { PressableFeedback } from '@xaui/native/system'
import { PressTilt } from '../../system/press-tilt'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { MORE_BOX } from './app-bar.recipe'
import { appBarSheet } from './app-bar.style'

export type AppBarMoreProps = {
  label: string
  isOpen: boolean
  isTilting: boolean
  isStill: boolean
  boxStyle: StyleProp<ViewStyle>
  dotStyle: StyleProp<ViewStyle>
  onPress: () => void
}

/** How far the touch reaches past the "…", over and under it, to make 48. */
const REACH = touchReach(MORE_BOX.height)

/**
 * The "…" at the end of the band's top edge: three dots in the bar's ink that open the
 * bar and close it. Not a slot — the bar draws it whenever there is something to uncover:
 * a menu, labels, or the circles of a `minimal` bar.
 */
export function AppBarMore({
  label,
  isOpen,
  isTilting,
  isStill,
  boxStyle,
  dotStyle,
  onPress,
}: AppBarMoreProps) {
  const haptic = useTramHaptic()
  const [isPressed, press] = usePressState({ onPressIn: () => haptic('press') })
  const Root = isTilting ? PressTilt : PressableFeedback

  return (
    <View style={appBarSheet.more}>
      <Root
        isPressed={isPressed}
        animation={isStill ? 'disable-all' : false}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded: isOpen }}
        hitSlop={{ top: REACH, bottom: REACH }}
        style={[boxStyle, appBarSheet.bare]}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <View style={dotStyle} />
        <View style={dotStyle} />
        <View style={dotStyle} />
      </Root>
    </View>
  )
}
