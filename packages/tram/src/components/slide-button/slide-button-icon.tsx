import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { Icon } from '@xaui/native/system'
import { useSlideButton } from './slide-button.context'
import type { SlideButtonIconProps } from './slide-button.type'

const LAYERS = StyleSheet.create({
  // The second mark lies exactly over the first, so the two cross-fade in place.
  over: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

/**
 * The mark in the thumb. Written inside `SlideButton.Thumb`, it takes the thumb's size and
 * the colour that reads on it — the accent's foreground at rest, the accent once the thumb
 * has inverted. An explicit `size` or `color` still wins.
 *
 * The change of colour is a cross-fade of two marks on the progress the thumb's own fill
 * moves on, so the mark never stands in the colour of the fill it is on — and it follows
 * reduced motion with the thumb. Given a `color`, the mark is the caller's and stays one.
 */
export function SlideButtonIcon({ size, color, ...rest }: SlideButtonIconProps) {
  const { icon, inks, done } = useSlideButton()
  const side = size ?? icon.size

  const atRest = useAnimatedStyle(() => {
    'worklet'
    return { opacity: 1 - done.value }
  }, [done])

  const arrived = useAnimatedStyle(() => {
    'worklet'
    return { opacity: done.value }
  }, [done])

  if (color) return <Icon size={side} color={color} {...rest} />

  return (
    <View>
      <Animated.View style={atRest}>
        <Icon size={side} color={icon.color} {...rest} />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[LAYERS.over, arrived]}
      >
        <Icon size={side} color={inks.thumb} {...rest} />
      </Animated.View>
    </View>
  )
}

SlideButtonIcon.displayName = 'XAUI.Tram.SlideButton.Icon'
