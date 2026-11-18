import { I18nManager } from 'react-native'
import { fromStart, isRowReversed } from '../../system/tab-row'
import type { TabSpan } from '../../system/tab-row'
import type { TabEntry, TabRow, TabRule } from './tabs.type'

type Tab = { entry: TabEntry; span?: TabSpan; label?: TabSpan }

function isSame(a: TabSpan | undefined, b: TabSpan): boolean {
  return a !== undefined && a.x === b.x && a.width === b.width
}

/**
 * The row's record of its tabs. A `Map` keeps them in the order they were written, which
 * is the order the row is read in — by the arrow keys, and to tell which way a change of
 * tab goes. Nothing walks the children.
 */
export function createTabRow(): TabRow {
  const tabs = new Map<string, Tab>()
  const rules = new Map<string, TabRule>()
  const listeners = new Set<() => void>()
  let content = 0

  const notify = () => listeners.forEach(listener => listener())

  const spans = () => [...tabs.values()].flatMap(tab => (tab.span ? [tab.span] : []))

  const isReversed = () => isRowReversed(spans(), I18nManager.isRTL)

  return {
    register(value, entry) {
      tabs.set(value, { ...tabs.get(value), entry })

      return () => {
        // A tab written again under the same value has taken the place over.
        if (tabs.get(value)?.entry !== entry) return
        tabs.delete(value)
        rules.delete(value)
      }
    },

    order: () => [...tabs.keys()],

    stops: () =>
      [...tabs].map(([value, tab]) => ({
        value,
        isDisabled: tab.entry.isDisabled,
      })),

    focus: value => tabs.get(value)?.entry.focus(),

    setSpan(value, span) {
      const tab = tabs.get(value)
      if (!tab || isSame(tab.span, span)) return
      tab.span = span
      notify()
    },

    setLabel(value, span) {
      const tab = tabs.get(value)
      if (!tab || isSame(tab.label, span)) return
      tab.label = span
      notify()
    },

    setContent(width) {
      if (width === content) return
      content = width
      notify()
    },

    span: value => tabs.get(value)?.span,
    content: () => content,
    isReversed,

    margin() {
      const first = spans()[0]

      return first ? Math.max(0, fromStart(first, content, isReversed())) : 0
    },

    rule(value) {
      const tab = tabs.get(value)
      if (!tab?.span) return undefined

      // Under the title when it measured itself; under the whole tab otherwise.
      const { span, label } = tab
      const under = label ? { x: span.x + label.x, width: label.width } : span
      const next = {
        start: fromStart(under, content, isReversed()),
        width: under.width,
      }
      const known = rules.get(value)

      if (known && known.start === next.start && known.width === next.width) {
        return known
      }

      rules.set(value, next)

      return next
    },

    subscribe(listener) {
      listeners.add(listener)

      return () => listeners.delete(listener)
    },
  }
}
