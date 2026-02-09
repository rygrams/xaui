import type { ExpansionPanelItemProps } from './expansion-panel-item.type'
import { ExpansionPanelItem } from './expansion-panel-item'
import React from 'react'
import type { ExpansionPanelProps } from './expansion-panel.type'

export const getItemKey = (value: unknown, fallback: number) => {
  if (value === null || value === undefined) return String(fallback)
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  return String(fallback)
}

export const normalizeElementKey = (value: unknown) => {
  if (typeof value !== 'string') return value
  return value.startsWith('.$')
    ? value.slice(2)
    : value.startsWith('.')
      ? value.slice(1)
      : value
}

export const isExpansionPanelItem = (
  value: React.ReactNode
): value is React.ReactElement<ExpansionPanelItemProps> =>
  React.isValidElement(value) &&
  (value.type === ExpansionPanelItem ||
    (typeof value.type === 'function' &&
      (value.type as { displayName?: string }).displayName === 'ExpansionPanelItem'))

export const buildExpansionPanelContextParams = (props: ExpansionPanelProps) => {
  return {
    variant: props.variant || 'light',
    hideIndicator: Boolean(props.hideIndicator),
    disableAnimation: Boolean(props.disableAnimation),
    isCompact: Boolean(props.isCompact),
    showDivider: Boolean(props.showDivider),
    expandedKeys: props.expandedKeys,
    defaultExpandedKeys: props.defaultExpandedKeys || [],
    disabledKeys: props.disabledKeys || [],
    selectionMode: props.selectionMode || 'toggle',
    onSelectionChange: props.onSelectionChange,
  }
}
