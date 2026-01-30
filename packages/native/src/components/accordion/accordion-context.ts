import { createContext, useContext } from 'react'
import type { AccordionVariant } from './accordion.type'

export type AccordionContextValue = {
  variant: AccordionVariant
  hideIndicator: boolean
  disableAnimation: boolean
  isCompact: boolean
  showDivider: boolean
  expandedKeys: string[]
  disabledKeys: string[]
  toggleItem: (key: string) => void
}

export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

export const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion component')
  }
  return context
}
