import { Children, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'

/**
 * The children of a slot as runs: the text between two elements joined into one string,
 * the elements as they are. `{count} articles` is the array `[3, ' articles']` and must
 * stay one line, not two `Text` stacked in a column.
 */
export function textRuns(children: ReactNode): (string | ReactElement)[] {
  const runs: (string | ReactElement)[] = []

  for (const child of Children.toArray(children)) {
    const last = runs[runs.length - 1]

    if (typeof child === 'string' || typeof child === 'number') {
      if (typeof last === 'string') runs[runs.length - 1] = last + String(child)
      else runs.push(String(child))
    } else if (isValidElement(child)) {
      runs.push(child)
    }
  }

  return runs
}

/** The text a slot shows, without its glyphs: what a screen reader is told it is. */
export function textOf(children: ReactNode): string {
  return textRuns(children)
    .filter(run => typeof run === 'string')
    .join(' ')
    .trim()
}
