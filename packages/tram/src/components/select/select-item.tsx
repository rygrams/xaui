import { forwardRef, useCallback, useEffect, useMemo } from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  useStyleProps,
} from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { SelectItemLabel } from './select-item-label'
import { useCascade } from './select.cascade'
import { SelectItemProvider, useSelect } from './select.context'
import type { SelectItemProps } from './select.type'

/**
 * One choice of the list, pressed like a control of 48. The current one is read by its
 * colour — the accent's ink — and a disabled one is grey and cannot be chosen.
 *
 * It registers its label with the root, which is what lets `Select.Value` name the
 * chosen one; `label` is that string when the item's children are not one. `children` may
 * be a function, for an item that draws its own chosen state.
 *
 * A press leans the row toward the finger and changes no colour. The row arrives in the
 * list's cascade, on a wrapper of its own: `ref`, `style` and `asChild` are the row's.
 */
export const SelectItem = forwardRef<View, SelectItemProps>(function SelectItem(
  {
    value,
    label,
    children,
    isDisabled = false,
    asChild = false,
    role = 'option',
    accessibilityState,
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const {
    itemStyle,
    value: selected,
    isOpen,
    isStill,
    select,
    registerLabel,
    rankOf,
    cascadeAfter,
    reportSpan,
  } = useSelect()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const isSelected = selected === value
  const text = typeof children === 'function' ? null : childrenToString(children)
  // The label the field will show: what the caller named, else the item's own text.
  const registered = label ?? text ?? undefined

  useEffect(() => {
    if (registered !== undefined) registerLabel(value, registered)
  }, [registerLabel, value, registered])

  const arriving = useCascade({
    isOpen,
    rank: rankOf(value),
    isKept: isSelected,
    after: cascadeAfter,
    isStill,
  })

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout
      reportSpan(value, { y, height })
    },
    [reportSpan, value]
  )

  const handlePress = useCallback(
    (event: Parameters<NonNullable<SelectItemProps['onPress']>>[0]) => {
      onPress?.(event)
      select(value, registered)
    },
    [onPress, select, value, registered]
  )

  const context = useMemo(
    () => ({ isSelected, isPressed, isDisabled }),
    [isSelected, isPressed, isDisabled]
  )

  // Under an ancestor's `disable-all` the row does not lean either.
  const Row = isStill ? PressableFeedback : PressTilt
  const lean = isStill ? undefined : { depth: scale.row }

  return (
    <SelectItemProvider value={context}>
      <Animated.View style={arriving} onLayout={handleLayout}>
        <Row
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          // Native's scale, highlight and ripple stay off: the press is the tilt alone.
          animation={isStill ? 'disable-all' : false}
          role={role}
          aria-selected={isSelected}
          // Merged, not spread over: a caller naming another state must not drop these.
          accessibilityState={{
            disabled: isDisabled,
            selected: isSelected,
            ...accessibilityState,
          }}
          {...lean}
          {...rest}
          style={[
            itemStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {typeof children === 'function' ? (
            children(context)
          ) : text !== null ? (
            // A stringifiable tree is the item's label; anything else is composed slots.
            <SelectItemLabel>{text}</SelectItemLabel>
          ) : (
            children
          )}
        </Row>
      </Animated.View>
    </SelectItemProvider>
  )
})

SelectItem.displayName = 'XAUI.Tram.Select.Item'
