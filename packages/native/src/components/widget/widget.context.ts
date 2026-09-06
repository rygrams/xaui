import { createSlotContext } from '../../system/slot'
import type { WidgetContextValue } from './widget.type'

/**
 * R10 — the resolved styles, so a third party can write a slot of its own: a toolbar in the
 * header, a second well under the first. Outside a `<Widget>` it throws by name.
 */
export const [WidgetProvider, useWidget] =
  createSlotContext<WidgetContextValue>('Widget')
