import { WidgetContent } from './widget-content'
import { WidgetDescription, WidgetFooter, WidgetTitle } from './widget-text'
import { WidgetHeader } from './widget-header'
import { WidgetHeading } from './widget-heading'
import { WidgetRoot } from './widget'

export const Widget = Object.assign(WidgetRoot, {
  Header: WidgetHeader,
  Heading: WidgetHeading,
  Title: WidgetTitle,
  Description: WidgetDescription,
  Content: WidgetContent,
  Footer: WidgetFooter,
})

export { WidgetRoot } from './widget'
export { WidgetContent } from './widget-content'
export { WidgetHeader } from './widget-header'
export { WidgetHeading } from './widget-heading'
export { WidgetDescription, WidgetFooter, WidgetTitle } from './widget-text'
export { useWidget } from './widget.context'
export { widgetRecipe } from './widget.recipe'
export type {
  WidgetContextValue,
  WidgetProps,
  WidgetSize,
  WidgetSlot,
  WidgetTextSlotProps,
  WidgetVariant,
  WidgetViewSlotProps,
} from './widget.type'
