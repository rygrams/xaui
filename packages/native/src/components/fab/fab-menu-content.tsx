import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnchoredPosition } from '../../hooks/use-anchored-position'
import { anchoredEntering, anchoredExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { FabMenuProvider, useFabMenu } from './fab-menu.context'
import { fabMenuAlignment } from './fab-menu.style'
import type { FabMenuContentProps, FabMenuInsets } from './fab-menu.type'

/** Twice a menu's six: the FAB is round, so its corner is further away than a field's. */
const DEFAULT_OFFSET = 12

const DEFAULT_INSETS: Required<FabMenuInsets> = {
  top: 12,
  bottom: 12,
  start: 12,
  end: 12,
}

/**
 * The column of actions. It renders into the nearest `PortalHost`, so it escapes the
 * clipping and the stacking of whatever container held the FAB.
 *
 * **`top` and `end` by default**, because that is where a FAB is: pinned to the bottom
 * trailing corner, with nowhere to open but upwards and nothing to line up with but its own
 * trailing edge. `avoidCollisions` still flips it to `bottom` for a FAB at the top of a
 * screen, which is the arrangement a header FAB wants.
 *
 * **It has no surface**, unlike a `Menu`'s panel — the pills inside it are the surface. The
 * column is a transparent stack, which is why `content-fit` is the only width that makes
 * sense here: a `trigger` width would crush three words into the FAB's diameter.
 */
export const FabMenuContent = forwardRef<View, FabMenuContentProps>(
  function FabMenuContent(
    {
      children,
      placement = 'top',
      align = 'end',
      width = 'content-fit',
      offset = DEFAULT_OFFSET,
      alignOffset = 0,
      avoidCollisions = true,
      insets,
      accessibilityRole = 'menu',
      style,
      onLayout,
      ...props
    },
    ref
  ) {
    const context = useFabMenu()
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
        <FabMenuProvider value={context}>
          <Animated.View
            ref={ref}
            // Keyed on the resolved side so the entrance plays once the column knows which
            // way it grows — remounting is what makes a `Keyframe` run, and running it on
            // the measuring pass would animate a column nobody can see.
            key={position?.placement ?? 'measuring'}
            entering={position ? anchoredEntering(position.placement) : undefined}
            exiting={position ? anchoredExiting(position.placement) : undefined}
            // A `Menu`'s panel needs no role: the surface is the container a screen reader
            // stops at. These pills have no surface between them, so without this there is
            // nothing to say a set of actions has appeared at all.
            accessibilityRole={accessibilityRole}
            onLayout={onContentLayout}
            {...rest}
            style={[
              contentStyle,
              // The pills line up on the edge the column was anchored to — see
              // `fabMenuAlignment`. It is `align`'s, so it cannot come from the recipe.
              fabMenuAlignment[align],
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
        </FabMenuProvider>
      </Portal>
    )
  }
)

FabMenuContent.displayName = 'XAUI.Fab.Menu.Content'
