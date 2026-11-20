import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useMorphButton } from './morph-button.context'
import type { MorphButtonFaceProps } from './morph-button.type'

type Which = 'collapsed' | 'expanded'

/**
 * The two shapes' contents, which differ only in which state mounts them and which
 * resolved style they read. Written once and named twice: the morph is correct because
 * exactly one of them is mounted, and two copies is where that stops being true.
 */
function face(which: Which, name: string) {
  const Component = forwardRef<View, MorphButtonFaceProps>(function MorphButtonFace(
    { children, style, ...props },
    ref
  ) {
    const { isExpanded, collapsedStyle, expandedStyle, animation, motion } =
      useMorphButton()
    const [styleProps, rest] = useStyleProps(props)

    if (isExpanded !== (which === 'expanded')) return null

    return (
      <Animated.View
        ref={ref}
        entering={animation ? motion.entering : undefined}
        exiting={animation ? motion.exiting : undefined}
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

/** The `Button`: a row on the control's height, its content centred. */
export const MorphButtonCollapsed = face(
  'collapsed',
  'XAUI.Tram.MorphButton.Collapsed'
)

/** The card: a column inside a frame, as tall as what is in it. */
export const MorphButtonExpanded = face('expanded', 'XAUI.Tram.MorphButton.Expanded')
