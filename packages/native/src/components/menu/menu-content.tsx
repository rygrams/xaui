import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnchoredPosition } from '../../hooks/use-anchored-position'
import { anchoredEntering, anchoredExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { MenuProvider, useMenu } from './menu.context'
import type { MenuContentProps, MenuInsets } from './menu.type'

/** Closer than a popover's nine: a menu belongs to the control it drops out of. */
const DEFAULT_OFFSET = 6
const DEFAULT_INSETS: Required<MenuInsets> = {
  top: 12,
  bottom: 12,
  start: 12,
  end: 12,
}

/**
 * The panel. It renders into the nearest `PortalHost`, so it escapes the clipping and the
 * stacking of whatever container held the trigger.
 *
 * Its width defaults to `content-fit` rather than the `Select`'s `trigger`: a select's
 * list belongs to the field it drops out of, and a menu belongs to nothing — matching
 * the width of a word or an icon would give it no room at all.
 */
export const MenuContent = forwardRef<View, MenuContentProps>(function MenuContent(
  {
    children,
    placement = 'bottom',
    align = 'center',
    width = 'content-fit',
    offset = DEFAULT_OFFSET,
    alignOffset = 0,
    avoidCollisions = true,
    insets,
    style,
    onLayout,
    ...props
  },
  ref
) {
  const context = useMenu()
  const { contentStyle, isOpen, anchor } = context
  const [styleProps, rest] = useStyleProps(props)

  const { position, onContentLayout, measuringStyle } = useAnchoredPosition({
    anchor,
    isOpen,
    placement,
    align,
    width,
    offset,
    alignOffset,
    avoidCollisions,
    insets: { ...DEFAULT_INSETS, ...insets },
    onLayout,
  })

  if (!isOpen || anchor === null) return null

  return (
    <Portal>
      <MenuProvider value={context}>
        <Animated.View
          ref={ref}
          // Keyed on the resolved side so the entrance plays once the panel knows which
          // way it grows — remounting is what makes a `Keyframe` run, and running it on
          // the measuring pass would animate a panel nobody can see.
          key={position?.placement ?? 'measuring'}
          entering={position ? anchoredEntering(position.placement) : undefined}
          exiting={position ? anchoredExiting(position.placement) : undefined}
          onLayout={onContentLayout}
          {...rest}
          style={[
            contentStyle,
            position === null
              ? measuringStyle
              : {
                  top: position.top,
                  start: position.start,
                  width: position.width,
                  maxHeight: position.maxHeight,
                },
            styleProps,
            style,
          ]}
        >
          {children}
        </Animated.View>
      </MenuProvider>
    </Portal>
  )
})

MenuContent.displayName = 'XAUI.Menu.Content'
