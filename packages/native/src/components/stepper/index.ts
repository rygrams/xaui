import { StepperRoot } from './stepper'
import { StepperContent } from './stepper-content'
import { StepperDescription } from './stepper-description'
import { StepperIndicator } from './stepper-indicator'
import { StepperItem } from './stepper-item'
import { StepperTitle } from './stepper-title'

export const Stepper = Object.assign(StepperRoot, {
  Item: StepperItem,
  Indicator: StepperIndicator,
  Content: StepperContent,
  Title: StepperTitle,
  Description: StepperDescription,
})

export { StepperRoot } from './stepper'
export { StepperContent } from './stepper-content'
export { StepperDescription } from './stepper-description'
export { StepperIndicator } from './stepper-indicator'
export { StepperItem } from './stepper-item'
export { StepperTitle } from './stepper-title'
export { useStep, useStepper } from './stepper.context'
export { stepperRecipe } from './stepper.recipe'
/** Where a step stands from its index and the value, public for a stepper drawn elsewhere. */
export { stepStatus } from './stepper.utils'
export type {
  StepContextValue,
  StepStatus,
  StepperContentProps,
  StepperContextValue,
  StepperDescriptionProps,
  StepperIndicatorProps,
  StepperItemProps,
  StepperOrientation,
  StepperProps,
  StepperSize,
  StepperSlot,
  StepperTitleProps,
  StepperVariant,
} from './stepper.type'
