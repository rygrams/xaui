import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnchoredPosition } from '../../hooks/use-anchored-position'
import { anchoredEntering, anchoredExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { popoverMeasure } from './popover.recipe'
import { PopoverProvider, usePopover } from './popover.context'
import type { PopoverContentProps, PopoverInsets } from './popover.type'

/** HeroUI's: nine from the trigger, twelve from every screen edge. */
const DEFAULT_OFFSET = 9
const DEFAULT_INSETS: Required<PopoverInsets> = {
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
 * list belongs to the field it drops out of, and a popover belongs to nothing — matching
 * the width of a word or an icon would give it no room at all.
 *
 * `content-fit` stops at a **measure** rather than at the screen. A paragraph always wants
 * more room than it has, so a panel bounded only by the edges is a full-width panel the
 * moment it holds a sentence — and a popover is an aside, not a sheet. Say `width` to
 * override it, in points or `'trigger'`.
 */
export const PopoverContent = forwardRef<View, PopoverContentProps>(
  function PopoverContent(
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
    const context = usePopover()
    const { contentStyle, isOpen, anchor } = context
    const [styleProps, rest] = useStyleProps(props)
    const theme = useXAUITheme()

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
      maxWidth: popoverMeasure(theme.fontSizes.md),
      onLayout,
    })

    if (!isOpen || anchor === null) return null

    return (
      <Portal>
        <PopoverProvider value={context}>
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
        </PopoverProvider>
      </Portal>
    )
  }
)

PopoverContent.displayName = 'XAUI.Popover.Content'
