import { Children, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { childrenToString } from '@xaui/native/system'
import { AppBarLabel } from './app-bar-label'
import { AppBarMenu } from './app-bar-menu'
import type { AppBarLabelProps } from './app-bar.type'

export type AppBarParts = {
  /** What goes in the row of circles: the buttons. */
  buttons: ReactNode[]
  /** The `AppBar.Menu`, laid under the row, or `null`. */
  menu: ReactNode
}

/**
 * Sorts the bar's direct children by where it draws them: an `AppBar.Menu` under the row,
 * shown while the bar is open, and everything else in the row.
 */
export function barPartsOf(children: ReactNode): AppBarParts {
  const parts: AppBarParts = { buttons: [], menu: null }

  for (const child of Children.toArray(children)) {
    if (isSlot(child, AppBarMenu)) parts.menu = child
    else parts.buttons.push(child)
  }

  return parts
}

export type AppBarButtonParts = {
  /** What is drawn in the circle. */
  glyph: ReactNode[]
  /** What is laid under it. */
  label: ReactNode
  /** The label's text when it is plain text: what names the button. */
  name: string | null
}

/**
 * Sorts a button's direct children: an `AppBar.Label` under the circle, everything else
 * in it. A bare string — alone, or beside the glyph — is the label's text, and draws
 * nothing in the circle: text there would not be inside a `Text`.
 */
export function buttonPartsOf(children: ReactNode): AppBarButtonParts {
  const text = childrenToString(children)
  if (text !== null) return { glyph: [], label: text, name: text }

  const parts: AppBarButtonParts = { glyph: [], label: null, name: null }

  for (const child of Children.toArray(children)) {
    if (typeof child === 'string' || typeof child === 'number') {
      parts.label = String(child)
      parts.name = String(child)
    } else if (isSlot<AppBarLabelProps>(child, AppBarLabel)) {
      parts.label = child
      parts.name = childrenToString(child.props.children)
    } else {
      parts.glyph.push(child)
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
