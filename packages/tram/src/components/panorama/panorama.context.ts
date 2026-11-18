import { createSlotContext } from '@xaui/native/system'
import type { PanoramaContextValue } from './panorama.type'

/**
 * `usePanorama` is exported so a third party can write its own section against the values
 * the built-in ones read. Outside a `<Panorama>` it throws by name.
 */
export const [PanoramaProvider, usePanorama] =
  createSlotContext<PanoramaContextValue>('Tram.Panorama')
