import { createSlotContext } from '../../system/slot'
import type {
  AccordionContextValue,
  AccordionItemContextValue,
} from './accordion.type'

/**
 * R10 — `useAccordion` is exported so a third party can write its own slot against the
 * same resolved values the built-in ones read. Outside an `<Accordion>` it throws by name.
 */
export const [AccordionProvider, useAccordion] =
  createSlotContext<AccordionContextValue>('Accordion')

/**
 * One row's own state. It carries only what the row knows and the container cannot:
 * which value it is, and whether it is open.
 */
export const [AccordionItemProvider, useAccordionItem] =
  createSlotContext<AccordionItemContextValue>('Accordion.Item')
