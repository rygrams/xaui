import { Children, Fragment, createElement, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import {
  feedbackChildren,
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

describe('feedbackChildren', () => {
  /**
   * The regression. `{overlays}{content}` in the JSX are two expression children, so the
   * root received an array — and under `asChild` the root is a `Slot`, which merges into
   * one element and threw on every pressable instead. It threw with no overlay composed
   * too: `partitionOverlays` returns `overlays: null` there, and `[null, content]` is
   * still an array.
   */
  it('hands asChild a single element, not an array', () => {
    const child = label()

    expect(isValidElement(feedbackChildren(child, true))).toBe(true)
    expect(feedbackChildren(child, true)).toBe(child)
  })

  /**
   * The caller's element *is* the pressable, so `asChild` skips the partition entirely.
   * Hoisting a child that is itself a bare overlay would replace the one element `Slot`
   * merges into with a hoisted pair, and throw again.
   */
  it('does not hoist an overlay that is itself the asChild child', () => {
    const overlay = wash()

    expect(feedbackChildren(overlay, true)).toBe(overlay)
  })

  it('passes the children through untouched when nothing is hoisted', () => {
    const children = [label()]

    expect(feedbackChildren(children, false)).toBe(children)
  })

  /** One node, so the root has a single child — the overlays still coming first inside it. */
  it('paints hoisted overlays before the content, under one node', () => {
    const rendered = feedbackChildren([label(), wash()], false)

    expect(isValidElement(rendered)).toBe(true)
    expect((rendered as ReactElement).type).toBe(Fragment)
    expect(typesOf((rendered as ReactElement<{ children: ReactNode }>).props.children))
      .toEqual([Wash, Label])
  })
})
