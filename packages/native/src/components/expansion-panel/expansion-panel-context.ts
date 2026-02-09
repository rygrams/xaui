import { createContext, useContext } from 'react'
import type { ExpansionPanelVariant } from './expansion-panel.type'

export type ExpansionPanelContextValue = {
  variant: ExpansionPanelVariant
  hideIndicator: boolean
  disableAnimation: boolean
  isCompact: boolean
  showDivider: boolean
  expandedKeys: string[]
  disabledKeys: string[]
  toggleItem: (key: string) => void
}

export const ExpansionPanelContext = createContext<ExpansionPanelContextValue | undefined>(
  undefined
)

export const useExpansionPanelContext = () => {
  const context = useContext(ExpansionPanelContext)
  if (!context) {
    throw new Error('ExpansionPanelItem must be used within an ExpansionPanel component')
  }
  return context
}
