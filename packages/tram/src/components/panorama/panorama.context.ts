import { createContext, useContext } from 'react'
import { createSlotContext } from '@xaui/native/system'
import type { PanoramaContextValue } from './panorama.type'

/**
 * `usePanorama` is exported so a third party can write its own section against the values
 * the built-in ones read. Outside a `<Panorama>` it throws by name.
 */
export const [PanoramaProvider, usePanorama] =
  createSlotContext<PanoramaContextValue>('Tram.Panorama')

const SectionCurrentContext = createContext(false)

/** Set by each section: whether it is the one on screen. */
export const PanoramaSectionCurrentProvider = SectionCurrentContext.Provider

/** Inside a `Panorama.Section`, whether it is the one on screen; outside one, `false`. */
export function useIsCurrentPanoramaSection(): boolean {
  return useContext(SectionCurrentContext)
}
