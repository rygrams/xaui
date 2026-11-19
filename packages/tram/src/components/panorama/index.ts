import { PanoramaRoot } from './panorama'
import { PanoramaBackground } from './panorama-background'
import { PanoramaHeader } from './panorama-header'
import { PanoramaSection } from './panorama-section'
import { PanoramaTitle } from './panorama-title'

export const Panorama = Object.assign(PanoramaRoot, {
  Background: PanoramaBackground,
  Title: PanoramaTitle,
  Section: PanoramaSection,
  Header: PanoramaHeader,
})

export { PanoramaRoot } from './panorama'
export { PanoramaBackground } from './panorama-background'
export { PanoramaHeader } from './panorama-header'
export { PanoramaSection } from './panorama-section'
export { PanoramaTitle } from './panorama-title'
export { usePanorama } from './panorama.context'
export { PANORAMA_PEEK, panoramaRecipe } from './panorama.recipe'
export type {
  PanoramaBackgroundProps,
  PanoramaContextValue,
  PanoramaHeaderProps,
  PanoramaProps,
  PanoramaSectionProps,
  PanoramaSlot,
  PanoramaTitleProps,
} from './panorama.type'
