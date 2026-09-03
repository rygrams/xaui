import { Children, isValidElement } from 'react'
import type { ElementType, ReactNode } from 'react'

/**
 * Whether one of the direct children is an element of `type`.
 *
 * It is what `isLoading` asks before inserting a `Button.Spinner`: composing one yourself
 * is how you put it after the label rather than before it, and the root has to know that
 * before it renders. §8 of the plan takes this scan as the price of
 * `<Button isLoading>Envoi…</Button>` working at all, which is the majority case.
 *
 * Direct children only. A spinner buried inside a wrapper is not the composition the
 * auto-insert is about, and a deep walk would make "did I compose one?" depend on how
 * many layers deep it sits.
 */
export function containsElementOfType(
  children: ReactNode,
  type: ElementType
): boolean {
  return Children.toArray(children).some(
    child => isValidElement(child) && child.type === type
  )
}
