import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { faceAngle } from '../../utils/flip'
import type { FlipFace } from '../../utils/flip'
import { FLIP_PERSPECTIVE, flipCardSheet } from './flip-card.style'
import { useFlipCard } from './flip-card.context'
import type { FlipCardFaceProps } from './flip-card.type'

/**
 * The two faces, which differ only in which end of the turn they start at and whether they
 * are in the flow.
 *
 * Written once and named twice rather than copied: the whole correctness of the component is
 * that the two stay a half turn apart, and two copies of the same four lines is where that
 * stops being true.
 */
function face(which: FlipFace, name: string) {
  const Component = forwardRef<View, FlipCardFaceProps>(function FlipCardFace(
    { children, style, ...props },
    ref
  ) {
    const { progress, direction, rotation } = useFlipCard()
    const [styleProps, rest] = useStyleProps(props)

    const turn = useAnimatedStyle(() => {
      const angle = `${faceAngle(progress.get(), which, rotation)}deg`

      return {
        transform: [
          // The perspective comes first, and it has to: a rotation applied before it is an
          // affine squash, and the card reads as a blind closing rather than as a face
          // turning away.
          { perspective: FLIP_PERSPECTIVE },
          direction === 'horizontal' ? { rotateY: angle } : { rotateX: angle },
        ],
      }
    })

    return (
      <Animated.View
        ref={ref}
        {...rest}
        style={[
          which === 'front' ? flipCardSheet.face : flipCardSheet.back,
          turn,
          styleProps,
          style,
        ]}
      >
        {children}
      </Animated.View>
    )
  })

  Component.displayName = name
  return Component
}

/** The face at rest, and the one that decides how big the card is. */
export const FlipCardFront = face('front', 'XAUI.FlipCard.Front')

/** The face the turn reveals. Out of flow, filling the front. */
export const FlipCardBack = face('back', 'XAUI.FlipCard.Back')
