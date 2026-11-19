import { Children, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { childrenToString } from '@xaui/native/system'
import { PanoramaBackground } from './panorama-background'
import { PanoramaHeader } from './panorama-header'
import { PanoramaSection } from './panorama-section'
import { PanoramaTitle } from './panorama-title'
import type { PanoramaHeaderProps, PanoramaSectionProps } from './panorama.type'

export type PanoramaParts = {
  /** Drawn behind everything, on the slowest layer. */
  background: ReactNode
  /** Drawn on the title's layer, over the sections. */
  title: ReactNode
  /** Laid on the track, one after the other. */
  sections: ReactNode[]
  /** The sections' values, in the order they are written. */
  values: string[]
  /** What a screen reader calls each section: its header's text, or its `value`. */
  labels: string[]
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
    labels: [],
  }

  for (const child of Children.toArray(children)) {
    if (isSlot(child, PanoramaBackground)) {
      parts.background = child
    } else if (isSlot(child, PanoramaTitle)) {
      parts.title = child
    } else {
      if (isSlot<PanoramaSectionProps>(child, PanoramaSection)) {
        parts.values.push(child.props.value)
        parts.labels.push(headerText(child.props.children) ?? child.props.value)
      }
      parts.sections.push(child)
    }
  }

  return parts
}

/** The text of a section's `Panorama.Header`, when it is written among its children. */
function headerText(children: ReactNode): string | null {
  for (const child of Children.toArray(children)) {
    if (isSlot<PanoramaHeaderProps>(child, PanoramaHeader)) {
      return childrenToString(child.props.children)
    }
  }

  return null
}

function isSlot<Props>(
  child: ReactNode,
  slot: unknown
): child is ReactElement<Props> {
  return isValidElement(child) && child.type === slot
}
