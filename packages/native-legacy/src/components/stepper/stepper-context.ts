import { createContext, useContext } from 'react'
import type {
  StepperCustomAppearance,
  StepperDirection,
  StepperLineDisplayMode,
  StepperSize,
} from './stepper.type'
import type { ThemeColor } from '../../types'

export type StepperContextValue = {
  activeKey?: string
  activeIndex: number
  keys: string[]
  direction: StepperDirection
  showLines: boolean
  lineDisplayMode: StepperLineDisplayMode
  isDisabled: boolean
  themeColor: ThemeColor
  size: StepperSize
  customAppearance?: StepperCustomAppearance
  onStepChange?: (key: string) => void
}

export const StepperContext = createContext<StepperContextValue | undefined>(
  undefined
)

export const useStepperContext = () => useContext(StepperContext)
