import { ProgressCircleIndicator } from './progress-circle-indicator'
import { ProgressCircleRoot } from './progress-circle'
import { ProgressCircleValue } from './progress-circle-value'

export const ProgressCircle = Object.assign(ProgressCircleRoot, {
  Indicator: ProgressCircleIndicator,
  Value: ProgressCircleValue,
})

export { ProgressCircleRoot } from './progress-circle'
export { ProgressCircleIndicator } from './progress-circle-indicator'
export { ProgressCircleValue } from './progress-circle-value'
export { useProgressCircle } from './progress-circle.context'
export { circleGeometry } from './progress-circle.geometry'
export { progressCircleRecipe } from './progress-circle.recipe'
export type { CircleGeometry } from './progress-circle.geometry'
export type {
  ProgressCircleContextValue,
  ProgressCircleIndicatorProps,
  ProgressCircleProps,
  ProgressCircleSize,
  ProgressCircleSlot,
  ProgressCircleValueProps,
  ProgressCircleVariant,
} from './progress-circle.type'
