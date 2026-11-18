import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { flip } from '../../motion/motion-tokens'
import { useTile } from './tile.context'
import type { TileFaceName, TileFaceProps } from './tile.type'

/**
 * The two faces, written once and named twice: all that makes them a tile is that they
 * stay half a turn — or one tile's height — apart, and two copies is where that stops
 * being true.
 */
function face(which: TileFaceName, name: string) {
  const isBack = which === 'back'

  const Component = forwardRef<View, TileFaceProps>(function TileFace(
    { children, style, ...props },
    ref
  ) {
    const { faceStyle, face: shown, transition, turn, height } = useTile()
    const [styleProps, rest] = useStyleProps(props)
    const isReduced = useReducedMotion()
    const isShown = shown === which

    const placed = useAnimatedStyle(() => {
      'worklet'
      const turned = turn.value

      // Motion reduced: nothing turns or travels, one face fades into the other.
      if (isReduced) {
        return { opacity: isBack ? turned : 1 - turned, transform: [] }
      }

      if (transition === 'slide') {
        const travelled = (isBack ? 1 - turned : -turned) * height.value

        return {
          // Until the tile is measured the back has nowhere to wait, so it is not drawn.
          opacity: isBack && height.value === 0 ? 0 : 1,
          transform: [{ translateY: travelled }],
        }
      }

      const angle = turned * flip.degrees + (isBack ? flip.degrees : 0)

      return {
        opacity: 1,
        // The perspective first: a rotation applied before it is a flat squash.
        transform: [{ perspective: flip.perspective }, { rotateX: `${angle}deg` }],
      }
    }, [isReduced, transition, turn, height])

    return (
      <Animated.View
        ref={ref}
        // The face out of sight is out of a screen reader's way as well.
        accessibilityElementsHidden={!isShown}
        importantForAccessibility={isShown ? 'auto' : 'no-hide-descendants'}
        aria-hidden={!isShown}
        {...rest}
        style={[faceStyle, placed, styleProps, style]}
      >
        {children}
      </Animated.View>
    )
  })

  Component.displayName = name

  return Component
}

/** The face a tile shows at rest. */
export const TileFront = face('front', 'XAUI.Tram.Tile.Front')

/** The face the turn reveals: the forecast behind the temperature, the date behind the event. */
export const TileBack = face('back', 'XAUI.Tram.Tile.Back')
