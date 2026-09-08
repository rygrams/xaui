import { createSlotContext } from '../../system/slot'
import type { ScaffoldContextValue } from './scaffold.type'

/**
 * R10 — `useScaffold` is exported so an app can dress a navigator the two slots do not
 * cover. A drawer's `drawerStyle`, an Android navigation-bar module, a header rendered by
 * hand: all of them read the same resolved values the slots read.
 *
 * ```tsx
 * const { screenOptions } = useScaffold()
 * <Tabs screenOptions={{ ...screenOptions, tabBarStyle: screenOptions.headerStyle }} />
 * ```
 */
export const [ScaffoldProvider, useScaffold] =
  createSlotContext<ScaffoldContextValue>('Scaffold')
