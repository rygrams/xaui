import { forwardRef, useCallback, useId, useMemo, useState } from 'react'
import type { View as ViewRef } from 'react-native'
import { View } from 'react-native'
import { useControllableState } from '@xaui/native'
import { useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { lineInk } from '../../system/line-ink'
import { tabTravel } from '../../system/tab-row'
import type { TabTravel } from '../../system/tab-row'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { TabsProvider } from './tabs.context'
import { usePanelSwap } from './tabs.hook'
import { DEFAULT_SIZE, tabsRecipe } from './tabs.recipe'
import { createTabRow } from './tabs.row'
import type { TabsProps } from './tabs.type'

type Trip = { tab: string | undefined; travel: TabTravel; towardEnd: 1 | -1 }

/**
 * The tabs of Metro — the Native `Tabs`' API, drawn as a row of titles: no track, no box,
 * no rule. The chosen tab is in the page's ink and the others are grey, and that is all
 * that says which one it is.
 *
 * ```tsx
 * <Tabs defaultValue="all">
 *   <Tabs.List>
 *     <Tabs.Trigger value="all">tout</Tabs.Trigger>
 *     <Tabs.Trigger value="unread">non lus</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="all">…</Tabs.Content>
 *   <Tabs.Content value="unread">…</Tabs.Content>
 * </Tabs>
 * ```
 *
 * `Tabs.Indicator` stays a slot, as an extra: written inside the list it is a rule under
 * the chosen title, and `accent` and `color` are its colour — they show nowhere else.
 *
 * The root keeps the row's record: the order of the tabs, which gives the way a change
 * goes (`travel`), and where each one lies, which is what brings the chosen one into view.
 */
export const TabsRoot = forwardRef<ViewRef, TabsProps>(function Tabs(
  {
    children,
    size = DEFAULT_SIZE,
    radius,
    accent,
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
  const isStill = useAnimationDisabled()
  const haptic = useTramHaptic()
  const id = useId()
  const [row] = useState(createTabRow)
  const [indicators, setIndicators] = useState(0)

  const [value, setValue] = useControllableState<string | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: string | undefined) => void) | undefined,
  })

  // Read as the value changes, whoever changed it: the row is as it was laid out for the
  // tab being left, which is what the way is measured against.
  const [trip, setTrip] = useState<Trip>({ tab: value, travel: 0, towardEnd: 1 })
  if (trip.tab !== value) {
    setTrip({
      tab: value,
      travel: tabTravel(row.order(), trip.tab, value),
      towardEnd: row.isReversed() ? -1 : 1,
    })
  }

  const { shown, leaving } = usePanelSwap(value, isStill)

  const styles = tabsRecipe.resolve({
    theme,
    selection: { size, radius },
    states: { disabled: isDisabled },
  })

  // A rule in the accent is a line, so a named accent is its ink on the ground. Grey
  // while disabled, whatever was asked.
  const ink = isDisabled
    ? undefined
    : lineInk({ accent, color }, theme.colors.background)
  const reach = touchReach(theme.controlHeights[size])

  const select = useCallback(
    (next: string) => {
      if (next === value) return
      haptic('selection')
      setValue(next)
    },
    [value, haptic, setValue]
  )

  const claimIndicator = useCallback(() => {
    setIndicators(count => count + 1)

    return () => setIndicators(count => count - 1)
  }, [])

  const context = useMemo(
    () => ({
      listStyle: styles.list,
      triggerStyle: styles.trigger,
      triggerDisabledStyle: styles.triggerDisabled,
      labelStyle: styles.label,
      indicatorStyle: ink
        ? [styles.indicator, { backgroundColor: ink }]
        : styles.indicator,
      contentStyle: styles.content,
      tones: { rest: theme.colors.muted, chosen: theme.colors.foreground },
      reach,
      value,
      shown,
      isDisabled,
      isStill,
      select,
      travel: trip.travel,
      towardEnd: trip.towardEnd,
      leaving,
      row,
      hasIndicator: indicators > 0,
      claimIndicator,
      tabId: (tab: string) => `${id}-tab-${tab}`,
      panelId: (tab: string) => `${id}-panel-${tab}`,
    }),
    [
      styles,
      ink,
      theme,
      reach,
      value,
      shown,
      isDisabled,
      isStill,
      select,
      trip,
      leaving,
      row,
      indicators,
      claimIndicator,
      id,
    ]
  )

  return (
    <TabsProvider value={context}>
      <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
        {children}
      </View>
    </TabsProvider>
  )
})

TabsRoot.displayName = 'XAUI.Tram.Tabs.Root'
