import { AccordionContent } from './accordion-content'
import { AccordionIndicator } from './accordion-indicator'
import { AccordionItem } from './accordion-item'
import { AccordionTrigger } from './accordion-trigger'
import { AccordionRoot } from './accordion'

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Indicator: AccordionIndicator,
  Content: AccordionContent,
})

export { useAccordion, useAccordionItem } from './accordion.context'
export { accordionRecipe } from './accordion.recipe'
export type {
  AccordionContentProps,
  AccordionContextValue,
  AccordionIndicatorProps,
  AccordionItemContextValue,
  AccordionItemProps,
  AccordionItemRenderState,
  AccordionProps,
  AccordionSelectionMode,
  AccordionSize,
  AccordionSlot,
  AccordionTriggerProps,
  AccordionValue,
  AccordionVariant,
} from './accordion.type'
