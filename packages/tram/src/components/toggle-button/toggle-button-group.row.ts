import { I18nManager } from 'react-native'
import { isRowReversed } from '../../system/tab-row'
import type { CellEntry, CellRow, CellSpan } from './toggle-button-group.type'

/**
 * The group's record of its buttons. A `Map` keeps them in the order they were written,
 * which is the order the arrow keys go in; each button writes its own place into its
 * entry as it is laid out, and nothing re-renders for it.
 */
export function createCellRow(): CellRow {
  const cells = new Map<string, CellEntry>()

  const spans = () =>
    [...cells.values()].flatMap(cell => (cell.span ? [cell.span] : []))

  return {
    register(value, entry) {
      cells.set(value, entry)

      return () => {
        // A button written again under the same value has taken the place over.
        if (cells.get(value) === entry) cells.delete(value)
      }
    },

    stops: () =>
      [...cells].map(([value, cell]) => ({ value, isDisabled: cell.isDisabled })),

    focus: value => cells.get(value)?.focus(),

    spanOf: (value): CellSpan | undefined => cells.get(value)?.span,

    isReversed: () => isRowReversed(spans(), I18nManager.isRTL),
  }
}
