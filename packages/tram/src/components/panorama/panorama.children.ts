import { Children, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { PanoramaBackground } from './panorama-background'
import { PanoramaSection } from './panorama-section'
import { PanoramaTitle } from './panorama-title'
import type { PanoramaSectionProps } from './panorama.type'

export type PanoramaParts = {
  /** Drawn behind everything, on the slowest layer. */
  background: ReactNode
  /** Drawn on the title's layer, over the sections. */
  title: ReactNode
  /** Laid on the track, one after the other. */
  sections: ReactNode[]
  /** The sections' values, in the order they are written. */
  values: string[]
}

/**
 * Sorts the root's direct children by the layer the `Panorama` draws them on: a
 * `Panorama.Background` behind, a `Panorama.Title` above, and everything else on the
 * track — a `Panorama.Section` named by its `value`.
 */
export function partsOf(children: ReactNode): PanoramaParts {
  const parts: PanoramaParts = {
    background: null,
    title: null,
    sections: [],
    values: [],
  }

  for (const child of Children.toArray(children)) {
    if (isSlot(child, PanoramaBackground)) {
      parts.background = child
    } else if (isSlot(child, PanoramaTitle)) {
      parts.title = child
    } else {
      if (isSlot<PanoramaSectionProps>(child, PanoramaSection)) {
        parts.values.push(child.props.value)
      }
      parts.sections.push(child)
    }
  }

  return parts
}

function isSlot<Props>(
  child: ReactNode,
  slot: unknown
): child is ReactElement<Props> {
  return isValidElement(child) && child.type === slot
}
