import { createSlotContext } from '../../system/slot'
import type { FabDiscoveryContextValue } from './fab-discovery.type'

/**
 * R10 — `useFabDiscovery` is exported so a third party can write its own slot against the
 * measured geometry and the resolved styles: a step counter on the disc, a "skip the tour"
 * beside the action. Outside a `<Fab.Discovery>` it throws by name.
 */
export const [FabDiscoveryProvider, useFabDiscovery] =
  createSlotContext<FabDiscoveryContextValue>('Fab.Discovery')
