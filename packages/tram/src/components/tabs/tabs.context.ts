import { createSlotContext } from '@xaui/native/system'
import type { TabsContextValue, TabsTriggerContextValue } from './tabs.type'

/**
 * `useTabs` is exported so a third party can write its own slot against the values the
 * built-in ones read — and so a content can cascade by hand, from `travel` and
 * `towardEnd`. Outside a `<Tabs>` it throws by name.
 */
export const [TabsProvider, useTabs] =
  createSlotContext<TabsContextValue>('Tram.Tabs')

/** One trigger's own state: whether it is the chosen one, and whether a finger is on it. */
export const [TabsTriggerProvider, useTabsTrigger] =
  createSlotContext<TabsTriggerContextValue>('Tram.Tabs.Trigger')
