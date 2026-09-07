import { forwardRef, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { SegmentLabel } from './segment-label'
import { SegmentItemProvider, useSegment } from './segment.context'
import type { SegmentItemProps } from './segment.type'
import { hasLeadingSeparator } from './segment.utils'

/**
 * One option.
 *
 * It publishes its own rectangle on every layout, and the layout event's `x` and `width`
 * are the right ones — the option and the pill are laid out in the same parent, so the
 * parent's coordinates are the ones that matter.
 *
 * It announces itself as a `radio` rather than as a `tab`: the segment holds a value, and
 * `checked` is what a screen reader needs to hear. Overridable (R9), like every default.
 */
export const SegmentItem = forwardRef<View, SegmentItemProps>(function SegmentItem(
  {
    value,
    children,
    isDisabled = false,
    asChild = false,
    accessibilityRole = 'radio',
    accessibilityState,
    style,
    onLayout,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const {
    itemStyle,
    separatorStyle,
    hasSeparator,
    rects,
    value: selected,
    isDisabled: isRootDisabled,
    select,
    setRect,
  } = useSegment()

  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const isSelected = selected === value
  const disabled = isRootDisabled || isDisabled

  const measure = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      const { x, width } = event.nativeEvent.layout
      setRect(value, { x, width })
    },
    [onLayout, setRect, value]
  )

  const handlePress = useCallback(
    (event: Parameters<NonNullable<SegmentItemProps['onPress']>>[0]) => {
      onPress?.(event)
      select(value)
    },
    [onPress, select, value]
  )

  const context = useMemo(
    () => ({ isSelected, isPressed, isDisabled: disabled }),
    [isSelected, isPressed, disabled]
  )

  const text = typeof children === 'function' ? null : childrenToString(children)

  return (
    <SegmentItemProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        asChild={asChild}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          disabled,
          checked: isSelected,
          ...accessibilityState,
        }}
        {...rest}
        onLayout={measure}
        style={[
          itemStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {hasSeparator && hasLeadingSeparator(rects, value, selected) ? (
          <View style={separatorStyle} />
        ) : null}
        {typeof children === 'function' ? (
          children(context)
        ) : text !== null ? (
          // R3 — a stringifiable option becomes its label, which is what makes the common
          // case `<Segment.Item value="all">Tout</Segment.Item>`.
          <SegmentLabel>{text}</SegmentLabel>
        ) : (
          children
        )}
      </PressableFeedback>
    </SegmentItemProvider>
  )
})

SegmentItem.displayName = 'XAUI.Segment.Item'
