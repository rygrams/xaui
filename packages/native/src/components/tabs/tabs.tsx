import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { TabsProvider } from './tabs.context'
import { tabsRecipe } from './tabs.recipe'
import type { TabRect, TabsProps } from './tabs.type'

/**
 * A row of tabs, and what each one shows.
 *
 * ```tsx
 * <Tabs defaultValue="all">
 *   <Tabs.List>
 *     <Tabs.Indicator />
 *     <Tabs.Trigger value="all">Tout</Tabs.Trigger>
 *     <Tabs.Trigger value="unread">Non lus</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="all">…</Tabs.Content>
 *   <Tabs.Content value="unread">…</Tabs.Content>
 * </Tabs>
 * ```
 *
 * **The triggers measure themselves and the root keeps the rectangles.** That is what lets
 * the indicator be one node sliding rather than a border on each tab appearing and
 * disappearing — and it is why `Tabs.Indicator` is written inside the list rather than
 * being conjured by it: where it goes is the root's business, but whether it exists at all
 * is the caller's.
 */
export const TabsRoot = forwardRef<View, TabsProps>(function Tabs(
  {
    children,
    variant,
    size,
    radius,
    color,
    value: controlledValue,
    defaultValue,
    onValueChange,
    isDisabled = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const [rects, setRects] = useState<Readonly<Record<string, TabRect>>>({})

  const [value, setValue] = useControllableState<string | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: string | undefined) => void) | undefined,
  })

  const selection = { variant, size, radius }
  const styles = tabsRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? tabsRecipe.tint({ theme, color, selection }) : undefined

  const select = useCallback((next: string) => setValue(next), [setValue])

  const setRect = useCallback((tab: string, rect: TabRect) => {
    setRects(current => {
      const previous = current[tab]
      if (previous && previous.x === rect.x && previous.width === rect.width)
        return current
      return { ...current, [tab]: rect }
    })
  }, [])

  const context = useMemo(() => {
    // The chosen tab's colour rides on the `content` slot, which is not a node the recipe
    // paints — it is where `paint` puts `fgSelected` so both shapes name it the same way.
    const selected = StyleSheet.flatten<TextStyle>([styles.content, tint?.content])

    return {
      listStyle: tint ? [styles.list, tint.list] : styles.list,
      triggerStyle: styles.trigger,
      labelStyle: styles.label,
      labelSelectedStyle: { color: selected.color },
      indicatorStyle: tint ? [styles.indicator, tint.indicator] : styles.indicator,
      contentStyle: undefined,
      variant: variant ?? 'primary',
      value,
      isDisabled,
      select,
      rects,
      setRect,
    }
  }, [styles, tint, variant, value, isDisabled, select, rects, setRect])

  return (
    <TabsProvider value={context}>
      <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </View>
    </TabsProvider>
  )
})

TabsRoot.displayName = 'XAUI.Tabs.Root'
