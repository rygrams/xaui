import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnchoredPosition } from '../../hooks/use-anchored-position'
import { anchoredEntering, anchoredExiting } from '../../system/anchored'
import { Portal } from '../../system/portal'
import { useStyleProps } from '../../system/style-props'
import { DatePickerProvider, useDatePicker } from './date-picker.context'
import type { DatePickerContentProps } from './date-picker.type'

/** HeroUI's, point for point: eight from the trigger, twelve from every screen edge. */
const DEFAULT_OFFSET = 8
const DEFAULT_INSETS = { top: 12, bottom: 12, start: 12, end: 12 }

/**
 * The panel the month sits in.
 *
 * It renders into the nearest `PortalHost`, so it escapes the clipping and the stacking of
 * whatever container held the trigger, and the positioning — the measuring pass, the host's
 * origin, the collision flip — is `useAnchoredPosition`, shared with the `Select`, the
 * `Autocomplete` and the `Popover`.
 *
 * **`width` defaults to `content-fit`, not to `trigger`.** A list is as wide as the field
 * that opens it, because its rows are that field's answers; a month grid is seven columns of
 * a fixed cell, and squeezing it into a narrow field would crush the cells or clip the week.
 */
export const DatePickerContent = forwardRef<View, DatePickerContentProps>(
  function DatePickerContent(
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
    // The whole context: the portal copies its children into the host rather than
    // re-parenting them, so the subtree below lands outside the provider the root rendered.
    const context = useDatePicker()
    const { contentStyle, fieldStyle, isOpen, anchor } = context
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
        <DatePickerProvider value={context}>
          <Animated.View
            ref={ref}
            // Keyed on the resolved side so the entrance plays once the panel knows which
            // way it grows — running it on the measuring pass would animate a panel nobody
            // can see.
            key={position?.placement ?? 'measuring'}
            entering={position ? anchoredEntering(position.placement) : undefined}
            exiting={position ? anchoredExiting(position.placement) : undefined}
            onLayout={onContentLayout}
            {...rest}
            style={[
              contentStyle,
              // The one measurement this component owns: a list's rows run edge to edge
              // and a month grid must not.
              fieldStyle,
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
        </DatePickerProvider>
      </Portal>
    )
  }
)

DatePickerContent.displayName = 'XAUI.DatePicker.Content'
