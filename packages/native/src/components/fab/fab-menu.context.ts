import { createSlotContext } from '../../system/slot'
import type { FabMenuContextValue } from './fab-menu.type'

/**
 * R10 — `useFabMenu` is exported so a third party can write its own slot against the
 * menu's state and its resolved styles: a trigger whose mark turns when the menu opens, an
 * action that is a switch rather than a press. Outside a `<Fab.Menu>` it throws by name.
 */
export const [FabMenuProvider, useFabMenu] =
  createSlotContext<FabMenuContextValue>('Fab.Menu')
