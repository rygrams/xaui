import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { rosterAfter } from '../../system/row-roster'
import type { RosterEntry, RosterRow } from '../../system/row-roster'

/**
 * The rows a list draws: what it is given, and — while `isKeeping` — what it was given
 * before and is no longer, until that row has closed and calls `letGo` with its key.
 * Not keeping, a removed row is simply gone.
 */
export function useRowRoster(
  entries: readonly RosterEntry<ReactNode>[],
  isKeeping: boolean
) {
  const shown = useRef<RosterRow<ReactNode>[]>([])
  const [, redraw] = useState(0)

  const roster = isKeeping
    ? rosterAfter(shown.current, entries)
    : entries.map(entry => ({ ...entry, isLeaving: false }))

  useLayoutEffect(() => {
    shown.current = roster
  })

  const letGo = useCallback((key: string) => {
    shown.current = shown.current.filter(row => row.key !== key)
    redraw(count => count + 1)
  }, [])

  return [roster, letGo] as const
}
