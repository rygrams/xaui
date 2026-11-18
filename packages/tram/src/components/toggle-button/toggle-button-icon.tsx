import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { Icon } from '@xaui/native/system'
import { useToggleButton } from './toggle-button.context'
import type { ToggleButtonIconProps } from './toggle-button.type'

/**
 * An icon in the label's colour, at the button's size, fading with it. The icon is a
 * third-party component that takes a colour, not an animated style: it is drawn twice,
 * in the released colour and over it in the chosen one, and the upper one comes in on the
 * root's shared value — which mixes the two colours as `interpolateColor` would.
 *
 * It does not turn, grow or change glyph: a glyph per state is the caller's, through the
 * render function. A `color` given here is the icon's in both states.
 */
export function ToggleButtonIcon({ size, color, ...rest }: ToggleButtonIconProps) {
  const { iconSize, tones, chosen } = useToggleButton()

  const over = useAnimatedStyle(() => {
    'worklet'
    return { opacity: chosen.value }
  }, [chosen])
  // The lower one goes once the upper one is all there: its antialiased edge would
  // otherwise show round the glyph.
  const under = useAnimatedStyle(() => {
    'worklet'
    return { opacity: chosen.value < 1 ? 1 : 0 }
  }, [chosen])

  if (color !== undefined)
    return <Icon size={size ?? iconSize} color={color} {...rest} />

  const side = size ?? iconSize

  return (
    <View style={{ width: side, height: side }}>
      <Animated.View style={[StyleSheet.absoluteFill, under]}>
        <Icon size={side} color={tones.off.text} {...rest} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, over]}>
        <Icon size={side} color={tones.on.text} {...rest} />
      </Animated.View>
    </View>
  )
}

ToggleButtonIcon.displayName = 'XAUI.Tram.ToggleButton.Icon'
