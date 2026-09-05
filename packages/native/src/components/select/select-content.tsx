import { forwardRef, useState } from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'
import type { LayoutChangeEvent, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { SelectProvider, useSelect } from './select.context'
import { contentEntering, contentExiting } from './select.animation'
import { resolvePlacement } from './select.utils'
import type { SelectContentProps, SelectInsets } from './select.type'
import type { Size2D } from './select.utils'

/** HeroUI's, point for point: eight from the trigger, twelve from every screen edge. */
const DEFAULT_OFFSET = 8
const DEFAULT_INSETS: Required<SelectInsets> = {
  top: 12,
  bottom: 12,
  start: 12,
  end: 12,
}

/**
 * The list. It renders into the nearest `PortalHost`, so it escapes the clipping and the
 * stacking of whatever container held the trigger.
 *
 * **It measures before it positions.** The first pass mounts the panel invisibly to learn
 * how tall it wants to be; the second places it and plays the entrance. Without that pass
 * `avoidCollisions` has nothing to compare and a list that does not fit below would open
 * downwards off the screen. The cost is one frame, and it is why the entrance animation
 * is keyed on the resolved placement rather than started at mount.
 */
export const SelectContent = forwardRef<View, SelectContentProps>(
  function SelectContent(
    {
      children,
      placement = 'bottom',
      align = 'center',
      width = 'trigger',
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
    // The whole context, not the three values this component reads: our `Portal` copies
    // its children into the host rather than re-parenting them, so the subtree below lands
    // outside the provider the root rendered. It is re-provided inside the portal, and
    // without that every `Select.Item` throws on `useSelect`.
    const context = useSelect()
    const { contentStyle, isOpen, anchor } = context
    const [styleProps, rest] = useStyleProps(props)
    const window = useWindowDimensions()
    const [measured, setMeasured] = useState<Size2D | null>(null)

    // Measured per open rather than kept: a list whose rows changed while it was closed
    // would otherwise be placed against the height it had last time.
    if (!isOpen && measured !== null) setMeasured(null)

    if (!isOpen || anchor === null) return null

    const measure = (event: LayoutChangeEvent) => {
      onLayout?.(event)
      const { width: w, height: h } = event.nativeEvent.layout
      if (measured === null || measured.height !== h || measured.width !== w) {
        setMeasured({ width: w, height: h })
      }
    }

    const position =
      measured &&
      resolvePlacement({
        anchor,
        content: measured,
        window: { width: window.width, height: window.height },
        placement,
        align,
        width,
        offset,
        alignOffset,
        avoidCollisions,
        insets: { ...DEFAULT_INSETS, ...insets },
      })

    return (
      <Portal>
        <SelectProvider value={context}>
          <Animated.View
            ref={ref}
            // Keyed on the resolved side so the entrance plays once the panel knows which way
            // it grows — remounting is what makes a `Keyframe` run, and running it on the
            // measuring pass would animate a panel nobody can see.
            key={position?.placement ?? 'measuring'}
            entering={position ? contentEntering(position.placement) : undefined}
            exiting={position ? contentExiting(position.placement) : undefined}
            onLayout={measure}
            {...rest}
            style={[
              contentStyle,
              // The measuring pass: laid out at the trigger's width so the rows wrap as they
              // finally will, and invisible so the reader never sees it at the wrong place.
              position === null
                ? { opacity: 0, top: 0, start: 0, width: anchor.width }
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
            {/* A list longer than the room it has scrolls rather than being cut off. The
            scroller keeps its own bounds, so `maxHeight` on the panel is the only limit
            either of them needs. */}
            <ScrollView
              bounces={false}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </Animated.View>
        </SelectProvider>
      </Portal>
    )
  }
)

SelectContent.displayName = 'XAUI.Select.Content'
