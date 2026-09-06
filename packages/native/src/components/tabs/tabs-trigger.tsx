import { forwardRef, useCallback, useMemo } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { View } from 'react-native'
import { TabsLabel } from './tabs-label'
import { TabsTriggerProvider, useTabs } from './tabs.context'
import type { TabsTriggerProps } from './tabs.type'
import { hasLeadingSeparator } from './tabs.utils'

/**
 * One tab.
 *
 * It publishes its own rectangle on every layout, and the layout event's `x` and `width`
 * are the right ones here — unlike an overlay's anchor, both the trigger and the indicator
 * are laid out in the same parent, so the parent's coordinates are the ones that matter.
 */
export const TabsTrigger = forwardRef<View, TabsTriggerProps>(function TabsTrigger(
  {
    value,
    children,
    isDisabled = false,
    asChild = false,
    accessibilityRole = 'tab',
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
    triggerStyle,
    separatorStyle,
    hasSeparator,
    rects,
    value: selected,
    isDisabled: isRootDisabled,
    select,
    setRect,
  } = useTabs()

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
    (event: Parameters<NonNullable<TabsTriggerProps['onPress']>>[0]) => {
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
    <TabsTriggerProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        asChild={asChild}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          disabled,
          selected: isSelected,
          ...accessibilityState,
        }}
        {...rest}
        onLayout={measure}
        style={[
          triggerStyle,
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
          // R3 — a stringifiable tab becomes its label, which is what makes the common
          // case `<Tabs.Trigger value="all">Tout</Tabs.Trigger>`.
          <TabsLabel>{text}</TabsLabel>
        ) : (
          children
        )}
      </PressableFeedback>
    </TabsTriggerProvider>
  )
})

TabsTrigger.displayName = 'XAUI.Tabs.Trigger'
