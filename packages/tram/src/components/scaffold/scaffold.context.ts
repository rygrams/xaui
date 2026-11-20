import { createSlotContext } from '@xaui/native/system'
import type { ScaffoldContextValue } from './scaffold.type'

/**
 * R10 — `useScaffold` is exported so an app can dress a navigator the two slots do not
 * cover: a drawer's `drawerStyle`, a tab bar, a header rendered by hand.
 */
export const [ScaffoldProvider, useScaffold] =
  createSlotContext<ScaffoldContextValue>('Scaffold')
