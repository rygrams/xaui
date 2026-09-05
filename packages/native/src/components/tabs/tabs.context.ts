import { createSlotContext } from '../../system/slot'
import type { TabsContextValue, TabsTriggerContextValue } from './tabs.type'

/**
 * R10 — `useTabs` is exported so a third party can write its own slot against the same
 * resolved values the built-in ones read. Outside a `<Tabs>` it throws by name.
 */
export const [TabsProvider, useTabs] = createSlotContext<TabsContextValue>('Tabs')

/** One trigger's own state. Everything visual still comes from `useTabs()`. */
export const [TabsTriggerProvider, useTabsTrigger] =
  createSlotContext<TabsTriggerContextValue>('Tabs.Trigger')
