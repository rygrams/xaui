import { forwardRef } from 'react'
import { ScrollView } from 'react-native'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnchoredPosition } from '../../hooks/use-anchored-position'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { SelectItem } from './select-item'
import { anchoredEntering, anchoredExiting } from '../../system/anchored'
import { SelectProvider, useSelect } from './select.context'
import { collectItemLabels } from '../../utils/item-labels'
import type { SelectContentProps, SelectInsets } from './select.type'
import { useEffect } from 'react'

/** HeroUI's, point for point: eight from the trigger, twelve from every screen edge. */
const DEFAULT_OFFSET = 8
const DEFAULT_INSETS: Required<SelectInsets> = {
  top: 12,
  bottom: 12,
  start: 12,
  end: 12,
}

/** By identity rather than by `displayName`: a minifier keeps the reference, not the string. */
const isSelectItem = (type: unknown) => type === SelectItem

/**
 * The list. It renders into the nearest `PortalHost`, so it escapes the clipping and the
 * stacking of whatever container held the trigger.
 *
 * The positioning — the measuring pass, the host's origin, the collision flip — is
 * `useAnchoredPosition`, shared with the `Popover`. What is this component's own is the
 * scroller, and reading the rows' labels before any of them mounts.
 */
export const SelectContent = forwardRef<View, SelectContentProps>(
  function SelectContent(
    {
      children,
      placement = 'bottom',
      align = 'center',
      width = 'trigger',
      minWidth,
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
    // The whole context, not the two values this component reads: our `Portal` copies its
    // children into the host rather than re-parenting them, so the subtree below lands
    // outside the provider the root rendered. It is re-provided inside the portal, and
    // without that every `Select.Item` throws on `useSelect`.
    const context = useSelect()
    const { contentStyle, isOpen, anchor, registerLabel } = context
    const [styleProps, rest] = useStyleProps(props)

    const { position, onContentLayout, measuringStyle } = useAnchoredPosition({
      anchor,
      isOpen,
      placement,
      align,
      width,
      minWidth,
      offset,
      alignOffset,
      avoidCollisions,
      insets: { ...DEFAULT_INSETS, ...insets },
      onLayout,
    })

    // Read off the elements, before anything mounts. The rows live in a portal that only
    // exists while the list is open, so a select with a `defaultValue` would show its
    // placeholder until the user had opened it once — which is a bug the caller cannot see
    // coming and cannot work around except by repeating the label.
    useEffect(() => {
      for (const [value, label] of collectItemLabels(children, isSelectItem)) {
        registerLabel(value, label)
      }
    }, [children, registerLabel])

    if (!isOpen || anchor === null) return null

    return (
      <Portal>
        <SelectProvider value={context}>
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
