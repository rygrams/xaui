import { createSlotContext } from '@xaui/native/system'
import type {
  AccordionContextValue,
  AccordionItemContextValue,
} from './accordion.type'

/**
 * `useAccordion` is exported so a third party can write its own slot against the values
 * the built-in ones read. Outside an `<Accordion>` it throws by name.
 */
export const [AccordionProvider, useAccordion] =
  createSlotContext<AccordionContextValue>('Tram.Accordion')

/** One row's own state: which value it is, and whether it is open. */
export const [AccordionItemProvider, useAccordionItem] =
  createSlotContext<AccordionItemContextValue>('Tram.Accordion.Item')
