import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { faceEntering, faceExiting } from './morph-button.animation'
import { useMorphButton } from './morph-button.context'
import type { MorphButtonFaceProps } from './morph-button.type'

type Which = 'collapsed' | 'expanded'

/**
 * The two shapes' contents, which differ only in which state mounts them and which
 * resolved style they read.
 *
 * Written once and named twice rather than copied: what makes the morph correct is that
 * **exactly one of them is mounted**, and two copies of the same six lines is where that
 * stops being true.
 *
 * Mounted or not, with no `maxHeight` and no measurement anywhere: the box's layout
 * transition animates between the two sizes, and a face whose content grows afterwards
 * grows the box with it.
 */
function face(which: Which, name: string) {
  const Component = forwardRef<View, MorphButtonFaceProps>(function MorphButtonFace(
    { children, style, ...props },
    ref
  ) {
    const { isExpanded, collapsedStyle, expandedStyle, animation } = useMorphButton()
    const [styleProps, rest] = useStyleProps(props)

    if (isExpanded !== (which === 'expanded')) return null

    return (
      <Animated.View
        ref={ref}
        entering={animation ? faceEntering : undefined}
        exiting={animation ? faceExiting : undefined}
        {...rest}
        style={[
          which === 'expanded' ? expandedStyle : collapsedStyle,
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

/** The pill: a row on the control's height, its content centred. */
export const MorphButtonCollapsed = face('collapsed', 'XAUI.MorphButton.Collapsed')

/** The card: a column inside a frame, as tall as what is in it. */
export const MorphButtonExpanded = face('expanded', 'XAUI.MorphButton.Expanded')
