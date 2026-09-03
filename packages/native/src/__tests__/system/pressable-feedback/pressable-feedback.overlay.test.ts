import { Children, Fragment, createElement, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import {
  markOverlay,
  partitionOverlays,
} from '../../../system/pressable-feedback/pressable-feedback.overlay'

const Wash = markOverlay(function Wash() {
  return null
})

const Wave = markOverlay(function Wave() {
  return null
})

function Label() {
  return null
}

const wash = () => createElement(Wash, { key: 'wash' })
const wave = () => createElement(Wave, { key: 'wave' })
const label = () => createElement(Label, { key: 'label' })

/** What each returned child actually is, which is the only thing these assertions care about. */
const typesOf = (nodes: ReactNode) =>
  Children.toArray(nodes).map(node => (isValidElement(node) ? node.type : node))

describe('partitionOverlays', () => {
  /** The whole point: composition should not carry an invisible ordering rule. */
  it('pulls an overlay out whether it was written first or last', () => {
    const after = partitionOverlays([label(), wash()])
    const before = partitionOverlays([wash(), label()])

    expect(typesOf(after.overlays)).toEqual([Wash])
    expect(typesOf(after.content)).toEqual([Label])
    expect(typesOf(before.overlays)).toEqual([Wash])
    expect(typesOf(before.content)).toEqual([Label])
  })

  it('keeps several overlays, in the order they were written', () => {
    const { overlays, content } = partitionOverlays([wave(), label(), wash()])

    expect(typesOf(overlays)).toEqual([Wave, Wash])
    expect(typesOf(content)).toEqual([Label])
  })

  /**
   * The common case, and the one that must not allocate a new tree: a component with no
   * overlay keeps its children exactly as written, with its own keys rather than the
   * positional ones `Children.toArray` would assign.
   */
  it('returns the children untouched when there is no overlay', () => {
    const children = [label()]
    const { overlays, content } = partitionOverlays(children)

    expect(overlays).toBeNull()
    expect(content).toBe(children)
  })

  it('treats an unmarked component as content, whatever it is called', () => {
    const { overlays, content } = partitionOverlays(label())

    expect(overlays).toBeNull()
    expect(typesOf(content)).toEqual([Label])
  })

  // A documented limit rather than an oversight: lifting a fragment's children into their
  // parent's list would re-key them into a sibling fragment's range.
  it('leaves an overlay nested in a fragment where it is', () => {
    const { overlays } = partitionOverlays(
      createElement(Fragment, null, createElement(Wash))
    )

    expect(overlays).toBeNull()
  })

  /**
   * A wrapping overlay already contains what it sits under, so hoisting it would drag that
   * content ahead of the root's other children — the label would render before the spinner.
   */
  it('leaves a wrapping overlay where it was written', () => {
    const wrapping = createElement(Wave, { key: 'wave' }, createElement(Label))
    const children = [createElement(Label, { key: 'spinner' }), wrapping]

    const { overlays, content } = partitionOverlays(children)

    expect(overlays).toBeNull()
    expect(content).toBe(children)
  })

  it('still hoists a bare overlay sitting next to a wrapping one', () => {
    const wrapping = createElement(Wave, { key: 'wave' }, createElement(Label))
    const { overlays, content } = partitionOverlays([label(), wrapping, wash()])

    expect(typesOf(overlays)).toEqual([Wash])
    expect(typesOf(content)).toEqual([Label, Wave])
  })

  it('ignores text and nullish children', () => {
    const { overlays, content } = partitionOverlays(['hello', null, wash()])

    expect(typesOf(overlays)).toEqual([Wash])
    expect(typesOf(content)).toEqual(['hello'])
  })
})
