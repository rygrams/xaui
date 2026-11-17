import { createContext, useContext } from 'react'

/**
 * The moments a Tram control can be felt. A name, not an intensity: the app decides what
 * a `press` feels like, and on which devices.
 */
export type TramHaptic = 'press' | 'selection'

export type TramHapticHandler = (moment: TramHaptic) => void

const SILENT: TramHapticHandler = () => {}

const TramHapticsContext = createContext<TramHapticHandler>(SILENT)

export const TramHapticsProvider = TramHapticsContext.Provider

/**
 * What a control calls at its moment — `haptic('press')`. It does nothing unless the app
 * gave `TramProvider` an `onHaptic`, which is how Tram stays free of any haptic library.
 */
export function useTramHaptic(): TramHapticHandler {
  return useContext(TramHapticsContext)
}
